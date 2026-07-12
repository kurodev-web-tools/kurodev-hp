import { ActionLink } from "@/components/ui/action-link";
import { ProductMedia } from "@/components/ui/product-media";
import { localePath } from "@/lib/i18n.mjs";

export function CreatorHero({ locale, copy }) {
  return (
    <section className="creator-hero">
      <div className="site-container creator-hero__grid">
        <div className="creator-hero__copy">
          <p className="creator-hero__eyebrow">kurodev creator studio</p>
          <h1>
            {copy.titleLines
              ? copy.titleLines.map((line) => <span key={line} className="creator-hero__title-line">{line}</span>)
              : copy.title}
          </h1>
          <p className="creator-hero__body">{copy.body}</p>
          <div className="creator-hero__actions">
            <ActionLink href={localePath(locale, "/tools")}>{copy.toolsAction}</ActionLink>
            <ActionLink href={localePath(locale, "/creator-site")} variant="secondary">{copy.websiteAction}</ActionLink>
          </div>
        </div>
        <div className="product-stage" aria-label={locale === "ja" ? "Kuro Stream Kit 製品画面" : "Kuro Stream Kit product screens"}>
          <ProductMedia className="product-stage__support product-stage__support--schedule" src="/images/kuro-stream-kit/schedule-calendar.png" alt="" width={1440} height={900} />
          <ProductMedia className="product-stage__main" src="/images/kuro-stream-kit/portal-home.png" alt={locale === "ja" ? "Kuro Stream Kitのホームと公開中ツール一覧" : "Kuro Stream Kit home and available tools overview"} width={1440} height={900} priority />
          <ProductMedia className="product-stage__support product-stage__support--thumbnail" src="/images/kuro-stream-kit/thumbnail-editor.png" alt="" width={1440} height={900} />
        </div>
      </div>
    </section>
  );
}
