"use client";

import Image from "next/image";
import { useState } from "react";
import { createBudget } from "@/lib/db/budgets";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BudgetModal({ open, setOpen, categories }) {
  const [category, setCategory] = useState("");
  const [maximum, setMaximum] = useState("");
  const [theme, setTheme] = useState("#16a34a");
  const router = useRouter();

  const resetForm = () => {
    setCategory("");
    setMaximum("");
    setTheme("#16a34a");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !maximum) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const numericMaximum = Number(maximum);

    if (isNaN(numericMaximum) || numericMaximum <= 0) {
      toast.error("Maximum must be greater than 0.");
      return;
    }

    try {
      await createBudget({
        categoryId: Number(category), // jeśli też bigint
        maximum: numericMaximum,
        theme,
      });

      resetForm();
      setOpen(false);
      toast.success("Budget created successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);

      if (error?.code === "23505") {
        toast.error("Budget for this category already exists.");
        return;
      }
    }
  };

  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md m-6 md:m-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Add New Budget</h2>

              <Image
                src="/assets/images/icon-close-modal.svg"
                alt="Budget Icon"
                width={24}
                height={24}
                onClick={() => setOpen(false)}
                className=" cursor-pointer"
              />
            </div>
            <p className="py-4 text-xs text-grey-500 ">
              {" "}
              Choose a category to set a spending budget. These categories can
              help you monitor spending.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="category"
                  className="text-grey-500 text-xs font-bold"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {(categories ?? []).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="maximum"
                  className="text-grey-500 text-xs font-bold"
                >
                  Maximum Amount
                </label>
                <input
                  type="number"
                  id="maximum"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Enter maximum amount"
                  value={maximum}
                  onChange={(e) => setMaximum(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="theme"
                  className="text-grey-500 text-xs font-bold"
                >
                  Theme Color
                </label>
                <input
                  type="color"
                  id="theme"
                  className="w-full h-10 border border-gray-300 rounded-lg"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-grey-900 text-white px-4 py-2 rounded-md w-full"
                >
                  {" "}
                  Add Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
