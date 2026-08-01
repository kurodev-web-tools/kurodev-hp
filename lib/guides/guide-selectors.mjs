export function getGuideByRoute(guides, locale, segments) {
  const pathname = `/guide/${segments.join("/")}`;
  const route = locale === "en" ? `/en${pathname}` : pathname;
  return guides.find((guide) => guide.route === route);
}

export function getGuideStaticParams(guides, locale, segmentCount) {
  return guides
    .filter((guide) => guide.locale === locale && (guide.categorySegment ? 2 : 1) === segmentCount)
    .map((guide) => guide.categorySegment
      ? { category: guide.categorySegment, slug: guide.slug }
      : { slug: guide.slug });
}

export function getGuideCatchAllParams(guides, locale) {
  return guides
    .filter((guide) => guide.locale === locale)
    .map((guide) => ({
      segments: guide.categorySegment ? [guide.categorySegment, guide.slug] : [guide.slug]
    }));
}

export function getGuideAlternates(guide, guides) {
  const locales = new Set(
    guides.filter((candidate) => candidate.translationKey === guide.translationKey).map((candidate) => candidate.locale)
  );
  return locales.has("ja") && locales.has("en") ? ["ja", "en"] : [guide.locale];
}

export function getGuideLanguageTarget(guide, targetLocale, guides) {
  const translation = guides.find(
    (candidate) => candidate.locale === targetLocale && candidate.translationKey === guide.translationKey
  );
  if (translation) return translation.route;
  return targetLocale === "en" ? "/en/guide?translation=unavailable" : "/guide?translation=unavailable";
}
