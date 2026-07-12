import { SectionIntro } from "@/components/ui/section-intro";

export function ServiceFaq({ copy }) {
  return (
    <section className="section-block section-rule service-faq" aria-labelledby="service-faq-title">
      <div className="site-container service-faq__layout">
        <div id="service-faq-title"><SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} body={copy.body} /></div>
        <div className="service-faq__list">
          {copy.items.map((item) => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}
