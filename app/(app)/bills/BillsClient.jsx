"use client";

import TransactionCard from "@/app/components/TransactionCard";
import { useState } from "react";

export default function BillsClient({ bills }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  let result = [...bills];

  if (search) {
    result = result.filter((transaction) =>
      transaction.counterparty_name
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
    console.log(result);
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
  return (
    <div className="bg-white rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search transaction"
          className=" px-6 py-3 border border-grey-900 rounded-xl max-w-sm w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 items-center">
          <label htmlFor="sort">Sort by</label>
          <select
            name="sort"
            id="sort"
            className="px-6 py-3 border border-grey-900 rounded-xl"
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
        </div>
      </div>
      <div className="mt-6">
        {!bills || bills.length === 0 ? (
          <p className="text-center text-gray-500">No bills found.</p>
        ) : null}
        {result.slice(0, 7).map((transaction) => (
          <TransactionCard transaction={transaction} key={transaction.id} />
        ))}
      </div>
    </div>
  );
}
