import TransactionCard from "@/app/components/TransactionCard";
import { getTransactions } from "@/lib/db/transactions";

export default async function Transactions() {
  const transactions = await getTransactions();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <div className="bg-white rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search transactions..."
            className=" px-6 py-3 border border-grey-900 rounded-xl max-w-sm w-full"
          />

          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <label htmlFor="sort">Sort by</label>
              <select
                name="sort"
                id="sort"
                className="px-6 py-3 border border-grey-900 rounded-xl"
              >
                <option value="date">Latest</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className="px-6 py-3 border border-grey-900 rounded-xl"
              >
                <option value="all">All Transactions</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ul>
            {transactions.map((transaction) => (
              <TransactionCard transaction={transaction} key={transaction.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
