import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { sendReminderEmail } from "@/lib/send-reminder-email";

// Service-role client — bypasses RLS, can read auth.users
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function POST(request: NextRequest) {
  // Verify cron secret — accept Authorization header or ?secret= query param
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const querySecret = new URL(request.url).searchParams.get("secret");
  const provided = authHeader?.replace("Bearer ", "") ?? querySecret;

  if (!cronSecret || provided !== cronSecret) {
    return NextResponse.json({
      error: "Unauthorized",
      debug: { secretSet: !!cronSecret, secretLen: cronSecret?.length, providedLen: provided?.length },
    }, { status: 401 });
  }

  // Use service-role client for all DB operations (no user session in cron context)
  const serviceClient = createServiceClient();

  // Find all incomplete, unreminded follow-ups due within the next 5 days
  const today = new Date();
  const in5Days = new Date(today);
  in5Days.setDate(today.getDate() + 5);
  const cutoff = in5Days.toISOString().split("T")[0];

  const { data: followUps, error } = await serviceClient
    .from("follow_ups")
    .select(`*, documents(filename)`)
    .eq("completed", false)
    .eq("reminded", false)
    .lte("due_date", cutoff)
    .not("due_date", "is", null);

  if (error) {
    console.error("[cron/reminders] query error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!followUps || followUps.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  let sent = 0;
  const errors: string[] = [];

  for (const fu of followUps) {
    try {
      // Get user email via service role
      const { data: userData, error: userError } = await serviceClient.auth.admin.getUserById(fu.user_id);

      if (userError || !userData?.user?.email) {
        errors.push(`No email for user ${fu.user_id}`);
        continue;
      }

      const filename = (fu.documents as { filename: string } | null)?.filename ?? "Unknown document";

      await sendReminderEmail({
        to: userData.user.email,
        title: fu.title,
        description: fu.description,
        dueDate: fu.due_date,
        filename,
      });

      // Mark as reminded
      await serviceClient
        .from("follow_ups")
        .update({ reminded: true })
        .eq("id", fu.id);

      sent++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      console.error(`[cron/reminders] follow-up ${fu.id}:`, msg);
      errors.push(`${fu.id}: ${msg}`);
    }
  }

  return NextResponse.json({ sent, errors: errors.length > 0 ? errors : undefined });
}
