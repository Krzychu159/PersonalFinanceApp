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

export async function createPot(pot) {
  const { data, error } = await supabase.from("pf_pots").insert(pot).select();
  if (error) {
    console.error("Error creating pot:", error);
    throw error;
  }
  return data;
}

export async function updatePot(id, updates) {
  const { data, error } = await supabase
    .from("pf_pots")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) {
    console.error("Error updating pot:", error);
    throw error;
  }
  return data;
}

export async function deletePot(id) {
  const { data, error } = await supabase.from("pf_pots").delete().eq("id", id);
  if (error) {
    console.error("Error deleting pot:", error);
    throw error;
  }
  return data;
}
