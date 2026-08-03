import { SectionIntro } from "@/components/ui/section-intro";

export function SiteOutcomes({ locale, outcomes, workflow, demonstrations }) {
  return (
    <>
      <section className="section-block section-rule site-outcomes" aria-labelledby="site-outcomes-title">
        <div className="site-container site-outcomes__layout">
          <div id="site-outcomes-title"><SectionIntro eyebrow={outcomes.eyebrow} title={outcomes.title} titleLines={outcomes.titleLines} body={outcomes.body} /></div>
          <ul className="site-outcomes__list">
            {outcomes.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}
          </ul>
        </div>
        <div className="site-container creator-workflow">
          <div><SectionIntro eyebrow={workflow.eyebrow} title={workflow.title} titleLines={workflow.titleLines} body={workflow.body} /></div>
          <ul>{workflow.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
        </div>
      </section>

      <section className="section-block section-rule service-demonstrations" aria-labelledby="service-demonstrations-title">
        <div className="site-container">
          <div id="service-demonstrations-title"><SectionIntro eyebrow={demonstrations.eyebrow} title={demonstrations.title} titleLines={demonstrations.titleLines} body={demonstrations.body} /></div>
          <div className="service-demonstrations__list">
            {demonstrations.items.map((example) => (
              <article className="service-demo" key={example.id}>
                <div className={`service-demo__preview service-demo__preview--${example.id}`} aria-label={locale === "ja" ? `${example.name}のサンプルサイト構成` : `Sample site composition for ${example.name}`}>
                  <div className="service-demo__chrome"><i /><i /><i /></div>
                  <div className="service-demo__identity"><span>{example.name.slice(0, 1)}</span><div><strong>{example.name}</strong><small>{example.role}</small></div></div>
                  <div className="service-demo__sample-lines" aria-hidden="true"><i /><i /><i /></div>
                  <ul>{example.sections.map((section) => <li key={section}>{section}</li>)}</ul>
                </div>
                <div className="service-demo__copy">
                  <p className="service-demo__label">{example.label}</p>
                  <h3>{example.name}</h3>
                  <p>{example.summary}</p>
                  <small>{example.note}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
