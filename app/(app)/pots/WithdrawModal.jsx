"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updatePot } from "@/lib/db/pots";

export default function WithdrawModal({ open, setOpen, pot }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const current = Number(pot?.total ?? 0);
  const target = Number(pot?.target ?? 0);

  const percent = useMemo(() => {
    if (!target || target <= 0) return 0;
    const p = (current / target) * 100;
    return Math.max(0, Math.min(100, p));
  }, [current, target]);

  const handleClose = () => {
    setAmount("");
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdraw = Number(amount);

    if (!withdraw || Number.isNaN(withdraw) || withdraw <= 0) {
      toast.error("Enter a valid amount greater than 0.");
      return;
    }

    if (withdraw > current) {
      toast.error("You can’t withdraw more than you have in this pot.");
      return;
    }

    try {
      const newTotal = current - withdraw;

      await updatePot(pot.id, { total: newTotal });

      toast.success("Withdrawal successful!");
      handleClose();
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(err?.message ?? "Failed to withdraw money.");
    }
  };

  if (!open) return null;
  if (!pot) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg m-6 md:m-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Withdraw from ‘{pot.name ?? "Pot"}’
            </h2>
            <p className="mt-2 text-sm text-grey-500">
              Withdraw from your pot to put money back in your main balance.
              This will reduce the amount you have in this pot.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 p-2 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <Image
              src="/assets/images/icon-close-modal.svg"
              alt="Close"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-end justify-between">
            <div className="text-sm text-grey-500">New Amount</div>
            <div className="text-3xl font-bold">${current.toFixed(2)}</div>
          </div>

          <div className="mt-4">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${percent}%`,
                  backgroundColor: pot.theme ?? "#16a34a",
                }}
              />
            </div>

            <div className="flex justify-between mt-2 text-xs text-grey-500">
              <span>{percent.toFixed(2)}%</span>
              <span>Target of ${target.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-xs font-bold text-grey-500 mb-2">
            Amount to Withdraw
          </label>

          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2">
            <span className="text-grey-500">$</span>
            <input
              type="number"
              inputMode="decimal"
              className="w-full outline-none"
              placeholder="20"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-5 w-full bg-grey-900 text-white px-4 py-3 rounded-xl"
          >
            Confirm Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
}
