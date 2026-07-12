import { ActionLink } from "@/components/ui/action-link";
import { ProductMedia } from "@/components/ui/product-media";
import { StatusBadge } from "@/components/ui/status-badge";
import { localizedTool } from "@/lib/content/tool-content.mjs";
import { statusRules } from "@/lib/content/status.mjs";
import { localePath } from "@/lib/i18n.mjs";

export function ToolProductSection({ locale, tool, index }) {
  const item = localizedTool(tool, locale);
  const canLaunch = statusRules[tool.status].launchable && tool.href;
  const labels = locale === "ja"
    ? { outcome: "できること", suitableFor: "こんな方へ", use: "ツールを使う", guide: "使い方を見る" }
    : { outcome: "Outcome", suitableFor: "Best for", use: "Use this tool", guide: "Read the guide" };

  return (
    <article className="tool-product" id={tool.id}>
      <div className="tool-product__media">
        <ProductMedia src={tool.image} alt={item.alt} width={1440} height={900} priority={index === 0} />
      </div>
      <div className="tool-product__copy">
        <div className="tool-product__meta">
          <span>{String(index + 1).padStart(2, "0")} / {item.name}</span>
          <StatusBadge locale={locale} status={tool.status} />
        </div>
        <h3>{item.title}</h3>
        <p className="tool-product__summary">{item.summary}</p>
        <dl className="tool-product__details">
          <div><dt>{labels.outcome}</dt><dd>{item.outcome}</dd></div>
          <div><dt>{labels.suitableFor}</dt><dd>{item.suitableFor}</dd></div>
        </dl>
        {canLaunch || tool.guideHref ? (
          <div className="tool-product__actions">
            {canLaunch ? <ActionLink href={tool.href} external>{labels.use}</ActionLink> : null}
            {tool.guideHref ? <ActionLink href={localePath(locale, tool.guideHref)} variant="secondary">{labels.guide}</ActionLink> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
