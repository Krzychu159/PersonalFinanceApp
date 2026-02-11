import { formatDate } from "@/lib/utils/formatDate";

export default function TransactionCard({ transaction }) {
  return (
    <li
      key={transaction.id}
      className="flex justify-between items-center gap-4 py-5  border-b border-gray-200 last:pb-0 last:border-b-0"
    >
      <div className="flex gap-5 items-center">
        <span>
          <img
            src={transaction.avatar_url || "/assets/images/avatar/bytewise.jpg"}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </span>
        <span className=" font-bold">{transaction.counterparty_name}</span>
      </div>
      <div className="flex flex-col  items-end gap-1">
        <span
          className={
            transaction.amount >= 0 ? "text-green-800" : "text-grey-900"
          }
        >
          {transaction.amount >= 0 ? "+" : "-"}${Math.abs(transaction.amount)}
        </span>
        <span className="text-xs text-grey-500">
          {formatDate(transaction.occurred_at)}
        </span>
      </div>
    </li>
  );
}
