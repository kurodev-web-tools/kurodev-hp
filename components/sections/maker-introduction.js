import { ActionLink } from "@/components/ui/action-link";
import { SectionIntro } from "@/components/ui/section-intro";
import { localePath } from "@/lib/i18n.mjs";

export function MakerIntroduction({ locale, copy }) {
  return (
    <section id="about" className="section-block section-rule maker-intro">
      <div className="site-container maker-intro__grid">
        <div className="maker-intro__mark" aria-hidden="true">k</div>
        <div><SectionIntro eyebrow="kurodev" title={copy.title} titleLines={copy.titleLines} mobileLines={copy.mobileLines} tabletLines={copy.tabletLines} body={copy.body} /><ActionLink href={localePath(locale, "/about")} variant="quiet">{locale === "ja" ? "kurodevについて" : "About kurodev"}</ActionLink></div>
      </div>
    </section>
  );
}
