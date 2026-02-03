export default function Pots() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pots</h1>
        <button className="bg-grey-900 text-white px-4 py-2 rounded-md">
          +Add new Pot
        </button>
      </div>
      <div className="bg-white rounded-lg p-6 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold ">My Pots</h2>
          <div>...</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Total Saved</div>
          <div className="font-bold">$1,200.00</div>
        </div>
      </div>
    </div>
  );
}
