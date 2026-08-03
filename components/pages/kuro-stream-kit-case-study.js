import "@/app/styles/works-page.css";
import { ProductMap } from "@/components/sections/product-map";
import { WorkEvidence } from "@/components/sections/work-evidence";
import { ActionLink } from "@/components/ui/action-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PhraseAwareText } from "@/components/ui/phrase-aware-text";
import { ProductMedia } from "@/components/ui/product-media";
import { SectionIntro } from "@/components/ui/section-intro";
import { StatusBadge } from "@/components/ui/status-badge";
import { caseStudyContent } from "@/lib/content/work-content.mjs";
import { localizedTool, tools } from "@/lib/content/tool-content.mjs";
import { localePath } from "@/lib/i18n.mjs";

export function KuroStreamKitCaseStudy({ locale, work }) {
  const copy = caseStudyContent[locale];

  return (
    <article className="case-study-page">
      <header className="case-study-hero" data-case-section="hero">
        <div className="site-container">
          <Breadcrumbs locale={locale} items={copy.breadcrumbs} />
          <div className="case-study-hero__layout">
            <div className="case-study-hero__copy">
              <p>{copy.hero.eyebrow}</p>
              <h1>{copy.hero.titleLines.map((line) => <span key={line}>{line}</span>)}</h1>
              <div className="case-study-hero__summary"><span>Kuro Stream Kit</span><p>{copy.hero.body}</p></div>
            </div>
            <ProductMedia
              src={work.image}
              alt={work[locale].alt}
              width={work.imageWidth}
              height={work.imageHeight}
              priority
            />
          </div>
        </div>
      </header>

      <WorkEvidence data-case-section="problem" sectionId="problem" copy={copy.problem} compact />
      <ProductMap data-case-section="product-map" copy={copy.productMap} stages={caseStudyContent.productMap} />

      <section className="section-block section-rule case-tools" data-case-section="major-tools">
        <div className="site-container">
          <SectionIntro eyebrow={copy.tools.eyebrow} title={copy.tools.title} titleLines={copy.tools.titleLines} body={copy.tools.body} />
          <div className="case-tools__list">
            {tools.map((tool) => {
              const localized = localizedTool(tool, locale);
              return (
                <article key={tool.id} className="case-tool">
                  <ProductMedia src={tool.image} alt={localized.alt} width={tool.imageWidth} height={tool.imageHeight} />
                  <div className="case-tool__copy">
                    <div><span>{String(tool.order).padStart(2, "0")}</span><StatusBadge locale={locale} status={tool.status} /></div>
                    <h3>{localized.name}</h3>
                    <p><PhraseAwareText locale={locale} text={localized.outcome} /></p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <WorkEvidence data-case-section="responsibilities" sectionId="responsibilities" copy={copy.responsibilities} />
      <WorkEvidence data-case-section="principles" sectionId="principles" copy={copy.principles} />
      <WorkEvidence data-case-section="improvements" sectionId="improvements" copy={copy.improvements} />
      <WorkEvidence data-case-section="status" sectionId="status" copy={copy.status} compact />

      <section className="section-block section-rule case-actions" data-case-section="actions">
        <div className="site-container case-actions__layout">
          <SectionIntro eyebrow={copy.actions.eyebrow} title={copy.actions.title} titleLines={copy.actions.titleLines} body={copy.actions.body} />
          <div className="case-actions__links">
            {caseStudyContent.actions.map((action, index) => (
              <ActionLink key={action.id} href={localePath(locale, action.href)} variant={index === 0 ? "primary" : "secondary"}>
                {copy.actions.labels[action.id]}
              </ActionLink>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
