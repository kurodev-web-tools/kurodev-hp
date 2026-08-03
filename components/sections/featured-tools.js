import { ProductMedia } from "@/components/ui/product-media";
import { SectionIntro } from "@/components/ui/section-intro";
import { StatusBadge } from "@/components/ui/status-badge";
import { localizedTool } from "@/lib/content/tool-content.mjs";

export function FeaturedTools({ locale, copy, tools }) {
  return (
    <section id="tools" className="section-block section-rule">
      <div className="site-container">
        <SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} body={copy.body} />
        <div className="featured-tools">
          {tools.map((tool) => {
            const item = localizedTool(tool, locale);
            return (
              <article key={tool.id} className="tool-feature" id={tool.id}>
                <ProductMedia src={tool.image} alt={item.alt} width={tool.imageWidth} height={tool.imageHeight} />
                <div className="tool-feature__copy">
                  <div className="tool-feature__meta"><span>{item.name}</span><StatusBadge locale={locale} status={tool.status} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
