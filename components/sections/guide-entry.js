import { SectionIntro } from "@/components/ui/section-intro";

export function GuideEntry({ locale, guides }) {
  const title = locale === "ja" ? "迷ったときに、次の一手がわかるガイド。" : "Guides that make the next step clear.";
  const titleLines = locale === "ja" ? ["迷ったときに、", "次の一手がわかる", "ガイド。"] : null;
  return (
    <section id="guide" className="section-block section-rule">
      <div className="site-container">
        <SectionIntro eyebrow="Guide" title={title} titleLines={titleLines} />
        <div className="guide-list">
          {guides.map((guide) => (
            <article key={guide.id} className="guide-list__item">
              <span><strong>{guide[locale].title}</strong><small>{guide[locale].description}</small></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
