import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getUserTier } from "@/lib/get-user-tier";
import { getWorkspaceId } from "@/lib/get-workspace";
import { uploadLimiter, checkRateLimit } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!await checkRateLimit(uploadLimiter, user.id)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Enforce free-tier document limit
  const tier = await getUserTier(user.id, supabase);
  if (tier === "free") {
    const { count } = await supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);
    if ((count ?? 0) >= 10) {
      return NextResponse.json(
        { error: "Free plan limit reached (10 documents). Upgrade to Pro." },
        { status: 403 }
      );
    }
  }

  const workspaceId = await getWorkspaceId(supabase, user.id);
  if (!workspaceId) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 500 });
  }

  const body = await request.json();
  const { docId, filename, storagePath, fileSize, mimeType } = body;

  if (!docId || !filename || !storagePath) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("documents")
    .insert({
      id: docId,
      user_id: user.id,
      workspace_id: workspaceId,
      filename,
      storage_path: storagePath,
      file_size: fileSize ?? null,
      mime_type: mimeType ?? null,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("DB insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ document: data }, { status: 201 });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("documents")
    .select(`*, doc_metadata(*)`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ documents: data });
}
