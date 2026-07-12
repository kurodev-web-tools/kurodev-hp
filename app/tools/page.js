import { ToolsPage } from "@/components/pages/tools-page";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "ja",
  pathname: "/tools",
  title: "配信準備ツール | Kuro Stream Kit | kurodev",
  description: "Schedule Calendar、Thumbnail Editor、SNS Split Image Maker。配信準備を支える公開確認済みの3つのツールを紹介します。",
  equivalentLocales: ["ja", "en"]
});

export default function JapaneseToolsRoute() {
  return <ToolsPage locale="ja" />;
}
