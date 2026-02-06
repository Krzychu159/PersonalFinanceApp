import { supabase } from "../../lib/supabase/client";

export async function getTransactions() {
  const { data, error } = await supabase.from("pf_transactions").select("*");
  if (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
  return data;
}
