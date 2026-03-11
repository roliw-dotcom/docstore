"use client";

import { useMemo, useState } from "react";
import DocumentCard from "@/components/document-card";
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

export default function DocumentList({ documents }: { documents: DocumentWithMeta[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const t = useTranslations("documentList");

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    documents.forEach((d) => d.doc_metadata?.categories?.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [documents]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return documents.filter((d) => {
      const meta = d.doc_metadata;
      if (activeCategory && !meta?.categories?.includes(activeCategory)) return false;
      if (!q) return true;
      return (
        d.filename.toLowerCase().includes(q) ||
        meta?.summary?.toLowerCase().includes(q) ||
        meta?.keywords?.some((k) => k.toLowerCase().includes(q)) ||
        meta?.categories?.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [documents, search, activeCategory]);

  if (documents.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "#6A90AA" }}>
        <p style={{ fontSize: "2.5rem", marginBottom: "16px" }}>📄</p>
        <p style={{ fontSize: "1rem", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>{t("noDocuments")}</p>
        <p style={{ fontSize: "0.875rem", marginTop: "4px" }}>{t("noDocumentsHint")}</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Search */}
      <input
        placeholder={t("searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          maxWidth: "480px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "7px",
          padding: "9px 14px",
          color: "white",
          fontSize: "0.875rem",
          outline: "none",
        }}
      />

      {/* Category pills */}
      {allCategories.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              fontSize: "0.8rem",
              padding: "4px 14px",
              borderRadius: "20px",
              border: "1px solid",
              cursor: "pointer",
              transition: "all 0.15s",
              background: activeCategory === null ? "#E67E22" : "transparent",
              borderColor: activeCategory === null ? "#E67E22" : "rgba(255,255,255,0.2)",
              color: activeCategory === null ? "white" : "#8AAEC7",
            }}
          >
            {t("all")}
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              style={{
                fontSize: "0.8rem",
                padding: "4px 14px",
                borderRadius: "20px",
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.15s",
                background: activeCategory === cat ? "#E67E22" : "transparent",
                borderColor: activeCategory === cat ? "#E67E22" : "rgba(255,255,255,0.2)",
                color: activeCategory === cat ? "white" : "#8AAEC7",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
        {t("resultsCount", { filtered: filtered.length, total: documents.length })}
      </p>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#6A90AA" }}>
          <p>{t("noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
