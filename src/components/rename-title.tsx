"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

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
          className="text-xl font-bold text-gray-900 bg-white border border-blue-400 rounded px-2 py-0.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <p className="text-xs text-gray-400">Enter to save · Esc to cancel</p>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="group flex items-center gap-2 text-left"
      title="Click to rename"
    >
      <h1 className="text-xl font-bold text-gray-900 truncate">{value}</h1>
      <span className="text-gray-300 group-hover:text-gray-500 transition-colors text-sm flex-shrink-0">
        ✏️
      </span>
    </button>
  );
}
