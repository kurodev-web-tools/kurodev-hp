import { statusRules } from "../lib/content/status.mjs";
import { getPublicationApprovedWorkBySlug } from "../lib/content/work-content.mjs";
import { getGuideAlternates, getGuideInventory } from "../lib/guides/guide-loader.mjs";

const SITE_URL = "https://kuro-lab.com";
const CONTENT_UPDATED = new Date("2026-07-30T00:00:00.000Z");
const LEGAL_UPDATED = new Date("2026-08-04T00:00:00.000Z");

const basePairs = [
  ["/", "/en"],
  ["/tools", "/en/tools"],
  ["/creator-site", "/en/creator-site"],
  ["/works", "/en/works"],
  ["/guide", "/en/guide"],
  ["/about", "/en/about"],
  ["/contact", "/en/contact"]
];
const legalPairs = [
  ["/terms", "/en/terms"],
  ["/privacy", "/en/privacy"],
  ["/privacy/foreign-processing", "/en/privacy/foreign-processing"]
];

function pairedEntries([japaneseRoute, englishRoute], lastModified) {
  const languages = {
    ja: `${SITE_URL}${japaneseRoute}`,
    en: `${SITE_URL}${englishRoute}`,
    "x-default": `${SITE_URL}${japaneseRoute}`
  };
  return [japaneseRoute, englishRoute].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    alternates: { languages }
  }));
}

export default async function sitemap() {
  const flagship = getPublicationApprovedWorkBySlug("kuro-stream-kit");
  const pagePairs = flagship
    ? [...basePairs, ["/works/kuro-stream-kit", "/en/works/kuro-stream-kit"]]
    : basePairs;
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
    ...pagePairs.flatMap((pair) => pairedEntries(pair, CONTENT_UPDATED)),
    ...legalPairs.flatMap((pair) => pairedEntries(pair, LEGAL_UPDATED)),
    {
      url: `${SITE_URL}/legal/tokushoho`,
      lastModified: LEGAL_UPDATED
    },
    ...guideRoutes
  ];
}
