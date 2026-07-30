import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const SITE_URL = "https://kuro-lab.com";
const reciprocalPairs = [
  ["/", "/en"],
  ["/tools", "/en/tools"],
  ["/creator-site", "/en/creator-site"],
  ["/works", "/en/works"],
  ["/works/kuro-stream-kit", "/en/works/kuro-stream-kit"],
  ["/guide", "/en/guide"],
  ["/about", "/en/about"],
  ["/contact", "/en/contact"],
  ["/terms", "/en/terms"],
  ["/privacy", "/en/privacy"],
  ["/privacy/foreign-processing", "/en/privacy/foreign-processing"]
];
const japaneseOnlyRoutes = ["/legal/tokushoho"];
const legacyRoutes = ["/tool", "/web", "/profile"];

test("route inventory/sitemap emits every indexable route and only real locale alternates", async () => {
  const [{ default: sitemap }, { getGuideAlternates, getGuideInventory }, { statusRules }] = await Promise.all([
    import(new URL("../app/sitemap.js", import.meta.url)),
    import(new URL("../lib/guides/guide-loader.mjs", import.meta.url)),
    import(new URL("../lib/content/status.mjs", import.meta.url))
  ]);
  const [entries, guides] = await Promise.all([sitemap(), getGuideInventory()]);
  const indexableGuides = guides.filter((guide) => statusRules[guide.status].indexable);
  const expectedRoutes = [
    ...reciprocalPairs.flat(),
    ...japaneseOnlyRoutes,
    ...indexableGuides.map((guide) => guide.route)
  ];
  const entryByRoute = new Map(entries.map((entry) => [new URL(entry.url).pathname, entry]));

  assert.deepEqual([...entryByRoute.keys()].toSorted(), expectedRoutes.toSorted());
  for (const [ja, en] of reciprocalPairs) {
    for (const route of [ja, en]) {
      assert.deepEqual(entryByRoute.get(route)?.alternates?.languages, {
        ja: `${SITE_URL}${ja}`,
        en: `${SITE_URL}${en}`,
        "x-default": `${SITE_URL}${ja}`
      });
    }
  }
  assert.equal(entryByRoute.get("/legal/tokushoho")?.alternates, undefined);
  for (const guide of indexableGuides) {
    const alternates = getGuideAlternates(guide, guides);
    assert.equal(Boolean(entryByRoute.get(guide.route)?.alternates), alternates.length === 2);
  }
  for (const route of legacyRoutes) assert.equal(entryByRoute.has(route), false);
});

test("route inventory/robots publishes one canonical sitemap and excludes the Contact API", async () => {
  const { default: robots } = await import(new URL("../app/robots.js", import.meta.url));

  assert.deepEqual(robots(), {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  });
});

test("route inventory/redirects maps each legacy index once without chains", async () => {
  const { default: nextConfig } = await import(new URL("../next.config.mjs", import.meta.url));
  const redirects = await nextConfig.redirects();
  const expected = [
    { source: "/tool", destination: "/tools", permanent: true },
    { source: "/web", destination: "/works", permanent: true },
    { source: "/profile", destination: "/about", permanent: true }
  ];

  assert.deepEqual(redirects, expected);
  const sources = new Set(redirects.map(({ source }) => source));
  for (const redirect of redirects) assert.equal(sources.has(redirect.destination), false);
  for (const route of legacyRoutes) {
    assert.equal(existsSync(new URL(`../app${route}/page.js`, import.meta.url)), false);
  }
});

test("Next 15 keeps metadata in the initial document head for browser-based SEO audits", async () => {
  const { default: nextConfig } = await import(new URL("../next.config.mjs", import.meta.url));

  assert.equal(nextConfig.htmlLimitedBots.test("Mozilla/5.0 Chrome/140.0 Lighthouse"), true);
});

test("route inventory/metadata keeps static titles and descriptions localized and unique", async () => {
  const staticPages = reciprocalPairs.flat().concat(japaneseOnlyRoutes).map((route) => (
    route === "/" ? "../app/page.js" : `../app${route}/page.js`
  ));
  const sources = await Promise.all(staticPages.map((relativePath) => readFile(new URL(relativePath, import.meta.url), "utf8")));
  const titles = [];
  const descriptions = [];

  for (const source of sources) {
    assert.match(source, /buildPageMetadata\(\{/);
    const title = source.match(/title: "([^"]+)"/)?.[1];
    const description = source.match(/description: "([^"]+)"/)?.[1];
    assert.ok(title);
    assert.ok(description);
    titles.push(title);
    descriptions.push(description);
  }
  assert.equal(new Set(titles).size, titles.length);
  assert.equal(new Set(descriptions).size, descriptions.length);
});

test("route inventory/Open Graph uses the Creator Platform brand instead of stale portal copy", async () => {
  const [imageSource, { buildPageMetadata }] = await Promise.all([
    readFile(new URL("../app/opengraph-image.js", import.meta.url), "utf8"),
    import(new URL("../lib/seo.mjs", import.meta.url))
  ]);
  const ja = buildPageMetadata({
    locale: "ja",
    pathname: "/tools",
    title: "日本語タイトル",
    description: "日本語説明",
    equivalentLocales: ["ja", "en"]
  });
  const en = buildPageMetadata({
    locale: "en",
    pathname: "/tools",
    title: "English title",
    description: "English description",
    equivalentLocales: ["ja", "en"]
  });

  assert.match(imageSource, /Creator Platform/);
  assert.doesNotMatch(imageSource, /portal & build desk|Web制作・改善運用・業務ツール相談/);
  assert.equal(ja.openGraph.locale, "ja_JP");
  assert.equal(en.openGraph.locale, "en_US");
  assert.equal(ja.openGraph.images[0].alt, "日本語タイトル | kurodev");
  assert.equal(en.openGraph.images[0].alt, "English title | kurodev");
});
