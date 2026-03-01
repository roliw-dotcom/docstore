import { createClient } from "@/lib/supabase/server";
import FollowUpList from "@/components/follow-up-list";
import FollowUpsFilter from "@/components/follow-ups-filter";

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

  let query = supabase
    .from("follow_ups")
    .select(`*, documents(filename)`)
    .order("due_date", { ascending: true, nullsFirst: false });

  if (pendingOnly) {
    query = query.eq("completed", false);
  }

  const { data: allFollowUps } = await query;
  const followUps: FollowUp[] = allFollowUps ?? [];

  const pending = followUps.filter((fu) => !fu.completed);
  const completed = followUps.filter((fu) => fu.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Follow-ups</h1>
          <p className="text-sm text-gray-500 mt-1">
            Action items and deadlines extracted from your documents
          </p>
        </div>
        <FollowUpsFilter current={filter} />
      </div>

      {followUps.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No follow-ups yet.</p>
          <p className="text-sm mt-1">
            Upload and process documents to automatically extract action items.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {(!pendingOnly || pending.length > 0) && (
            <section>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Pending{" "}
                <span className="font-normal text-gray-400">({pending.length})</span>
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg px-4">
                <FollowUpList
                  followUps={pending}
                  showFilename
                  emptyMessage="All caught up!"
                />
              </div>
            </section>
          )}

          {!pendingOnly && completed.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Completed{" "}
                <span className="font-normal text-gray-400">({completed.length})</span>
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg px-4">
                <FollowUpList followUps={completed} showFilename />
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
