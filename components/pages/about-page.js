import "@/app/styles/about-page.css";
import { ActionLink } from "@/components/ui/action-link";
import { DisplayLines } from "@/components/ui/section-intro";
import { siteCopy } from "@/lib/content/site-copy.mjs";
import { localePath } from "@/lib/i18n.mjs";

export function AboutPage({ locale }) {
  const copy = siteCopy[locale].about;

  return (
    <div className={`about-page about-page--${locale}`}>
      <header className="about-hero">
        <div className="site-container about-hero__layout">
          <p>{copy.hero.eyebrow}</p>
          <h1>{copy.hero.titleLines.map((line, index) => <span key={line}>{index > 0 && locale === "en" ? " " : null}{line}</span>)}</h1>
          <p>{copy.hero.body}</p>
        </div>
      </header>

      <section className="section-block section-rule about-purpose">
        <div className="site-container about-purpose__layout">
          <div><p>{copy.purpose.eyebrow}</p><h2>{copy.purpose.tabletLines ? <DisplayLines lines={[copy.purpose.title]} tabletLines={copy.purpose.tabletLines} /> : copy.purpose.title}</h2></div>
          <div><p>{copy.purpose.body}</p><p className="about-purpose__note">{copy.purpose.note}</p></div>
        </div>
      </section>

      <section className="section-block section-rule about-focus">
        <div className="site-container about-focus__layout">
          <div><p>{copy.creatorFocus.eyebrow}</p><h2>{copy.creatorFocus.tabletLines ? <DisplayLines lines={[copy.creatorFocus.title]} tabletLines={copy.creatorFocus.tabletLines} /> : copy.creatorFocus.title}</h2></div>
          <p>{copy.creatorFocus.body}</p>
        </div>
      </section>

      <section className="section-block section-rule about-process">
        <div className="site-container">
          <div className="about-section-intro"><p>{copy.process.eyebrow}</p><h2>{copy.process.titleLines ? <DisplayLines lines={copy.process.titleLines} tabletLines={copy.process.tabletLines} desktopBreakAfter={copy.process.desktopBreakAfter} mobileLocked={false} /> : copy.process.title}</h2></div>
          <ol>{copy.process.items.map((item, index) => <li key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="section-block section-rule about-scope">
        <div className="site-container about-scope__layout">
          <div><p>{copy.scope.eyebrow}</p><h2>{copy.scope.title}</h2><span>{copy.scope.body}</span></div>
          <ul>{copy.scope.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="section-block section-rule about-flagship">
        <div className="site-container about-flagship__layout">
          <div><p>{copy.flagship.eyebrow}</p><h2>{copy.flagship.title}</h2><span>{copy.flagship.body}</span></div>
          <div className="about-flagship__actions">{copy.flagship.actions.map((action) => <ActionLink key={action.id} href={localePath(locale, action.href)} variant={action.variant}>{action.label}</ActionLink>)}</div>
        </div>
      </section>
    </div>
  );
}
