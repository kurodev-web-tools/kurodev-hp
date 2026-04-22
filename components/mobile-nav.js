"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems } from "@/lib/navigation";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="panel-strong sticky top-4 z-40 flex items-center justify-between rounded-[28px] px-4 py-3 lg:hidden">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Icon name="spark" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-semibold tracking-[-0.04em]">kurodev</p>
            <p className="text-xs text-[var(--text-faint)]">portal site</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel-muted)]"
            aria-label="Open menu"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-30 bg-[rgba(2,6,23,0.58)] px-4 pb-4 pt-24 lg:hidden">
          <div className="panel-strong h-full rounded-[32px] p-5">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-4 text-base ${
                      active
                        ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "text-[var(--text-soft)] hover:bg-[var(--panel-muted)]"
                    }`}
                  >
                    <Icon name={item.icon} className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
