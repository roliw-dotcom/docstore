import FollowUpItem from "@/components/follow-up-item";

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

export default function FollowUpList({
  followUps,
  showFilename = false,
  emptyMessage = "No follow-ups found.",
}: Props) {
  if (followUps.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-4">{emptyMessage}</p>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {followUps.map((fu) => (
        <div key={fu.id}>
          {showFilename && fu.documents?.filename && (
            <p className="text-xs text-gray-400 pt-3 pb-0.5 truncate">
              From: {fu.documents.filename}
            </p>
          )}
          <FollowUpItem followUp={fu} />
        </div>
      ))}
    </div>
  );
}
