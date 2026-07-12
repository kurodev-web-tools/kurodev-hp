"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitch } from "@/components/layout/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { Icon } from "@/components/ui/icon";
import { localePath, pathnameLocale, unlocalizedPath } from "@/lib/i18n.mjs";
import { siteCopy } from "@/lib/content/site-copy.mjs";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = pathnameLocale(pathname);
  const navigation = siteCopy[locale].navigation;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!menuOpen) {
      if (dialog.open) dialog.close();
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector("a")?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialog.querySelectorAll("a, button"));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (dialog.open) dialog.close();
    };
  }, [menuOpen]);

  const currentPath = unlocalizedPath(pathname);

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link className="wordmark" href={localePath(locale, "/")} prefetch={false} aria-label="kurodev home">kurodev</Link>
        <nav className="site-header__desktop" aria-label={locale === "ja" ? "メインナビゲーション" : "Main navigation"}>
          {navigation.slice(0, -1).map(([label, href]) => (
            <Link key={href} href={localePath(locale, href)} prefetch={false} aria-current={currentPath === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="site-header__utilities">
          <LanguageSwitch />
          <ThemeToggle />
          <Link className="action-link action-link--primary" href={localePath(locale, "/contact")} prefetch={false}>{navigation.at(-1)[0]} <Icon name="arrow" /></Link>
        </div>
        <div className="site-header__mobile-tools">
          <LanguageSwitch compact />
          <button
            ref={menuButtonRef}
            className="header-control menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
            aria-label={menuOpen ? (locale === "ja" ? "メニューを閉じる" : "Close menu") : (locale === "ja" ? "メニューを開く" : "Open menu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>
      <dialog
        id="mobile-site-menu"
        ref={dialogRef}
        className="mobile-menu"
        aria-label={locale === "ja" ? "サイトメニュー" : "Site menu"}
        onCancel={(event) => {
          event.preventDefault();
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
          <nav className="mobile-menu__nav">
            {navigation.map(([label, href]) => (
              <Link key={href} className="mobile-menu__link" href={localePath(locale, href)} prefetch={false} aria-current={currentPath === href ? "page" : undefined}>
                {label}<Icon name="arrow" />
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between"><span>{locale === "ja" ? "表示テーマ" : "Theme"}</span><ThemeToggle /></div>
      </dialog>
    </header>
  );
}
