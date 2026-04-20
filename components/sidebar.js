"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/theme-toggle";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[296px] shrink-0 border-r border-[var(--border)] bg-[var(--sidebar-bg)] lg:block">
      <div className="sticky top-0 flex h-screen flex-col px-7 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Icon name="spark" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-[-0.04em]">kurodev</p>
            <p className="text-sm text-[var(--text-faint)]">portal & build desk</p>
          </div>
        </div>

        <nav className="mt-12 space-y-1.5">
          {navigationItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition ${
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

        <div className="mt-auto border-t border-[var(--border)] pt-6">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--accent)]">Now building</p>
            <p className="text-sm leading-6 text-[var(--text-soft)]">
              ポートフォリオ、HP-portal、今後の業務ツールを一つの窓口へ整理しています。
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-[var(--text-faint)]">Light / Dark</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
