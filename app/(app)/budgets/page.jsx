import { getBudgets } from "@/lib/db/budgets";
import BudgetChart from "../../components/BudgetChart";

export default async function Budgets() {
  const budgets = await getBudgets();

  const data = budgets.map((budget) => ({
    name: budget.category?.name ?? "Brak kategorii",
    value: budget.maximum,
    theme: budget.theme ?? "#000000",
  }));
  const total = data.reduce((acc, item) => acc + Number(item.value), 0);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <button className="bg-grey-900 text-white px-4 py-2 rounded-md">
          +Add new Budget
        </button>
      </div>
      <div className="flex gap-6">
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
                    <div className="text-gray-500 ">
                      {budget.category?.name}
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-grey-900">
                        {" "}
                        ${budget.maximum}
                      </span>
                      <span className="text-xs text-gray-500">
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
          <div className="bg-white rounded-lg p-6 mt-6">
            <div>Entertaiment</div>
            <div>
              <span>Maximum of $520</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
                <div>
                  <div>
                    <span>Spent</span>
                    <span>$390</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
