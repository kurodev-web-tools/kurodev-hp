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
      "複数テンプレートの更新、比較改善、運用ルール整備を継続している制作基盤。",
      "公開後も改善を回しやすい構造づくりの実例です。"
    ],
    status: "Active",
    href: "#",
    tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    featured: true
  },
  {
    title: "kurodev Portal Site",
    category: "Portfolio / In Build",
    summary: "ポートフォリオと今後のツール窓口を兼ねる本サイト。案件導線と公開導線を一つの面で扱います.",
    status: "In Build",
    href: "#",
    tags: ["Portfolio", "Bento UI"],
    featured: false
  },
  {
    title: "A-Z Template Hub",
    category: "Template System",
    summary: "更新対象テンプレート群を整理し、比較改善メモと合わせて継続保守しやすくするための公開/運用ハブ.",
    status: "Active",
    href: "#",
    tags: ["UI Audit", "Content"],
    featured: false
  }
];

export const toolProjects = [
  {
    title: "Estimate Helper",
    category: "Internal Tool",
    summary: "制作相談の初期整理と見積り前の要件メモを素早く整えるための支援ツール。公開前の仕様整理フェーズです.",
    status: "Planning",
    href: "#",
    tags: ["Planning", "Automation"],
    featured: true
  },
  {
    title: "Content Audit Board",
    category: "Ops Tool",
    summary: "ページ品質、導線、文言の抜け漏れを小さな監査単位で確認する運用補助ツール。HP-portal と連携想定です.",
    status: "Coming Soon",
    href: "#",
    tags: ["Audit", "Workflow"],
    featured: false
  },
  {
    title: "Client Intake Console",
    category: "Client Flow",
    summary: "相談内容を整理し、次アクションを見失わないための受付導線。まずは内部運用から段階公開する想定です.",
    status: "Planning",
    href: "#",
    tags: ["Intake", "CRM"],
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
