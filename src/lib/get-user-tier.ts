import type { SupabaseClient } from "@supabase/supabase-js";

export type Tier = "free" | "pro";

export async function getUserTier(
  userId: string,
  supabase: SupabaseClient
): Promise<Tier> {
  const { data } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", userId)
    .single();

  return (data?.tier as Tier) ?? "free";
}
