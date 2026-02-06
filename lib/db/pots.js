import { supabase } from "../../lib/supabase/client";

export async function getPots() {
  const { data, error } = await supabase.from("pf_pots").select("*");
  if (error) {
    console.error("Error fetching pots:", error);
    throw error;
  }
  return data;
}

export async function getSumOfPots() {
  const { data, error } = await supabase
    .from("pf_pots")
    .select("total")
    .reduce((acc, pot) => acc + pot.total, 0);
  if (error) {
    console.error("Error fetching sum of pots:", error);
    throw error;
  }
  return data;
}
