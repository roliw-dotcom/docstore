import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Link } from "@/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  // Signed URL for downloading (forces Content-Disposition: attachment)
  const { data: downloadUrl } = await supabase.storage
    .from("documents")
    .createSignedUrl(doc.storage_path, 3600, { download: doc.filename });

  const meta = doc.doc_metadata;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <RenameTitle docId={doc.id} filename={doc.filename} />
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>{new Date(doc.created_at).toLocaleDateString()}</span>
            {meta?.page_count && <span>{t("pages", { count: meta.page_count })}</span>}
            <Badge
              variant={
                doc.status === "ready"
                  ? "default"
                  : doc.status === "error"
                  ? "destructive"
                  : "secondary"
              }
            >
              {doc.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {downloadUrl?.signedUrl && (
            <a href={downloadUrl.signedUrl} download={doc.filename}>
              <Button variant="outline" size="sm">
                {t("download")}
              </Button>
            </a>
          )}
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              {t("back")}
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Viewer */}
        <div className="lg:col-span-2">
          {doc.mime_type?.startsWith("image/") ? (
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/documents/${doc.id}/file`}
                alt={doc.filename}
                className="w-full h-auto"
              />
            </div>
          ) : doc.mime_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500">
              <span className="text-4xl">📝</span>
              <p className="text-sm">Word document — use the Download button to open it.</p>
            </div>
          ) : (
            <PdfViewer url={`/api/documents/${doc.id}/file`} />
          )}
        </div>

        {/* Metadata sidebar */}
        <div className="space-y-5">
          {meta?.summary && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">{t("summary")}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{meta.summary}</p>
            </div>
          )}

          {meta?.categories && meta.categories.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">{t("categories")}</h2>
              <div className="flex flex-wrap gap-2">
                {meta.categories.map((c: string) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {meta?.keywords && meta.keywords.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">{t("keywords")}</h2>
              <div className="flex flex-wrap gap-1.5">
                {meta.keywords.map((kw: string) => (
                  <span
                    key={kw}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {followUps && followUps.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">{t("followUps")}</h2>
              <FollowUpList followUps={followUps} />
            </div>
          )}

          <AutoRefresh active={doc.status === "pending" || doc.status === "processing"} />

          {doc.status === "processing" && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
              {t("processing")}
            </div>
          )}

          {doc.status === "error" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {t("processingError")}
            </div>
          )}

          <ReprocessButton docId={doc.id} />

          <div className="pt-2 border-t border-gray-100">
            <DeleteDocumentButton docId={doc.id} filename={doc.filename} />
          </div>
        </div>
      </div>
    </div>
  );
}
