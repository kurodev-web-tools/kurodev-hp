import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const headerUrl = new URL("../components/layout/site-header.js", import.meta.url);
const headerControlsUrl = new URL("../components/layout/site-header-controls.js", import.meta.url);
const footerUrl = new URL("../components/layout/site-footer.js", import.meta.url);
const themeToggleUrl = new URL("../components/theme-toggle.js", import.meta.url);
const languageSwitchUrl = new URL("../components/layout/language-switch.js", import.meta.url);

test("marketing shell replaces the app sidebar and fixed bottom navigation", async () => {
  // Given: the shared shell and localized layout components.
  assert.equal(existsSync(headerUrl), true, "SiteHeader must exist");
  assert.equal(existsSync(footerUrl), true, "SiteFooter must exist");
  const shell = await readFile(new URL("../components/site-shell.js", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.js", import.meta.url), "utf8");

  // When: shell ownership and accessibility landmarks are inspected.
  // Then: header/footer, skip target, and marketing navigation own the surface.
  assert.match(shell, /SiteHeader/);
  assert.match(shell, /SiteFooter/);
  assert.doesNotMatch(shell, /Sidebar|MobileNav|HexagonBackground/);
  assert.match(layout, /skip-link/);
  assert.match(shell, /id="main-content"/);
});

test("mobile header exposes an accessible menu and explicit language link", async () => {
  // Given: the client-side header behavior.
  assert.equal(existsSync(headerUrl), true, "SiteHeader must exist");
  const header = await Promise.all([headerUrl, headerControlsUrl].map((url) => readFile(url, "utf8")))
    .then((sources) => sources.join("\n"));

  // When: required controls are inspected.
  // Then: menu state, Escape behavior, and language navigation are explicit.
  assert.match(header, /aria-expanded/);
  assert.match(header, /Escape/);
  assert.match(header, /LanguageSwitch/);
});

test("language switching reloads the document so root locale semantics update", async () => {
  // Given: the root layout derives <html lang> from request headers.
  const languageSwitch = await readFile(languageSwitchUrl, "utf8");

  // Then: locale changes use native document navigation, not a retained Next root layout.
  assert.doesNotMatch(languageSwitch, /import Link from "next\/link"/);
  assert.match(languageSwitch, /<a[\s\S]*href=\{href\}/);
});

test("language switching keeps its visible label inside the accessible name", async () => {
  const languageSwitch = await readFile(languageSwitchUrl, "utf8");

  assert.match(languageSwitch, /日本語 \/ EN: View this site in English/);
  assert.match(languageSwitch, /日本語 \/ EN: 日本語で表示/);
});

test("theme changes preserve product media on a stable compositing layer", async () => {
  // Given: palette transitions repaint ProductMedia surfaces while their images remain mounted.
  const componentStyles = await readFile(new URL("../app/styles/components.css", import.meta.url), "utf8");

  // Then: product images keep a stable GPU layer instead of disappearing until a reload.
  assert.match(componentStyles, /\.product-media img\s*\{[^}]*transform:\s*translateZ\(0\);/);
});

test("theme changes invalidate the product media layer on the next frame", async () => {
  const themeToggle = await readFile(themeToggleUrl, "utf8");

  assert.match(themeToggle, /requestAnimationFrame/);
  assert.match(themeToggle, /querySelectorAll\("\.product-media img"\)/);
  assert.match(themeToggle, /translateZ/);
});

test("document language and navigation routes resolve without placeholder pages", async () => {
  // Given: locale-aware request handling, implemented hubs, and remaining temporary section redirects.
  const middlewareUrl = new URL("../middleware.js", import.meta.url);
  assert.equal(existsSync(middlewareUrl), true, "locale middleware must exist");
  const middleware = await readFile(middlewareUrl, "utf8");
  const layout = await readFile(new URL("../app/layout.js", import.meta.url), "utf8");
  const nextConfig = await readFile(new URL("../next.config.mjs", import.meta.url), "utf8");
  const japaneseTools = new URL("../app/tools/page.js", import.meta.url);
  const englishTools = new URL("../app/en/tools/page.js", import.meta.url);
  const japaneseCreatorSite = new URL("../app/creator-site/page.js", import.meta.url);
  const englishCreatorSite = new URL("../app/en/creator-site/page.js", import.meta.url);
  const japaneseGuide = new URL("../app/guide/page.js", import.meta.url);
  const englishGuide = new URL("../app/en/guide/page.js", import.meta.url);
  const japaneseAbout = new URL("../app/about/page.js", import.meta.url);
  const englishAbout = new URL("../app/en/about/page.js", import.meta.url);

  // When: English language handling and planned route destinations are inspected.
  // Then: /en receives English document semantics and future hubs do not 404.
  assert.match(middleware, /x-kurodev-locale/);
  assert.match(layout, /lang=\{locale\}/);
  assert.equal(existsSync(japaneseTools), true, "Japanese Tools hub must replace its temporary redirect");
  assert.equal(existsSync(englishTools), true, "English Tools hub must replace its temporary redirect");
  assert.equal(existsSync(japaneseCreatorSite), true, "Japanese Creator Site page must replace its temporary redirect");
  assert.equal(existsSync(englishCreatorSite), true, "English Creator Site page must replace its temporary redirect");
  assert.equal(existsSync(japaneseGuide), true, "Japanese Guide index must replace its temporary redirect");
  assert.equal(existsSync(englishGuide), true, "English Guide index must replace its temporary redirect");
  assert.equal(existsSync(japaneseAbout), true, "Japanese About page must replace its temporary redirect");
  assert.equal(existsSync(englishAbout), true, "English About page must replace its temporary redirect");
  assert.match(nextConfig, /\/works/);
});
