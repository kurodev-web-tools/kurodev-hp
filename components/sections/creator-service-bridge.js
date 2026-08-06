import { ActionLink } from "@/components/ui/action-link";
import { SectionIntro } from "@/components/ui/section-intro";
import { localePath } from "@/lib/i18n.mjs";

export function CreatorServiceBridge({ locale, copy }) {
  return (
    <section id="creator-websites" className="section-block service-bridge">
      <div className="site-container service-bridge__panel">
        <SectionIntro eyebrow="Creator websites" title={copy.title} titleLines={copy.titleLines} tabletLines={copy.tabletLines} body={copy.body} />
        <div className="service-bridge__visual" aria-hidden="true"><span /><span /><span /></div>
        <ActionLink href={localePath(locale, "/creator-site")}>{locale === "ja" ? "HP制作について見る" : "Explore creator websites"}</ActionLink>
      </div>
    </section>
  );
}
