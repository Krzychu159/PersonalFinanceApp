export default function SummaryBoxes({ boxes }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      {boxes.map((box, index) => (
        <div
          key={box.label}
          className={`rounded-xl p-6  flex flex-col gap-2 flex-1 ${
            index === 0 ? "bg-grey-900 text-white" : "bg-white text-grey-900"
          }`}
        >
          <span className="text-sm text-gray-500">{box.label}</span>
          <span className="text-5xl md:text-3xl font-bold">{box.ammount}</span>
        </div>
      ))}
    </div>
  );
}
