export const profileStats = [
  { label: "Web制作", value: "Build", note: "LP や小規模サイトを、構成整理から実装まで扱います" },
  { label: "改善運用", value: "Improve", note: "公開後の文言、導線、更新しやすさを整えます" },
  { label: "Tool Planning", value: "Plan", note: "問い合わせ整理や軽量な業務ツール化を設計します" }
];

export const skillGroups = [
  {
    title: "Build Stack",
    items: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "React", "Next.js"]
  },
  {
    title: "AI Workflow",
    items: ["Codex", "Claude", "Gemini", "Prompt Design"]
  },
  {
    title: "Execution",
    items: ["LP制作", "サイト改善", "運用整理", "要件整理", "軽量ツール化"]
  }
];

export const featuredHighlights = [
  {
    title: "Web制作",
    body: "LP や小規模サイトを、構成整理、実装、公開前の調整までまとめて進めます."
  },
  {
    title: "改善運用",
    body: "公開後の文言整理、導線改善、テンプレート更新を継続しやすい形に整えます."
  },
  {
    title: "業務ツール",
    body: "問い合わせ整理や見積り前の要件整理など、現場で使う小さなツール化を相談できます."
  }
];

export const webProjects = [
  {
    title: "HP-portal",
    category: "Portal / Featured",
    summary: [
      "テンプレートカテゴリ、販売/依頼導線、更新運用をまとめた制作ポータル。",
      "複数テンプレートを継続的に改善し、公開後も育てやすい構造にしています。"
    ],
    status: "Active",
    href: "https://templates.kuro-lab.com/",
    tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    featured: true
  },
  {
    title: "A-Z Template Hub",
    category: "Template Gallery",
    summary: "全テンプレートをカテゴリ別に確認できる一覧ページ。比較、プレビュー、更新確認の入口として使えます。",
    status: "Active",
    href: "https://templates.kuro-lab.com/list",
    tags: ["Templates", "Gallery", "UI Audit"],
    featured: false
  },
  {
    title: "kurodev Portal Site",
    category: "Portfolio / In Build",
    summary: "制作相談、実績、今後のツール窓口をまとめる本サイト。ドメイン接続前の公開準備を進めています。",
    status: "In Build",
    href: "#",
    tags: ["Next.js", "React", "Tailwind CSS"],
    featured: false
  },
  {
    title: "Next Template Line",
    category: "Template Plan",
    summary: "React / Next.js を使った次期テンプレートライン。静的テンプレートとは分けて、再利用しやすい構成を検討中です。",
    status: "Planning",
    href: "#",
    tags: ["React", "Next.js", "Tailwind CSS"],
    featured: false
  }
];

export const toolProjects = [
  {
    title: "Childcare Notice PWA",
    category: "Private Client / PWA",
    summary: "保育園向けの連絡掲示板PWA。スマートフォンでのお知らせ確認、通知、日々の共有を扱う匿名の実制作案件です。",
    status: "Live",
    href: "#",
    tags: ["PWA", "Firebase", "JavaScript", "Mobile UI"],
    featured: true
  },
  {
    title: "VTuber Workflow Suite",
    category: "Creator Tool",
    summary: "企画、配信準備、配信後の分析までをつなぐ構想中の支援ツール。制作物ではなく、ワークフロー設計段階です。",
    status: "Planning",
    href: "#",
    tags: ["Workflow", "AI Assist", "Creator Tools"],
    featured: false
  },
  {
    title: "Client Intake Console",
    category: "Client Ops",
    summary: "問い合わせ内容、要件、次アクションを整理する準備中のコンソール。相談から制作着手までの抜け漏れを減らします。",
    status: "In Build",
    href: "#",
    tags: ["Intake", "Planning", "Ops"],
    featured: false
  }
];

export const pricingItems = [
  { title: "LP / 小規模サイト", price: "¥80,000〜", body: "構成整理、主要導線設計、公開前の見た目調整までを含む目安です." },
  { title: "Webアプリ実装", price: "¥200,000〜", body: "管理画面や会員導線を含む小規模アプリの初期構築目安です." },
  { title: "運用改善 / 自動化", price: "個別見積", body: "既存フローの整理、軽量な自動化、保守ルール整備に応じて調整します." }
];

export const contactChannels = [
  "新規サイトや LP の相談",
  "既存ページの見直しと改善",
  "Portal / 業務ツールの立ち上げ",
  "生成AI を含む制作フロー整理"
];
