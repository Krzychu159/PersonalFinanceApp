import TransactionCard from "@/app/components/TransactionCard";
import { getTransactions } from "@/lib/db/transactions";
import { getCategories } from "@/lib/db/categories";
import Image from "next/image";

export default async function Transactions() {
  const transactions = await getTransactions();
  const categories = await getCategories();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <div className="bg-white rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search transaction"
              className="px-6 py-3 pr-12 border border-gray-500 rounded-xl w-full"
            />
            <Image
              src="/assets/images/icon-search.svg"
              alt="Search"
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>

          <div className="flex gap-5">
            <div className="flex gap-2 items-center">
              <label htmlFor="sort" className="text-grey-500 whitespace-nowrap">
                Sort by
              </label>
              <div className="relative w-full">
                <select
                  name="sort"
                  id="sort"
                  className="appearance-none w-full px-6 py-3 pr-10 border border-grey-900 rounded-xl "
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="a-z">A to Z</option>
                  <option value="z-a">Z to A</option>
                  <option value="highest">Highest</option>
                  <option value="lowest">Lowest</option>
                </select>

                <Image
                  src="/assets/images/icon-caret-down.svg"
                  alt="Open"
                  width={13}
                  height={13}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="category" className="text-grey-500">
                Category
              </label>
              <div className="relative w-full">
                <select
                  name="category"
                  id="category"
                  className="appearance-none w-full px-6 py-3 pr-10 border border-grey-900 rounded-xl"
                >
                  <option value="all">All Transactions</option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <Image
                  src="/assets/images/icon-caret-down.svg"
                  alt="Open"
                  width={13}
                  height={13}
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
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
