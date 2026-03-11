"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface DocumentWithMeta {
  id: string;
  filename: string;
  status: string;
  file_size: number | null;
  created_at: string;
  doc_metadata: {
    keywords: string[];
    categories: string[];
    summary: string | null;
  } | null;
}

function formatBytes(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations("documentCard");
  const labelMap: Record<string, string> = {
    ready: t("ready"),
    processing: t("processing"),
    pending: t("pending"),
    error: t("error"),
  };
  const colorMap: Record<string, { bg: string; color: string }> = {
    ready:      { bg: "rgba(39,174,96,0.15)",  color: "#4ADE80" },
    processing: { bg: "rgba(59,130,246,0.15)",  color: "#93C5FD" },
    pending:    { bg: "rgba(255,255,255,0.08)", color: "#8AAEC7" },
    error:      { bg: "rgba(239,68,68,0.15)",   color: "#FCA5A5" },
  };
  const c = colorMap[status] ?? colorMap.pending;
  return (
    <span style={{
      fontSize: "0.65rem",
      fontFamily: "monospace",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "3px 8px",
      borderRadius: "20px",
      background: c.bg,
      color: c.color,
      flexShrink: 0,
    }}>
      {labelMap[status] ?? status}
    </span>
  );
}

export default function DocumentCard({ doc }: { doc: DocumentWithMeta }) {
  const meta = doc.doc_metadata;

  return (
    <Link href={`/dashboard/documents/${doc.id}`}>
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "16px",
        height: "100%",
        cursor: "pointer",
        transition: "border-color 0.15s, background 0.15s",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
        className="hover:border-[rgba(230,126,34,0.35)] hover:bg-[rgba(255,255,255,0.06)]"
      >
        {/* Title + status */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "white", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {doc.filename}
          </p>
          <StatusBadge status={doc.status} />
        </div>

        {/* Categories */}
        {meta?.categories && meta.categories.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {meta.categories.map((c) => (
              <span key={c} style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "20px", background: "rgba(230,126,34,0.12)", color: "#F5A623", border: "1px solid rgba(230,126,34,0.2)" }}>
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Summary */}
        {meta?.summary && (
          <p style={{ fontSize: "0.8rem", color: "#6A90AA", lineHeight: 1.55, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", flex: 1 }}>
            {meta.summary}
          </p>
        )}

        {/* Keywords */}
        {meta?.keywords && meta.keywords.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {meta.keywords.slice(0, 6).map((kw) => (
              <span key={kw} style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "20px", background: "rgba(255,255,255,0.06)", color: "#6A90AA" }}>
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", marginTop: "auto" }}>
          {new Date(doc.created_at).toLocaleDateString()} · {formatBytes(doc.file_size)}
        </span>
      </div>
    </Link>
  );
}
