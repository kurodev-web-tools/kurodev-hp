import { statusRules } from "./status.mjs";

const toolRecords = [
  {
    id: "schedule-calendar",
    status: "published",
    order: 1,
    featuredRank: 1,
    image: "/images/kuro-stream-kit/schedule-calendar.png",
    ja: {
      name: "Schedule Calendar",
      title: "配信スケジュール管理",
      summary: "配信予定と準備状況を、見通しよく整理します。",
      alt: "Schedule Calendarの月間予定と配信準備画面"
    },
    en: {
      name: "Schedule Calendar",
      title: "Stream schedule planning",
      summary: "Keep upcoming streams and preparation status visible in one calendar.",
      alt: "Schedule Calendar monthly planning and stream preparation screen"
    }
  },
  {
    id: "thumbnail-editor",
    status: "published",
    order: 2,
    featuredRank: 2,
    image: "/images/kuro-stream-kit/thumbnail-editor.png",
    ja: {
      name: "Thumbnail Editor",
      title: "サムネイルエディター",
      summary: "配信告知に使う画像を、迷わず組み立てられます。",
      alt: "Thumbnail Editorのキャンバスと編集パネル"
    },
    en: {
      name: "Thumbnail Editor",
      title: "Thumbnail editor",
      summary: "Build clear stream announcement visuals with a focused editing flow.",
      alt: "Thumbnail Editor canvas and editing controls"
    }
  },
  {
    id: "sns-split",
    status: "published",
    order: 3,
    featuredRank: 3,
    image: "/images/kuro-stream-kit/sns-split.png",
    ja: {
      name: "SNS Split Image Maker",
      title: "SNS分割画像メーカー",
      summary: "SNS投稿用の分割画像を、プレビューしながら作成します。",
      alt: "SNS Split Image Makerの分割プレビュー画面"
    },
    en: {
      name: "SNS Split Image Maker",
      title: "Social image splitter",
      summary: "Prepare split social images while checking the final post layout.",
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
