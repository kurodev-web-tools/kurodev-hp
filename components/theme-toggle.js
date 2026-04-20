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
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel-muted)] text-[var(--text)] transition hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
      aria-label="Toggle theme"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} className="h-5 w-5" />
    </button>
  );
}
