"use client";

import Link from "next/link";
import BudgetChart from "../../components/BudgetChart";
import TransactionCard from "../../components/TransactionCard";
import { useState } from "react";
import BudgetModal from "./BudgetModal";
import Image from "next/image";
import toast from "react-hot-toast";
import { deleteBudget } from "@/lib/db/budgets";
import { useRouter } from "next/navigation";

export default function BudgetClient({
  budgets,
  data,
  total,
  transactions,
  categories,
}) {
  const [open, setOpen] = useState(false);
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const router = useRouter();

  const handleDeleteBudget = async (budgetId) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      try {
        await deleteBudget(budgetId);
        toast.success("Budget deleted successfully");
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete budget: " + error.message);
      }
    }
  };

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
                    <div className="relative">
                      <button
                        type="button"
                        className="cursor-pointer p-1"
                        onClick={() =>
                          setMenuOpenFor((prev) =>
                            prev === budget.id ? null : budget.id,
                          )
                        }
                      >
                        <Image
                          src="/assets/images/icon-ellipsis.svg"
                          alt="Menu"
                          width={16}
                          height={16}
                        />
                      </button>

                      {menuOpenFor === budget.id && (
                        <>
                          {/* overlay */}
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setMenuOpenFor(null)}
                          />

                          {/* dropdown */}
                          <div className="absolute right-0 top-8 z-50 w-44 rounded-lg bg-white shadow-lg border border-gray-100 overflow-hidden">
                            <button
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                              onClick={() => {
                                setMenuOpenFor(null);
                                toast.error("Not implemented yet");
                              }}
                            >
                              Edit budget
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                              onClick={() => {
                                setMenuOpenFor(null);
                                handleDeleteBudget(budget.id);
                              }}
                            >
                              Delete budget
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className="text-sm text-grey-500">
                      Maximum of ${budget.maximum}
                    </span>

                    <div className="w-full bg-beige-100 rounded-lg h-10 mt-2 p-1">
                      <div
                        className="h-8 rounded-lg"
                        style={{
                          width: `${((budget.spent_amount / budget.maximum) * 100).toFixed(2)}%`,
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
                        <span>${budget.spent_amount}</span>
                      </div>

                      <div className="flex flex-col gap-3 flex-1 border-l-8 border-beige-100 pr-8 px-4">
                        <span>Remaining</span>
                        <span>${budget.maximum - budget.spent_amount}</span>
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
                        .slice(0, 3)
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
      <BudgetModal open={open} setOpen={setOpen} categories={categories} />
    </>
  );
}
