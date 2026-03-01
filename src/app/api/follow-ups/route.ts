import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const pendingOnly = searchParams.get("pending") === "true";

  let query = supabase
    .from("follow_ups")
    .select(`*, documents(filename)`)
    .eq("user_id", user.id)
    .order("due_date", { ascending: true, nullsFirst: false });

  if (pendingOnly) {
    query = query.eq("completed", false);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
