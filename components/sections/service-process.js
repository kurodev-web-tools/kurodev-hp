import { SectionIntro } from "@/components/ui/section-intro";

export function ServiceProcess({ copy }) {
  return (
    <section className="section-block section-rule service-process" aria-labelledby="service-process-title">
      <div className="site-container">
        <div id="service-process-title"><SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} mobileLines={copy.mobileLines} tabletLines={copy.tabletLines} desktopBreakAfter={copy.desktopBreakAfter} mobileLocked={false} body={copy.body} /></div>
        <ol className="service-process__list">
          {copy.items.map((item, index) => <li key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
