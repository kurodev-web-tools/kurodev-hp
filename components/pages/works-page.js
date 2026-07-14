import { ActionLink } from "@/components/ui/action-link";
import { ProductMedia } from "@/components/ui/product-media";
import { localePath } from "@/lib/i18n.mjs";
import {
  getPublicationApprovedWorks,
  localizedWork,
  workCategoryOrder
} from "@/lib/content/work-content.mjs";

const categoryCopy = {
  ja: {
    flagship: { eyebrow: "Flagship", title: "中心となるプロダクト", body: "企画、情報設計、実装、改善を継続して扱うkurodevの旗艦プロダクトです。" },
    published: { eyebrow: "Published work", title: "公開中の制作基盤", body: "公開範囲と根拠を確認できる実績だけを掲載します。" },
    "research-development": { eyebrow: "Research and development", title: "研究・開発", body: "開発中・検討中の取り組みは、公開できる範囲が確認できたものだけを低い優先度で掲載します。" }
  },
  en: {
    flagship: { eyebrow: "Flagship", title: "The product at the center of the work", body: "kurodev's flagship product, shaped continuously across planning, information architecture, implementation, and improvement." },
    published: { eyebrow: "Published work", title: "Public production foundations", body: "Only work with a verified publication scope and evidence is included." },
    "research-development": { eyebrow: "Research and development", title: "Research and development", body: "In-development and conceptual work stays lower in priority and appears only when its public scope is verified." }
  }
};

export function WorksPage({ locale }) {
  const approvedWorks = getPublicationApprovedWorks();
  const groups = Object.keys(workCategoryOrder).map((category) => ({
    category,
    works: approvedWorks.filter((work) => work.category === category)
  }));

  return (
    <div className="works-page">
      <header className="works-index-hero">
        <div className="site-container works-index-hero__layout">
          <p>{locale === "ja" ? "Selected works" : "Selected works"}</p>
          <h1>{locale === "ja" ? <>実装したものを、<span>確かな範囲で伝える。</span></> : <>Work presented with <span>clear public boundaries.</span></>}</h1>
          <p>{locale === "ja" ? "旗艦プロダクト、公開中の制作基盤、研究・開発を同じ重さにせず、確認できる根拠とともに紹介します。" : "Flagship product work, published foundations, and research are separated by priority and shown only within verified public boundaries."}</p>
        </div>
      </header>

      {groups.map((group) => {
        const copy = categoryCopy[locale][group.category];
        const isFlagship = group.category === "flagship";
        return (
          <section key={group.category} className={`section-block section-rule works-group works-group--${group.category}`} data-work-category={group.category}>
            <div className="site-container">
              <div className="works-group__intro"><p>{copy.eyebrow}</p><h2>{copy.title}</h2><span>{copy.body}</span></div>
              {group.works.length > 0 ? (
                <div className="works-group__items">
                  {group.works.map((work) => {
                    const localized = localizedWork(work, locale);
                    const href = work.external ? work.href : localePath(locale, work.href);
                    return (
                      <article key={work.id} className={`work-card${isFlagship ? " work-card--flagship" : ""}`}>
                        {work.image ? <ProductMedia src={work.image} alt={localized.alt} width={work.imageWidth} height={work.imageHeight} priority={isFlagship} /> : null}
                        <div className="work-card__copy">
                          <p>{isFlagship ? "Flagship product" : "Published foundation"}</p>
                          <h3>{localized.title}</h3>
                          <span>{localized.summary}</span>
                          <ActionLink
                            href={href}
                            external={work.external}
                            externalLabel={locale === "ja" ? "（新しいタブで開きます）" : "(opens in a new tab)"}
                            variant={isFlagship ? "primary" : "secondary"}
                          >
                            {isFlagship
                              ? (locale === "ja" ? "ケーススタディを見る" : "Read the case study")
                              : (locale === "ja" ? "公開サイトを見る" : "Visit the public site")}
                          </ActionLink>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : <p className="works-group__empty">{locale === "ja" ? "公開範囲を確認できた取り組みのみ、ここに追加します。" : "Only work with a verified public scope will be added here."}</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
