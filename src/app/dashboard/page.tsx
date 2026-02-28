import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DocumentList from "@/components/document-list";
import AutoRefresh from "@/components/auto-refresh";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: documents } = await supabase
    .from("documents")
    .select(`*, doc_metadata(keywords, categories, summary)`)
    .order("created_at", { ascending: false });

  const hasProcessing = (documents ?? []).some(
    (d) => d.status === "pending" || d.status === "processing"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <Link href="/dashboard/upload">
          <Button>Upload Document</Button>
        </Link>
      </div>

      <AutoRefresh active={hasProcessing} />

      <DocumentList documents={documents ?? []} />
    </div>
  );
}
