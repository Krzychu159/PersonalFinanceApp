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

export async function createBudget({ categoryId, maximum, theme }) {
  console.log("createBudget called", { categoryId, maximum, theme });

  const { data, error } = await supabase
    .from("pf_budgets")
    .insert({ category_id: categoryId, maximum, theme })
    .select("*")
    .single();

  console.log("supabase response", { data, error });

  if (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
  return data;
}

export async function deleteBudget(budgetId) {
  const { data, error } = await supabase
    .from("pf_budgets")
    .delete()
    .eq("id", budgetId);

  if (error) {
    console.error("Error deleting budget:", error);
    throw error;
  }
  return data;
}
