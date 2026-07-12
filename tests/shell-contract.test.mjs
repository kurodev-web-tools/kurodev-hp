import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const headerUrl = new URL("../components/layout/site-header.js", import.meta.url);
const footerUrl = new URL("../components/layout/site-footer.js", import.meta.url);

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
  const header = await readFile(headerUrl, "utf8");

  // When: required controls are inspected.
  // Then: menu state, Escape behavior, and language navigation are explicit.
  assert.match(header, /aria-expanded/);
  assert.match(header, /Escape/);
  assert.match(header, /LanguageSwitch/);
});

test("document language and planned navigation routes resolve without placeholder pages", async () => {
  // Given: locale-aware request handling and temporary section redirects.
  const middlewareUrl = new URL("../middleware.js", import.meta.url);
  assert.equal(existsSync(middlewareUrl), true, "locale middleware must exist");
  const middleware = await readFile(middlewareUrl, "utf8");
  const layout = await readFile(new URL("../app/layout.js", import.meta.url), "utf8");
  const nextConfig = await readFile(new URL("../next.config.mjs", import.meta.url), "utf8");

  // When: English language handling and planned route destinations are inspected.
  // Then: /en receives English document semantics and future hubs do not 404.
  assert.match(middleware, /x-kurodev-locale/);
  assert.match(layout, /lang=\{locale\}/);
  ["/tools", "/creator-site", "/works", "/guide", "/about", "/en/tools"].forEach((route) => {
    assert.match(nextConfig, new RegExp(route.replaceAll("/", "\\/")));
  });
});
