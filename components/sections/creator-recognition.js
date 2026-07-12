import { SectionIntro } from "@/components/ui/section-intro";

export function CreatorRecognition({ copy }) {
  return (
    <section className="section-block section-rule creator-recognition" aria-labelledby="creator-recognition-title">
      <div className="site-container creator-recognition__layout">
        <div id="creator-recognition-title">
          <SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} body={copy.body} />
        </div>
        <ol className="creator-recognition__list">
          {copy.items.map((item, index) => (
            <li key={item.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.body}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
