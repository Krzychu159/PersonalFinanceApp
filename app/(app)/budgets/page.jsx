import { getBudgets } from "@/lib/db/budgets";
import { getTransactions } from "@/lib/db/transactions";
import BudgetClient from "./BudgetClient";
import { getCategories } from "@/lib/db/categories";

export default async function Budgets() {
  const transactions = await getTransactions();
  const categories = await getCategories();

  const budgets = await getBudgets();
  const data = budgets.map((budget) => ({
    name: budget.category?.name ?? "Brak kategorii",
    value: budget.maximum,
    theme: budget.theme ?? "#000000",
  }));
  const total = data.reduce((acc, item) => acc + Number(item.value), 0);
  return (
    <BudgetClient
      budgets={budgets}
      data={data}
      total={total}
      transactions={transactions}
      categories={categories}
    />
  );
}
