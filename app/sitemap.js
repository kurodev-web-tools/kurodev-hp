const SITE_URL = "https://kuro-lab.com";

const routes = ["/", "/profile", "/web", "/tool", "/contact"];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified
  }));
}
