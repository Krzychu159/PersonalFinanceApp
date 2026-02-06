import { supabase } from "../../lib/supabase/client";

export async function getCategories() {
  const { data, error } = await supabase.from("pf_categories").select("*");
  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
  return data;
}
