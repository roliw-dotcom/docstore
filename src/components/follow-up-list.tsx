import FollowUpItem from "@/components/follow-up-item";
import { useTranslations } from "next-intl";

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

interface Props {
  followUps: FollowUp[];
  showFilename?: boolean;
  emptyMessage?: string;
}

export default function FollowUpList({ followUps, showFilename = false, emptyMessage }: Props) {
  const t = useTranslations("followUpList");
  const empty = emptyMessage ?? t("defaultEmpty");

  if (followUps.length === 0) {
    return <p style={{ fontSize: "0.875rem", color: "#6A90AA", padding: "16px 0" }}>{empty}</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {followUps.map((fu, idx) => (
        <div key={fu.id} style={{ borderTop: idx > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
          {showFilename && fu.documents?.filename && (
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", paddingTop: "12px", paddingBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {t("from", { filename: fu.documents.filename })}
            </p>
          )}
          <FollowUpItem followUp={fu} />
        </div>
      ))}
    </div>
  );
}
