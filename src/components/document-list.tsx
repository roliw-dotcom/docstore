"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter, Link } from "@/navigation";
import DocumentCard from "@/components/document-card";
import { useTranslations } from "next-intl";

const PALETTE = ["#E67E22","#3498DB","#2ECC71","#9B59B6","#E74C3C","#1ABC9C","#F39C12","#E91E63"];

export interface Collection {
  id: string;
  name: string;
  color: string;
}

interface DocumentWithMeta {
  id: string;
  filename: string;
  status: string;
  file_size: number | null;
  created_at: string;
  collection_id: string | null;
  doc_metadata: {
    keywords: string[];
    categories: string[];
    summary: string | null;
  } | null;
}

export default function DocumentList({
  documents,
  collections: initialCollections,
}: {
  documents: DocumentWithMeta[];
  collections: Collection[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const router = useRouter();
  const t = useTranslations("documentList");
  const tc = useTranslations("collections");

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    documents.forEach((d) => d.doc_metadata?.categories?.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [documents]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return documents.filter((d) => {
      const meta = d.doc_metadata;
      if (activeCollection && d.collection_id !== activeCollection) return false;
      if (activeCategory && !meta?.categories?.includes(activeCategory)) return false;
      if (!q) return true;
      return (
        d.filename.toLowerCase().includes(q) ||
        meta?.summary?.toLowerCase().includes(q) ||
        meta?.keywords?.some((k) => k.toLowerCase().includes(q)) ||
        meta?.categories?.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [documents, search, activeCategory, activeCollection]);

  const createCollection = useCallback(async () => {
    const name = newName.trim();
    if (!name) return;
    const color = PALETTE[collections.length % PALETTE.length];
    const res = await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, color }),
    });
    if (res.ok) {
      const { collection } = await res.json();
      setCollections((prev) => [...prev, collection]);
      setNewName("");
      setCreating(false);
      router.refresh();
    }
  }, [newName, collections.length, router]);

  const deleteCollection = useCallback(async (id: string) => {
    await fetch(`/api/collections/${id}`, { method: "DELETE" });
    setCollections((prev) => prev.filter((c) => c.id !== id));
    if (activeCollection === id) setActiveCollection(null);
    router.refresh();
  }, [activeCollection, router]);

  if (documents.length === 0) {
    return (
      <div style={{ maxWidth: "540px", margin: "48px auto 0" }}>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "clamp(28px, 5vw, 44px)",
          textAlign: "center",
        }}>
          {/* Icon */}
          <div style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: "rgba(230,126,34,0.12)",
            border: "1px solid rgba(230,126,34,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "1.4rem",
          }}>
            ✦
          </div>

          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "1.25rem",
            color: "white",
            marginBottom: "8px",
          }}>
            {t("noDocuments")}
          </h2>
          <p style={{
            fontSize: "0.875rem",
            color: "#6A90AA",
            marginBottom: "36px",
            lineHeight: 1.65,
          }}>
            {t("noDocumentsHint")}
          </p>

          {/* Steps */}
          <div style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "32px",
          }}>
            {[
              { n: "1", title: "Upload any document", body: "PDF, DOCX, lease, insurance, school letter — anything up to 20 MB" },
              { n: "2", title: "AI reads every clause", body: "Deadlines, obligations, and action items extracted automatically" },
              { n: "3", title: "Get reminded on time", body: "Email reminder 5 days before every deadline, so nothing slips" },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "rgba(230,126,34,0.13)",
                  border: "1px solid rgba(230,126,34,0.28)",
                  color: "#E67E22",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "monospace",
                }}>
                  {n}
                </span>
                <div>
                  <p style={{ fontSize: "0.875rem", color: "white", fontWeight: 500, marginBottom: "2px" }}>{title}</p>
                  <p style={{ fontSize: "0.78rem", color: "#6A90AA", lineHeight: 1.55 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/dashboard/upload">
            <button style={{
              background: "#E67E22",
              color: "white",
              border: "none",
              borderRadius: "7px",
              padding: "12px 26px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(230,126,34,0.28)",
            }}>
              Upload your first document →
            </button>
          </Link>

          <p style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.18)",
            marginTop: "14px",
            fontFamily: "monospace",
          }}>
            PDF · DOCX · XLSX · Images · Text files
          </p>
        </div>
      </div>
    );
  }

  const pillStyle = (active: boolean, color?: string) => ({
    fontSize: "0.8rem",
    padding: "4px 12px",
    borderRadius: "20px",
    border: "1px solid",
    cursor: "pointer" as const,
    transition: "all 0.15s",
    background: active ? (color ?? "#E67E22") : "transparent",
    borderColor: active ? (color ?? "#E67E22") : "rgba(255,255,255,0.2)",
    color: active ? "white" : "#8AAEC7",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Search */}
      <input
        placeholder={t("searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
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

      {/* Collections */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "0.65rem", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginRight: "2px" }}>
          {tc("label")}
        </span>
        <button onClick={() => setActiveCollection(null)} style={pillStyle(activeCollection === null)}>
          {t("all")}
        </button>
        {collections.map((col) => (
          <div key={col.id} style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <button
              onClick={() => setActiveCollection(activeCollection === col.id ? null : col.id)}
              style={pillStyle(activeCollection === col.id, col.color)}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: col.color, flexShrink: 0, opacity: activeCollection === col.id ? 0.8 : 1 }} />
              {col.name}
            </button>
            <button
              onClick={() => deleteCollection(col.id)}
              title={tc("delete")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", padding: "0 2px 0 1px", lineHeight: 1 }}
            >
              ×
            </button>
          </div>
        ))}

        {creating ? (
          <form
            onSubmit={(e) => { e.preventDefault(); createCollection(); }}
            style={{ display: "flex", gap: "6px", alignItems: "center" }}
          >
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setCreating(false)}
              placeholder={tc("namePlaceholder")}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                padding: "3px 12px",
                color: "white",
                fontSize: "0.8rem",
                outline: "none",
                width: "130px",
              }}
            />
            <button type="submit" style={{ fontSize: "0.75rem", color: "#E67E22", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
              {tc("create")}
            </button>
            <button type="button" onClick={() => setCreating(false)} style={{ fontSize: "0.75rem", color: "#6A90AA", background: "none", border: "none", cursor: "pointer" }}>
              {tc("cancel")}
            </button>
          </form>
        ) : (
          <button
            onClick={() => setCreating(true)}
            style={{ fontSize: "0.78rem", color: "#6A90AA", background: "none", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: "20px", padding: "4px 12px", cursor: "pointer" }}
          >
            + {tc("new")}
          </button>
        )}
      </div>

      {/* Category pills */}
      {allCategories.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.65rem", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginRight: "2px" }}>
            {t("category")}
          </span>
          <button onClick={() => setActiveCategory(null)} style={pillStyle(activeCategory === null)}>
            {t("all")}
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              style={pillStyle(activeCategory === cat)}
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
          {filtered.map((doc, idx) => (
            <div
              key={doc.id}
              style={{
                animation: "cardEnter 0.35s ease both",
                animationDelay: `${Math.min(idx * 0.05, 0.4)}s`,
              }}
            >
              <DocumentCard doc={doc} collections={collections} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
