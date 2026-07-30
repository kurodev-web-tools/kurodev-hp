import "@/app/styles/guide-page.css";
import Image from "next/image";
import Link from "next/link";
import { ActionLink } from "@/components/ui/action-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { StatusBadge } from "@/components/ui/status-badge";
import { localizedTool, tools } from "@/lib/content/tool-content.mjs";
import { statusRules } from "@/lib/content/status.mjs";

const copy = {
  ja: {
    home: "ホーム",
    guide: "ガイド",
    updated: "更新日",
    tool: "対象",
    use: "ツールを使う",
    toolNames: {
      "kuro-stream-kit": "Kuro Stream Kit",
      "comment-translator": "Comment Translator",
      "creator-site": "クリエイターサイト"
    }
  },
  en: {
    home: "Home",
    guide: "Guide",
    updated: "Updated",
    tool: "Applies to",
    use: "Use this tool",
    toolNames: {
      "kuro-stream-kit": "Kuro Stream Kit",
      "comment-translator": "Comment Translator",
      "creator-site": "Creator websites"
    }
  }
};

function relatedToolAction(guide, locale) {
  if (!guide.toolAction) return null;
  const tool = tools.find((candidate) => candidate.id === guide.toolAction);
  if (!tool || !statusRules[tool.status].launchable || !tool.href) return null;
  return { ...localizedTool(tool, locale), href: tool.href };
}

function applicableToolName(guide, locale) {
  const tool = tools.find((candidate) => candidate.id === guide.applicableTool);
  return tool ? localizedTool(tool, locale).name : copy[locale].toolNames[guide.applicableTool];
}

function GuideInline({ nodes }) {
  return nodes.map((node, index) => {
    const key = `${node.type}-${index}`;
    if (node.type === "text") return node.value;
    if (node.type === "code") return <code key={key}>{node.value}</code>;
    if (node.type === "link") {
      const children = <GuideInline nodes={node.children} />;
      return node.href.startsWith("/")
        ? <Link href={node.href} key={key} prefetch={false}>{children}</Link>
        : <a href={node.href} key={key}>{children}</a>;
    }
    if (node.type === "image") {
      return (
        <Image
          key={key}
          src={node.src}
          alt={node.alt}
          width={node.width}
          height={node.height}
          loading="lazy"
          decoding="async"
        />
      );
    }
    return null;
  });
}

function GuideBlocks({ blocks }) {
  return blocks.map((block, index) => {
    const key = `${block.type}-${index}`;
    if (block.type === "heading") {
      return block.depth === 2
        ? <h2 key={key}><GuideInline nodes={block.children} /></h2>
        : <h3 key={key}><GuideInline nodes={block.children} /></h3>;
    }
    if (block.type === "paragraph") return <p key={key}><GuideInline nodes={block.children} /></p>;
    if (block.type === "codeBlock") return <pre key={key}><code>{block.value}</code></pre>;
    if (block.type === "list") {
      const items = block.items.map((item, itemIndex) => (
        <li key={`${key}-item-${itemIndex}`}><GuideBlocks blocks={item} /></li>
      ));
      return block.ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>;
    }
    return null;
  });
}

export function GuideArticlePage({ locale, guide }) {
  const labels = copy[locale];
  const tool = relatedToolAction(guide, locale);

  return (
    <article className="guide-article-page">
      <div className="site-container guide-article-shell">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: labels.home, href: "/" },
            { label: labels.guide, href: "/guide" },
            { label: guide.title }
          ]}
        />

        <header className="guide-article-header">
          <div className="guide-article-header__meta">
            <StatusBadge locale={locale} status={guide.status} />
            <span>{labels.updated} <time dateTime={guide.updatedAt}>{guide.updatedAt}</time></span>
          </div>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
          <dl className="guide-article-summary">
            <div><dt>{labels.tool}</dt><dd>{applicableToolName(guide, locale)}</dd></div>
          </dl>
        </header>

        <div className="guide-prose"><GuideBlocks blocks={guide.articleBlocks} /></div>

        {tool ? (
          <aside className="guide-tool-action" aria-label={labels.use}>
            <div><strong>{tool.name}</strong><p>{tool.summary}</p></div>
            <ActionLink
              href={tool.href}
              external
              externalLabel={locale === "ja" ? "（新しいタブで開きます）" : "(opens in a new tab)"}
            >
              {labels.use}
            </ActionLink>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
