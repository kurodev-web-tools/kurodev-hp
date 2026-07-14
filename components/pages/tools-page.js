import { CreatorServiceBridge } from "@/components/sections/creator-service-bridge";
import { ToolGettingStarted } from "@/components/sections/tool-getting-started";
import { ToolProductSection } from "@/components/sections/tool-product-section";
import { ToolWorkflow } from "@/components/sections/tool-workflow";
import { ProductMedia } from "@/components/ui/product-media";
import { SectionIntro } from "@/components/ui/section-intro";
import { homeGuides } from "@/lib/content/guide-registry.mjs";
import { siteCopy } from "@/lib/content/site-copy.mjs";
import { tools } from "@/lib/content/tool-content.mjs";
import { getPublicationApprovedWorkBySlug } from "@/lib/content/work-content.mjs";

export function ToolsPage({ locale }) {
  const copy = siteCopy[locale].toolsPage;
  const flagship = getPublicationApprovedWorkBySlug("kuro-stream-kit");

  return (
    <>
      <section className="tools-hero">
        <div className="site-container tools-hero__grid">
          <div className="tools-hero__copy">
            <p className="tools-hero__eyebrow">{copy.hero.eyebrow}</p>
            <h1>
              {copy.hero.titleLines
                ? copy.hero.titleLines.map((line) => <span key={line} className="tools-hero__title-line">{line}</span>)
                : copy.hero.title}
            </h1>
            <p className="tools-hero__body">{copy.hero.body}</p>
            <p className="tools-hero__inventory">
              <span>{copy.hero.inventoryLabel}</span>
              <strong>{copy.hero.inventoryValue}</strong>
            </p>
          </div>
          {flagship ? (
            <div className="tools-hero__stage">
              <ProductMedia
                src={flagship.image}
                alt={flagship[locale].alt}
                width={flagship.imageWidth}
                height={flagship.imageHeight}
                priority
              />
            </div>
          ) : null}
        </div>
      </section>

      <ToolWorkflow locale={locale} copy={copy.workflow} tools={tools} />

      <section className="section-block section-rule tools-products" aria-labelledby="tools-products-title">
        <div className="site-container">
          <div id="tools-products-title">
            <SectionIntro eyebrow={copy.products.eyebrow} title={copy.products.title} titleLines={copy.products.titleLines} body={copy.products.body} />
          </div>
          <div className="tools-products__list">
            {tools.map((tool, index) => <ToolProductSection key={tool.id} locale={locale} tool={tool} index={index} />)}
          </div>
        </div>
      </section>

      <ToolGettingStarted locale={locale} copy={copy.gettingStarted} guides={homeGuides} />
      <CreatorServiceBridge locale={locale} copy={siteCopy[locale].home.service} />
    </>
  );
}
