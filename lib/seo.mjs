import { localePath } from "./i18n.mjs";

const siteUrl = "https://kuro-lab.com";

export function buildPageMetadata({ locale, pathname, title, description, equivalentLocales }) {
  const canonical = localePath(locale, pathname);
  const hasLocalePair = equivalentLocales.includes("ja") && equivalentLocales.includes("en");
  const languages = hasLocalePair
    ? {
        ja: localePath("ja", pathname),
        en: localePath("en", pathname),
        "x-default": localePath("ja", pathname)
      }
    : undefined;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "kurodev",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${title} | kurodev` }]
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
    metadataBase: new URL(siteUrl)
  };
}
