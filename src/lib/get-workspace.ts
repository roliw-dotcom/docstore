import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns the workspace_id of the user's personal (owner) workspace.
 * In the current single-workspace model every user has exactly one.
 * When multi-workspace is added, callers will pass an explicit workspace slug.
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

  return data?.workspace_id ?? null;
}
