import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("tier, subscription_status, current_period_end")
    .eq("id", user.id)
    .single();

  return NextResponse.json(profile ?? { tier: "free", subscription_status: null, current_period_end: null });
}
