import { ActionLink } from "@/components/ui/action-link";
import { ProductMedia } from "@/components/ui/product-media";
import { localePath } from "@/lib/i18n.mjs";

export function CreatorHero({ locale, copy, flagship, tools }) {
  const schedule = tools.find((tool) => tool.id === "schedule-calendar");
  const thumbnail = tools.find((tool) => tool.id === "thumbnail-editor");
  const hasProductStage = flagship && schedule && thumbnail;

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
        {hasProductStage ? (
          <div className="product-stage" aria-label={locale === "ja" ? "Kuro Stream Kit 製品画面" : "Kuro Stream Kit product screens"}>
            <ProductMedia className="product-stage__support product-stage__support--schedule" src={schedule.image} alt="" width={schedule.imageWidth} height={schedule.imageHeight} />
            <ProductMedia className="product-stage__main" src={flagship.image} alt={flagship[locale].alt} width={flagship.imageWidth} height={flagship.imageHeight} priority />
            <ProductMedia className="product-stage__support product-stage__support--thumbnail" src={thumbnail.image} alt="" width={thumbnail.imageWidth} height={thumbnail.imageHeight} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
