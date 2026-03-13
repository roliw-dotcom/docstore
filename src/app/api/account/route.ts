import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { accountLimiter, checkRateLimit } from "@/lib/ratelimit";
import { getStripe } from "@/lib/stripe";

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { display_name, email } = body;

  // ── Update display name ────────────────────────────────────────────────────
  if (typeof display_name === "string") {
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: display_name.trim() || null })
      .eq("id", user.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // ── Update email ───────────────────────────────────────────────────────────
  if (typeof email === "string" && email.trim() && email !== user.email) {
    // Supabase sends a confirmation link to the new address
    const { error: authError } = await supabase.auth.updateUser({ email: email.trim() });
    if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

    // Sync to Stripe if the user has a customer record
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (profile?.stripe_customer_id) {
      try {
        await getStripe().customers.update(profile.stripe_customer_id, { email: email.trim() });
      } catch (err) {
        // Non-fatal — Stripe sync failure shouldn't block the email change
        console.error("[account/patch] Stripe email sync failed:", err);
      }
    }

    return NextResponse.json({ emailConfirmationSent: true });
  }

  return NextResponse.json({ success: true });
}

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
