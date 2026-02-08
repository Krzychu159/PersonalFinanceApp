"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const nav = [
  {
    href: "/overview",
    label: "Overview",
    icon: "/assets/images/icon-nav-overview.svg",
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: "/assets/images/icon-nav-transactions.svg",
  },
  {
    href: "/budgets",
    label: "Budgets",
    icon: "/assets/images/icon-nav-budgets.svg",
  },
  { href: "/pots", label: "Pots", icon: "/assets/images/icon-nav-pots.svg" },
  {
    href: "/bills",
    label: "Bills",
    icon: "/assets/images/icon-nav-recurring-bills.svg",
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row">
      {/* desktop */}
      <aside className="hidden md:flex md:w-64 md:border-r bg-grey-900 text-white md:flex-col items-center md:items-start gap-6 rounded-r-2xl">
        <figure className="px-8 my-8">
          <Image
            src="/assets/images/logo-large.svg"
            alt="logo"
            width={120}
            height={24}
            priority
          />
        </figure>

        <nav className="flex gap-4 md:flex-col w-full">
          {nav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-4 rounded-r-xl  py-3 w-full outline-none transition  px-6 ",
                  "hover:bg-grey-500/20 focus-visible:ring-2 focus-visible:ring-beige-100",
                  isActive && "bg-beige-100 text-grey-900",
                )}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={18}
                  height={18}
                  className={clsx("filter", isActive && "invert")}
                />
                <span className="font-bold">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 md:pb-0">
        {children}
      </main>

      {/* mobile */}

      <nav
        className="
    md:hidden
    fixed
    bottom-0 left-0 right-0
    z-[9999]
    bg-grey-900
    rounded-t-2xl
    px-4 pt-3
    flex gap-4
  "
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {nav.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "  rounded-t-xl  py-3   transition  px-6 ",
                isActive && "bg-beige-100 text-grey-900",
              )}
            >
              <Image
                src={item.icon}
                alt=""
                width={18}
                height={18}
                className={clsx("filter", isActive && "invert")}
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
