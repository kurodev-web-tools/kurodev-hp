import Link from "next/link";
import { SectionIntro } from "@/components/ui/section-intro";

export function ToolGettingStarted({ locale, copy, guides }) {
  const recommendations = guides.slice(0, 3);

  return (
    <section className="section-block section-rule tool-getting-started" aria-labelledby="tool-getting-started-title">
      <div className="site-container tool-getting-started__layout">
        <div id="tool-getting-started-title">
          <SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} body={copy.body} />
        </div>
        <ol className="tool-getting-started__list">
          {recommendations.map((guide, index) => (
            <li key={guide.id}>
              <Link href={guide[locale].href}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{guide[locale].title}</strong>
                  <p>{guide[locale].description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
