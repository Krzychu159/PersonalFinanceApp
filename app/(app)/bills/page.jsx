export default function Bills() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bills</h1>
      <div className="flex gap-6">
        <div className="flex-3">
          <div className="bg-gray-900 text-white rounded-lg p-6 mt-6">
            Total Bills
          </div>
          <div className="bg-white rounded-lg p-6 mt-6">Summary</div>
        </div>
        <div className="flex-7">
          <div className="bg-white rounded-lg p-6 mt-6">
            <div className="flex">
              <input
                type="text"
                placeholder="Search bills..."
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <select name="sort" id="sort">
                <option value="date">Latest</option>
              </select>
            </div>
            <div className="mt-6">
              <ul>
                <li className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-bold">Electricity Bill</p>
                    <p className="text-sm text-gray-500">Due Sep 20, 2024</p>
                  </div>
                  <p className="text-red-500 font-bold">-$120.00</p>
                </li>
                <li className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-bold">Internet Bill</p>
                    <p className="text-sm text-gray-500">Due Sep 25, 2024</p>
                  </div>
                  <p className="text-red-500 font-bold">-$60.00</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
