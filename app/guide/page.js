import { GuideIndexPage } from "@/components/pages/guide-index-page";
import { getGuideInventory } from "@/lib/guides/guide-runtime.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "ja",
  pathname: "/guide",
  title: "配信準備とクリエイター活動のガイド | kurodev",
  description: "Kuro Stream Kitの使い方と、クリエイターサイトや問い合わせ導線を整えるためのガイドです。",
  equivalentLocales: ["ja", "en"]
});

export default async function JapaneseGuideIndex({ searchParams }) {
  const guides = (await getGuideInventory()).filter((guide) => guide.locale === "ja");
  return <GuideIndexPage locale="ja" guides={guides} translationUnavailable={searchParams?.translation === "unavailable"} />;
}
