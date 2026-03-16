import { createClient } from "@/lib/supabase/server";
import FollowUpList from "@/components/follow-up-list";
import FollowUpsFilter from "@/components/follow-ups-filter";
import DeadlineTimeline from "@/components/deadline-timeline";
import { getTranslations } from "next-intl/server";

interface FollowUp {
  id: string;
  doc_id: string;
  title: string;
  description?: string | null;
  due_date?: string | null;
  completed: boolean;
  reminded: boolean;
  documents?: { filename: string } | null;
}

export default async function FollowUpsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const pendingOnly = filter === "pending";

  const supabase = await createClient();
  const t = await getTranslations("followUps");

  let query = supabase
    .from("follow_ups")
    .select(`*, documents(filename)`)
    .order("due_date", { ascending: true, nullsFirst: false });

  if (pendingOnly) query = query.eq("completed", false);

  const { data: allFollowUps } = await query;
  const followUps: FollowUp[] = allFollowUps ?? [];
  const pending = followUps.filter((fu) => !fu.completed);
  const completed = followUps.filter((fu) => fu.completed);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 className="font-serif text-2xl text-white">{t("title")}</h1>
          <p style={{ fontSize: "0.875rem", color: "#6A90AA", marginTop: "4px" }}>{t("subtitle")}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a
            href="/api/follow-ups/ics"
            download="baindly-deadlines.ics"
            style={{
              fontSize: "0.75rem",
              color: "#6A90AA",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "6px",
              padding: "6px 12px",
              textDecoration: "none",
              fontFamily: "monospace",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            ↓ {t("exportCalendar")}
          </a>
          <FollowUpsFilter current={filter} />
        </div>
      </div>

      {followUps.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 0", color: "#6A90AA" }}>
          <p style={{ fontSize: "1rem" }}>{t("noFollowUps")}</p>
          <p style={{ fontSize: "0.875rem", marginTop: "4px" }}>{t("noFollowUpsHint")}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <DeadlineTimeline followUps={followUps} />

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {(!pendingOnly || pending.length > 0) && (
              <section>
                <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A90AA", marginBottom: "10px" }}>
                  {t("pending")} <span style={{ color: "rgba(255,255,255,0.25)" }}>({pending.length})</span>
                </h2>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "0 16px" }}>
                  <FollowUpList followUps={pending} showFilename emptyMessage={t("allCaughtUp")} />
                </div>
              </section>
            )}

            {!pendingOnly && completed.length > 0 && (
              <section>
                <h2 style={{ fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A90AA", marginBottom: "10px" }}>
                  {t("completed")} <span style={{ color: "rgba(255,255,255,0.25)" }}>({completed.length})</span>
                </h2>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "0 16px" }}>
                  <FollowUpList followUps={completed} showFilename />
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
