const boxes = [
  {
    label: "Current Balance",
    ammount: "$3,836.00",
  },
  {
    label: "Income",
    ammount: "$3,836.00",
  },
  {
    label: "Expenses",
    ammount: "$3,836.00",
  },
];

export default function Overview() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Overview</h1>
      <div className="flex gap-5 ">
        {boxes.map((box, index) => (
          <div
            key={box.label}
            className={`rounded-lg p-6 mt-6 flex flex-col gap-2 flex-1 ${
              index === 0 ? "bg-grey-900 text-white" : "bg-white text-grey-900"
            }`}
          >
            <span className="text-sm text-gray-500">{box.label}</span>
            <span className="text-2xl font-bold">{box.ammount}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <div className="flex-6">
          {/* Pots */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Pots</h2>{" "}
              <div>See Details</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Total</div>
              <div>Savings</div>
            </div>
          </div>
          {/* Transactions */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Transactions</h2>{" "}
              <div>See Details</div>
            </div>
            <div className="flex items-center justify-between">
              <ul>
                <li>Emma</li>
                <li>Daniel</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-4">
          {/* Budgets */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Budgets</h2>{" "}
              <div>See Details</div>
            </div>
            <div>wykres</div>
          </div>
          {/* Recurring Bills */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              {" "}
              <h2 className="text-2xl font-bold ">Recurring Bills</h2>{" "}
              <div>See Details</div>
            </div>
            <div>list</div>
          </div>
        </div>
      </div>
    </div>
  );
}
