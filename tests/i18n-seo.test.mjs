import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

const i18nUrl = new URL("../lib/i18n.mjs", import.meta.url);
const seoUrl = new URL("../lib/seo.mjs", import.meta.url);

test("locale paths keep Japanese at root and English under /en", async () => {
  // Given: the locale foundation requested by the approved plan.
  assert.equal(existsSync(i18nUrl), true, "lib/i18n.mjs must exist");
  const { equivalentLocalePath, guideFallbackPath, localePath, supportedLocales } = await import(i18nUrl);

  // When: equivalent page and fallback paths are built.
  // Then: locale behavior is explicit and deterministic.
  assert.deepEqual(supportedLocales, ["ja", "en"]);
  assert.equal(localePath("ja", "/tools"), "/tools");
  assert.equal(localePath("en", "/tools"), "/en/tools");
  assert.equal(equivalentLocalePath("en", "/tools", ["/tools"]), "/en/tools");
  assert.equal(guideFallbackPath("en"), "/en/guide");
});

test("SEO metadata emits reciprocal alternates only for real locale pairs", async () => {
  // Given: a bilingual Home route and a Japanese-only legal route.
  assert.equal(existsSync(seoUrl), true, "lib/seo.mjs must exist");
  const { buildPageMetadata } = await import(seoUrl);

  // When: metadata is generated for each inventory shape.
  const bilingual = buildPageMetadata({
    locale: "en",
    pathname: "/",
    title: "Home",
    description: "Creator tools and websites.",
    equivalentLocales: ["ja", "en"]
  });
  const japaneseOnly = buildPageMetadata({
    locale: "ja",
    pathname: "/legal/tokushoho",
    title: "Legal",
    description: "Commercial disclosure.",
    equivalentLocales: ["ja"]
  });

  // Then: only the real bilingual pair receives language alternates.
  assert.equal(bilingual.alternates.canonical, "/en");
  assert.deepEqual(bilingual.alternates.languages, { ja: "/", en: "/en", "x-default": "/" });
  assert.equal(japaneseOnly.alternates.canonical, "/legal/tokushoho");
  assert.equal(japaneseOnly.alternates.languages, undefined);
});
