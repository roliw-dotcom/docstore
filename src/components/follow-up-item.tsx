"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations, useLocale } from "next-intl";

interface FollowUp {
  id: string;
  title: string;
  description?: string | null;
  due_date?: string | null;
  completed: boolean;
  reminded: boolean;
}

function DueDatePill({ dueDate }: { dueDate: string | null | undefined }) {
  const t = useTranslations("followUpItem");
  const locale = useLocale();

  if (!dueDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const formatted = due.toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (diffDays < 0) {
    return (
      <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "20px", background: "rgba(239,68,68,0.15)", color: "#FCA5A5", fontWeight: 500 }}>
        {t("overdue", { date: formatted })}
      </span>
    );
  }
  if (diffDays <= 5) {
    return (
      <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "20px", background: "rgba(230,126,34,0.15)", color: "#F5A623", fontWeight: 500 }}>
        {t("dueSoon", { date: formatted })}
      </span>
    );
  }
  return (
    <span style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "20px", background: "rgba(255,255,255,0.08)", color: "#8AAEC7" }}>
      {t("dueDate", { date: formatted })}
    </span>
  );
}

export default function FollowUpItem({ followUp }: { followUp: FollowUp }) {
  const [completed, setCompleted] = useState(followUp.completed);
  const [loading, setLoading] = useState(false);

  async function handleCheck(checked: boolean) {
    setCompleted(checked);
    setLoading(true);
    try {
      const res = await fetch(`/api/follow-ups/${followUp.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: checked }),
      });
      if (!res.ok) setCompleted(!checked);
    } catch {
      setCompleted(!checked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 0", opacity: completed ? 0.45 : 1 }}>
      <Checkbox
        checked={completed}
        disabled={loading}
        onCheckedChange={(val) => handleCheck(val === true)}
        style={{ marginTop: "2px" }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 500, color: completed ? "#6A90AA" : "white", textDecoration: completed ? "line-through" : "none" }}>
            {followUp.title}
          </span>
          {followUp.reminded && (
            <Bell style={{ width: "12px", height: "12px", color: "#6A90AA", flexShrink: 0 }} />
          )}
          <DueDatePill dueDate={followUp.due_date} />
        </div>
        {followUp.description && (
          <p style={{ fontSize: "0.775rem", color: "#6A90AA", marginTop: "2px", lineHeight: 1.55 }}>{followUp.description}</p>
        )}
      </div>
    </div>
  );
}
