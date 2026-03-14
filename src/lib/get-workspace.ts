import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * Returns the workspace_id of the user's personal (owner) workspace.
 * Auto-creates one via the admin client if it doesn't exist yet
 * (e.g. users created before the workspace migration was run).
 */
export async function getWorkspaceId(
  supabase: SupabaseClient,
  userId: string
): Promise<string | null> {
  const { data } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", userId)
    .eq("role", "owner")
    .single();

  if (data?.workspace_id) return data.workspace_id;

  // No workspace found — auto-create a personal one using the admin client
  // (bypasses RLS so this works even before the SQL migration is run)
  const { data: ws, error: wsErr } = await supabaseAdmin
    .from("workspaces")
    .insert({ name: "Personal", owner_id: userId })
    .select("id")
    .single();

  if (wsErr || !ws) {
    console.error("Failed to auto-create workspace:", wsErr);
    return null;
  }

  const { error: memErr } = await supabaseAdmin
    .from("workspace_members")
    .insert({ workspace_id: ws.id, user_id: userId, role: "owner" });

  if (memErr) {
    console.error("Failed to create workspace membership:", memErr);
    return null;
  }

  return ws.id;
}
