import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homeViewUrl = new URL("../components/pages/home-page.js", import.meta.url);
const englishHomeUrl = new URL("../app/en/page.js", import.meta.url);
const heroUrl = new URL("../components/sections/creator-hero.js", import.meta.url);

test("Japanese and English routes share the complete Creator Studio Home view", async () => {
  // Given: shared Home view and two locale wrappers.
  assert.equal(existsSync(homeViewUrl), true, "shared Home view must exist");
  assert.equal(existsSync(englishHomeUrl), true, "English Home route must exist");
  const japaneseRoute = await readFile(new URL("../app/page.js", import.meta.url), "utf8");
  const englishRoute = await readFile(englishHomeUrl, "utf8");
  const homeView = await readFile(homeViewUrl, "utf8");

  // When: route wrappers and the Home composition are inspected.
  // Then: both locales use one view with the required editorial sections.
  assert.match(japaneseRoute, /HomePage locale="ja"/);
  assert.match(englishRoute, /HomePage locale="en"/);
  ["CreatorHero", "FeaturedTools", "OwnedSiteNeed", "CreatorServiceBridge", "MakerIntroduction", "FinalActions"].forEach(
    (section) => assert.match(homeView, new RegExp(section))
  );
});

test("Home hero contains one heading and two distinct creator funnels", async () => {
  // Given: the shared Home source.
  assert.equal(existsSync(homeViewUrl), true, "shared Home view must exist");
  const source = await readFile(homeViewUrl, "utf8");
  const hero = await readFile(heroUrl, "utf8");

  // When: hero landmarks and calls to action are inspected.
  const headingCount = (hero.match(/<h1/g) ?? []).length;

  // Then: a single H1 leads to tools and creator-site inquiry paths.
  assert.equal(headingCount, 1);
  assert.match(hero, /\/tools/);
  assert.match(hero, /\/creator-site/);
  assert.doesNotMatch(`${source}${hero}`, /Comment Translator|コメント翻訳/);
});
