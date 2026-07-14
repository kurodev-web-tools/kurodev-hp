export const workCategoryOrder = {
  flagship: 1,
  published: 2,
  "research-development": 3
};

export const works = [
  {
    id: "kuro-stream-kit",
    slug: "kuro-stream-kit",
    category: "flagship",
    status: "published",
    publicationApproved: true,
    publicationScope: "flagship product summary, case-study route, and verified product media",
    evidenceSource:
      "launch-content-manifest:publication-safe-product-media; owner-attestation:task9-owner-approval-2026-07-13-v5; owner-record-input:2026-07-13",
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    image: "/images/kuro-stream-kit/portal-home.png",
    imageWidth: 1920,
    imageHeight: 1080,
    href: "/works/kuro-stream-kit",
    external: false,
    responsibilities: ["product-planning", "information-architecture", "frontend", "accessibility"],
    outcomeEvidence: ["qualitative-workflow-clarity", "responsive-product-surface"],
    ja: {
      title: "Kuro Stream Kit",
      summary: "配信準備の流れに合わせて、予定・告知画像・SNS投稿素材を整えるクリエイターツール群。",
      alt: "Kuro Stream Kitの製品ホーム画面"
    },
    en: {
      title: "Kuro Stream Kit",
      summary: "A creator tool suite for organizing schedules, announcement visuals, and social-ready assets around stream preparation.",
      alt: "Kuro Stream Kit product home screen"
    }
  },
  {
    id: "hp-portal",
    slug: "hp-portal",
    category: "published",
    status: "published",
    publicationApproved: true,
    publicationScope: "public template-platform summary, publication-safe media, and public destination",
    evidenceSource: "owner-reviewed-creator-site-scope:2026-07-12; owner-record-and-media-input:2026-07-13",
    publishedAt: "2026-03-16",
    updatedAt: "2026-04-06",
    image: "/images/works/hp-portal.png",
    imageWidth: 1200,
    imageHeight: 630,
    href: "https://templates.kuro-lab.com/",
    external: true,
    responsibilities: ["template-foundation", "maintainable-site-structure"],
    outcomeEvidence: ["qualitative-maintainability"],
    ja: {
      title: "HP-portal",
      summary: "公開後も情報を育てやすい、Web制作テンプレート基盤。",
      alt: "HP-portalのWebサイトテンプレートを紹介するキービジュアル"
    },
    en: {
      title: "HP-portal",
      summary: "A template foundation for websites designed to remain maintainable after launch.",
      alt: "Key visual introducing HP-portal website templates"
    }
  }
];

