"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/icon";

function subscribeToTheme(onStoreChange) {
  window.addEventListener("kurodev-theme-change", onStoreChange);
  return () => window.removeEventListener("kurodev-theme-change", onStoreChange);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme || "light";
}

function getServerThemeSnapshot() {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("kurodev-theme", nextTheme);
    window.dispatchEvent(new Event("kurodev-theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === "dark" ? "ライトテーマに切り替え" : "ダークテーマに切り替え"}
    >
      <Icon
        name="moon"
        className="theme-toggle__icon h-5 w-5"
        data-icon="moon"
        data-active={theme === "light" ? "true" : "false"}
        aria-hidden="true"
      />
      <Icon
        name="sun"
        className="theme-toggle__icon h-5 w-5"
        data-icon="sun"
        data-active={theme === "dark" ? "true" : "false"}
        aria-hidden="true"
      />
    </button>
  );
}
