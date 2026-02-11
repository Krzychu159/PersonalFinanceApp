import { getBudgets } from "@/lib/db/budgets";
import { getTransactions } from "@/lib/db/transactions";
import BudgetChart from "../../components/BudgetChart";
import Link from "next/link";
import TransactionCard from "../../components/TransactionCard";

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
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button className="bg-grey-900 text-white px-4 py-2 rounded-md">
          +Add new Budget
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-4">
          <div className="bg-white rounded-lg p-6 mt-6">
            <div className=" px-8 w-full mb-8">
              <BudgetChart data={data} total={total} />
            </div>
            <h2 className="text-2xl font-bold ">Spending Summary</h2>{" "}
            <div className="flex flex-col mt-5 gap-4 flex-3 w-full ">
              {budgets.map((budget) => (
                <div
                  key={budget.id}
                  className=" border-b border-gray-200 py-2 last:border-b-0"
                >
                  <div
                    className="flex justify-between gap-4 border-l-4 px-4 w-full"
                    style={{ borderLeftColor: budget.theme }}
                  >
                    <div className="text-gray-500 ">
                      {budget.category?.name}
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-grey-900">
                        {" "}
                        ${budget.maximum}
                      </span>
                      <span className="text-xs text-gray-500">
                        of ${budget.maximum}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-7">
          {budgets.length === 0 ? (
            <div className="bg-white rounded-lg p-6 mt-6 flex flex-col items-center gap-4">
              <h2 className="text-xl font-bold">No budgets yet</h2>
              <p className="text-gray-500 text-center">
                Start by creating a budget to track your spending and achieve
                your financial goals.
              </p>
              <button className="bg-grey-900 text-white px-4 py-2 rounded-md">
                +Add new Budget
              </button>
            </div>
          ) : (
            budgets.map((budget) => (
              <div key={budget.id} className="bg-white rounded-lg p-6 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-white rounded-full w-4 h-4 flex items-center justify-center"
                      style={{ backgroundColor: budget.theme ?? "#16a34a" }}
                    />
                    <p className="text-xl font-bold">
                      {budget.category?.name ?? "Brak kategorii"}
                    </p>
                  </div>
                  <div className="cursor-pointer p-1">...</div>
                </div>

                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    Maximum of ${budget.maximum}
                  </span>

                  <div className="w-full bg-beige-100 rounded-lg h-10 mt-2 p-1">
                    <div
                      className="h-8 rounded-lg"
                      style={{
                        width: "75%",
                        backgroundColor: budget.theme ?? "#16a34a",
                      }}
                    />
                  </div>

                  <div className="flex mt-4 gap-8">
                    <div
                      className="flex flex-col gap-3 flex-1 border-l-8 pr-8 px-4"
                      style={{ borderLeftColor: budget.theme ?? "#16a34a" }}
                    >
                      <span>Spent</span>
                      <span>$390</span>
                    </div>

                    <div className="flex flex-col gap-3 flex-1 border-l-8 border-beige-100 pr-8 px-4">
                      <span>Remaining</span>
                      <span>$130</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-beige-100 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold">Latest spending</h2>
                    <Link
                      href="/transactions"
                      className="text-sm text-grey-500 hover:underline cursor-pointer flex items-center gap-3"
                    >
                      <span>See All</span>
                      <span className="text-[10px]">▶</span>
                    </Link>
                  </div>

                  <div>
                    {transactions.slice(0, 3).map((transaction) => (
                      <TransactionCard
                        transaction={transaction}
                        key={transaction.id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
