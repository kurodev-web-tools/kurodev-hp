export const supportedLocales = ["ja", "en"];
export const defaultLocale = "ja";

export function localePath(locale, pathname) {
  const normalizedPath = pathname === "/" ? "" : `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  return locale === "en" ? `/en${normalizedPath}` || "/en" : normalizedPath || "/";
}

export function pathnameLocale(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ja";
}

export function unlocalizedPath(pathname) {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

export function equivalentLocalePath(locale, pathname, inventory) {
  const normalizedPath = unlocalizedPath(pathname);
  return inventory.includes(normalizedPath) ? localePath(locale, normalizedPath) : guideFallbackPath(locale);
}

export function guideFallbackPath(locale) {
  return localePath(locale, "/guide");
}
