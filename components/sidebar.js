"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/theme-toggle";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="panel-strong sticky top-6 hidden h-[calc(100vh-3rem)] w-[280px] shrink-0 flex-col rounded-[32px] px-5 py-6 lg:flex">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
          <Icon name="spark" className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-[-0.04em]">kurodev</p>
          <p className="text-sm text-[var(--text-faint)]">portal & build desk</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {navigationItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "text-[var(--text-soft)] hover:bg-[var(--panel-muted)] hover:text-[var(--text)]"
              }`}
            >
              <Icon name={item.icon} className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-5">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel-muted)] p-4">
          <p className="text-sm font-medium text-[var(--text)]">Now building</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
            ポートフォリオ、HP-portal、今後の業務ツールを一つの窓口へ整理しています。
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Theme</p>
            <p className="text-xs text-[var(--text-faint)]">Light / Dark</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
