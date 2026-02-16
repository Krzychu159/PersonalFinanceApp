import { supabase } from "../../lib/supabase/client";

export async function getOverviewAugust() {
  const { data, error } = await supabase
    .from("pf_overview_aug2024")
    .select("*")
    .single();
  if (error) {
    console.error("Error fetching overview:", error);
    throw error;
  }
  return data;
}
