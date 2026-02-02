import Link from "next/link";
import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <aside className="w-full border-b p-4 md:w-64 md:border-b-0 md:border-r bg-gray-900 text-white flex md:flex-col items-center md:items-start gap-6">
        <figure>
          <Image
            src="/assets/images/logo-large.svg"
            alt="logo"
            width={120}
            height={24}
            priority
          />
        </figure>
        <nav className="flex gap-2 md:flex-col">
          <Link href="/overview">Overview</Link>
          <Link href="/transactions">Transactions</Link>
          <Link href="/budgets">Budgets</Link>
          <Link href="/pots">Pots</Link>
          <Link href="/bills">Bills</Link>
        </nav>
      </aside>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
