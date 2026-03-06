import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PdfViewer from "@/components/pdf-viewer";
import ReprocessButton from "@/components/reprocess-button";
import DeleteDocumentButton from "@/components/delete-document-button";
import RenameTitle from "@/components/rename-title";
import AutoRefresh from "@/components/auto-refresh";
import FollowUpList from "@/components/follow-up-list";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

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

  // Signed URL for viewing (inline)
  const { data: viewUrl } = await supabase.storage
    .from("documents")
    .createSignedUrl(doc.storage_path, 3600);

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
            {meta?.page_count && <span>· {meta.page_count} pages</span>}
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
                Download
              </Button>
            </a>
          )}
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              ← Back
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Viewer */}
        <div className="lg:col-span-2">
          {viewUrl?.signedUrl ? (
            doc.mime_type?.startsWith("image/") ? (
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewUrl.signedUrl}
                  alt={doc.filename}
                  className="w-full h-auto"
                />
              </div>
            ) : (
              <PdfViewer url={viewUrl.signedUrl} />
            )
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg text-gray-400">
              Could not load document.
            </div>
          )}
        </div>

        {/* Metadata sidebar */}
        <div className="space-y-5">
          {meta?.summary && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Summary</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{meta.summary}</p>
            </div>
          )}

          {meta?.categories && meta.categories.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Categories</h2>
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
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Keywords</h2>
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
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Follow-ups</h2>
              <FollowUpList followUps={followUps} />
            </div>
          )}

          <AutoRefresh active={doc.status === "pending" || doc.status === "processing"} />

          {doc.status === "processing" && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
              Processing… keywords and summary will appear shortly.
            </div>
          )}

          {doc.status === "error" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              Processing failed. The PDF may be scanned or encrypted.
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
