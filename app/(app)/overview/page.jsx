import Image from "next/image";
import { getBalance } from "@/lib/db/overview";
import { getPots } from "@/lib/db/pots";
import { getTransactions } from "@/lib/db/transactions";
import { getBudgets } from "@/lib/db/budgets";
import Link from "next/link";
import BudgetChart from "../../components/BudgetChart";
import SummaryBoxes from "./components/SummaryBoxes";
import TransactionCard from "../../components/TransactionCard";

export default async function Overview() {
  const balance = await getBalance();
  const pots = await getPots();
  const sumOfPots = pots.reduce((acc, pot) => acc + pot.total, 0);
  const transactions = await getTransactions();
  const budgets = await getBudgets();

  const data = budgets.map((budget) => ({
    name: budget.category?.name ?? "Brak kategorii",
    value: budget.maximum,
    theme: budget.theme ?? "#000000",
  }));
  const total = data.reduce((acc, item) => acc + Number(item.value), 0);

  const boxes = [
    {
      label: "Total Balance",
      ammount: balance ? `$${balance.current}` : "$0",
    },
    { label: "Income", ammount: "$3,200" },
    { label: "Expenses", ammount: "$1,800" },
  ];

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-3xl font-bold">Overview</h1>
      <SummaryBoxes boxes={boxes} />

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 mt-8">
        <div className="md:col-span-6 flex flex-col gap-4 h-full">
          {/* Pots */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Pots</h2>{" "}
              <Link
                href="/pots"
                className="text-sm text-grey-500 hover:underline cursor-pointer flex items-center gap-3"
              >
                <span>See Details</span>
                <span className="text-[10px]">▶</span>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between   mt-4">
              <div className="flex bg-beige-100 rounded-xl p-4 items-center gap-4 flex-1 h-full w-full ">
                <Image
                  src="/assets/images/icon-pot.svg"
                  alt="pot icon"
                  width={40}
                  height={40}
                  className="sm:ml-5"
                />

                <div className="flex flex-col gap-4 p-3 h-full">
                  <p>Total Saved</p>{" "}
                  <p className="text-4xl font-bold">${sumOfPots}</p>
                </div>
              </div>
              <div className="flex-1  grid grid-cols-2 gap-4 ml-4 w-full">
                {pots.slice(0, 4).map((pot) => (
                  <div
                    key={pot.id}
                    className={`border-l-4  px-3 py-1 flex flex-col`}
                    style={{ borderLeftColor: pot.theme }}
                  >
                    <p className="text-sm ">{pot.name}</p>
                    <p className="font-bold">${pot.total}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Transactions */}
          <div className="bg-white rounded-xl p-6 mb-6 flex-1">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Transactions</h2>{" "}
              <Link
                href="/transactions"
                className="text-sm text-grey-500 hover:underline cursor-pointer flex items-center gap-3"
              >
                <span>View All</span>
                <span className="text-[10px]">▶</span>
              </Link>
            </div>
            <div className="mt-4">
              <ul>
                {transactions.slice(0, 5).map((transaction) => (
                  <TransactionCard
                    transaction={transaction}
                    key={transaction.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4 h-full">
          {/* Budgets */}
          <div className="bg-white rounded-xl p-6 mb-6 flex-1">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Budgets</h2>{" "}
              <Link
                href="/budgets"
                className="text-sm text-grey-500 hover:underline cursor-pointer flex items-center gap-3"
              >
                <span>See Details</span>
                <span className="text-[10px]">▶</span>
              </Link>
            </div>
            <div className=" flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex-7 px-6 w-full">
                <BudgetChart data={data} total={total} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 flex-3 w-full sm:px-6">
                {budgets.map((budget) => (
                  <div
                    key={budget.id}
                    className="flex flex-col gap-1 border-l-5 px-3 "
                    style={{ borderLeftColor: budget.theme }}
                  >
                    <span className="text-grey-500 ">
                      {budget.category?.name}
                    </span>
                    <span className="font-bold text-grey-900">
                      {" "}
                      ${budget.maximum}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Recurring Bills */}
          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Recurring Bills</h2>{" "}
              <Link
                href="/bills"
                className="text-sm text-grey-500 hover:underline cursor-pointer flex items-center gap-3"
              >
                <span>See Details</span>
                <span className="text-[10px]">▶</span>
              </Link>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <div className="w-full flex justify-between  p-5 bg-beige-100 rounded-xl border-l-5 border-green-800">
                <span className="text-grey-500">Paid Bills</span>
                <span className="font-bold">$190</span>
              </div>
              <div className="w-full flex justify-between  p-5 bg-beige-100 rounded-xl border-l-5 border-beige-500">
                <span className="text-grey-500">Total Upcoming</span>
                <span className="font-bold">$190</span>
              </div>
              <div className="w-full flex justify-between  p-5 bg-beige-100 rounded-xl border-l-5 border-blue-400">
                <span className="text-grey-500">Due Soon</span>
                <span className="font-bold">$190</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
