import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { accountLimiter, checkRateLimit } from "@/lib/ratelimit";

export async function DELETE() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!await checkRateLimit(accountLimiter, user.id)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // 1. Fetch all documents to collect storage paths
  const { data: docs, error: fetchError } = await supabase
    .from("documents")
    .select("id, storage_path")
    .eq("user_id", user.id);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  // 2. Delete all storage files
  if (docs && docs.length > 0) {
    const paths = docs.map((d) => d.storage_path).filter(Boolean);
    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("documents")
        .remove(paths);
      if (storageError) {
        console.error("[account/delete] storage error:", storageError.message);
        // Continue — DB records must still be deleted
      }
    }

    // 3. Delete all documents (cascades → doc_metadata, follow_ups)
    const { error: docsError } = await supabase
      .from("documents")
      .delete()
      .eq("user_id", user.id);

    if (docsError) {
      return NextResponse.json({ error: docsError.message }, { status: 500 });
    }
  }

  // 4. Delete profile row
  await supabase.from("profiles").delete().eq("id", user.id);

  // 5. Permanently delete the auth user (requires service role)
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
