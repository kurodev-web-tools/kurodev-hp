import Link from "next/link";
import { localePath } from "@/lib/i18n.mjs";

export function Breadcrumbs({ locale, items }) {
  return (
    <nav className="breadcrumbs" aria-label={locale === "ja" ? "パンくずリスト" : "Breadcrumbs"}>
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href
              ? <Link href={localePath(locale, item.href)} prefetch={false}>{item.label}</Link>
              : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
