"use client";

import { usePathname } from "next/navigation";
import { guideLanguageTarget } from "@/lib/content/guide-routes.mjs";
import { equivalentLocalePath, pathnameLocale, unlocalizedPath } from "@/lib/i18n.mjs";

const pairedRoutes = ["/", "/tools", "/creator-site", "/works", "/works/kuro-stream-kit", "/guide", "/about", "/contact", "/terms", "/privacy", "/privacy/foreign-processing"];

export function LanguageSwitch({ compact = false }) {
  const pathname = usePathname();
  const locale = pathnameLocale(pathname);
  const targetLocale = locale === "ja" ? "en" : "ja";
  const href = unlocalizedPath(pathname).startsWith("/guide/")
    ? guideLanguageTarget(pathname, targetLocale)
    : equivalentLocalePath(targetLocale, unlocalizedPath(pathname), pairedRoutes);
  const label = targetLocale === "en" ? "EN" : "日本語";

  return (
    <a
      className="header-control language-switch"
      href={href}
      hrefLang={targetLocale}
      lang={targetLocale}
      onClick={() => window.localStorage.setItem("kurodev-locale", targetLocale)}
      aria-label={targetLocale === "en" ? "日本語 / EN: View this site in English" : "日本語 / EN: 日本語で表示"}
    >
      <span aria-hidden="true">{compact ? label : `日本語 / EN`}</span>
    </a>
  );
}
