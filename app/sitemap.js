import { getPublicationApprovedWorkBySlug } from "@/lib/content/work-content.mjs";

const SITE_URL = "https://kuro-lab.com";

const baseRoutes = [
  "/",
  "/tools",
  "/creator-site",
  "/works",
  "/contact",
  "/en",
  "/en/tools",
  "/en/creator-site",
  "/en/works"
];

export default function sitemap() {
  const lastModified = new Date();
  const flagship = getPublicationApprovedWorkBySlug("kuro-stream-kit");
  const routes = flagship
    ? [...baseRoutes, "/works/kuro-stream-kit", "/en/works/kuro-stream-kit"]
    : baseRoutes;

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified
  }));
}
