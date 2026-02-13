import { getPots } from "@/lib/db/pots";
import Image from "next/image";

export default async function Pots() {
  const pots = await getPots();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pots</h1>
        <button className="bg-grey-900 text-white px-4 py-2 rounded-md">
          +Add new Pot
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {pots.map((pot) => (
          <div key={pot.id} className="bg-white rounded-lg p-6 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="text-white rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ backgroundColor: pot.theme ?? "#16a34a" }}
                />
                <p className="text-xl font-bold">
                  {pot.name ?? "Brak kategorii"}
                </p>
              </div>
              <Image
                src="/assets/images/icon-ellipsis.svg"
                alt="pot icon"
                width={16}
                height={16}
                className="sm:ml-5 cursor-pointer"
              />
            </div>

            <div className="flex flex-col  mt-4">
              <div className="flex justify-between py-3 items-center">
                <div className="text-gray text-sm font-medium">Total Saved</div>
                <div className="font-bold text-3xl">
                  ${Number(pot.totalSaved ?? 0).toFixed(2)}
                </div>
              </div>
              <div className="w-full h-2 bg-beige-100 rounded-full">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${Math.min(100, (pot.totalSaved / pot.targetAmount) * 100)}%`,
                    backgroundColor: pot.theme ?? "#16a34a",
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <div>%</div>
                <div className="font-bold">
                  ${Number(pot.target ?? 0).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <button className="mt-4 w-full bg-beige-100 text-gray-900 font-bold py-2 rounded-md hover:cursor-pointer">
                +Add money
              </button>
              <button className="mt-4 w-full bg-beige-100 text-gray-900 font-bold py-2 rounded-md hover:cursor-pointer">
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
