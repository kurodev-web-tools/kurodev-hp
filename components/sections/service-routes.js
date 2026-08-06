import { ActionLink } from "@/components/ui/action-link";
import { SectionIntro } from "@/components/ui/section-intro";

export function ServiceRoutes({ copy }) {
  return (
    <section className="section-block section-rule service-routes" aria-labelledby="service-routes-title">
      <div className="site-container service-routes__layout">
        <div id="service-routes-title"><SectionIntro eyebrow={copy.eyebrow} title={copy.title} titleLines={copy.titleLines} mobileLines={copy.mobileLines} tabletLines={copy.tabletLines} desktopBreakAfter={copy.desktopBreakAfter} body={copy.body} /></div>
        <div className="service-routes__items">
          {copy.items.map((route) => (
            <article className="service-route" key={route.id}>
              <div className="service-route__meta"><span>{route.title}</span><strong>{route.quoteLabel}</strong></div>
              <p>{route.body}</p>
              <dl><dt>Fit</dt><dd>{route.fit}</dd></dl>
              <ActionLink href={route.href} external={route.external}>{route.action}</ActionLink>
            </article>
          ))}
          <p className="service-routes__secondary">{copy.secondaryNote}</p>
        </div>
      </div>
    </section>
  );
}
