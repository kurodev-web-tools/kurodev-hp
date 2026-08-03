import { ActionLink } from "@/components/ui/action-link";
import { localePath } from "@/lib/i18n.mjs";

export function FinalActions({ locale, copy }) {
  return (
    <section className="section-block final-actions">
      <div className="site-container final-actions__inner">
        <div><h2>{copy.titleLines ? copy.titleLines.map((line) => <span key={line} className="display-line">{line}</span>) : copy.title}</h2><p>{copy.body}</p></div>
        <div className="final-actions__links">
          <ActionLink href={localePath(locale, "/tools")}>{locale === "ja" ? "無料ツールを見る" : "Explore free tools"}</ActionLink>
          <ActionLink href={localePath(locale, "/contact")} variant="secondary">{locale === "ja" ? "HP制作を相談する" : "Discuss a creator website"}</ActionLink>
        </div>
      </div>
    </section>
  );
}
