"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export default function RenameTitle({
  docId,
  filename,
}: {
  docId: string;
  filename: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(filename);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("renameTitle");

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  async function save() {
    const trimmed = value.trim();
    if (!trimmed || trimmed === filename) {
      setValue(filename);
      setEditing(false);
      return;
    }

    setSaving(true);
    setError("");

    const res = await fetch(`/api/documents/${docId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: trimmed }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to rename.");
      setValue(filename);
    } else {
      setEditing(false);
      router.refresh();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") save();
    if (e.key === "Escape") {
      setValue(filename);
      setEditing(false);
    }
  }

  if (editing) {
    return (
      <div className="space-y-1">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={save}
          disabled={saving}
          style={{ background: "#FFFFFF", border: "1px solid #E67E22", borderRadius: "4px", padding: "2px 8px", color: "#1A1A2E", fontSize: "1.25rem", fontWeight: 700, width: "100%", outline: "none" }}
        />
        {error && <p className="text-xs" style={{ color: "#DC2626" }}>{error}</p>}
        <p className="text-xs" style={{ color: "#6B7280" }}>{t("saveHint")}</p>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="group flex items-center gap-2 text-left"
      title={t("clickToRename")}
    >
      <h1 className="text-xl font-bold truncate" style={{ color: "#1A1A2E" }}>{value}</h1>
      <span className="text-sm flex-shrink-0" style={{ color: "rgba(0,0,0,0.3)" }}>
        ✏️
      </span>
    </button>
  );
}
