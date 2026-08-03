import { notFound } from "next/navigation";
import { GuideArticlePage } from "@/components/pages/guide-article-page";
import { statusRules } from "@/lib/content/status.mjs";
import { getGuideAlternates, getGuideByRoute, getGuideInventory } from "@/lib/guides/guide-runtime.mjs";
import { buildPageMetadata } from "@/lib/seo.mjs";

export async function buildGuideRouteMetadata(locale, segments) {
  const guides = await getGuideInventory();
  const guide = getGuideByRoute(guides, locale, segments);
  if (!guide) return {};
  return buildPageMetadata({
    locale,
    pathname: `/guide/${guide.translationKey}`,
    title: `${guide.title} | kurodev Guide`,
    description: guide.description,
    equivalentLocales: getGuideAlternates(guide, guides),
    indexable: statusRules[guide.status].indexable
  });
}

export async function GuideRoute({ locale, segments }) {
  const guides = await getGuideInventory();
  const guide = getGuideByRoute(guides, locale, segments);
  if (!guide) notFound();
  return <GuideArticlePage locale={locale} guide={guide} />;
}
