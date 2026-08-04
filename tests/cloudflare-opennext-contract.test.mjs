import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("public route inventory distinguishes static Guide delivery from sitemap indexability", async () => {
  const inventoryPath = new URL("lib/public-route-inventory.mjs", root);
  await access(inventoryPath);
  const { getPublicRouteInventory } = await import(inventoryPath.href);
  const routes = await getPublicRouteInventory();
  const paths = new Set(routes.map(({ path }) => path));

  for (const path of ["/", "/en", "/tools", "/en/tools", "/legal/tokushoho", "/works/kuro-stream-kit", "/en/works/kuro-stream-kit", "/guide/getting-started", "/en/guide/getting-started"]) {
    assert.ok(paths.has(path), `missing public route: ${path}`);
  }
  assert.ok(routes.filter(({ kind }) => kind === "legal").length >= 7);
  assert.ok(routes.every(({ locale }) => locale === "ja" || locale === "en"));
  for (const path of ["/guide/comment-translator/getting-started", "/en/guide/comment-translator/getting-started"]) {
    const route = routes.find((candidate) => candidate.path === path);
    assert.ok(route, `missing noindex public Guide route: ${path}`);
    assert.equal(route.indexable, false);
  }

  const { default: sitemap } = await import(new URL("app/sitemap.js", root).href);
  const sitemapUrls = new Set((await sitemap()).map(({ url }) => url));
  assert.equal(sitemapUrls.has("https://kuro-lab.com/guide/comment-translator/getting-started"), false);
  assert.equal(sitemapUrls.has("https://kuro-lab.com/en/guide/comment-translator/getting-started"), false);
});

test("sitemap derives its public route set from the shared route inventory", async () => {
  const sitemap = await readFile(new URL("app/sitemap.js", root), "utf8");
  assert.match(sitemap, /public-route-inventory\.mjs/);
  assert.match(sitemap, /getPublicRouteInventory/);
  assert.doesNotMatch(sitemap, /const basePairs/);
  assert.doesNotMatch(sitemap, /const legalPairs/);
});

test("inventory supplies alternate-language pairs and last-modified values for sitemap serialization", async () => {
  const { getPublicRouteInventory } = await import(new URL("lib/public-route-inventory.mjs", root).href);
  const routes = await getPublicRouteInventory();
  const japaneseHome = routes.find(({ path }) => path === "/");
  assert.deepEqual(japaneseHome.alternatePaths, { ja: "/", en: "/en" });
  assert.ok(japaneseHome.lastModified instanceof Date);
});

test("legal runtime loader remains filesystem-free in the OpenNext request path", async () => {
  const loader = await readFile(new URL("lib/legal/legal-loader.mjs", root), "utf8");
  assert.doesNotMatch(loader, /node:fs|readFileSync/);
  assert.match(loader, /legal-runtime-sources\.generated\.mjs/);
});

test("asset-first Wrangler configuration preserves the API-only Worker boundary", async () => {
  const [packageJson, wranglerConfig, middleware] = await Promise.all([
    readFile(new URL("package.json", root), "utf8").then(JSON.parse),
    readFile(new URL("wrangler.jsonc", root), "utf8").then(JSON.parse),
    readFile(new URL("middleware.js", root), "utf8").catch((error) => error.code),
  ]);

  assert.equal(packageJson.scripts["build:cloudflare:static"], "node scripts/build-static-first-cloudflare.mjs");
  assert.equal(wranglerConfig.main, "worker/static-first-entry.mjs");
  assert.deepEqual(wranglerConfig.assets, {
    directory: ".open-next/assets",
    binding: "ASSETS",
    run_worker_first: ["/api/*"],
    html_handling: "drop-trailing-slash",
    not_found_handling: "404-page"
  });
  assert.equal("services" in wranglerConfig, false);
  assert.equal(middleware, "ENOENT");
  assert.equal(wranglerConfig.ratelimits[0].name, "CONTACT_RATE_LIMITER");
  assert.equal(wranglerConfig.observability.enabled, true);
  assert.equal(wranglerConfig.keep_vars, true);
  assert.equal(wranglerConfig.workers_dev, true);
  assert.equal(wranglerConfig.preview_urls, true);
});

test("static-first entry delegates only APIs and returns asset responses for unknown documents and missing assets", async () => {
  const { createStaticFirstFetch } = await import(new URL("worker/static-first-entry.mjs", root).href);
  const calls = [];
  const fetch = createStaticFirstFetch({
    openNextFetch: async (request) => {
      calls.push(["open-next", new URL(request.url).pathname]);
      return new Response("api");
    },
    assetsFetch: async (request) => {
      calls.push(["assets", new URL(request.url).pathname]);
      return new Response("asset 404", { status: 404 });
    }
  });

  assert.equal((await fetch(new Request("https://kuro-lab.com/api/contact"))).status, 200);
  assert.equal((await fetch(new Request("https://kuro-lab.com/no-such-document"))).status, 404);
  assert.equal((await fetch(new Request("https://kuro-lab.com/missing.svg"))).status, 404);
  assert.deepEqual(calls, [
    ["open-next", "/api/contact"],
    ["assets", "/no-such-document"],
    ["assets", "/missing.svg"]
  ]);
});

test("static-first entry has no eager generated OpenNext import on the public asset-miss path", async () => {
  const wrapper = await readFile(new URL("worker/static-first-entry.mjs", root), "utf8");
  assert.match(wrapper, /if \(!isApiRequest\(request\)\) return env\.ASSETS\.fetch\(request\)/);
  assert.match(wrapper, /await import\("\.\.\/\.open-next\/worker\.js"\)/);
  assert.doesNotMatch(wrapper, /^import .*\.open-next\/worker/m);
});

test("OpenNext build configuration remains the generated API handler source", async () => {
  const config = await readFile(new URL("open-next.config.ts", root), "utf8");
  assert.match(config, /defineCloudflareConfig\(\)/);
});

test("Contact API retains the fail-closed rate-limit to Resend sequence without client-side provider credentials", async () => {
  const [contactRoute, transformerSource] = await Promise.all([
    readFile(new URL("app/api/contact/route.js", root), "utf8"),
    readFile(new URL("lib/static-guide-document.mjs", root), "utf8")
  ]);
  const steps = [
    "const rateLimitResult = await checkContactRateLimit",
    "body = await readBoundedContactJson",
    "validateContactInput(payload)",
    "validateContactConsentSubmission(body)",
    "await verifyTurnstile",
    "await sendContactEmail"
  ];
  for (let index = 1; index < steps.length; index += 1) {
    assert.ok(contactRoute.indexOf(steps[index - 1]) < contactRoute.indexOf(steps[index]));
  }
  assert.doesNotMatch(transformerSource, /TURNSTILE_SECRET_KEY|RESEND_API_KEY|CONTACT_TO_EMAIL/);
});
