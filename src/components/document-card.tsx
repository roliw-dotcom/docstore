"use client";

import { Link } from "@/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    ready: "default",
    processing: "secondary",
    pending: "outline",
    error: "destructive",
  };
  const labelMap: Record<string, string> = {
    ready: t("ready"),
    processing: t("processing"),
    pending: t("pending"),
    error: t("error"),
  };
  return (
    <Badge variant={variants[status] ?? "outline"}>
      {labelMap[status] ?? status}
    </Badge>
  );
}

export default function DocumentCard({ doc }: { doc: DocumentWithMeta }) {
  const meta = doc.doc_metadata;

  return (
    <Link href={`/dashboard/documents/${doc.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base font-medium leading-snug line-clamp-2">
              {doc.filename}
            </CardTitle>
            <StatusBadge status={doc.status} />
          </div>
          {meta?.categories && meta.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {meta.categories.map((c) => (
                <Badge key={c} variant="secondary" className="text-xs">
                  {c}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>

        {meta?.summary && (
          <CardContent className="pb-2">
            <p className="text-sm text-gray-500 line-clamp-3">{meta.summary}</p>
          </CardContent>
        )}

        <CardFooter className="flex flex-col items-start gap-2 pt-2">
          {meta?.keywords && meta.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {meta.keywords.slice(0, 6).map((kw) => (
                <span
                  key={kw}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
          <span className="text-xs text-gray-400">
            {new Date(doc.created_at).toLocaleDateString()} · {formatBytes(doc.file_size)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
