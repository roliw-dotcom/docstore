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
      <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
        {t("overdue", { date: formatted })}
      </span>
    );
  }
  if (diffDays <= 5) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-medium">
        {t("dueSoon", { date: formatted })}
      </span>
    );
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
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

      if (!res.ok) {
        setCompleted(!checked);
      }
    } catch {
      setCompleted(!checked);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`flex items-start gap-3 py-3 ${completed ? "opacity-50" : ""}`}>
      <Checkbox
        checked={completed}
        disabled={loading}
        onCheckedChange={(val) => handleCheck(val === true)}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-sm font-medium ${completed ? "line-through text-gray-400" : "text-gray-800"}`}>
            {followUp.title}
          </span>
          {followUp.reminded && (
            <Bell className="w-3 h-3 text-gray-400 flex-shrink-0" />
          )}
          <DueDatePill dueDate={followUp.due_date} />
        </div>
        {followUp.description && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{followUp.description}</p>
        )}
      </div>
    </div>
  );
}
