import "@/app/styles/guide-page.css";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";

const copy = {
  ja: {
    eyebrow: "Guide",
    title: "配信準備と活動発信を、確認しながら進めるガイド。",
    body: "公開状態を確認したツールの基本操作と、クリエイターサイトを整えるための資料をまとめています。",
    unavailable: "このガイドは英語版がまだありません。日本語ガイドの一覧を表示しています。",
    updated: "更新日",
    open: "ガイドを読む"
  },
  en: {
    eyebrow: "Guide",
    title: "Practical guides for stream preparation and creator activity.",
    body: "Start with verified tool instructions and focused guidance for organizing your creator presence.",
    unavailable: "This guide is not available in English yet. The English guide index is shown instead.",
    updated: "Updated",
    open: "Read guide"
  }
};

const categoryLabels = {
  ja: {
    "getting-started": "はじめに",
    "schedule-calendar": "配信予定",
    "thumbnail-editor": "サムネイルと告知",
    "sns-split-image-maker": "SNS投稿",
    "comment-translator": "コメント対応",
    "creator-site": "クリエイターサイトと問い合わせ導線"
  },
  en: {
    "getting-started": "Getting started",
    "schedule-calendar": "Schedules",
    "thumbnail-editor": "Thumbnails and announcements",
    "sns-split-image-maker": "Social posting",
    "comment-translator": "Comment handling",
    "creator-site": "Creator websites and inquiry routes"
  }
};

function groupedGuides(guides) {
  const groups = new Map();
  guides.forEach((guide) => {
    const existing = groups.get(guide.category) ?? [];
    existing.push(guide);
    groups.set(guide.category, existing);
  });
  return [...groups.entries()];
}

export function GuideIndexPage({ locale, guides, translationUnavailable = false }) {
  const labels = copy[locale];

  return (
    <div className="guide-index-page">
      <section className="guide-index-hero">
        <div className="site-container guide-index-hero__content">
          <p className="guide-index-hero__eyebrow">{labels.eyebrow}</p>
          <h1>{labels.title}</h1>
          <p>{labels.body}</p>
          {translationUnavailable ? <p className="guide-availability-notice" role="status">{labels.unavailable}</p> : null}
        </div>
      </section>

      <div className="site-container guide-index-groups">
        {groupedGuides(guides).map(([category, categoryGuides]) => (
          <section className="guide-index-group" key={category} aria-labelledby={`guide-category-${category}`}>
            <h2 id={`guide-category-${category}`}>{categoryLabels[locale][category]}</h2>
            <div className="guide-index-list">
              {categoryGuides.map((guide) => (
                <article className="guide-index-item" key={guide.route}>
                  <div className="guide-index-item__meta">
                    <StatusBadge locale={locale} status={guide.status} />
                    <span>{labels.updated} <time dateTime={guide.updatedAt}>{guide.updatedAt}</time></span>
                  </div>
                  <h3><Link href={guide.route} prefetch={false}>{guide.title}</Link></h3>
                  <p>{guide.description}</p>
                  <Link className="guide-index-item__link" href={guide.route} prefetch={false}>{labels.open}</Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
