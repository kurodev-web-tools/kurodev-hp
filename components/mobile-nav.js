"use client";

import Link from "next/link";
import Image from "next/image";
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
          <Image src="/brand-icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-2xl object-cover" priority />
          <div>
            <p className="text-base font-semibold tracking-[-0.04em]">kurodev</p>
            <p className="text-xs text-[var(--text-faint)]">portal site</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${
              open
                ? "border-[var(--border-strong)] bg-[var(--accent-soft)]"
                : "border-[var(--border)] bg-[var(--panel-muted)] hover:border-[var(--border-strong)] hover:bg-[var(--accent-soft)]"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5 text-[var(--accent)]" stroke={2.2} />
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-30 bg-[rgba(2,6,23,0.58)] px-4 pb-4 pt-24 lg:hidden">
          <div className="panel-strong flex h-full flex-col rounded-[32px] p-5">
            <div className="border-b border-[var(--border)] pb-5">
              <p className="section-kicker">kurodev</p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                制作相談、実績、準備中ツールをまとめた窓口です。
              </p>
            </div>
            <nav className="mt-5 space-y-2">
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
            <div className="mt-auto border-t border-[var(--border)] pt-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">Theme</p>
                  <p className="text-xs text-[var(--text-faint)]">Light / Dark</p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
