"use client";
import Image from "next/image";

import Link from "next/link";
import BudgetChart from "../../components/BudgetChart";
import TransactionCard from "../../components/TransactionCard";
import { useState } from "react";

export default function BudgetClient({ budgets, data, total, transactions }) {
  const [open, setOpen] = useState("false");

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Budgets</h1>
          <button
            className="bg-grey-900 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setOpen(true)}
          >
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
                      <div className="text-grey-500 ">
                        {budget.category?.name}
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="font-bold text-grey-900">
                          {" "}
                          ${budget.maximum}
                        </span>
                        <span className="text-xs text-grey-500">
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
                <p className="text-grey-500 text-center">
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
                    <span className="text-sm text-grey-500">
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
                      {transactions
                        .filter((t) => t.category_id === budget.category_id)
                        .map((transaction) => (
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
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Add New Budget</h2>
              <Image
                src="/assets/images/icon-close-modal.svg"
                alt="Budget Icon"
                width={24}
                height={24}
              />
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-grey-500">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Enter category name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="maximum" className="text-grey-500">
                  Maximum Amount
                </label>
                <input
                  type="number"
                  id="maximum"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Enter maximum amount"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="theme" className="text-grey-500">
                  Theme Color
                </label>
                <input
                  type="color"
                  id="theme"
                  className="w-full h-10 border border-gray-300 rounded-lg"
                  defaultValue="#16a34a"
                />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="text-grey-500 px-4 py-2 rounded-md border border-grey-500"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-grey-900 text-white px-4 py-2 rounded-md"
                >
                  {" "}
                  Add Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
