export default function Budgets() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Budgets</h1>
      <div className="flex gap-6">
        <div className="flex-3">
          <div className="bg-white rounded-lg p-6 mt-6">
            <div>wykres</div>
          </div>
        </div>
        <div className="flex-7">
          <div className="bg-white rounded-lg p-6 mt-6">
            <div>Entertaiment</div>
          </div>
          <div className="bg-white rounded-lg p-6 mt-6">
            <div>Bills</div>
          </div>
        </div>
      </div>
    </div>
  );
}
