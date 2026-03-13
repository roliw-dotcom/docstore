import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
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

  const { data: doc } = await supabase
    .from("documents")
    .select("storage_path, mime_type, filename")
    .eq("id", id)
    .single(); // RLS enforces workspace membership

  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Download the file server-side and stream it back to the browser.
  // This avoids any CORS restrictions on the Supabase Storage URL.
  const { data: blob, error } = await supabase.storage
    .from("documents")
    .download(doc.storage_path);

  if (error || !blob) {
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }

  const buffer = await blob.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": doc.mime_type ?? "application/octet-stream",
      "Content-Disposition": `inline; filename="${doc.filename}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
