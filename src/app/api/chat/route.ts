import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { chatLimiter, checkRateLimit } from "@/lib/ratelimit";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!await checkRateLimit(chatLimiter, user.id)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { messages } = await request.json();

  // ── Fetch document context ────────────────────────────────────────────────
  const { data: documents } = await supabase
    .from("documents")
    .select("id, filename, doc_metadata(summary, keywords, categories)")
    .eq("user_id", user.id)
    .eq("status", "ready")
    .order("created_at", { ascending: false });

  const { data: followUps } = await supabase
    .from("follow_ups")
    .select("title, description, due_date, documents(filename)")
    .eq("user_id", user.id)
    .eq("completed", false)
    .not("due_date", "is", null)
    .order("due_date", { ascending: true });

  const today = new Date().toISOString().split("T")[0];

  const docContext = (documents ?? []).map((doc) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = (doc.doc_metadata as any)?.[0] ?? doc.doc_metadata;
    const parts = [`"${doc.filename}"`];
    if (meta?.categories?.length) parts.push(`[${meta.categories.join(", ")}]`);
    if (meta?.summary) parts.push(`— ${meta.summary}`);
    return parts.join(" ");
  }).join("\n");

  const fuContext = (followUps ?? []).map((fu) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filename = (fu.documents as any)?.filename ?? "unknown";
    return `- "${fu.title}" due ${fu.due_date} (from "${filename}")${fu.description ? `: ${fu.description}` : ""}`;
  }).join("\n");

  const systemPrompt = [
    `You are bAIndly's document assistant. Today is ${today}.`,
    ``,
    `The user has ${(documents ?? []).length} document(s) in their library:`,
    docContext || "No documents yet.",
    ``,
    fuContext
      ? `Pending deadlines and follow-ups:\n${fuContext}`
      : "No pending follow-ups.",
    ``,
    `Answer questions about the user's documents concisely and helpfully.`,
    `Reference document filenames when relevant. Be specific about dates when asked about deadlines.`,
    `If you don't have enough information to answer, say so clearly.`,
  ].join("\n");

  // ── Stream Claude response ────────────────────────────────────────────────
  const stream = anthropic.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  });

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
