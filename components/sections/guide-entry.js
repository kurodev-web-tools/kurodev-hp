import Link from "next/link";
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
            <Link key={guide.id} className="guide-list__item" href={guide[locale].href}>
              <span><strong>{guide[locale].title}</strong><small>{guide[locale].description}</small></span>
              <span className="guide-list__arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
