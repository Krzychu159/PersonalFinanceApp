import Image from "next/image";
import { getBalance } from "@/lib/db/overview";

export default async function Overview() {
  const balance = await getBalance();
  const boxes = [
    {
      label: "Total Balance",
      ammount: balance ? `$${balance.current}` : "$0",
    },
    { label: "Income", ammount: "$3,200" },
    { label: "Expenses", ammount: "$1,800" },
  ];
  const pots = [
    { label: "Vacation", ammount: "500", color: "border-blue-500" },
    { label: "Emergency Fund", ammount: "300", color: "border-green-500" },
    { label: "New Laptop", ammount: "400", color: "border-yellow-500" },
  ];
  const transactions = [
    {
      name: "Salary",
      ammount: "3,000",
      type: "income",
      date: "2024-06-01",
      icon: "/assets/images/avatar1.png",
    },
    {
      name: "Groceries",
      ammount: "150",
      type: "expense",
      date: "2024-06-02",
      icon: "/assets/images/avatar2.png",
    },
    {
      name: "Electricity Bill",
      ammount: "100",
      type: "expense",

      date: "2024-06-03",
      icon: "/assets/images/avatar3.png",
    },
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
                  <p className="text-3xl font-bold">$1,200</p>
                </div>
              </div>
              <div className="flex-1  grid grid-cols-2 gap-4 ml-4">
                {pots.map((pot) => (
                  <div
                    key={pot.label}
                    className={`border-l-6 ${pot.color} rounded-lg px-3 py-1 flex flex-col`}
                  >
                    <p className="text-sm ">{pot.label}</p>
                    <p className="font-bold">${pot.ammount}</p>
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
                {transactions.map((transaction) => (
                  <li
                    key={transaction.name}
                    className="flex justify-between items-center gap-4 py-4 "
                  >
                    <div className="flex gap-5 items-center">
                      <span>
                        <Image
                          src={transaction.icon}
                          alt="avatar"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </span>
                      <span>{transaction.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-green-500"
                            : "text-grey-900"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.ammount}
                      </span>
                      <span className="text-xs">{transaction.date}</span>
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
            <div>wykres</div>
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
