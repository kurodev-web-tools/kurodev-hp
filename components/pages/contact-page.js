import { ContactForm } from "@/components/contact-form";
import { ActionLink } from "@/components/ui/action-link";
import { siteCopy } from "@/lib/content/site-copy.mjs";

const supportHref = "mailto:feedback@kuro-lab.com?subject=Kuro%20Stream%20Kit%20feedback";

function renderHpPortal(text) {
  const [before, after] = text.split("HP-portal");
  if (after === undefined) return text;
  return <>{before}<span className="contact-brand-nowrap">HP-portal</span>{after}</>;
}

export function ContactPage({ locale }) {
  const copy = siteCopy[locale].contact;

  return (
    <div className={`contact-page contact-page--${locale}`}>
      <header className="contact-hero" data-contact-section="introduction">
        <div className="site-container contact-hero__layout">
          <div><p>{copy.intro.eyebrow}</p><h1>{copy.intro.titleLines.map((line, index) => <span key={line}>{index > 0 && locale === "en" ? " " : null}{line}</span>)}</h1><p>{copy.intro.body}</p></div>
          <aside><p>{copy.intro.supportLead}</p><a href={supportHref}>{copy.intro.supportAction}</a></aside>
        </div>
      </header>

      <section className="section-block section-rule contact-reassurance" data-contact-section="reassurance">
        <div className="site-container"><h2>{copy.reassurance.title}</h2><ul>{copy.reassurance.items.map((item) => <li key={item.id}><h3>{item.title}</h3><p>{item.body}</p></li>)}</ul></div>
      </section>

      <section className="section-block section-rule contact-form-section" data-contact-section="form">
        <div className="site-container contact-form-section__layout"><div><p>{copy.form.eyebrow}</p><h2>{copy.form.title}</h2><span>{copy.form.body}</span></div><ContactForm locale={locale} copy={copy.form} /></div>
      </section>

      <section className="section-block section-rule contact-pricing" data-contact-section="pricing">
        <div className="site-container contact-pricing__layout"><div><p>{copy.pricing.eyebrow}</p><h2>{renderHpPortal(copy.pricing.title)}</h2><span>{renderHpPortal(copy.pricing.body)}</span></div><ActionLink href={copy.pricing.href} external externalLabel={locale === "ja" ? "（新しいタブで開きます）" : "(opens in a new tab)"}>{copy.pricing.action}</ActionLink></div>
      </section>

      <section className="section-block section-rule contact-faq" data-contact-section="faq">
        <div className="site-container"><div className="contact-faq__intro"><p>{copy.faq.eyebrow}</p><h2>{copy.faq.title}</h2></div><div className="contact-faq__items">{copy.faq.items.map((item) => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div>
      </section>
    </div>
  );
}
