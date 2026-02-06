import Image from "next/image";
import { getBalance } from "@/lib/db/overview";
import { getPots } from "@/lib/db/pots";
import { getTransactions } from "@/lib/db/transactions";
import { formatDate } from "@/lib/utils/formatDate";
import { getBudgets } from "@/lib/db/budgets";

export default async function Overview() {
  const balance = await getBalance();
  const pots = await getPots();
  const sumOfPots = pots.reduce((acc, pot) => acc + pot.total, 0);
  const transactions = await getTransactions();
  const budgets = await getBudgets();

  const boxes = [
    {
      label: "Total Balance",
      ammount: balance ? `$${balance.current}` : "$0",
    },
    { label: "Income", ammount: "$3,200" },
    { label: "Expenses", ammount: "$1,800" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Overview</h1>

      <div className="flex gap-5 ">
        {boxes.map((box, index) => (
          <div
            key={box.label}
            className={`rounded-lg p-6 mt-6 flex flex-col gap-2 flex-1 ${
              index === 0 ? "bg-grey-900 text-white" : "bg-white text-grey-900"
            }`}
          >
            <span className="text-sm text-gray-500">{box.label}</span>
            <span className="text-2xl font-bold">{box.ammount}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <div className="flex-6">
          {/* Pots */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Pots</h2>{" "}
              <div>See Details</div>
            </div>
            <div className="flex items-center gap-2 justify-between h-36  mt-4">
              <div className="flex bg-beige-100 rounded-lg p-4 items-center gap-4 flex-1 h-full ">
                <Image
                  src="/assets/images/icon-pot.svg"
                  alt="pot icon"
                  width={40}
                  height={40}
                />

                <div className="flex flex-col gap-4 p-3 h-full">
                  <p>Total Saved</p>{" "}
                  <p className="text-3xl font-bold">${sumOfPots}</p>
                </div>
              </div>
              <div className="flex-1  grid grid-cols-2 gap-4 ml-4">
                {pots.slice(0, 4).map((pot) => (
                  <div
                    key={pot.id}
                    className={`border-l-6 ${pot.theme} rounded-lg px-3 py-1 flex flex-col`}
                  >
                    <p className="text-sm ">{pot.name}</p>
                    <p className="font-bold">${pot.total}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Transactions */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Transactions</h2>{" "}
              <div>See Details</div>
            </div>
            <div className="mt-4">
              <ul>
                {transactions.slice(0, 5).map((transaction) => (
                  <li
                    key={transaction.id}
                    className="flex justify-between items-center gap-4 py-4 "
                  >
                    <div className="flex gap-5 items-center">
                      <span>
                        <img
                          src={
                            transaction.avatar_url ||
                            "/assets/images/avatar/bytewise.jpg"
                          }
                          alt="avatar"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </span>
                      <span>{transaction.counterparty_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-green-500"
                            : "text-grey-900"
                        }
                      >
                        {transaction.amount}$
                      </span>
                      <span className="text-xs">
                        {formatDate(transaction.occurred_at)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-4">
          {/* Budgets */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Budgets</h2>{" "}
              <div>See Details</div>
            </div>
            <div className="mt-4 flex gap-6">
              <div className="flex-7">Wykres</div>
              <div className="flex-3  flex flex-col gap-4 text-xs">
                {budgets.map((budget) => (
                  <div key={budget.id} className="flex flex-col gap-1">
                    <span className="text-gray-500">
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
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Recurring Bills</h2>{" "}
              <div>See Details</div>
            </div>
            <div>list</div>
          </div>
        </div>
      </div>
    </div>
  );
}
