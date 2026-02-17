"use client";

import TransactionCard from "@/app/components/TransactionCard";
import Image from "next/image";
import { useState } from "react";

export default function TransactionsClient({ transactions, categories }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  let result = [...transactions];

  if (search) {
    result = result.filter((transaction) =>
      transaction.counterparty_name
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
    console.log(result);
  }

  if (category !== "all") {
    result = result.filter(
      (transaction) => String(transaction.category_id) === category,
    );
  }

  if (sort === "latest") {
    result.sort(
      (a, b) =>
        new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime(),
    );
  } else if (sort === "oldest") {
    result.sort(
      (a, b) =>
        new Date(a.occurred_at).getTime() - new Date(b.occurred_at).getTime(),
    );
  } else if (sort === "a-z") {
    result.sort((a, b) =>
      a.counterparty_name.localeCompare(b.counterparty_name),
    );
  } else if (sort === "z-a") {
    result.sort((a, b) =>
      b.counterparty_name.localeCompare(a.counterparty_name),
    );
  } else if (sort === "highest") {
    result.sort((a, b) => Number(b.amount) - Number(a.amount));
  } else if (sort === "lowest") {
    result.sort((a, b) => Number(a.amount) - Number(b.amount));
  }

  const [page, setPage] = useState(1);
  const pageSize = 8;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = result.slice(start, end);
  const totalPages = Math.ceil(result.length / pageSize);

  return (
    <>
      <div className="bg-white rounded-lg p-6 ">
        <div className="flex justify-between items-center mb-4">
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search transaction"
              className="px-6 py-3 pr-12 border border-gray-500 rounded-xl w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Image
              src="/assets/images/icon-search.svg"
              alt="Search"
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>

          <div className="hidden md:flex gap-5  ">
            <div className="flex gap-2 items-center">
              <label htmlFor="sort" className="text-grey-500 whitespace-nowrap">
                Sort by
              </label>
              <div className="relative w-full">
                <select
                  name="sort"
                  id="sort"
                  className="appearance-none w-full px-6 py-3 pr-10 border border-grey-900 rounded-xl "
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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

          <div className="md:hidden flex gap-5 px-3 ml-4">
            <Image
              src="/assets/images/icon-sort-mobile.svg"
              alt="sort"
              width={24}
              height={24}
              className="pointer-events-none"
            />
            <Image
              src="/assets/images/icon-filter-mobile.svg"
              alt="Filter"
              width={24}
              height={24}
              className="pointer-events-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <ul>
            {pageItems.map((transaction) => (
              <TransactionCard transaction={transaction} key={transaction.id} />
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <div>
              {page > 1 && (
                <button
                  className=" text-grey-900 border border-grey-900 px-4 py-2 rounded-lg mt-4"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>
              )}
            </div>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg mt-4 border  ${
                    page === index + 1
                      ? "bg-black text-white border-black"
                      : "border-grey-900 text-grey-900"
                  }`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div>
              {page < totalPages && (
                <button
                  className=" text-grey-900 border border-grey-900 px-4 py-2 rounded-lg mt-4 ml-2"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
