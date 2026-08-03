import { SectionIntro } from "@/components/ui/section-intro";

export function WorkEvidence({ sectionId, copy, compact = false }) {
  const comparisonClass = copy.comparisons ? " work-evidence--comparisons" : "";

  return (
    <section className={`section-block section-rule work-evidence${compact ? " work-evidence--compact" : ""}${comparisonClass}`} data-case-section={sectionId}>
      <div className="site-container work-evidence__layout">
        <SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} body={copy.body} />
        {copy.items ? (
          <ol className="work-evidence__items">
            {copy.items.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
              </li>
            ))}
          </ol>
        ) : null}
        {copy.comparisons ? (
          <div className="work-evidence__comparisons">
            {copy.comparisons.map((comparison, index) => (
              <article key={comparison.after}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <dl>
                  <div><dt>Before</dt><dd>{comparison.before}</dd></div>
                  <div><dt>Current</dt><dd>{comparison.after}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
