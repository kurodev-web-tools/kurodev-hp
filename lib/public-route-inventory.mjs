import { statusRules } from "./content/status.mjs";
import { getPublicationApprovedWorks } from "./content/work-content.mjs";
import { getGuideAlternates, getGuideInventory } from "./guides/guide-runtime.mjs";

export const SITE_URL = "https://kuro-lab.com";
export const CONTENT_UPDATED = new Date("2026-07-30T00:00:00.000Z");
export const LEGAL_UPDATED = new Date("2026-08-04T00:00:00.000Z");

const primaryPairs = [
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

function localeForPath(path) {
  return path === "/en" || path.startsWith("/en/") ? "en" : "ja";
}

function pairedRoutes(pairs, kind, lastModified) {
  return pairs.flatMap(([japanesePath, englishPath]) => [
    {
      path: japanesePath,
      locale: "ja",
      kind,
      indexable: true,
      lastModified,
      alternatePaths: { ja: japanesePath, en: englishPath }
    },
    {
      path: englishPath,
      locale: "en",
      kind,
      indexable: true,
      lastModified,
      alternatePaths: { ja: japanesePath, en: englishPath }
    }
  ]);
}

export async function getPublicRouteInventory() {
  const guides = await getGuideInventory();
  const workPairs = getPublicationApprovedWorks()
    .filter((work) => work.external !== true)
    .map((work) => [`/works/${work.slug}`, `/en/works/${work.slug}`]);
  const guideRoutes = guides.map((guide) => {
      const counterpart = guides.find((candidate) => (
        candidate.translationKey === guide.translationKey && candidate.locale !== guide.locale
      ));
      const hasAlternates = getGuideAlternates(guide, guides).length === 2 && counterpart;
      const japanesePath = guide.locale === "ja" ? guide.route : counterpart?.route;
      const englishPath = guide.locale === "en" ? guide.route : counterpart?.route;
      return {
        path: guide.route,
        locale: guide.locale,
        kind: "guide",
        indexable: statusRules[guide.status]?.indexable === true,
        lastModified: new Date(`${guide.updatedAt}T00:00:00.000Z`),
        alternatePaths: hasAlternates ? { ja: japanesePath, en: englishPath } : undefined
      };
    });

  return [
    ...pairedRoutes(primaryPairs, "primary", CONTENT_UPDATED),
    ...pairedRoutes(workPairs, "works", CONTENT_UPDATED),
    ...pairedRoutes(legalPairs, "legal", LEGAL_UPDATED),
    {
      path: "/legal/tokushoho",
      locale: "ja",
      kind: "legal",
      indexable: true,
      lastModified: LEGAL_UPDATED
    },
    ...guideRoutes
  ];
}

export function getLocaleForPublicPath(path) {
  return localeForPath(path);
}
