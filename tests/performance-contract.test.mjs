import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildStaticGuideDocument,
  isStaticGuideRequest
} from "../lib/static-guide-document.mjs";

const pageStyleOwners = [
  ["components/pages/home-page.js", ["home-hero.css", "home-sections.css"]],
  ["components/pages/tools-page.js", ["tools-page.css"]],
  ["components/pages/creator-site-page.js", ["creator-site.css"]],
  ["components/pages/works-page.js", ["works-page.css"]],
  ["components/pages/kuro-stream-kit-case-study.js", ["works-page.css"]],
  ["components/pages/guide-index-page.js", ["guide-page.css"]],
  ["components/pages/guide-article-page.js", ["guide-page.css"]],
  ["components/pages/about-page.js", ["about-page.css"]],
  ["components/pages/contact-page.js", ["contact-page.css"]],
  ["components/pages/legal-page.js", ["legal-page.css"]]
];

test("page-family styles stay out of the shared root bundle", async () => {
  // Given: every page family and the root layout consumed by all routes.
  const layout = await readFile(new URL("../app/layout.js", import.meta.url), "utf8");
  const pageSources = await Promise.all(
    pageStyleOwners.map(async ([relativePath, styles]) => [
      relativePath,
      styles,
      await readFile(new URL(`../${relativePath}`, import.meta.url), "utf8")
    ])
  );

  // When: style ownership is inspected at the bundler import boundary.
  const rootPageStyleImports = pageStyleOwners
    .flatMap(([, styles]) => styles)
    .filter((style) => layout.includes(`./styles/${style}`));

  // Then: root keeps no page-family CSS and each family owns its required styles.
  assert.deepEqual(rootPageStyleImports, []);
  for (const [relativePath, styles, source] of pageSources) {
    for (const style of styles) {
      assert.match(source, new RegExp(`app/styles/${style.replace(".", "\\.")}`), `${relativePath} must own ${style}`);
    }
  }
});

test("production CSS is inlined without a render-blocking stylesheet request", async () => {
  // Given: the production Next.js configuration.
  const nextConfig = await readFile(new URL("../next.config.mjs", import.meta.url), "utf8");

  // When: the CSS delivery setting is inspected.
  const inlineCssEnabled = /experimental:\s*{[\s\S]*inlineCss:\s*true/.test(nextConfig);

  // Then: production rendering uses Next.js inline CSS.
  assert.equal(inlineCssEnabled, true);
});

test("shared shell copy stays on the server while interactive controls remain isolated", async () => {
  // Given: the shared shell components rendered on every public route.
  const [shell, header, footer] = await Promise.all([
    readFile(new URL("../components/site-shell.js", import.meta.url), "utf8"),
    readFile(new URL("../components/layout/site-header.js", import.meta.url), "utf8"),
    readFile(new URL("../components/layout/site-footer.js", import.meta.url), "utf8")
  ]);

  // When: the React client boundaries are inspected.
  const sharedClientModules = [header, footer].filter((source) => /^\s*["']use client["'];/.test(source));

  // Then: locale copy is selected by server components and the shell supplies its locale.
  assert.deepEqual(sharedClientModules, []);
  assert.doesNotMatch(header, /usePathname|useEffect|useState/);
  assert.doesNotMatch(footer, /usePathname/);
  assert.match(shell, /SiteHeader locale={locale}/);
  assert.match(shell, /SiteFooter locale={locale}/);
});

test("the getting-started spike removes only Next bootstrap and installs a behavior island", () => {
  // Given: the production document shape emitted by the App Router.
  const source = `<!doctype html>
    <html data-theme="light">
      <head>
        <style data-precedence="next">.guide{display:block}</style>
        <link rel="preload" href="/_next/static/chunks/app/layout.js" as="script" />
        <meta name="description" content="kept metadata" />
      </head>
      <body>
        <script>window.__themeInitWasKept = true;</script>
        <main id="main-content"><h1>Getting started</h1></main>
        <script src="/_next/static/chunks/webpack.js" async></script>
        <script>self.__next_f.push([1,"flight payload"])</script>
      </body>
    </html>`;

  // When: the exact guide route is converted into the static/islands spike.
  const transformed = buildStaticGuideDocument(source);

  // Then: content, metadata, CSS, and theme initialization stay intact.
  assert.match(transformed, /Getting started/);
  assert.match(transformed, /kept metadata/);
  assert.match(transformed, /data-precedence="next"/);
  assert.match(transformed, /__themeInitWasKept/);

  // And: App Router bootstrap is absent while the approved interaction island is present.
  assert.doesNotMatch(transformed, /_next\/static\/chunks/);
  assert.doesNotMatch(transformed, /self\.__next_f/);
  assert.match(transformed, /data-kurodev-static-guide/);
  assert.match(transformed, /data-kurodev-island/);
});

test("the spike targets only the exact Japanese getting-started document and bypasses its source fetch", () => {
  assert.equal(isStaticGuideRequest(new URL("https://kuro-lab.com/guide/getting-started")), true);
  assert.equal(isStaticGuideRequest(new URL("https://kuro-lab.com/guide/getting-started?__kurodev_app_source=1")), false);
  assert.equal(isStaticGuideRequest(new URL("https://kuro-lab.com/guide")), false);
  assert.equal(isStaticGuideRequest(new URL("https://kuro-lab.com/en/guide/getting-started")), false);
});
