import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function escapeIcs(str: string) {
  return str.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function toIcsDate(dateStr: string) {
  // YYYY-MM-DD → YYYYMMDD (all-day event)
  return dateStr.replace(/-/g, "");
}

function toIcsDatetime(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("follow_ups")
    .select("*, documents(filename)")
    .eq("user_id", user.id)
    .eq("completed", false)
    .not("due_date", "is", null)
    .order("due_date", { ascending: true });

  const followUps = data ?? [];
  const now = toIcsDatetime(new Date());

  const vevents = followUps.map((fu) => {
    const uid = `${fu.id}@baindly`;
    const dtstart = toIcsDate(fu.due_date!);
    const dtend = toIcsDate(fu.due_date!); // same-day all-day event
    const summary = escapeIcs(fu.title);
    const description = fu.description ? escapeIcs(fu.description) : "";
    const source = fu.documents?.filename ? ` — ${escapeIcs(fu.documents.filename)}` : "";

    return [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      `SUMMARY:${summary}${source}`,
      description ? `DESCRIPTION:${description}` : null,
      "END:VEVENT",
    ]
      .filter(Boolean)
      .join("\r\n");
  });

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//bAIndly//bAIndly//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:bAIndly Deadlines",
    ...vevents,
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="baindly-deadlines.ics"',
    },
  });
}
