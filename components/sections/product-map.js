import { SectionIntro } from "@/components/ui/section-intro";

export function ProductMap({ copy, stages }) {
  return (
    <section className="section-block section-rule product-map" data-case-section="product-map">
      <div className="site-container product-map__layout">
        <SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} body={copy.body} />
        <ol className="product-map__steps">
          {stages.map((stage) => {
            const label = copy.labels[stage.id];
            return (
              <li key={stage.id}>
                <span>{label.step}</span>
                <div><h3>{label.title}</h3><p>{label.body}</p></div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
