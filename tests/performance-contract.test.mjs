import assert from "node:assert/strict";
import { lstat, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";

const root = new URL("../", import.meta.url);
const turnstileSiteKey = "0x4AAAAAAAAAAAAAAAAAAAAA";
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
  const layout = await readFile(new URL("app/layout.js", root), "utf8");
  const pageSources = await Promise.all(pageStyleOwners.map(async ([relativePath, styles]) => [
    relativePath,
    styles,
    await readFile(new URL(relativePath, root), "utf8")
  ]));
  const rootPageStyleImports = pageStyleOwners.flatMap(([, styles]) => styles)
    .filter((style) => layout.includes(`./styles/${style}`));
  assert.deepEqual(rootPageStyleImports, []);
  for (const [relativePath, styles, source] of pageSources) {
    for (const style of styles) assert.match(source, new RegExp(`app/styles/${style.replace(".", "\\.")}`), `${relativePath} must own ${style}`);
  }
});

test("production CSS remains inlined without a render-blocking stylesheet request", async () => {
  const nextConfig = await readFile(new URL("next.config.mjs", root), "utf8");
  assert.equal(/experimental:\s*{[\s\S]*inlineCss:\s*true/.test(nextConfig), true);
});

test("shared shell copy stays server-rendered while the shell passes its locale", async () => {
  const [shell, header, footer] = await Promise.all([
    readFile(new URL("components/site-shell.js", root), "utf8"),
    readFile(new URL("components/layout/site-header.js", root), "utf8"),
    readFile(new URL("components/layout/site-footer.js", root), "utf8")
  ]);
  assert.match(shell, /SiteHeader locale={locale}/);
  assert.match(shell, /SiteFooter locale={locale}/);
  assert.doesNotMatch(header, /^\s*["']use client["'];/);
  assert.doesNotMatch(footer, /^\s*["']use client["'];/);
  assert.doesNotMatch(header, /usePathname|useEffect|useState/);
  assert.doesNotMatch(footer, /usePathname/);
});

test("product media keeps the approved responsive WebP and priority boundary", async () => {
  const [productMedia, featuredTools, toolProductSection] = await Promise.all([
    readFile(new URL("components/ui/product-media.js", root), "utf8"),
    readFile(new URL("components/sections/featured-tools.js", root), "utf8"),
    readFile(new URL("components/sections/tool-product-section.js", root), "utf8")
  ]);
  assert.match(productMedia, /\[640,\s*768,\s*1024,\s*1600\]/);
  assert.match(productMedia, /fetchPriority={priority \? ["']high["'] : undefined}/);
  assert.match(productMedia, /loading={priority \? ["']eager["'] : ["']lazy["']}/);
  assert.doesNotMatch(productMedia, /<Image\b[^>]*\bpriority={priority}/s);
  assert.doesNotMatch(featuredTools, /<ProductMedia\b[^>]*\bpriority(?:\s|=|\/)>/);
  assert.doesNotMatch(toolProductSection, /<ProductMedia\b[^>]*\bpriority(?:\s|=|\/)>/);
});

test("mobile performance paths keep responsive media, picture sizing, and offscreen containment", async () => {
  const [productMedia, componentStyles, creatorSiteStyles, contactStyles] = await Promise.all([
    readFile(new URL("components/ui/product-media.js", root), "utf8"),
    readFile(new URL("app/styles/components.css", root), "utf8"),
    readFile(new URL("app/styles/creator-site.css", root), "utf8"),
    readFile(new URL("app/styles/contact-page.css", root), "utf8")
  ]);
  assert.match(productMedia, /<source\s+type=["']image\/webp["'][^>]*srcSet={modernSrcSet}[^>]*sizes={productMediaSizes}/s);
  assert.match(componentStyles, /\.product-media\s+picture\s*\{[^}]*display:\s*block;[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*\}/s);
  const deferredRendering = /content-visibility:\s*auto;[\s\S]*?contain-intrinsic-(?:block-)?size:\s*auto\s+\d+px;/;
  assert.match(creatorSiteStyles, deferredRendering);
  assert.match(contactStyles, deferredRendering);
});

test("responsive product media includes the intermediate mobile decode rung", async () => {
  const imageNames = ["portal-home", "schedule-calendar", "thumbnail-editor", "sns-split"];
  const sources = await Promise.all(imageNames.map((imageName) => readFile(new URL(`public/images/kuro-stream-kit/${imageName}-768.webp`, root))
    .then((contents) => contents.subarray(0, 4).toString("ascii")).catch(() => "missing")));
  assert.deepEqual(sources, imageNames.map(() => "RIFF"));
});

test("Home mobile keeps post-hero rendering deferred", async () => {
  const styles = await readFile(new URL("app/styles/home-sections.css", root), "utf8");
  assert.match(styles, /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.site-main\s*>\s*\.creator-hero\s*~\s*\*\s*\{[^}]*content-visibility:\s*auto;[^}]*contain-intrinsic-size:\s*auto\s+\d+px;/);
});

test("Tools mobile excludes the near-viewport workflow from post-hero deferral", async () => {
  const [homeHeroStyles, toolsStyles] = await Promise.all([
    readFile(new URL("app/styles/home-hero.css", root), "utf8"),
    readFile(new URL("app/styles/tools-page.css", root), "utf8")
  ]);
  assert.match(homeHeroStyles, /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.product-stage\s*\{[^}]*contain:\s*layout;/);
  assert.match(toolsStyles, /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.tools-hero__stage\s*\{[^}]*contain:\s*layout;/);
  assert.match(toolsStyles, /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.site-main\s*>\s*\.tools-hero\s*~\s*:not\(\.tool-workflow\)\s*\{[^}]*content-visibility:\s*auto;[^}]*contain-intrinsic-size:\s*auto\s+\d+px;/);
  assert.doesNotMatch(toolsStyles, /\.site-main\s*>\s*\.tools-hero\s*~\s*\*\s*\{/);
});

test("Creator Site mobile isolates its decorative hero stage", async () => {
  const styles = await readFile(new URL("app/styles/creator-site.css", root), "utf8");
  assert.match(styles, /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.creator-site-hero__stage\s*\{[^}]*contain:\s*layout;/);
});

test("image-free mobile heroes contain their text LCP layout scope", async () => {
  const [creatorSiteStyles, contactStyles] = await Promise.all([
    readFile(new URL("app/styles/creator-site.css", root), "utf8"),
    readFile(new URL("app/styles/contact-page.css", root), "utf8")
  ]);
  assert.match(creatorSiteStyles, /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.creator-site-hero\s*\{[^}]*contain:\s*layout;/);
  assert.match(contactStyles, /@media\s*\(max-width:\s*767px\)\s*\{[\s\S]*?\.contact-hero\s*\{[^}]*contain:\s*layout;/);
});

test("static document transformer keeps meaningful document content while removing Next runtime payloads", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const source = `<!doctype html><html lang="ja"><head><title>Kept title</title><meta name="description" content="Kept description"><link rel="preload" as="script" href="/_next/static/chunks/app.js"></head><body><main id="main-content"><h1>Kept heading</h1><img src="/_next/image?url=%2Fimages%2Fguide%2Foverview.png&amp;w=1920" alt="Guide"></main><script src="/_next/static/chunks/app.js"></script><script>self.__next_f.push([1,"flight"])</script></body></html>`;
  const output = transformStaticDocument(source, { route: "/guide/getting-started", locale: "ja", turnstileSiteKey });

  assert.match(output, /<html[^>]*lang="ja"/);
  assert.match(output, /Kept title/);
  assert.match(output, /Kept description/);
  assert.match(output, /Kept heading/);
  assert.match(output, /src="\/images\/guide\/overview\.png"/);
  assert.match(output, /data-kurodev-island/);
  assert.match(output, /data-kurodev-guide-island/);
  assert.doesNotMatch(output, /_next\/static\/chunks|self\.__next_f|as="script"/);
});

test("Home transform retains the English suggestion island", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const source = "<!doctype html><html lang=\"ja\"><head><title>Home</title><meta name=\"description\" content=\"Home\"></head><body><main><h1>Home</h1></main></body></html>";
  const output = transformStaticDocument(source, { route: "/", locale: "ja", turnstileSiteKey });
  assert.match(output, /data-kurodev-english-suggestion-island/);
  assert.match(output, /data-kurodev-static-home/);
});

test("route transforms retain approved content, head metadata, and route-specific islands", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const sources = [
    ["/", "ja", "Creator platform", "data-kurodev-static-home"],
    ["/tools", "ja", "Kuro Stream Kit", "data-kurodev-static-tools"],
    ["/creator-site", "ja", "架空の活動名とサンプル情報を使用しています。", "data-kurodev-static-creator-site"]
  ];
  for (const [route, locale, content, marker] of sources) {
    const source = `<!doctype html><html lang="${locale}"><head><style data-precedence="next">.page{display:block}</style><meta name="description" content="approved metadata"></head><body><script>window.__themeInitWasKept = true;</script><main id="main-content"><h1>${content}</h1><a href="https://example.test" target="_blank" rel="noreferrer">Open</a></main><script src="/_next/static/chunks/app/page.js"></script><script>self.__next_f.push([1,"flight"])</script></body></html>`;
    const output = transformStaticDocument(source, { route, locale, turnstileSiteKey });
    const head = output.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
    assert.match(output, new RegExp(content));
    assert.match(head, /approved metadata/);
    assert.match(output, /data-precedence="next"/);
    assert.match(output, /__themeInitWasKept/);
    assert.match(output, /target="_blank" rel="noreferrer"/);
    assert.match(output, new RegExp(marker));
    assert.match(output, /data-kurodev-island/);
    assert.doesNotMatch(output, /_next\/static\/chunks|self\.__next_f/);
  }
});

test("Tools transform preserves external link semantics without a route-specific runtime", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const source = "<!doctype html><html lang=\"ja\"><head><title>Tools</title><meta name=\"description\" content=\"Tools\"></head><body><main><h1>Tools</h1><a href=\"https://example.test\" target=\"_blank\" rel=\"noreferrer\">Open</a></main></body></html>";
  const output = transformStaticDocument(source, { route: "/tools", locale: "ja", turnstileSiteKey });
  assert.match(output, /target="_blank" rel="noreferrer"/);
  assert.match(output, /data-kurodev-island/);
});

test("Creator Site transform preserves approved visible content", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const source = "<!doctype html><html lang=\"ja\"><head><title>Creator</title><meta name=\"description\" content=\"Creator\"></head><body><main><h1>活動を、自分の場所にまとめる。</h1><p>架空の活動名とサンプル情報</p></main></body></html>";
  const output = transformStaticDocument(source, { route: "/creator-site", locale: "ja", turnstileSiteKey });
  assert.match(output, /活動を、自分の場所にまとめる。/);
  assert.match(output, /架空の活動名とサンプル情報/);
});

test("Guide transform adds the Guide interaction island for English routes", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const source = "<!doctype html><html lang=\"en\"><head><title>Guide</title><meta name=\"description\" content=\"Guide\"></head><body><main><h1>Guide</h1><article class=\"guide-article\"><details><summary>More</summary></details></article></main></body></html>";
  const output = transformStaticDocument(source, { route: "/en/guide/getting-started", locale: "en", turnstileSiteKey });
  assert.match(output, /data-kurodev-guide-island/);
  assert.match(output, /dataset\.kurodevOpen/);
});

test("legal transform has no Contact or Guide island", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const source = "<!doctype html><html lang=\"ja\"><head><title>Terms</title><meta name=\"description\" content=\"Terms\"></head><body><main><h1>Terms</h1></main></body></html>";
  const output = transformStaticDocument(source, { route: "/terms", locale: "ja", turnstileSiteKey });
  assert.doesNotMatch(output, /data-kurodev-contact-island|data-kurodev-guide-island/);
});

test("Contact document creation fails closed without a syntactically valid public Turnstile key", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const source = "<!doctype html><html lang=\"ja\"><head><title>Contact</title><meta name=\"description\" content=\"Contact\"></head><body><main><h1>Contact</h1><form class=\"contact-form\"></form></main></body></html>";
  assert.throws(() => transformStaticDocument(source, { route: "/contact", locale: "ja", turnstileSiteKey: "" }), /Turnstile site key/);
  assert.throws(() => transformStaticDocument(source, { route: "/contact", locale: "ja", turnstileSiteKey: "invalid" }), /Turnstile site key/);
  assert.match(transformStaticDocument(source, { route: "/contact", locale: "ja", turnstileSiteKey }), /data-kurodev-contact-island/);
});

test("Contact island preserves validation before Turnstile and API submission", async () => {
  const { transformStaticDocument } = await import(new URL("lib/static-guide-document.mjs", root).href);
  const source = "<!doctype html><html lang=\"ja\"><head><title>Contact</title><meta name=\"description\" content=\"Contact\"></head><body><main><h1>Contact</h1><form class=\"contact-form\"><input name=\"name\"><input name=\"email\"><select name=\"category\"></select><input name=\"referenceUrl\"><textarea name=\"message\"></textarea><input name=\"privacyAcknowledged\"><input name=\"foreignTransferConsent\"><div class=\"contact-form__actions\"></div><button type=\"submit\"></button><div class=\"contact-form__status\"></div></form></main></body></html>";
  const output = transformStaticDocument(source, { route: "/contact", locale: "ja", turnstileSiteKey });
  assert.ok(output.indexOf("var nextErrors = validateValues(values)") < output.indexOf("await executeTurnstile()"));
  assert.ok(output.indexOf("await executeTurnstile()") < output.indexOf('fetch("/api/contact"'));
  assert.match(output, /data-kurodev-static-contact/);
  assert.match(output, /data-kurodev-contact-island/);
  assert.match(output, /aria-live/);
});

test("static builder defines transactional recovery, GET-only local snapshots, and candidate validation", async () => {
  const builder = await readFile(new URL("scripts/build-static-first-cloudflare.mjs", root), "utf8");
  assert.match(builder, /\.open-next-recovery/);
  assert.match(builder, /\.open-next-candidate/);
  assert.match(builder, /method:\s*["']GET["']/);
  assert.match(builder, /x-kurodev-locale/);
  assert.match(builder, /validateCandidate/);
  assert.match(builder, /} catch \(error\) \{\s*await rm\(candidateDirectory, \{ recursive: true, force: true \}\);\s*await restorePreviousOutput\(\);/);
  assert.match(builder, /finally[\s\S]*?terminate/);
  assert.doesNotMatch(builder, /https:\/\/kuro-lab\.com|fetch\([^\n]*\/api\/contact/);
});

test("static builder confirms bounded local-server shutdown before candidate acceptance", async () => {
  const builder = await readFile(new URL("scripts/build-static-first-cloudflare.mjs", root), "utf8");
  assert.match(builder, /child\.kill\("SIGTERM"\)/);
  assert.match(builder, /child\.kill\("SIGKILL"\)/);
  assert.match(builder, /waitForChildExit\(child, 5000\)/);
  assert.match(builder, /child\.exitCode !== null \|\| child\.signalCode !== null/);
  assert.match(builder, /await terminateLocalServer\(localServer\);\s*localServer = undefined;\s*await validateCandidate\(routes\);[\s\S]*?await renameWithRetry\(candidateDirectory, outputDirectory\)/);
});

test("static builder invokes npm through Node on Windows instead of spawning a cmd shim", async () => {
  const builder = await readFile(new URL("scripts/build-static-first-cloudflare.mjs", root), "utf8");
  assert.match(builder, /npm-cli\.js/);
  assert.match(builder, /process\.execPath/);
  assert.doesNotMatch(builder, /process\.platform === ["']win32["'] \? ["']npm\.cmd["']/);
});

test("static builder retries only transient Windows directory rename failures within a fixed bound", async () => {
  const builder = await readFile(new URL("scripts/build-static-first-cloudflare.mjs", root), "utf8");
  assert.match(builder, /async function renameWithRetry/);
  assert.match(builder, /new Set\(\[["']EPERM["'], ["']EBUSY["']\]\)/);
  assert.match(builder, /for \(let attempt = 1; attempt <= 5; attempt \+= 1\)/);
  assert.match(builder, /await renameWithRetry\(candidateDirectory, outputDirectory\)/);
  assert.match(builder, /if \(!transientRenameErrors\.has\(error\?\.code\) \|\| attempt === 5\) throw error/);
});

test("static builder bounds every local build fetch with one AbortSignal timeout", async () => {
  const builder = await readFile(new URL("scripts/build-static-first-cloudflare.mjs", root), "utf8");
  assert.match(builder, /const localFetchTimeoutMs = [\d_]+;/);
  assert.match(builder, /new AbortController\(\)/);
  assert.match(builder, /signal: controller\.signal/);
  assert.match(builder, /setTimeout\(\(\) => controller\.abort\(\), localFetchTimeoutMs\)/);
  assert.match(builder, /async function fetchLocal\(url, options, consumeResponse\)/);
  assert.match(builder, /return await consumeResponse\(await fetch\(url, \{ \.\.\.options, signal: controller\.signal \}\)\)/);
  assert.match(builder, /await fetchLocal\(`\$\{origin\}\/`/);
  assert.match(builder, /await fetchLocal\(new URL\(route, origin\)/);
  assert.match(builder, /await fetchLocal\(new URL\("\/__kurodev-static-not-found", origin\)/);
  assert.match(builder, /await fetchLocal\(new URL\(route, origin\), \{ method: "GET" \}/);
});

test("static builder restores a lone recovery directory at startup", async (t) => {
  const { restoreStartupOutputState } = await import(new URL("scripts/build-static-first-cloudflare.mjs", root));
  assert.equal(typeof restoreStartupOutputState, "function");
  const directory = await mkdtemp(join(tmpdir(), "kurodev-static-first-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const output = join(directory, ".open-next");
  const recovery = join(directory, ".open-next-recovery");
  await mkdir(recovery);
  await writeFile(join(recovery, "previous.txt"), "previous output");

  await restoreStartupOutputState(output, recovery);

  assert.equal(await readFile(join(output, "previous.txt"), "utf8"), "previous output");
  await assert.rejects(() => lstat(recovery), { code: "ENOENT" });
});

test("static builder fails closed when output and recovery coexist at startup", async (t) => {
  const { restoreStartupOutputState } = await import(new URL("scripts/build-static-first-cloudflare.mjs", root));
  assert.equal(typeof restoreStartupOutputState, "function");
  const directory = await mkdtemp(join(tmpdir(), "kurodev-static-first-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const output = join(directory, ".open-next");
  const recovery = join(directory, ".open-next-recovery");
  await mkdir(output);
  await mkdir(recovery);

  await assert.rejects(() => restoreStartupOutputState(output, recovery), /Ambiguous/);
  await lstat(output);
  await lstat(recovery);
});

test("static builder emits and validates permanent redirects as 308", async () => {
  const builder = await readFile(new URL("scripts/build-static-first-cloudflare.mjs", root), "utf8");
  assert.match(builder, /\$\{source\} \$\{destination\} 308/);
  assert.match(builder, /redirectRules\.includes\(`\$\{source\} \$\{destination\} 308`\)/);
  assert.doesNotMatch(builder, /\$\{source\} \$\{destination\} 301/);
});

test("static build transaction directories stay ignored", async () => {
  const ignore = await readFile(new URL(".gitignore", root), "utf8");
  assert.match(ignore, /^\.open-next-candidate\/$/m);
  assert.match(ignore, /^\.open-next-recovery\/$/m);
});

test("static builder compares sitemap locations to the exact inventory URL set", async () => {
  const builder = await readFile(new URL("scripts/build-static-first-cloudflare.mjs", root), "utf8");
  assert.match(builder, /const sitemapLocationList = Array\.from\(sitemap\.matchAll\(\/<loc>/);
  assert.match(builder, /const sitemapLocations = new Set\(sitemapLocationList\)/);
  assert.match(builder, /sitemapLocationList\.length !== sitemapLocations\.size/);
  assert.match(builder, /routes\.filter\(\(route\) => route\.indexable !== false\)/);
  assert.match(builder, /sitemapLocations\.size !== expectedLocations\.size/);
  assert.doesNotMatch(builder, /sitemap\.includes\(route\.path\)/);
});

test("static transformer contains no runtime self-fetch or source-request helper", async () => {
  const transformer = await readFile(new URL("lib/static-guide-document.mjs", root), "utf8");
  assert.doesNotMatch(transformer, /fetchStaticSourceResponse|WORKER_SELF_REFERENCE|staticGuideSourceUrl|staticSourceRequestHeaders/);
});
