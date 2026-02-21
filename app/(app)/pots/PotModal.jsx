"use client";

import Image from "next/image";
import { useState } from "react";
import { createPot } from "@/lib/db/pots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PotModal({ open, setOpen }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [theme, setTheme] = useState("#16a34a");
  const router = useRouter();

  const resetForm = () => {
    setName("");
    setTarget("");
    setTheme("#16a34a");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !target) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const numericTarget = Number(target);

    if (isNaN(numericTarget) || numericTarget <= 0) {
      toast.error("Target must be greater than 0.");
      return;
    }

    try {
      await createPot({
        name,
        target: numericTarget,
        theme,
      });
      resetForm();
      setOpen(false);
      toast.success("Pot created successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error?.message ?? "Failed to create pot");
      console.error(error);
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
              <h2 className="text-2xl font-bold mb-4">Add New Pot</h2>

              <Image
                src="/assets/images/icon-close-modal.svg"
                alt="Pot Icon"
                width={24}
                height={24}
                onClick={() => setOpen(false)}
                className=" cursor-pointer"
              />
            </div>
            <p className="py-4 text-xs text-grey-500 ">
              {" "}
              Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="category"
                  className="text-grey-500 text-xs font-bold"
                >
                  Pot Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="target"
                  className="text-grey-500 text-xs font-bold"
                >
                  Target
                </label>
                <input
                  type="number"
                  id="target"
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Enter target amount"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
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
                  Add Pot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
