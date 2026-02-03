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
    <div className="px-5">
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
    </div>
  );
}
