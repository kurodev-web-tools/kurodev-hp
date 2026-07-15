import { getPublicationApprovedWorkBySlug } from "@/lib/content/work-content.mjs";
import { statusRules } from "@/lib/content/status.mjs";
import { getGuideAlternates, getGuideInventory } from "@/lib/guides/guide-loader.mjs";

const SITE_URL = "https://kuro-lab.com";

const baseRoutes = [
  "/",
  "/tools",
  "/creator-site",
  "/works",
  "/guide",
  "/about",
  "/contact",
  "/en",
  "/en/tools",
  "/en/creator-site",
  "/en/works",
  "/en/guide",
  "/en/about",
  "/en/contact"
];

export default async function sitemap() {
  const lastModified = new Date();
  const flagship = getPublicationApprovedWorkBySlug("kuro-stream-kit");
  const routes = flagship
    ? [...baseRoutes, "/works/kuro-stream-kit", "/en/works/kuro-stream-kit"]
    : baseRoutes;
  const guides = await getGuideInventory();
  const guideRoutes = guides.filter((guide) => statusRules[guide.status].indexable).map((guide) => {
    const locales = getGuideAlternates(guide, guides);
    const counterpart = guides.find((candidate) => (
      candidate.translationKey === guide.translationKey && candidate.locale !== guide.locale
    ));
    const japaneseRoute = guide.locale === "ja" ? guide.route : counterpart?.route;
    const englishRoute = guide.locale === "en" ? guide.route : counterpart?.route;
    const languages = locales.length === 2 && japaneseRoute && englishRoute
      ? {
          ja: `${SITE_URL}${japaneseRoute}`,
          en: `${SITE_URL}${englishRoute}`,
          "x-default": `${SITE_URL}${japaneseRoute}`
        }
      : undefined;
    return {
      url: `${SITE_URL}${guide.route}`,
      lastModified: new Date(`${guide.updatedAt}T00:00:00.000Z`),
      alternates: languages ? { languages } : undefined
    };
  });

  return [
    ...routes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified })),
    ...guideRoutes
  ];
}
