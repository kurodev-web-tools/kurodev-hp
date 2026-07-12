"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { equivalentLocalePath, pathnameLocale, unlocalizedPath } from "@/lib/i18n.mjs";

const pairedRoutes = ["/", "/tools", "/creator-site", "/works", "/guide", "/about", "/contact", "/terms", "/privacy"];

export function LanguageSwitch({ compact = false }) {
  const pathname = usePathname();
  const locale = pathnameLocale(pathname);
  const targetLocale = locale === "ja" ? "en" : "ja";
  const href = equivalentLocalePath(targetLocale, unlocalizedPath(pathname), pairedRoutes);
  const label = targetLocale === "en" ? "EN" : "日本語";

  return (
    <Link
      className="header-control language-switch"
      href={href}
      prefetch={false}
      hrefLang={targetLocale}
      lang={targetLocale}
      onClick={() => window.localStorage.setItem("kurodev-locale", targetLocale)}
      aria-label={targetLocale === "en" ? "View this site in English" : "日本語で表示"}
    >
      <span aria-hidden="true">{compact ? label : `日本語 / EN`}</span>
    </Link>
  );
}
