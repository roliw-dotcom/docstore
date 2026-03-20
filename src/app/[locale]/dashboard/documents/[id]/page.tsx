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
    ready:      { bg: "rgba(39,174,96,0.15)",  color: "#4ADE80" },
    processing: { bg: "rgba(59,130,246,0.15)",  color: "#93C5FD" },
    pending:    { bg: "rgba(255,255,255,0.08)", color: "#8AAEC7" },
    error:      { bg: "rgba(239,68,68,0.15)",   color: "#FCA5A5" },
  };
  const sc = statusColors[doc.status] ?? statusColors.pending;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <RenameTitle docId={doc.id} filename={doc.filename} />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginTop: "6px" }}>
            <span style={{ fontSize: "0.8rem", color: "#6A90AA" }}>{new Date(doc.created_at).toLocaleDateString()}</span>
            {meta?.page_count && <span style={{ fontSize: "0.8rem", color: "#6A90AA" }}>{t("pages", { count: meta.page_count })}</span>}
            <span style={{ fontSize: "0.65rem", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: "20px", background: sc.bg, color: sc.color }}>
              {doc.status}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {downloadUrl?.signedUrl && (
            <a href={downloadUrl.signedUrl} download={doc.filename}>
              <button style={{ fontSize: "0.8rem", color: "#8AAEC7", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "10px 16px", background: "transparent", cursor: "pointer" }}>
                {t("download")}
              </button>
            </a>
          )}
          <Link href="/dashboard">
            <button style={{ fontSize: "0.8rem", color: "#8AAEC7", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "10px 16px", background: "transparent", cursor: "pointer" }}>
              {t("back")}
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Viewer */}
        <div className="lg:col-span-2">
          {doc.mime_type?.startsWith("image/") ? (
            <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/documents/${doc.id}/file`} alt={doc.filename} className="w-full h-auto" />
            </div>
          ) : doc.mime_type === "application/pdf" ? (
            <PdfViewer url={`/api/documents/${doc.id}/file`} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "256px", gap: "12px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", color: "#6A90AA" }}>
              <span style={{ fontSize: "2.5rem" }}>📄</span>
              <p style={{ fontSize: "0.875rem" }}>Preview not available — use the Download button to open this file.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {meta?.summary && (
            <div>
              <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A90AA", marginBottom: "8px" }}>{t("summary")}</h2>
              <p style={{ fontSize: "0.875rem", color: "#8AAEC7", lineHeight: 1.65 }}>{meta.summary}</p>
            </div>
          )}

          {meta?.categories && meta.categories.length > 0 && (
            <div>
              <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A90AA", marginBottom: "8px" }}>{t("categories")}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {meta.categories.map((c: string) => (
                  <span key={c} style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "20px", background: "rgba(230,126,34,0.12)", color: "#F5A623", border: "1px solid rgba(230,126,34,0.2)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {meta?.keywords && meta.keywords.length > 0 && (
            <div>
              <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A90AA", marginBottom: "8px" }}>{t("keywords")}</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {meta.keywords.map((kw: string) => (
                  <span key={kw} style={{ fontSize: "0.72rem", padding: "3px 10px", borderRadius: "20px", background: "rgba(255,255,255,0.06)", color: "#6A90AA" }}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {followUps && followUps.length > 0 && (
            <div>
              <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A90AA", marginBottom: "8px" }}>{t("followUps")}</h2>
              <FollowUpList followUps={followUps} />
            </div>
          )}

          <AutoRefresh active={doc.status === "pending" || doc.status === "processing"} />

          {doc.status === "processing" && (
            <div style={{ padding: "12px 14px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", fontSize: "0.875rem", color: "#93C5FD" }}>
              {t("processing")}
            </div>
          )}

          {doc.status === "error" && (
            <div style={{ padding: "12px 14px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", fontSize: "0.875rem", color: "#FCA5A5" }}>
              {t("processingError")}
            </div>
          )}

          <ReprocessButton docId={doc.id} />

          <div style={{ paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <DeleteDocumentButton docId={doc.id} filename={doc.filename} />
          </div>
        </div>
      </div>
    </div>
  );
}
