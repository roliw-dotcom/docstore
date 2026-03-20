import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Link } from "@/navigation";
import { Badge } from "@/components/ui/badge";
import PdfViewer from "@/components/pdf-viewer";
import ReprocessButton from "@/components/reprocess-button";
import DeleteDocumentButton from "@/components/delete-document-button";
import RenameTitle from "@/components/rename-title";
import AutoRefresh from "@/components/auto-refresh";
import FollowUpList from "@/components/follow-up-list";
import { getTranslations } from "next-intl/server";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const t = await getTranslations("documents");

  const { data: doc } = await supabase
    .from("documents")
    .select(`*, doc_metadata(*)`)
    .eq("id", id)
    .single();

  const { data: followUps } = await supabase
    .from("follow_ups")
    .select("*")
    .eq("doc_id", id)
    .order("due_date", { ascending: true, nullsFirst: false });

  if (!doc) notFound();

  const { data: downloadUrl } = await supabase.storage
    .from("documents")
    .createSignedUrl(doc.storage_path, 3600, { download: doc.filename });

  const meta = doc.doc_metadata;

  const statusColors: Record<string, { bg: string; color: string }> = {
    ready:      { bg: "rgba(22,163,74,0.1)",   color: "#16A34A" },
    processing: { bg: "rgba(37,99,235,0.1)",   color: "#2563EB" },
    pending:    { bg: "rgba(0,0,0,0.06)",       color: "#6B7280" },
    error:      { bg: "rgba(220,38,38,0.1)",   color: "#DC2626" },
  };
  const sc = statusColors[doc.status] ?? statusColors.pending;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <RenameTitle docId={doc.id} filename={doc.filename} />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginTop: "6px" }}>
            <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>{new Date(doc.created_at).toLocaleDateString()}</span>
            {meta?.page_count && <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>{t("pages", { count: meta.page_count })}</span>}
            <span style={{ fontSize: "0.65rem", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: "20px", background: sc.bg, color: sc.color }}>
              {doc.status}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {downloadUrl?.signedUrl && (
            <a href={downloadUrl.signedUrl} download={doc.filename}>
              <button style={{ fontSize: "0.8rem", color: "#6B7280", border: "1px solid rgba(0,0,0,0.14)", borderRadius: "6px", padding: "10px 16px", background: "transparent", cursor: "pointer" }}>
                {t("download")}
              </button>
            </a>
          )}
          <Link href="/dashboard">
            <button style={{ fontSize: "0.8rem", color: "#6B7280", border: "1px solid rgba(0,0,0,0.14)", borderRadius: "6px", padding: "10px 16px", background: "transparent", cursor: "pointer" }}>
              {t("back")}
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Viewer */}
        <div className="lg:col-span-2">
          {doc.mime_type?.startsWith("image/") ? (
            <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", background: "#FFFFFF" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/documents/${doc.id}/file`} alt={doc.filename} className="w-full h-auto" />
            </div>
          ) : doc.mime_type === "application/pdf" ? (
            <PdfViewer url={`/api/documents/${doc.id}/file`} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "256px", gap: "12px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.08)", background: "#FFFFFF", color: "#9CA3AF" }}>
              <span style={{ fontSize: "2.5rem" }}>📄</span>
              <p style={{ fontSize: "0.875rem" }}>Preview not available — use the Download button to open this file.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {meta?.summary && (
            <div>
              <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280", marginBottom: "8px" }}>{t("summary")}</h2>
              <p style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.65 }}>{meta.summary}</p>
            </div>
          )}

          {meta?.categories && meta.categories.length > 0 && (
            <div>
              <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280", marginBottom: "8px" }}>{t("categories")}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {meta.categories.map((c: string) => (
                  <span key={c} style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "20px", background: "rgba(230,126,34,0.1)", color: "#C86A10", border: "1px solid rgba(230,126,34,0.25)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {meta?.keywords && meta.keywords.length > 0 && (
            <div>
              <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280", marginBottom: "8px" }}>{t("keywords")}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {meta.keywords.map((kw: string) => (
                  <span key={kw} style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "20px", background: "rgba(0,0,0,0.05)", color: "#6B7280" }}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {followUps && followUps.length > 0 && (
            <div>
              <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7280", marginBottom: "8px" }}>{t("followUps")}</h2>
              <FollowUpList followUps={followUps} />
            </div>
          )}

          <AutoRefresh active={doc.status === "pending" || doc.status === "processing"} />

          {doc.status === "processing" && (
            <div style={{ padding: "12px 14px", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "8px", fontSize: "0.875rem", color: "#2563EB" }}>
              {t("processing")}
            </div>
          )}

          {doc.status === "error" && (
            <div style={{ padding: "12px 14px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "8px", fontSize: "0.875rem", color: "#DC2626" }}>
              {t("processingError")}
            </div>
          )}

          <ReprocessButton docId={doc.id} />

          <div style={{ paddingTop: "8px", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
            <DeleteDocumentButton docId={doc.id} filename={doc.filename} />
          </div>
        </div>
      </div>
    </div>
  );
}
