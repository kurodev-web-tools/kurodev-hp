import { getPublicRouteInventory, SITE_URL } from "../lib/public-route-inventory.mjs";

export default async function sitemap() {
  const routes = (await getPublicRouteInventory()).filter((route) => route.indexable !== false);
  return routes.map(({ path, lastModified, alternatePaths }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    alternates: alternatePaths
      ? {
          languages: {
            ja: `${SITE_URL}${alternatePaths.ja}`,
            en: `${SITE_URL}${alternatePaths.en}`,
            "x-default": `${SITE_URL}${alternatePaths.ja}`
          }
        }
      : undefined
  }));
}
