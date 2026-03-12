import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { processLimiter, checkRateLimit } from "@/lib/ratelimit";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// pdf-parse must be require()'d — dynamic import triggers its test-file loader
// serverExternalPackages in next.config.ts ensures it runs as a native Node module
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (
  buffer: Buffer
) => Promise<{ text: string; numpages: number }>;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mammoth = require("mammoth") as {
  extractRawText: (options: { buffer: Buffer }) => Promise<{ value: string }>;
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const XLSX = require("xlsx") as typeof import("xlsx");

interface FollowUpItem {
  title: string;
  description?: string;
  due_date?: string | null;
}

interface ClaudeMetadata {
  keywords: string[];
  categories: string[];
  summary: string;
  follow_ups: FollowUpItem[];
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!await checkRateLimit(processLimiter, user.id)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Fetch the document (must belong to this user)
  const { data: doc, error: docError } = await supabase
    .from("documents")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (docError || !doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  // Allow re-processing by not blocking on "ready" status

  // Mark as processing
  await supabase
    .from("documents")
    .update({ status: "processing" })
    .eq("id", id);

  try {
    // ── 1. Download PDF from Supabase Storage ──────────────────────────────
    const { data: fileBlob, error: downloadError } = await supabase.storage
      .from("documents")
      .download(doc.storage_path);

    if (downloadError || !fileBlob) {
      throw new Error(`Storage download failed: ${downloadError?.message}`);
    }

    const buffer = Buffer.from(await fileBlob.arrayBuffer());

    const isImage = doc.mime_type?.startsWith("image/");
    const isDocx = doc.mime_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    const isOdt  = doc.mime_type === "application/vnd.oasis.opendocument.text";
    const isXlsx = doc.mime_type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isText = doc.mime_type === "text/plain" || doc.mime_type === "text/markdown";

    // ── 2. Extract content and call Claude ────────────────────────────────
    const PROMPT = `Analyze the document and return a single JSON object with these exact fields:
- "keywords": array of 5–15 important keywords or key phrases
- "categories": array of 1–3 category labels (e.g. Finance, Legal, Technical, Medical, HR, Research, Contract, Invoice, Report)
- "summary": 2–3 sentence plain-language summary
- "follow_ups": array of objects representing concrete obligations, deadlines, payments, signatures, or renewals found in the document. Each object has:
  - "title": short action title (e.g. "Sign NDA", "Pay invoice", "Renew subscription")
  - "description": optional brief details or context
  - "due_date": ISO date string (YYYY-MM-DD) if a specific date is mentioned, otherwise null

Respond in the same language as the document.
Return ONLY the raw JSON object — no markdown fences, no explanation.`;

    let pageCount = 1;
    let message;

    if (isImage) {
      // ── 2a. Image: send directly to Claude Vision ──────────────────────
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"] as const;
      type ValidImageType = typeof validImageTypes[number];
      const mediaType: ValidImageType = validImageTypes.includes(doc.mime_type as ValidImageType)
        ? (doc.mime_type as ValidImageType)
        : "image/jpeg";

      message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: buffer.toString("base64") },
              },
              { type: "text", text: PROMPT },
            ],
          },
        ],
      });
    } else if (isDocx || isOdt) {
      // ── 2b. Word / ODT: extract text with mammoth ────────────────────────
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.slice(0, 40000).trim();

      if (!text) {
        throw new Error("No text could be extracted from the document.");
      }

      message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        messages: [{ role: "user", content: `${PROMPT}\n\nDocument:\n${text}` }],
      });
    } else if (isXlsx) {
      // ── 2c. Excel: convert all sheets to CSV text ─────────────────────────
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const text = workbook.SheetNames.map((name: string) => {
        const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[name]);
        return `Sheet: ${name}\n${csv}`;
      }).join("\n\n").slice(0, 40000).trim();

      if (!text) {
        throw new Error("No data could be extracted from the spreadsheet.");
      }

      message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        messages: [{ role: "user", content: `${PROMPT}\n\nDocument:\n${text}` }],
      });
    } else if (isText) {
      // ── 2d. Plain text / Markdown ─────────────────────────────────────────
      const text = buffer.toString("utf-8").slice(0, 40000).trim();

      if (!text) {
        throw new Error("The file appears to be empty.");
      }

      message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        messages: [{ role: "user", content: `${PROMPT}\n\nDocument:\n${text}` }],
      });
    } else {
      // ── 2c. PDF: extract text with pdf-parse ────────────────────────────
      const pdf = await pdfParse(buffer);
      pageCount = pdf.numpages;
      const text = pdf.text.slice(0, 40000).trim();

      if (!text) {
        throw new Error(
          "No text could be extracted — the PDF may be scanned or image-only."
        );
      }

      message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: `${PROMPT}\n\nDocument:\n${text}`,
          },
        ],
      });
    }

    const responseBlock = message.content[0];
    if (responseBlock.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // ── 4. Parse the JSON response ─────────────────────────────────────────
    let metadata: ClaudeMetadata;
    try {
      // Strip accidental markdown fences if present
      const raw = responseBlock.text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
      metadata = JSON.parse(raw);
    } catch {
      throw new Error(`Could not parse Claude response: ${responseBlock.text}`);
    }

    // ── 5. Persist metadata (delete existing row first, then insert fresh) ──
    await supabase.from("doc_metadata").delete().eq("doc_id", id);

    const { error: metaError } = await supabase.from("doc_metadata").insert({
      doc_id: id,
      summary: metadata.summary ?? null,
      keywords: Array.isArray(metadata.keywords) ? metadata.keywords : [],
      categories: Array.isArray(metadata.categories) ? metadata.categories : [],
      page_count: pageCount,
    });

    if (metaError) throw new Error(`Metadata save failed: ${metaError.message}`);

    // ── 6. Persist follow-ups (delete existing, then insert fresh) ─────────
    await supabase.from("follow_ups").delete().eq("doc_id", id);

    const followUps = Array.isArray(metadata.follow_ups) ? metadata.follow_ups : [];
    if (followUps.length > 0) {
      const rows = followUps.map((fu) => ({
        doc_id: id,
        user_id: doc.user_id,
        title: fu.title,
        description: fu.description ?? null,
        due_date: fu.due_date ?? null,
      }));

      const { error: fuError } = await supabase.from("follow_ups").insert(rows);
      if (fuError) throw new Error(`Follow-ups save failed: ${fuError.message}`);
    }

    // ── 7. Mark document as ready ──────────────────────────────────────────
    await supabase
      .from("documents")
      .update({ status: "ready" })
      .eq("id", id);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Processing failed";
    console.error(`[process] doc ${id}:`, message);

    await supabase
      .from("documents")
      .update({ status: "error" })
      .eq("id", id);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
