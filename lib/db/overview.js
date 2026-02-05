import { supabase } from "../../lib/supabase/client";

export async function getBalance() {
  const { data, error } = await supabase
    .from("pf_balance")
    .select("*")
    .single();
  if (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
  return data;
}
