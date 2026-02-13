import Image from "next/image";
import { getTransactions } from "@/lib/db/transactions";
import TransactionCard from "../../components/TransactionCard";

export default async function Bills() {
  const transactions = await getTransactions();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Recurring Bills</h1>
      <div className="flex gap-6">
        <div className="flex-3">
          {/* total bills */}
          <div className="bg-gray-900 text-white rounded-lg p-6 mt-6">
            <Image
              src="/assets/images/icon-recurring-bills.svg"
              alt="recurring bills icon"
              width={30}
              height={30}
            />
            <p className="mt-12">Total bills</p>
            <p className="mt-4 font-bold text-3xl">$180.00</p>
          </div>
          {/* summary */}
          <div className="bg-white rounded-lg p-6 mt-6">
            <p className="font-bold">Summary</p>
            <ul className="mt-4">
              <li className="flex items-center justify-between py-3 border-b border-gray-200">
                <p className="text-grey-500">Paid Bill</p>
                <p className="text-grey-900 font-bold">4 ($120.00)</p>
              </li>

              <li className="flex items-center justify-between py-3 border-b border-gray-200">
                <p className="text-grey-500">Total upcoming </p>
                <p className="text-grey-900 font-bold">3 ($60.00)</p>
              </li>
              <li className="flex items-center justify-between py-3 ">
                <p className="text-red">Due Soon </p>
                <p className="text-red font-bold">2 ($60.00)</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-7">
          {/* list of bills */}
          <div className="bg-white rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search transactions..."
                className=" px-6 py-3 border border-grey-900 rounded-xl max-w-sm w-full"
              />
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
            </div>
            <div className="mt-6">
              {!transactions || transactions.length === 0 ? (
                <p className="text-center text-gray-500">No bills found.</p>
              ) : null}
              {transactions.slice(0, 7).map((transaction) => (
                <TransactionCard
                  transaction={transaction}
                  key={transaction.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
