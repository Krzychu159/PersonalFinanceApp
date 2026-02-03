export default function Transactions() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <div className="bg-white rounded-lg p-6 mt-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search transactions..."
            className="border border-gray-300 rounded-md p-2 w-full"
          />

          <select name="sort" id="sort">
            <option value="date">Latest</option>
          </select>
          <select name="category" id="category">
            <option value="all">All Categories</option>
          </select>
        </div>
        <div className="mt-6">
          <ul>
            <li className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-bold">Grocery Store</p>
                <p className="text-sm text-gray-500">Sep 15, 2024</p>
              </div>
              <p className="text-red-500 font-bold">-$45.00</p>
            </li>
            <li className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-bold">Salary</p>
                <p className="text-sm text-gray-500">Sep 1, 2024</p>
              </div>
              <p className="text-green-500 font-bold">+$3,000.00</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
