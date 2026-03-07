"use client";

import { useMemo, useState } from "react";
import DocumentCard from "@/components/document-card";
import { Input } from "@/components/ui/input";
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

  // Collect all unique categories across documents
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    documents.forEach((d) =>
      d.doc_metadata?.categories?.forEach((c) => set.add(c))
    );
    return Array.from(set).sort();
  }, [documents]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return documents.filter((d) => {
      const meta = d.doc_metadata;

      if (activeCategory && !meta?.categories?.includes(activeCategory)) {
        return false;
      }

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
      <div className="text-center py-20 text-gray-400">
        <p className="text-4xl mb-4">📄</p>
        <p className="text-lg font-medium">{t("noDocuments")}</p>
        <p className="text-sm mt-1">{t("noDocumentsHint")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Search bar */}
      <Input
        placeholder={t("searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-lg"
      />

      {/* Category filter pills */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-sm px-3 py-1 rounded-full border transition-colors ${
              activeCategory === null
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-300 text-gray-600 hover:border-gray-500"
            }`}
          >
            {t("all")}
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-300 text-gray-600 hover:border-gray-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-gray-400">
        {t("resultsCount", { filtered: filtered.length, total: documents.length })}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
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
