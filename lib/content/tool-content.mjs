import { statusRules } from "./status.mjs";

const toolRecords = [
  {
    id: "schedule-calendar",
    status: "published",
    order: 1,
    featuredRank: 1,
    category: "stream-workflow",
    href: "https://streamer-tools.kuro-lab.com/tools/schedule-calendar/",
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    image: "/images/kuro-stream-kit/schedule-calendar.png",
    imageWidth: 1920,
    imageHeight: 1080,
    ja: {
      name: "Schedule Calendar",
      title: "配信スケジュール管理",
      summary: "配信予定と準備状況を、見通しよく整理します。",
      outcome: "月ごとの予定と準備状況を同じ画面で確認し、次に進める作業を見つけやすくします。",
      suitableFor: "配信予定と準備の抜けを一覧で整理したい方",
      categoryLabel: "配信ワークフロー",
      alt: "Schedule Calendarの月間予定と配信準備画面"
    },
    en: {
      name: "Schedule Calendar",
      title: "Stream schedule planning",
      summary: "Keep upcoming streams and preparation status visible in one calendar.",
      outcome: "Review monthly plans and preparation status together so the next task is easier to find.",
      suitableFor: "Creators who want one clear view of upcoming streams and preparation",
      categoryLabel: "Stream Workflow",
      alt: "Schedule Calendar monthly planning and stream preparation screen"
    }
  },
  {
    id: "thumbnail-editor",
    status: "published",
    order: 2,
    featuredRank: 2,
    category: "stream-workflow",
    href: "https://streamer-tools.kuro-lab.com/tools/thumbnail-editor/",
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    image: "/images/kuro-stream-kit/thumbnail-editor.png",
    imageWidth: 1920,
    imageHeight: 1080,
    ja: {
      name: "Thumbnail Editor",
      title: "サムネイルエディター",
      summary: "配信告知に使う画像を、迷わず組み立てられます。",
      outcome: "文字と画像を見比べながら、配信内容が伝わる告知画像を組み立てられます。",
      suitableFor: "配信ごとの告知画像をわかりやすく整えたい方",
      categoryLabel: "配信ワークフロー",
      alt: "Thumbnail Editorのキャンバスと編集パネル"
    },
    en: {
      name: "Thumbnail Editor",
      title: "Thumbnail editor",
      summary: "Build clear stream announcement visuals with a focused editing flow.",
      outcome: "Arrange text and imagery together to create an announcement visual that explains the stream clearly.",
      suitableFor: "Creators who want a focused way to prepare stream announcement visuals",
      categoryLabel: "Stream Workflow",
      alt: "Thumbnail Editor canvas and editing controls"
    }
  },
  {
    id: "sns-split",
    status: "published",
    order: 3,
    featuredRank: 3,
    category: "stream-workflow",
    href: "https://streamer-tools.kuro-lab.com/tools/sns-split-image-maker/",
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    image: "/images/kuro-stream-kit/sns-split.png",
    imageWidth: 1920,
    imageHeight: 1080,
    ja: {
      name: "SNS Split Image Maker",
      title: "SNS分割画像メーカー",
      summary: "SNS投稿用の分割画像を、プレビューしながら作成します。",
      outcome: "投稿時の並びを確認しながら、1枚の画像を複数の投稿用画像へ分割できます。",
      suitableFor: "SNS上で大きなビジュアルを分割して見せたい方",
      categoryLabel: "配信ワークフロー",
      alt: "SNS Split Image Makerの分割プレビュー画面"
    },
    en: {
      name: "SNS Split Image Maker",
      title: "Social image splitter",
      summary: "Prepare split social images while checking the final post layout.",
      outcome: "Preview the posting order while dividing one visual into a coordinated set of social images.",
      suitableFor: "Creators who want to present a larger visual across multiple social posts",
      categoryLabel: "Stream Workflow",
      alt: "SNS Split Image Maker split-image preview screen"
    }
  }
];

export const tools = toolRecords.toSorted((left, right) => left.order - right.order);
export const featuredHomeTools = tools
  .filter((tool) => tool.featuredRank && statusRules[tool.status].launchable)
  .toSorted((left, right) => left.featuredRank - right.featuredRank);

export function localizedTool(tool, locale) {
  return { ...tool, ...tool[locale] };
}
