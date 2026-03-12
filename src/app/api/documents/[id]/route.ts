import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
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

  const body = await request.json();

  // Support renaming (filename) and assigning a collection (collection_id)
  const update: Record<string, unknown> = {};
  if ("filename" in body) {
    if (!body.filename || typeof body.filename !== "string" || !body.filename.trim()) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }
    update.filename = body.filename.trim();
  }
  if ("collection_id" in body) {
    update.collection_id = body.collection_id ?? null; // allow null to unassign
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("documents")
    .update(update)
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, filename, collection_id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ document: data });
}

export async function DELETE(
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

  // Fetch the document to get storage_path (and verify ownership via RLS)
  const { data: doc, error: fetchError } = await supabase
    .from("documents")
    .select("id, storage_path")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  // Delete file from Supabase Storage
  const { error: storageError } = await supabase.storage
    .from("documents")
    .remove([doc.storage_path]);

  if (storageError) {
    console.error(`[delete] storage error for doc ${id}:`, storageError.message);
    // Continue anyway — DB record should still be removed
  }

  // Delete DB record (doc_metadata cascades automatically)
  const { error: dbError } = await supabase
    .from("documents")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
