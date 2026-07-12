const navigation = {
  ja: [
    ["ツール", "/tools"],
    ["HP制作", "/creator-site"],
    ["実績", "/works"],
    ["ガイド", "/guide"],
    ["kurodev", "/about"],
    ["お問い合わせ", "/contact"]
  ],
  en: [
    ["Tools", "/tools"],
    ["Creator websites", "/creator-site"],
    ["Works", "/works"],
    ["Guide", "/guide"],
    ["kurodev", "/about"],
    ["Contact", "/contact"]
  ]
};

export const siteCopy = {
  ja: {
    navigation: navigation.ja,
    home: {
      hero: {
        title: "配信準備から、活動をまとめるホームページまで。",
        titleLines: ["配信準備から、", "活動をまとめる", "ホームページまで。"],
        body: "クリエイターの発信基盤を、ツールとWeb制作で整えます。",
        toolsAction: "無料ツールを見る",
        websiteAction: "HP制作を相談する"
      },
      tools: { eyebrow: "Kuro Stream Kit", title: "配信準備を、ひとつずつ軽くする。", titleLines: ["配信準備を、", "ひとつずつ", "軽くする。"], body: "公開確認済みの3つのツールを、必要な場面から選べます。" },
      ownedSite: { title: "活動の情報が増えたら、自分の場所で伝える。", titleLines: ["活動の情報が増えたら、", "自分の場所で伝える。"], body: "プロフィール、活動記録、依頼条件、連絡先。SNSだけでは流れてしまう情報を、読み手がたどれる順序に整えます。" },
      service: { title: "ツールだけじゃない、あなたの活動を伝えるホームページを。", titleLines: ["ツールだけじゃない、", "あなたの活動を伝える", "ホームページを。"], body: "Kuro Stream Kitの開発経験を生かし、配信者やクリエイターの活動フローに合うHPを設計します。" },
      maker: { title: "つくる前に、活動の流れを理解する。", titleLines: ["つくる前に、", "活動の流れを", "理解する。"], body: "kurodevは、日々の準備や発信で迷いが生まれる場所を見つけ、ツールとWebの両面から整えます。" },
      final: { title: "次に整えたいものから、始めましょう。", titleLines: ["次に整えたいものから、", "始めましょう。"], body: "まずツールを試す。活動をまとめる場所について相談する。どちらからでも進められます。" }
    }
  },
  en: {
    navigation: navigation.en,
    home: {
      hero: {
        title: "Tools for your stream. A website for your work.",
        titleLines: ["Tools for your stream.", "A website for", "your creative work."],
        body: "kurodev shapes a clearer creator foundation through practical tools and thoughtful web production.",
        toolsAction: "Explore free tools",
        websiteAction: "Discuss a creator website"
      },
      tools: { eyebrow: "Kuro Stream Kit", title: "Make each part of stream preparation lighter.", body: "Choose from three publication-verified tools, each focused on a real preparation task." },
      ownedSite: { title: "When your activity grows, give it a place of its own.", body: "Profiles, work archives, commission terms, and contact routes deserve an order that visitors can follow beyond a social feed." },
      service: { title: "More than tools: a website that explains your creative work.", body: "Experience building Kuro Stream Kit informs creator websites shaped around real publishing and communication workflows." },
      maker: { title: "Understand the workflow before building the surface.", body: "kurodev finds the points where preparation and communication become difficult, then improves them through tools and the web." },
      final: { title: "Start with what you want to make clearer next.", body: "Try the tools first or discuss a home for your activity. Both paths are open." }
    }
  }
};