export const caseStudyContent = {
  sectionOrder: [
    "hero",
    "problem",
    "product-map",
    "major-tools",
    "responsibilities",
    "principles",
    "improvements",
    "status",
    "actions"
  ],
  productMap: [
    { id: "plan", toolId: "schedule-calendar" },
    { id: "prepare", toolId: "thumbnail-editor" },
    { id: "publish", toolId: "sns-split" }
  ],
  actions: [
    { id: "tools", href: "/tools" },
    { id: "creator-site", href: "/creator-site" }
  ],
  ja: {
    breadcrumbs: [
      { label: "ホーム", href: "/" },
      { label: "実績", href: "/works" },
      { label: "Kuro Stream Kit" }
    ],
    hero: {
      eyebrow: "Flagship case study",
      title: "配信準備の流れを、迷いにくい道具へ。",
      titleLines: ["配信準備の流れを、", "迷いにくい道具へ。"],
      body: "Kuro Stream Kitは、配信予定、告知画像、SNS投稿素材を、それぞれの作業に集中して整えるクリエイターツール群です。"
    },
    problem: {
      eyebrow: "Creator workflow",
      title: "準備ごとに分かれる判断を、必要な作業からたどれるようにする。",
      titleLines: ["準備ごとに分かれる判断を、", "必要な作業からたどれるようにする。"],
      body: "配信前には、予定の整理、告知画像の作成、SNS投稿用素材の準備など、性質の異なる作業が続きます。各ツールは独立し、今必要な作業へ直接進める構成です。"
    },
    productMap: {
      eyebrow: "Current product map",
      title: "現在公開を確認できる3つの入口",
      titleLines: ["現在公開を確認できる", "3つの入口"],
      body: "ツールは独立して利用でき、作業の順番に合わせて選べます。",
      labels: {
        plan: { step: "01", title: "予定を整理する", body: "配信予定と準備状況を見通せる形に整えます。" },
        prepare: { step: "02", title: "告知画像をつくる", body: "文字と画像を見比べながら、告知内容を組み立てます。" },
        publish: { step: "03", title: "SNS用素材を整える", body: "投稿時の並びを確認しながら、分割画像を準備します。" }
      }
    },
    tools: {
      eyebrow: "Verified tools",
      title: "公開確認済みの製品画面と現在の状態",
      titleLines: ["公開確認済みの製品画面と", "現在の状態"],
      body: "確認できた3つのツールだけを掲載しています。未確認の製品名や機能は補いません。"
    },
    responsibilities: {
      eyebrow: "Responsibilities",
      title: "企画から運用改善まで、ひとつの判断軸でつなぐ。",
      titleLines: ["企画から運用改善まで、", "ひとつの判断軸でつなぐ。"],
      body: "製品計画、情報設計、UI/UX、フロントエンド実装、レスポンシブ対応、アクセシビリティ、安全なデータ境界、継続改善を担当範囲として扱います。",
      items: [
        { title: "製品計画と情報設計", body: "作業の目的と次の行動が読み取れる構造を設計します。" },
        { title: "UI/UXとフロントエンド", body: "実際の操作順に沿う画面を、複数の画面幅で使える形へ実装します。" },
        { title: "アクセシビリティと安全性", body: "状態を色だけに頼らず伝え、公開画面へ不要な利用情報を持ち込みません。" },
        { title: "継続改善", body: "公開後も、迷いやすい箇所を小さな単位で見直します。" }
      ]
    },
    principles: {
      eyebrow: "Design principles",
      title: "作業を増やさず、判断を減らすための設計。",
      titleLines: ["作業を増やさず、", "判断を減らすための設計。"],
      body: "ひとつの大きな画面へ機能を詰め込まず、目的ごとの道具として独立性を保ちます。",
      items: [
        { title: "現在地がわかる", body: "画面名、状態、次の操作を同じ視線の流れで確認できます。" },
        { title: "小さな画面でも主目的を失わない", body: "操作と製品情報の優先順位を保ったまま、内容を一列へ並べ替えます。" },
        { title: "公開データを必要最小限にする", body: "製品紹介には、公開用画面から確認できる情報だけを用います。" }
      ]
    },
    improvements: {
      eyebrow: "Selected improvements",
      title: "公開用画面と製品履歴で確認する、情報のまとまり方の改善。",
      titleLines: ["公開用画面と製品履歴で確認する、", "情報のまとまり方の改善。"],
      body: "数値成果は用いず、現在の公開用画面と公開確認された製品履歴に基づく、定性的な設計上の変化だけを扱います。",
      comparisons: [
        { before: "予定と準備状況を別々に読み解く", after: "月間予定と準備状況を同じ画面で確認する" },
        { before: "画像と文字の関係を完成後に確認する", after: "編集しながら告知画像のまとまりを確認する" },
        { before: "分割後の投稿順を想像する", after: "投稿時の並びをプレビューしながら分割する" }
      ]
    },
    status: {
      eyebrow: "Current status",
      title: "公開を確認できる範囲から、正確に案内する。",
      titleLines: ["公開を確認できる範囲から、", "正確に案内する。"],
      body: "現在このサイトで紹介する製品は、Schedule Calendar、Thumbnail Editor、SNS Split Image Makerです。各ツールの利用先やガイドは、実装済みの案内先がある場合だけ表示します。"
    },
    actions: {
      eyebrow: "Next actions",
      title: "製品を見る。活動を伝える場所を整える。",
      titleLines: ["製品を見る。", "活動を伝える場所を整える。"],
      body: "Kuro Stream Kitの公開確認済みツールを見るか、クリエイター向けHP制作の考え方を確認できます。",
      labels: { tools: "ツール一覧を見る", "creator-site": "クリエイター向けHP制作を見る" }
    }
  },
  en: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Works", href: "/works" },
      { label: "Kuro Stream Kit" }
    ],
    hero: {
      eyebrow: "Flagship case study",
      title: "Turn the stream-preparation flow into tools that are easier to navigate.",
      titleLines: ["Turn stream preparation", "into a clearer set", "of focused tools."],
      body: "Kuro Stream Kit is a creator tool suite for organizing schedules, announcement visuals, and social-ready assets as focused tasks."
    },
    problem: {
      eyebrow: "Creator workflow",
      title: "Make each preparation decision reachable from the task at hand.",
      body: "Before a stream, creators move through different kinds of work: planning the schedule, preparing an announcement visual, and arranging social assets. Each tool remains independent and reachable from the task at hand."
    },
    productMap: {
      eyebrow: "Current product map",
      title: "Three publication-verified starting points",
      body: "Each tool can be used independently and selected in the order the work requires.",
      labels: {
        plan: { step: "01", title: "Plan the schedule", body: "Keep upcoming streams and preparation status visible together." },
        prepare: { step: "02", title: "Create the announcement", body: "Arrange copy and imagery while reviewing the finished visual." },
        publish: { step: "03", title: "Prepare social assets", body: "Preview the posting order while dividing the source image." }
      }
    },
    tools: {
      eyebrow: "Verified tools",
      title: "Publication-verified product screens and current status",
      body: "Only the three verified tools are shown. Unverified product names or capabilities are not filled in."
    },
    responsibilities: {
      eyebrow: "Responsibilities",
      title: "Connect product planning and ongoing improvement through one decision framework.",
      body: "The scope covers product planning, information architecture, UI/UX, frontend implementation, responsive behavior, accessibility, safe data boundaries, and continuous improvement.",
      items: [
        { title: "Product planning and information architecture", body: "Shape the structure around the task, its purpose, and the next useful action." },
        { title: "UI/UX and frontend", body: "Implement the real interaction order across the required viewport range." },
        { title: "Accessibility and safety", body: "Communicate status beyond color and keep unnecessary usage data out of public surfaces." },
        { title: "Continuous improvement", body: "Review points of friction in small, bounded iterations after release." }
      ]
    },
    principles: {
      eyebrow: "Design principles",
      title: "Reduce decisions without adding more work.",
      body: "Keep each tool focused on one purpose instead of compressing every capability into one oversized surface.",
      items: [
        { title: "Keep orientation visible", body: "The screen, current state, and next action remain readable in one flow." },
        { title: "Preserve the primary task on small screens", body: "Content moves into one column without losing the order of operations." },
        { title: "Keep public data minimal", body: "Product storytelling uses only information visible in publication-safe interface evidence." }
      ]
    },
    improvements: {
      eyebrow: "Selected improvements",
      title: "Clearer information groupings supported by product screens and development history",
      body: "The comparison stays qualitative and uses publication-safe product screens plus development history approved for public use.",
      comparisons: [
        { before: "Read schedules and preparation status separately", after: "Review the monthly plan and preparation status in one view" },
        { before: "Judge the copy and image relationship after finishing", after: "Review the announcement composition while editing" },
        { before: "Imagine the post order after splitting", after: "Preview the posting order while preparing the split images" }
      ]
    },
    status: {
      eyebrow: "Current status",
      title: "Describe the product from the public range that can be verified.",
      body: "The products currently introduced here are Schedule Calendar, Thumbnail Editor, and SNS Split Image Maker. Tool and guide actions appear only when an implemented destination is available."
    },
    actions: {
      eyebrow: "Next actions",
      title: "Explore the product or shape a clearer home for your work.",
      body: "Review the publication-verified Kuro Stream Kit tools or see how kurodev approaches creator websites.",
      labels: { tools: "Explore the tools", "creator-site": "Explore creator websites" }
    }
  }
};

