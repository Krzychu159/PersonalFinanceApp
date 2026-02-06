import { supabase } from "../../lib/supabase/client";

export async function getBudgets() {
  const { data, error } = await supabase.from("pf_budgets").select(`
      *,
      category:pf_categories (
        id,
        name
      )
    `);

  if (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }
  return data;
}
