import { guideFallbackPath, pathnameLocale, unlocalizedPath } from "../i18n.mjs";

export const guideRouteAvailability = [
  { translationKey: "getting-started", pathname: "/guide/getting-started", locales: ["ja", "en"] },
  { translationKey: "schedule-calendar/getting-started", pathname: "/guide/schedule-calendar/getting-started", locales: ["ja", "en"] },
  { translationKey: "thumbnail-editor/getting-started", pathname: "/guide/thumbnail-editor/getting-started", locales: ["ja", "en"] },
  { translationKey: "sns-split-image-maker/getting-started", pathname: "/guide/sns-split-image-maker/getting-started", locales: ["ja", "en"] },
  { translationKey: "comment-translator/getting-started", pathname: "/guide/comment-translator/getting-started", locales: ["ja", "en"] },
  { translationKey: "creator-site/profile-information", pathname: "/guide/creator-site/profile-information", locales: ["ja"] },
  { translationKey: "creator-site/what-to-include", pathname: "/guide/creator-site/what-to-include", locales: ["ja"] },
  { translationKey: "creator-site/inquiry-route", pathname: "/guide/creator-site/inquiry-route", locales: ["ja"] }
];

export function guideLanguageTarget(pathname, targetLocale) {
  const currentLocale = pathnameLocale(pathname);
  const route = guideRouteAvailability.find((candidate) => candidate.pathname === unlocalizedPath(pathname));
  if (!route || !route.locales.includes(currentLocale) || !route.locales.includes(targetLocale)) {
    return `${guideFallbackPath(targetLocale)}?translation=unavailable`;
  }
  return targetLocale === "en" ? `/en${route.pathname}` : route.pathname;
}