export function validateWorkPublication(work) {
  const issues = [];

  if (work.publicationApproved === true) {
    if (typeof work.publicationScope !== "string" || work.publicationScope.length === 0) {
      issues.push("publicationScope is required");
    }
    if (typeof work.evidenceSource !== "string" || work.evidenceSource.length === 0) {
      issues.push("evidenceSource is required");
    }
    if (typeof work.publishedAt !== "string" || work.publishedAt.length === 0) {
      issues.push("publish date is required");
    }
    if (typeof work.updatedAt !== "string" || work.updatedAt.length === 0) {
      issues.push("updated date is required");
    }
    if (typeof work.image !== "string" || work.image.length === 0 || !work.imageWidth || !work.imageHeight) {
      issues.push("sized publication image is required");
    }
    if (!work.ja?.alt || !work.en?.alt) {
      issues.push("localized image alt is required");
    }
  }

  for (const metric of work.outcomeMetrics ?? []) {
    if (metric.sourceDocumented !== true || metric.publicUseApproved !== true) {
      issues.push("numeric metric provenance and public approval are required");
    }
  }

  if (work.clientVisibility === "anonymized") {
    const review = work.anonymization;
    if (
      review?.directIdentifiersRemoved !== true
      || review?.reidentificationRiskReviewed !== true
      || (review?.identifyingFacts?.length ?? 0) > 0
    ) {
      issues.push("anonymized work requires direct-identifier removal and re-identification review");
    }
  }

  return issues;
}

export function getPublicationApprovedWorks(records = works) {
  return records
    .filter((work) => work.publicationApproved === true)
    .map((work) => {
      const issues = validateWorkPublication(work);
      if (issues.length > 0) throw new Error(`Unsafe published work record: ${work.id}`);
      return work;
    })
    .toSorted((left, right) => workCategoryOrder[left.category] - workCategoryOrder[right.category]);
}

export function getPublicationApprovedWorkBySlug(slug, records = works) {
  const work = records.find((record) => record.slug === slug);
  if (!work || work.publicationApproved !== true) return undefined;

  const issues = validateWorkPublication(work);
  if (issues.length > 0) throw new Error(`Unsafe published work record: ${work.id}`);
  return work;
}

export function localizedWork(work, locale) {
  return { ...work, ...work[locale] };
}
