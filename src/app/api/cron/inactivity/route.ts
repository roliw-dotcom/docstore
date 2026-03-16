import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { sendInactivityWarningEmail } from "@/lib/send-inactivity-warning-email";

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const querySecret = new URL(request.url).searchParams.get("secret");
  const provided = authHeader?.replace("Bearer ", "") ?? querySecret;

  if (!cronSecret || provided !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://baindly.com";

  const now = new Date();
  const elevenMonthsAgo = new Date(now);
  elevenMonthsAgo.setMonth(elevenMonthsAgo.getMonth() - 11);
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // ── Fetch all auth users (paginated) ──────────────────────────────────────
  const allUsers: { id: string; email: string; last_sign_in_at: Date | null }[] = [];
  let page = 1;
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data?.users?.length) break;
    for (const u of data.users) {
      allUsers.push({
        id: u.id,
        email: u.email ?? "",
        last_sign_in_at: u.last_sign_in_at ? new Date(u.last_sign_in_at) : null,
      });
    }
    if (data.users.length < 1000) break;
    page++;
  }

  // ── Fetch all profiles ────────────────────────────────────────────────────
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, subscription_status, inactivity_warned_at");

  const profileMap = new Map(
    (profiles ?? []).map((p) => [
      p.id,
      {
        subscriptionStatus: p.subscription_status as string | null,
        inactivityWarnedAt: p.inactivity_warned_at
          ? new Date(p.inactivity_warned_at)
          : null,
      },
    ])
  );

  let reset = 0;
  let warned = 0;
  let deleted = 0;
  const errors: string[] = [];

  for (const user of allUsers) {
    // Skip active Pro users
    if (profileMap.get(user.id)?.subscriptionStatus === "active") continue;

    const lastSignIn = user.last_sign_in_at;
    const profile = profileMap.get(user.id);
    const warnedAt = profile?.inactivityWarnedAt ?? null;

    try {
      // ── Pass 1: reset warning if user has signed in since warning was sent ──
      if (warnedAt && lastSignIn && lastSignIn > warnedAt) {
        await supabase
          .from("profiles")
          .update({ inactivity_warned_at: null, updated_at: now.toISOString() })
          .eq("id", user.id);
        reset++;
        continue;
      }

      // ── Pass 2: delete — warned 30+ days ago and still inactive 12+ months ──
      if (
        warnedAt &&
        warnedAt < thirtyDaysAgo &&
        (!lastSignIn || lastSignIn < twelveMonthsAgo)
      ) {
        // Delete storage files
        const { data: docs } = await supabase
          .from("documents")
          .select("storage_path")
          .eq("user_id", user.id);

        if (docs?.length) {
          const paths = docs.map((d) => d.storage_path).filter(Boolean);
          if (paths.length) {
            await supabase.storage.from("documents").remove(paths);
          }
          await supabase.from("documents").delete().eq("user_id", user.id);
        }

        await supabase.from("profiles").delete().eq("id", user.id);
        await supabase.auth.admin.deleteUser(user.id);
        deleted++;
        continue;
      }

      // ── Pass 3: warn — inactive 11+ months and not yet warned ───────────────
      if (!warnedAt && (!lastSignIn || lastSignIn < elevenMonthsAgo)) {
        if (!user.email) continue;
        await sendInactivityWarningEmail({ to: user.email, appUrl });
        await supabase.from("profiles").upsert({
          id: user.id,
          inactivity_warned_at: now.toISOString(),
          updated_at: now.toISOString(),
        });
        warned++;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error(`[cron/inactivity] user ${user.id}:`, msg);
      errors.push(`${user.id}: ${msg}`);
    }
  }

  return NextResponse.json({
    reset,
    warned,
    deleted,
    errors: errors.length ? errors : undefined,
  });
}
