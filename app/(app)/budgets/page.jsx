import { getBudgets } from "@/lib/db/budgets";
import { getTransactions } from "@/lib/db/transactions";
import BudgetChart from "../../components/BudgetChart";
import Link from "next/link";
import TransactionCard from "../../components/TransactionCard";
import BudgetClient from "./BudgetClient";

export default async function Budgets() {
  const transactions = await getTransactions();

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
    />
  );
}
