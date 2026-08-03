import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildStaticHomeDocument,
  buildStaticGuideDocument,
  buildStaticCreatorSiteDocument,
  buildStaticContactDocument,
  buildStaticToolsDocument,
  isStaticGuideRequest,
  isStaticHomeRequest,
  isStaticCreatorSiteRequest,
  isStaticContactRequest,
  isStaticToolsRequest,
  staticSourceRequestHeaders
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

test("product media priority reaches the browser without eagerly loading below-fold tool media", async () => {
  // Given: the shared product media primitive and the two below-fold tool sections.
  const [productMedia, featuredTools, toolProductSection] = await Promise.all([
    readFile(new URL("../components/ui/product-media.js", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/featured-tools.js", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/tool-product-section.js", import.meta.url), "utf8")
  ]);

  // When: image priority ownership is inspected at the component boundary.
  const priorityHint = /fetchPriority=\{priority \? ["']high["'] : undefined\}/;
  const eagerLoading = /loading=\{priority \? ["']eager["'] : ["']lazy["']\}/;

  // Then: above-fold callers emit one browser hint without preloading the fallback behind a picture source.
  assert.match(productMedia, priorityHint);
  assert.match(productMedia, eagerLoading);
  assert.doesNotMatch(productMedia, /<Image\b[^>]*\bpriority=\{priority\}/s);
  assert.doesNotMatch(featuredTools, /<ProductMedia\b[^>]*\bpriority(?:\s|=|\/>)/);
  assert.doesNotMatch(toolProductSection, /<ProductMedia\b[^>]*\bpriority(?:\s|=|\/>)/);
});

test("mobile performance paths use responsive modern product media and defer offscreen route sections", async () => {
  // Given: shared product media plus the two image-free routes whose mobile work is layout-bound.
  const [productMedia, componentStyles, creatorSiteStyles, contactStyles] = await Promise.all([
    readFile(new URL("../components/ui/product-media.js", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/components.css", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/creator-site.css", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/contact-page.css", import.meta.url), "utf8")
  ]);

  // When: responsive source generation and below-fold rendering boundaries are inspected.
  const responsiveWidths = /\[640,\s*768,\s*1024,\s*1600\]/;
  const modernSource = /<source\s+type=["']image\/webp["'][^>]*srcSet=\{modernSrcSet\}[^>]*sizes=\{productMediaSizes\}/s;
  const sizedPicture = /\.product-media\s+picture\s*\{[^}]*display:\s*block;[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*\}/s;
  const deferredRendering = /content-visibility:\s*auto;[\s\S]*?contain-intrinsic-(?:block-)?size:\s*auto\s+\d+px;/;

  // Then: Kuro Stream Kit media can select a right-sized WebP while other routes skip offscreen layout initially.
  assert.match(productMedia, responsiveWidths);
  assert.match(productMedia, modernSource);
  assert.match(componentStyles, sizedPicture);
  assert.match(creatorSiteStyles, deferredRendering);
  assert.match(contactStyles, deferredRendering);
});

test("responsive product media includes the intermediate mobile decode rung", async () => {
  // Given: the four approved Kuro Stream Kit screenshots used by Home and Tools.
  const imageNames = ["portal-home", "schedule-calendar", "thumbnail-editor", "sns-split"];

  // When: the intermediate mobile sources are resolved from the public asset tree.
  const intermediateSources = await Promise.all(
    imageNames.map((imageName) =>
      readFile(new URL(`../public/images/kuro-stream-kit/${imageName}-768.webp`, import.meta.url))
        .then((contents) => contents.subarray(0, 4).toString("ascii"))
        .catch(() => "missing")
    )
  );

  // Then: every source is a WebP container instead of falling through to the 1024 px rung.
  assert.deepEqual(intermediateSources, imageNames.map(() => "RIFF"));
});

test("home mobile first paint defers sections after the creator hero", async () => {
  // Given: the Home route stylesheet owns every section after the above-fold creator hero.
  const homeStyles = await readFile(new URL("../app/styles/home-sections.css", import.meta.url), "utf8");

  // When: the mobile rendering boundary is inspected.
  const deferredHomeSections = /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.site-main\s*>\s*\.creator-hero\s*~\s*\*\s*\{[^}]*content-visibility:\s*auto;[^}]*contain-intrinsic-size:\s*auto\s+\d+px;/;

  // Then: below-fold Home sections do not join the initial mobile layout pass.
  assert.match(homeStyles, deferredHomeSections);
});

test("creator site mobile first paint isolates the decorative hero stage", async () => {
  // Given: the Creator Site hero contains a decorative grid beside the LCP copy.
  const creatorSiteStyles = await readFile(new URL("../app/styles/creator-site.css", import.meta.url), "utf8");

  // When: the mobile hero rendering boundary is inspected.
  const isolatedHeroStage = /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.creator-site-hero__stage\s*\{[^}]*contain:\s*layout;/;

  // Then: layout work inside the decoration cannot expand the LCP copy's layout scope.
  assert.match(creatorSiteStyles, isolatedHeroStage);
});

test("image-backed mobile heroes contain layout while Tools defers only work below the near-viewport workflow", async () => {
  // Given: Home and Tools both paint an eager product image before their long-form sections.
  const [homeHeroStyles, toolsStyles] = await Promise.all([
    readFile(new URL("../app/styles/home-hero.css", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/tools-page.css", import.meta.url), "utf8")
  ]);

  // When: mobile-only hero and post-hero boundaries are inspected.
  const homeHeroContainment = /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.product-stage\s*\{[^}]*contain:\s*layout;/;
  const toolsHeroContainment = /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.tools-hero__stage\s*\{[^}]*contain:\s*layout;/;
  const deferredToolsSections = /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.site-main\s*>\s*\.tools-hero\s*~\s*:not\(\.tool-workflow\)\s*\{[^}]*content-visibility:\s*auto;[^}]*contain-intrinsic-size:\s*auto\s+\d+px;/;
  const broadPostHeroDeferral = /\.site-main\s*>\s*\.tools-hero\s*~\s*\*\s*\{/;

  // Then: decoding and below-fold layout cannot widen the initial mobile layout scope.
  assert.match(homeHeroStyles, homeHeroContainment);
  assert.match(toolsStyles, toolsHeroContainment);
  assert.match(toolsStyles, deferredToolsSections);
  assert.doesNotMatch(toolsStyles, broadPostHeroDeferral);
});

test("image-free mobile heroes contain their text LCP layout scope", async () => {
  // Given: Creator Site and Contact use text rather than an image as their mobile LCP element.
  const [creatorSiteStyles, contactStyles] = await Promise.all([
    readFile(new URL("../app/styles/creator-site.css", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/contact-page.css", import.meta.url), "utf8")
  ]);

  // When: the route hero boundaries are inspected at the mobile breakpoint.
  const creatorHeroContainment = /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.creator-site-hero\s*\{[^}]*contain:\s*layout;/;
  const contactHeroContainment = /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.contact-hero\s*\{[^}]*contain:\s*layout;/;

  // Then: lower-page layout cannot expand either text LCP hero's layout scope.
  assert.match(creatorSiteStyles, creatorHeroContainment);
  assert.match(contactStyles, contactHeroContainment);
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
        <main id="main-content">
          <h1>Getting started</h1>
          <img
            loading="lazy"
            srcSet="/_next/image?url=%2Fimages%2Fguide%2Foverview.png&amp;w=1920&amp;q=75 1x, /_next/image?url=%2Fimages%2Fguide%2Foverview.png&amp;w=3840&amp;q=75 2x"
            src="/_next/image?url=%2Fimages%2Fguide%2Foverview.png&amp;w=3840&amp;q=75"
            alt="Approved guide image"
          />
        </main>
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

  // And: the standalone document keeps one native lazy source that loads without Next's client runtime.
  assert.match(transformed, /loading="lazy"/);
  assert.match(transformed, /src="\/_next\/image\?url=%2Fimages%2Fguide%2Foverview\.png/);
  assert.doesNotMatch(transformed, /\ssrcset=/i);
});

test("the spike targets only the exact Japanese getting-started document and bypasses its source fetch", () => {
  assert.equal(isStaticGuideRequest(new URL("https://kuro-lab.com/guide/getting-started")), true);
  assert.equal(isStaticGuideRequest(new URL("https://kuro-lab.com/guide/getting-started?__kurodev_app_source=1")), false);
  assert.equal(isStaticGuideRequest(new URL("https://kuro-lab.com/guide")), false);
  assert.equal(isStaticGuideRequest(new URL("https://kuro-lab.com/en/guide/getting-started")), false);
});

test("the Japanese home document preserves its server content and installs only required islands", () => {
  // Given: the production Home document with approved metadata, CSS, media, and theme initialization.
  const source = `<!doctype html>
    <html data-theme="light">
      <head>
        <style data-precedence="next">.creator-hero{display:grid}</style>
        <meta name="description" content="approved home metadata" />
      </head>
      <body>
        <script>window.__themeInitWasKept = true;</script>
        <main id="main-content">
          <h1>Creator platform</h1>
          <img src="/images/kuro-stream-kit-home.webp" width="1200" height="675" alt="Product" />
        </main>
        <script src="/_next/static/chunks/app/page.js" async></script>
        <script>self.__next_f.push([1,"home flight payload"])</script>
      </body>
    </html>`;

  // When: only the exact Japanese Home document is converted to static islands.
  const transformed = buildStaticHomeDocument(source);

  // Then: approved content, metadata, inline CSS, theme initialization, and media remain intact.
  assert.match(transformed, /Creator platform/);
  assert.match(transformed, /approved home metadata/);
  assert.match(transformed, /data-precedence="next"/);
  assert.match(transformed, /__themeInitWasKept/);
  assert.match(transformed, /kuro-stream-kit-home\.webp/);

  // And: the App Router bootstrap is replaced by the shared-control and Home locale-suggestion islands.
  assert.doesNotMatch(transformed, /_next\/static\/chunks/);
  assert.doesNotMatch(transformed, /self\.__next_f/);
  assert.match(transformed, /data-kurodev-static-home/);
  assert.match(transformed, /data-kurodev-island/);
  assert.match(transformed, /data-kurodev-english-suggestion-island/);
  assert.match(transformed, /kurodev-english-suggestion-dismissed/);
  assert.match(transformed, /requestAnimationFrame/);
  assert.match(transformed, /product-media img/);
});

test("the Home static route is exact and internal source fetches carry no visitor credentials", () => {
  // Given: public Home, locale variants, and a marked internal source request.
  const publicHome = new URL("https://kuro-lab.com/");
  const markedHome = new URL("https://kuro-lab.com/?__kurodev_app_source=1");

  // When: route eligibility and internal source headers are built.
  const sourceHeaders = staticSourceRequestHeaders("ja");

  // Then: only public Japanese Home is eligible and no visitor credential can cross the extra hop.
  assert.equal(isStaticHomeRequest(publicHome), true);
  assert.equal(isStaticHomeRequest(markedHome), false);
  assert.equal(isStaticHomeRequest(new URL("https://kuro-lab.com/en")), false);
  assert.equal(isStaticHomeRequest(new URL("https://kuro-lab.com/tools")), false);
  assert.equal(isStaticHomeRequest(publicHome, "POST"), false);
  assert.equal(sourceHeaders.get("accept"), "text/html");
  assert.equal(sourceHeaders.get("x-kurodev-locale"), "ja");
  assert.equal(sourceHeaders.get("user-agent"), "kurodev-static-document/1.0");
  assert.equal(sourceHeaders.has("cookie"), false);
  assert.equal(sourceHeaders.has("authorization"), false);
});

test("static document transforms keep description metadata inside the document head", () => {
  // Given: a source document whose description metadata is already in the head.
  const source = `<!doctype html><html><head><meta name="description" content="qa-description" /></head><body><main>Content</main></body></html>`;

  // When: each affected static route removes the Next.js runtime from that document.
  const documents = [
    buildStaticGuideDocument(source),
    buildStaticCreatorSiteDocument(source),
    buildStaticContactDocument(source, "ja")
  ];

  // Then: every transform preserves the description metadata inside the head.
  documents.forEach((document) => {
    const head = document.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
    assert.match(head, /<meta name="description" content="qa-description" \/>/);
  });
});

test("the Japanese tools document preserves products and external-link semantics", () => {
  // Given: the production Tools document with approved metadata, CSS, media, and launch links.
  const source = `<!doctype html>
    <html data-theme="light">
      <head>
        <style data-precedence="next">.tools-hero{display:grid}</style>
        <meta name="description" content="approved tools metadata" />
      </head>
      <body>
        <script>window.__themeInitWasKept = true;</script>
        <main id="main-content">
          <h1>Kuro Stream Kit</h1>
          <img src="/images/kuro-stream-kit/schedule-calendar.png" alt="Schedule Calendar" />
          <a href="https://streamer-tools.kuro-lab.com/tools/schedule-calendar/" target="_blank" rel="noreferrer">
            ツールを使う<span class="sr-only">（新しいタブで開きます）</span>
          </a>
        </main>
        <script src="/_next/static/chunks/app/tools/page.js" async></script>
        <script>self.__next_f.push([1,"tools flight payload"])</script>
      </body>
    </html>`;

  // When: only the exact Japanese Tools document is converted to static islands.
  const transformed = buildStaticToolsDocument(source);

  // Then: approved content, metadata, inline CSS, theme initialization, media, and links remain intact.
  assert.match(transformed, /Kuro Stream Kit/);
  assert.match(transformed, /approved tools metadata/);
  assert.match(transformed, /data-precedence="next"/);
  assert.match(transformed, /__themeInitWasKept/);
  assert.match(transformed, /schedule-calendar\.png/);
  assert.match(transformed, /target="_blank" rel="noreferrer"/);
  assert.match(transformed, /新しいタブで開きます/);

  // And: the App Router bootstrap is replaced by the shared-control island only.
  assert.doesNotMatch(transformed, /_next\/static\/chunks/);
  assert.doesNotMatch(transformed, /self\.__next_f/);
  assert.match(transformed, /data-kurodev-static-tools/);
  assert.match(transformed, /data-kurodev-island/);
  assert.doesNotMatch(transformed, /data-kurodev-english-suggestion-island/);
});

test("the Tools static route is exact and GET-only", () => {
  const publicTools = new URL("https://kuro-lab.com/tools");

  assert.equal(isStaticToolsRequest(publicTools), true);
  assert.equal(isStaticToolsRequest(new URL("https://kuro-lab.com/tools?__kurodev_app_source=1")), false);
  assert.equal(isStaticToolsRequest(new URL("https://kuro-lab.com/en/tools")), false);
  assert.equal(isStaticToolsRequest(new URL("https://kuro-lab.com/tool")), false);
  assert.equal(isStaticToolsRequest(publicTools, "HEAD"), false);
  assert.equal(isStaticToolsRequest(publicTools, "POST"), false);
});

test("the Japanese creator-site document preserves demonstrations and link semantics", () => {
  // Given: the approved service document with fictional examples, motion CSS, and an external plan link.
  const source = `<!doctype html>
    <html data-theme="light">
      <head>
        <style data-precedence="next">
          .service-demo__preview{transition:transform var(--motion-reveal)}
          @media (forced-colors:active){.creator-site-hero::before{display:none}}
        </style>
        <meta name="description" content="approved creator-site metadata" />
      </head>
      <body>
        <script>window.__themeInitWasKept = true;</script>
        <main id="main-content">
          <h1>活動を、自分の場所にまとめる。</h1>
          <article><h2>水城ルカ</h2><p>架空の活動名とサンプル情報を使用しています。</p></article>
          <article><h2>Aoi Atelier</h2><p>架空の活動名とサンプル情報を使用しています。</p></article>
          <a href="https://templates.kuro-lab.com/plans" target="_blank" rel="noreferrer">
            HP-portalのプランを見る<span class="sr-only">(opens in a new tab)</span>
          </a>
        </main>
        <script src="/_next/static/chunks/app/creator-site/page.js" async></script>
        <script>self.__next_f.push([1,"creator-site flight payload"])</script>
      </body>
    </html>`;

  // When: only the exact Japanese Creator Site document is converted to static islands.
  const transformed = buildStaticCreatorSiteDocument(source);

  // Then: approved copy, fictional examples, metadata, CSS/motion, theme, and external link semantics remain intact.
  assert.match(transformed, /活動を、自分の場所にまとめる。/);
  assert.match(transformed, /水城ルカ/);
  assert.match(transformed, /Aoi Atelier/);
  assert.match(transformed, /架空の活動名とサンプル情報/);
  assert.match(transformed, /approved creator-site metadata/);
  assert.match(transformed, /--motion-reveal/);
  assert.match(transformed, /forced-colors:active/);
  assert.match(transformed, /__themeInitWasKept/);
  assert.match(transformed, /target="_blank" rel="noreferrer"/);

  // And: the App Router bootstrap is replaced by the shared-control island only.
  assert.doesNotMatch(transformed, /_next\/static\/chunks/);
  assert.doesNotMatch(transformed, /self\.__next_f/);
  assert.match(transformed, /data-kurodev-static-creator-site/);
  assert.match(transformed, /data-kurodev-island/);
});

test("the Creator Site static route is exact and GET-only", () => {
  const publicCreatorSite = new URL("https://kuro-lab.com/creator-site");

  assert.equal(isStaticCreatorSiteRequest(publicCreatorSite), true);
  assert.equal(isStaticCreatorSiteRequest(new URL("https://kuro-lab.com/creator-site?__kurodev_app_source=1")), false);
  assert.equal(isStaticCreatorSiteRequest(new URL("https://kuro-lab.com/en/creator-site")), false);
  assert.equal(isStaticCreatorSiteRequest(new URL("https://kuro-lab.com/creator-sites")), false);
  assert.equal(isStaticCreatorSiteRequest(publicCreatorSite, "HEAD"), false);
  assert.equal(isStaticCreatorSiteRequest(publicCreatorSite, "POST"), false);
});

test("the Japanese Contact document preserves consent and installs a form island", () => {
  // Given: the production Contact form with approved visible consent copy and external-link semantics.
  const source = `<!doctype html>
    <html data-theme="light">
      <head>
        <style data-precedence="next">.contact-form__error{color:red}</style>
        <meta name="description" content="approved contact metadata" />
      </head>
      <body>
        <script>window.__themeInitWasKept = true;</script>
        <main id="main-content">
          <h1>制作について相談する</h1>
          <form class="contact-form" novalidate>
            <input id="contact-name" name="name" required maxlength="80" />
            <input id="contact-email" name="email" type="email" required maxlength="120" />
            <select id="contact-category" name="category" required><option value="">カテゴリを選択</option></select>
            <input id="contact-reference-url" name="referenceUrl" type="url" maxlength="300" />
            <textarea id="contact-message" name="message" required maxlength="3000" aria-describedby="message-guidance"></textarea>
            <div class="contact-form__consent">
              <input id="contact-privacy-acknowledged" name="privacyAcknowledged" type="checkbox" required />
              <span>プライバシーポリシー（version 1.0.0）を確認しました。</span>
            </div>
            <div class="contact-form__consent">
              <input id="contact-foreign-transfer-consent" name="foreignTransferConsent" type="checkbox" required />
              <span>国外での個人データの取扱い（version 1.0.0）を確認し、同意します。</span>
            </div>
            <div class="contact-form__actions"><button type="submit">送信する</button></div>
            <div class="contact-form__status contact-form__status--idle" role="status" aria-live="polite" aria-atomic="true"></div>
          </form>
          <a href="https://templates.kuro-lab.com/plans" target="_blank" rel="noreferrer">HP-portal</a>
        </main>
        <script src="/_next/static/chunks/app/contact/page.js" async></script>
        <script>self.__next_f.push([1,"contact flight payload"])</script>
      </body>
    </html>`;

  // When: the Japanese Contact document is converted to its form-island boundary.
  const transformed = buildStaticContactDocument(source, "ja");

  // Then: approved content, consent, metadata, CSS, theme initialization, and links remain intact.
  assert.match(transformed, /制作について相談する/);
  assert.match(transformed, /プライバシーポリシー（version 1\.0\.0）/);
  assert.match(transformed, /国外での個人データの取扱い（version 1\.0\.0）/);
  assert.match(transformed, /approved contact metadata/);
  assert.match(transformed, /data-precedence="next"/);
  assert.match(transformed, /__themeInitWasKept/);
  assert.match(transformed, /target="_blank" rel="noreferrer"/);

  // And: the form island pins current evidence, fallback, accessible states, and provider order.
  assert.doesNotMatch(transformed, /_next\/static\/chunks/);
  assert.doesNotMatch(transformed, /self\.__next_f/);
  assert.match(transformed, /data-kurodev-static-contact/);
  assert.match(transformed, /data-kurodev-island/);
  assert.match(transformed, /data-kurodev-contact-island/);
  assert.match(transformed, /contact-privacy-acknowledgement-ja-v1/);
  assert.match(transformed, /1aa2b6d9d69d6ef935db30eb410c288cac3460085feb8936d78ca32dd14c3898/);
  assert.match(transformed, /e7f071b7850b82ddaf8d066fabae80649f1209a9577e55fd245b863c8bb0452a/);
  assert.match(transformed, /mailto:contact@kuro-lab\.com/);
  assert.match(transformed, /aria-live/);
  assert.match(transformed, /requestAnimationFrame/);
  assert.ok(transformed.indexOf("var nextErrors = validateValues(values)") < transformed.indexOf("await executeTurnstile()"));
  assert.ok(transformed.indexOf("await executeTurnstile()") < transformed.indexOf('fetch("/api/contact"'));
});

test("the Contact static route is exact and GET-only", () => {
  const publicContact = new URL("https://kuro-lab.com/contact");

  assert.equal(isStaticContactRequest(publicContact), true);
  assert.equal(isStaticContactRequest(new URL("https://kuro-lab.com/contact?__kurodev_app_source=1")), false);
  assert.equal(isStaticContactRequest(new URL("https://kuro-lab.com/en/contact")), false);
  assert.equal(isStaticContactRequest(new URL("https://kuro-lab.com/contacts")), false);
  assert.equal(isStaticContactRequest(publicContact, "HEAD"), false);
  assert.equal(isStaticContactRequest(publicContact, "POST"), false);
});
