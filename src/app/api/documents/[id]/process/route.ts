import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

// pdf-parse must be require()'d — dynamic import triggers its test-file loader
// serverExternalPackages in next.config.ts ensures it runs as a native Node module
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (
  buffer: Buffer
) => Promise<{ text: string; numpages: number }>;

interface ClaudeMetadata {
  keywords: string[];
  categories: string[];
  summary: string;
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

    // ── 2. Extract text ────────────────────────────────────────────────────
    const pdf = await pdfParse(buffer);
    const pageCount = pdf.numpages;

    // Trim to ~40 000 chars to stay well within token limits
    const text = pdf.text.slice(0, 40000).trim();

    if (!text) {
      throw new Error(
        "No text could be extracted — the PDF may be scanned or image-only."
      );
    }

    // ── 3. Call Claude API ─────────────────────────────────────────────────
    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Analyze the document below and return a single JSON object with these exact fields:
- "keywords": array of 5–15 important keywords or key phrases
- "categories": array of 1–3 category labels (e.g. Finance, Legal, Technical, Medical, HR, Research, Contract, Invoice, Report)
- "summary": 2–3 sentence plain-language summary

Return ONLY the raw JSON object — no markdown fences, no explanation.

Document:
${text}`,
        },
      ],
    });

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

    // ── 6. Mark document as ready ──────────────────────────────────────────
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
