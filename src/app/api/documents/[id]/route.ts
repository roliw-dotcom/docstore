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

  const { filename } = await request.json();
  if (!filename || typeof filename !== "string" || !filename.trim()) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("documents")
    .update({ filename: filename.trim() })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, filename")
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
