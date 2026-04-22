"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("kurodev-theme", nextTheme);
    setTheme(nextTheme);
  }

  if (!mounted) {
    return <div className="h-11 w-11 rounded-full border border-[var(--border)] bg-[var(--panel-muted)]" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel-muted)] text-[var(--text)] hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
      aria-label={theme === "dark" ? "ライトテーマに切り替え" : "ダークテーマに切り替え"}
    >
      <Icon
        name="moon"
        className="theme-toggle__icon h-5 w-5"
        data-icon="moon"
        data-active={theme === "light"}
        aria-hidden="true"
      />
      <Icon
        name="sun"
        className="theme-toggle__icon h-5 w-5"
        data-icon="sun"
        data-active={theme === "dark"}
        aria-hidden="true"
      />
    </button>
  );
}
