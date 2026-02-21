"use client";

import Image from "next/image";
import { useState } from "react";
import PotModal from "./PotModal";
import AddMoneyModal from "./AddMoneyModal";
import WithdrawModal from "./WithdrawModal";
import toast from "react-hot-toast";
import { deletePot } from "@/lib/db/pots";
import { useRouter } from "next/navigation";

export default function PotsClient({ pots }) {
  const [open, setOpen] = useState(false);
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const [addMoneyPot, setAddMoneyPot] = useState(null);
  const [withdrawPot, setWithdrawPot] = useState(null);

  const router = useRouter();

  const handleDeletePot = async (potId) => {
    if (confirm("Are you sure you want to delete this pot?")) {
      try {
        await deletePot(potId);
        toast.success("Pot deleted successfully");
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete pot: " + error.message);
      }
    }
  };
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Pots</h1>
          <button
            className="bg-grey-900 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setOpen(true)}
          >
            +Add new Pot
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {pots.map((pot) => (
            <div key={pot.id} className="bg-white rounded-lg p-6 ">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="text-white rounded-full w-4 h-4 flex items-center justify-center"
                    style={{ backgroundColor: pot.theme ?? "#16a34a" }}
                  />
                  <p className="text-xl font-bold">
                    {pot.name ?? "Brak kategorii"}
                  </p>
                </div>
                <button
                  type="button"
                  className="cursor-pointer p-1"
                  onClick={() =>
                    setMenuOpenFor((prev) => (prev === pot.id ? null : pot.id))
                  }
                >
                  <Image
                    src="/assets/images/icon-ellipsis.svg"
                    alt="Menu"
                    width={16}
                    height={16}
                  />
                </button>
                {menuOpenFor === pot.id && (
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
                        Edit Pot
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                        onClick={() => {
                          setMenuOpenFor(null);
                          handleDeletePot(pot.id);
                        }}
                      >
                        Delete pot
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col  ">
                <div className="flex justify-between py-3 items-center">
                  <div className="text-gray text-sm font-medium">
                    Total Saved
                  </div>
                  <div className="font-bold text-3xl">
                    ${Number(pot.total ?? 0).toFixed(2)}
                  </div>
                </div>
                <div className="w-full h-2 bg-beige-100 rounded-full">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (pot.total / pot.target) * 100)}%`,
                      backgroundColor: pot.theme ?? "#16a34a",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <div>
                    {Math.min(100, (pot.total / pot.target) * 100).toFixed(2)}%
                  </div>
                  <div className="font-bold">
                    ${Number(pot.target ?? 0).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <button
                  className="mt-4 w-full bg-beige-100 text-gray-900 font-bold py-2 rounded-md hover:cursor-pointer"
                  onClick={() => setAddMoneyPot(pot)}
                >
                  +Add money
                </button>
                <button
                  className="mt-4 w-full bg-beige-100 text-gray-900 font-bold py-2 rounded-md hover:cursor-pointer"
                  onClick={() => setWithdrawPot(pot)}
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PotModal open={open} setOpen={setOpen} />
      <AddMoneyModal
        open={addMoneyPot !== null}
        setOpen={setAddMoneyPot}
        pot={addMoneyPot}
      />

      <WithdrawModal
        open={withdrawPot !== null}
        setOpen={setWithdrawPot}
        pot={withdrawPot}
      />
    </>
  );
}
