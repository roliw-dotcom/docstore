import { createClient } from "@/lib/supabase/server";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import DocumentList from "@/components/document-list";
import AutoRefresh from "@/components/auto-refresh";
import UpgradeBanner from "@/components/upgrade-banner";
import { getUserTier } from "@/lib/get-user-tier";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const t = await getTranslations("dashboard");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: documents } = await supabase
    .from("documents")
    .select(`*, doc_metadata(keywords, categories, summary)`)
    .order("created_at", { ascending: false });

  const docCount = (documents ?? []).length;
  const hasProcessing = (documents ?? []).some(
    (d) => d.status === "pending" || d.status === "processing"
  );

  const tier = user ? await getUserTier(user.id, supabase) : "free";
  const showBanner = tier === "free" && docCount >= 8;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-white">{t("myDocuments")}</h1>
        <Link href="/dashboard/upload">
          <button style={{ background: "#E67E22", color: "white", border: "none", borderRadius: "6px", padding: "8px 18px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
            {t("uploadDocument")}
          </button>
        </Link>
      </div>

      {showBanner && <UpgradeBanner docCount={docCount} />}

      <AutoRefresh active={hasProcessing} />

      <DocumentList documents={documents ?? []} />
    </div>
  );
}
