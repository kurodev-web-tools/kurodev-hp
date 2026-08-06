import "@/app/styles/creator-site.css";
import { CreatorRecognition } from "@/components/sections/creator-recognition";
import { ServiceFaq } from "@/components/sections/service-faq";
import { ServiceProcess } from "@/components/sections/service-process";
import { ServiceRoutes } from "@/components/sections/service-routes";
import { SiteOutcomes } from "@/components/sections/site-outcomes";
import { ActionLink } from "@/components/ui/action-link";
import { DisplayLines } from "@/components/ui/section-intro";
import { siteCopy } from "@/lib/content/site-copy.mjs";

export function CreatorSitePage({ locale }) {
  const copy = siteCopy[locale].creatorSite;

  return (
    <div className="creator-site-page">
      <section className="creator-site-hero">
        <div className="site-container creator-site-hero__layout">
          <div className="creator-site-hero__copy">
            <p className="creator-site-hero__eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.titleLines ? <DisplayLines lines={copy.hero.titleLines} mobileLines={copy.hero.mobileLines} tabletLines={copy.hero.tabletLines} desktopLines={copy.hero.titleLines} /> : copy.hero.title}</h1>
            <p>{copy.hero.body}</p>
            <ActionLink href={copy.hero.href}>{copy.hero.action}</ActionLink>
          </div>
          <div className="creator-site-hero__stage" aria-label={locale === "ja" ? "クリエイターサイトの情報構成例" : "Example creator website information structure"}>
            <div className="creator-site-hero__sitebar"><span>kurodev / creator</span><i /></div>
            <div className="creator-site-hero__profile"><b>Creator</b><span>Profile · Archive · Contact</span></div>
            <div className="creator-site-hero__blocks" aria-hidden="true"><i /><i /><i /></div>
            <div className="creator-site-hero__links">YouTube <span /> Social <span /> Contact</div>
          </div>
        </div>
      </section>
      <CreatorRecognition copy={copy.recognition} />
      <SiteOutcomes locale={locale} outcomes={copy.outcomes} workflow={copy.workflow} demonstrations={copy.demonstrations} />
      <ServiceProcess copy={copy.process} />
      <ServiceRoutes copy={copy.routes} />
      <ServiceFaq copy={copy.faq} />
      <section className="section-block section-rule creator-site-final">
        <div className="site-container creator-site-final__layout"><div><h2>{copy.final.titleLines ? <DisplayLines lines={copy.final.titleLines} mobileLines={copy.final.mobileLines} tabletLines={copy.final.tabletLines} desktopBreakAfter={copy.final.desktopBreakAfter} /> : copy.final.title}</h2><p>{copy.final.body}</p></div><ActionLink href={copy.final.href}>{copy.final.action}</ActionLink></div>
      </section>
    </div>
  );
}
