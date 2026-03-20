"use client";

import { useTranslations, useLocale } from "next-intl";

interface FollowUp {
  id: string;
  title: string;
  description?: string | null;
  due_date?: string | null;
  completed: boolean;
  documents?: { filename: string } | null;
}

function groupFollowUps(followUps: FollowUp[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 7);

  const endOfMonth = new Date(today);
  endOfMonth.setDate(today.getDate() + 30);

  const overdue: FollowUp[] = [];
  const thisWeek: FollowUp[] = [];
  const thisMonth: FollowUp[] = [];
  const later: FollowUp[] = [];
  const noDueDate: FollowUp[] = [];

  for (const fu of followUps) {
    if (!fu.due_date) { noDueDate.push(fu); continue; }
    const due = new Date(fu.due_date);
    due.setHours(0, 0, 0, 0);
    if (due < today) overdue.push(fu);
    else if (due <= endOfWeek) thisWeek.push(fu);
    else if (due <= endOfMonth) thisMonth.push(fu);
    else later.push(fu);
  }

  return { overdue, thisWeek, thisMonth, later, noDueDate };
}

function TimelineBar({ followUps }: { followUps: FollowUp[] }) {
  const locale = useLocale();

  if (followUps.length === 0) return null;

  const withDates = followUps.filter((fu) => fu.due_date);
  if (withDates.length === 0) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = withDates.map((fu) => new Date(fu.due_date!).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  // Extend range slightly for visual padding
  const rangeStart = new Date(today < minDate ? today : minDate);
  rangeStart.setDate(rangeStart.getDate() - 2);
  const rangeEnd = new Date(maxDate);
  rangeEnd.setDate(rangeEnd.getDate() + 5);
  const totalRange = rangeEnd.getTime() - rangeStart.getTime();

  return (
    <div style={{ position: "relative", height: "40px", marginBottom: "8px" }}>
      {/* baseline */}
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: "1px", background: "rgba(0,0,0,0.1)" }} />

      {/* today marker */}
      {today >= rangeStart && today <= rangeEnd && (() => {
        const pct = ((today.getTime() - rangeStart.getTime()) / totalRange) * 100;
        return (
          <div style={{ position: "absolute", left: `${pct}%`, top: "20%", bottom: "20%", width: "2px", background: "#E67E22", borderRadius: "1px" }} title="Today" />
        );
      })()}

      {/* dots */}
      {withDates.map((fu) => {
        const due = new Date(fu.due_date!);
        due.setHours(0, 0, 0, 0);
        const diffDays = Math.ceil((due.getTime() - today.getTime()) / 86400000);
        const pct = ((due.getTime() - rangeStart.getTime()) / totalRange) * 100;
        const color = diffDays < 0 ? "#DC2626" : diffDays <= 5 ? "#C86A10" : "#9CA3AF";
        const formatted = due.toLocaleDateString(locale === "de" ? "de-DE" : "en-US", { month: "short", day: "numeric" });

        return (
          <div
            key={fu.id}
            title={`${fu.title} — ${formatted}`}
            style={{
              position: "absolute",
              left: `${pct}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: color,
              border: "2px solid #F4F6F8",
              cursor: "default",
              zIndex: 1,
            }}
          />
        );
      })}
    </div>
  );
}

function GroupSection({
  label,
  color,
  items,
}: {
  label: string;
  color: string;
  items: FollowUp[];
}) {
  const locale = useLocale();
  if (items.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ fontSize: "0.65rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color, marginBottom: "2px" }}>
        {label} ({items.length})
      </span>
      {items.map((fu) => {
        const formatted = fu.due_date
          ? new Date(fu.due_date).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", { month: "short", day: "numeric", year: "numeric" })
          : null;
        return (
          <div key={fu.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ fontSize: "0.82rem", color: "#1A1A2E", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {fu.title}
            </span>
            {formatted && (
              <span style={{ fontSize: "0.7rem", color, fontFamily: "monospace", flexShrink: 0 }}>{formatted}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DeadlineTimeline({ followUps }: { followUps: FollowUp[] }) {
  const t = useTranslations("timeline");
  const pending = followUps.filter((fu) => !fu.completed && fu.due_date);

  if (pending.length === 0) return null;

  const { overdue, thisWeek, thisMonth, later } = groupFollowUps(pending);

  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: "10px",
      padding: "16px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      <p style={{ fontSize: "0.7rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280" }}>
        {t("title")}
      </p>

      <TimelineBar followUps={pending} />

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <GroupSection label={t("overdue")}   color="#DC2626" items={overdue} />
        <GroupSection label={t("thisWeek")}  color="#C86A10" items={thisWeek} />
        <GroupSection label={t("thisMonth")} color="#6B7280" items={thisMonth} />
        <GroupSection label={t("later")}     color="rgba(0,0,0,0.3)" items={later} />
      </div>
    </div>
  );
}
