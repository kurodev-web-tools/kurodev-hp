import { creatorSiteCopy } from "./creator-site-content.mjs";
import { aboutContactContent } from "./about-contact-content.mjs";

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
        tabletLines: ["配信準備から、", "活動をまとめる", "ホームページまで。"],
        body: "クリエイターの発信基盤を、ツールとWeb制作で整えます。",
        toolsAction: "無料ツールを見る",
        websiteAction: "HP制作を相談する"
      },
      tools: { eyebrow: "Kuro Stream Kit", title: "配信準備を、ひとつずつ軽くする。", titleLines: ["配信準備を、", "ひとつずつ", "軽くする。"], mobileLines: ["配信準備を、", "ひとつずつ軽くする。"], tabletLines: ["配信準備を、", "ひとつずつ軽くする。"], body: "公開確認済みの3つのツールを、必要な場面から選べます。" },
      ownedSite: { title: "活動の情報が増えたら、自分の場所で伝える。", titleLines: ["活動の情報が増えたら、", "自分の場所で伝える。"], body: "プロフィール、活動記録、依頼条件、連絡先。SNSだけでは流れてしまう情報を、読み手がたどれる順序に整えます。" },
      service: { title: "ツールだけじゃない、あなたの活動を伝えるホームページを。", titleLines: ["ツールだけじゃない、", "あなたの活動を伝える", "ホームページを。"], tabletLines: ["ツールだけじゃない、あなたの", "活動を伝えるホームページを。"], body: "Kuro Stream Kitの開発経験を生かし、配信者やクリエイターの活動フローに合うHPを設計します。" },
      maker: { title: "つくる前に、活動の流れを理解する。", titleLines: ["つくる前に、", "活動の流れを", "理解する。"], mobileLines: ["つくる前に、活動の", "流れを理解する。"], tabletLines: ["つくる前に、活動の", "流れを理解する。"], body: "kurodevは、日々の準備や発信で迷いが生まれる場所を見つけ、ツールとWebの両面から整えます。" },
      final: { title: "次に整えたいものから、始めましょう。", titleLines: ["次に整えたいものから、", "始めましょう。"], body: "まずツールを試す。活動をまとめる場所について相談する。どちらからでも進められます。" }
    },
    toolsPage: {
      hero: {
        eyebrow: "Kuro Stream Kit",
        title: "配信準備を支える、3つのツール。",
        titleLines: ["配信準備を支える、", "3つのツール。"],
        body: "予定を整理する。告知画像をつくる。SNSへ届ける。公開確認済みのツールを、必要な準備から選べます。",
        inventoryLabel: "公開確認済みのツール",
        inventoryValue: "3件"
      },
      workflow: {
        eyebrow: "Preparation flow",
        title: "準備の順番から、使うツールを選ぶ。",
        titleLines: ["準備の順番から、", "使うツールを選ぶ。"],
        body: "それぞれのツールは独立して使えます。今必要な作業から始めてください。"
      },
      products: {
        eyebrow: "Verified tools",
        title: "現在公開を確認できるツール",
        titleLines: ["現在公開を確認できる", "ツール"],
        body: "機能と向いている使い方を、実際の画面とともに紹介します。"
      },
      gettingStarted: {
        eyebrow: "Getting started",
        title: "迷ったときに確認する3つの入口",
        titleLines: ["迷ったときに確認する", "3つの入口"],
        body: "使うツールを決める前に、目的と準備の流れを短く整理できます。"
      }
    },
    creatorSite: creatorSiteCopy.ja,
    about: aboutContactContent.ja.about,
    contact: aboutContactContent.ja.contact
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
    },
    toolsPage: {
      hero: {
        eyebrow: "Kuro Stream Kit",
        title: "Three tools for clearer stream preparation.",
        body: "Plan the schedule, create the announcement visual, and prepare images for social posts. Start with the task in front of you.",
        inventoryLabel: "Publication-verified tools",
        inventoryValue: "3"
      },
      workflow: {
        eyebrow: "Preparation flow",
        title: "Choose a tool from the task you need to complete.",
        body: "Each tool works independently, so you can begin wherever preparation needs attention."
      },
      products: {
        eyebrow: "Verified tools",
        title: "Tools currently verified as public",
        body: "See what each tool helps you accomplish and who it is best suited for."
      },
      gettingStarted: {
        eyebrow: "Getting started",
        title: "Three starting points when you are unsure",
        body: "Clarify your goal and preparation flow before deciding which tool to use."
      }
    },
    creatorSite: creatorSiteCopy.en,
    about: aboutContactContent.en.about,
    contact: aboutContactContent.en.contact
  }
};
