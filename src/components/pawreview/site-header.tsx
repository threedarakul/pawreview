"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "หน้ารวมพนักงาน" },
  { href: "/summary", label: "สรุปรายเดือน" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex flex-col gap-3 border-b border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <div className="leading-tight">
            <p className="font-heading text-sm font-bold text-foreground">
              PawReview
            </p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              ระบบติดตามการประเมินพนักงาน
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="font-heading text-xs font-semibold text-muted-foreground hover:text-foreground sm:hidden"
        >
          ออกจากระบบ
        </Link>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto whitespace-nowrap">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 font-heading text-sm font-semibold transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        className="hidden font-heading text-sm font-semibold text-muted-foreground hover:text-foreground sm:block"
      >
        ออกจากระบบ
      </Link>
    </header>
  );
}
