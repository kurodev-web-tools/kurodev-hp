"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, pathnameLocale } from "@/lib/i18n.mjs";
import { siteCopy } from "@/lib/content/site-copy.mjs";

export function SiteFooter() {
  const locale = pathnameLocale(usePathname());
  const navigation = siteCopy[locale].navigation;
  const legalLinks = locale === "ja"
    ? [["利用規約", "/terms"], ["プライバシー", "/privacy"], ["特定商取引法に基づく表記", "/legal/tokushoho"]]
    : [["Terms", "/terms"], ["Privacy", "/privacy"], ["Commercial disclosure (Japanese)", "/legal/tokushoho"]];

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <p className="wordmark">kurodev</p>
            <p>{locale === "ja" ? "クリエイターの発信基盤を、ツールとWeb制作で整えるパートナー。" : "A partner for clearer creator workflows, tools, and websites."}</p>
          </div>
          <nav className="site-footer__links" aria-label={locale === "ja" ? "プロダクトとサービス" : "Products and services"}>
            {navigation.slice(0, 3).map(([label, href]) => <Link key={href} className="site-footer__link" href={localePath(locale, href)} prefetch={false}>{label}</Link>)}
          </nav>
          <nav className="site-footer__links" aria-label={locale === "ja" ? "情報とお問い合わせ" : "Information and contact"}>
            {navigation.slice(3).map(([label, href]) => <Link key={href} className="site-footer__link" href={localePath(locale, href)} prefetch={false}>{label}</Link>)}
          </nav>
        </div>
        <div className="site-footer__legal">
          <span>© 2026 kurodev</span>
          {legalLinks.map(([label, href]) => <span key={href}>{label}</span>)}
        </div>
      </div>
    </footer>
  );
}
