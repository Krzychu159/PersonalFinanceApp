import TransactionsClient from "./TransactionsClient";
import { getTransactions } from "@/lib/db/transactions";
import { getCategories } from "@/lib/db/categories";

export default async function Transactions() {
  const transactions = await getTransactions();
  const categories = await getCategories();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <div className="bg-white rounded-lg p-6 mt-6">
        <TransactionsClient
          transactions={transactions}
          categories={categories}
        />
      </div>
    </div>
  );
}
