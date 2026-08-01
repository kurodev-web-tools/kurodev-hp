import { GuideIndexPage } from "@/components/pages/guide-index-page";
import { getGuideInventory } from "@/lib/guides/guide-runtime.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

export const metadata = buildPageMetadata({
  locale: "en",
  pathname: "/guide",
  title: "Creator tools and activity guides | kurodev",
  description: "Guides for Kuro Stream Kit tools and focused creator-activity workflows.",
  equivalentLocales: ["ja", "en"]
});

export default async function EnglishGuideIndex({ searchParams }) {
  const guides = (await getGuideInventory()).filter((guide) => guide.locale === "en");
  return <GuideIndexPage locale="en" guides={guides} translationUnavailable={searchParams?.translation === "unavailable"} />;
}
