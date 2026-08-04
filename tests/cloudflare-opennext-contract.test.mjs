import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("legal runtime loader is filesystem-free and uses a tracked runtime source mapping", async () => {
  // Given: the server-side legal loader that ships in the OpenNext bundle.
  const loaderSource = await readFile(new URL("../lib/legal/legal-loader.mjs", import.meta.url), "utf8");

  // When/Then: request-time filesystem reads cannot remain in the production path.
  assert.doesNotMatch(loaderSource, /node:fs|readFileSync/);
  assert.match(loaderSource, /legal-runtime-sources\.generated\.mjs/);
  assert.match(loaderSource, /LEGAL_RUNTIME_SOURCES/);
});

test("OpenNext repository configuration keeps the approved Workers contract", async () => {
  // Given: the repository files consumed by the OpenNext and Wrangler CLIs.
  const [packageJson, lockfile, openNextConfig, wranglerConfig, gitignore, nextConfig, contactRoute, ogRoute, middleware] =
    await Promise.all([
      readFile(new URL("../package.json", import.meta.url), "utf8").then(JSON.parse),
      readFile(new URL("../package-lock.json", import.meta.url), "utf8").then(JSON.parse),
      readFile(new URL("../open-next.config.ts", import.meta.url), "utf8"),
      readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8").then(JSON.parse),
      readFile(new URL("../.gitignore", import.meta.url), "utf8"),
      readFile(new URL("../next.config.mjs", import.meta.url), "utf8"),
      readFile(new URL("../app/api/contact/route.js", import.meta.url), "utf8"),
      readFile(new URL("../app/opengraph-image.js", import.meta.url), "utf8"),
      readFile(new URL("../middleware.js", import.meta.url), "utf8")
    ]);

  // When: the repository-level runtime contract is inspected.
  const rootPackage = lockfile.packages[""];

  // Then: dependency, build, runtime, and generated-output boundaries match the approved design.
  assert.equal(packageJson.devDependencies["@opennextjs/cloudflare"], "1.20.2");
  assert.equal(packageJson.devDependencies.wrangler, "4.118.0");
  assert.equal(rootPackage.devDependencies["@opennextjs/cloudflare"], "1.20.2");
  assert.equal(rootPackage.devDependencies.wrangler, "4.118.0");
  assert.equal(packageJson.scripts["build:cloudflare"], "opennextjs-cloudflare build");
  assert.equal(packageJson.scripts["preview:cloudflare"], "opennextjs-cloudflare preview");
  assert.match(openNextConfig, /defineCloudflareConfig\(\)/);
  assert.deepEqual(wranglerConfig, {
    $schema: "node_modules/wrangler/config-schema.json",
    name: "kurodev-hp-opennext",
    main: ".open-next/worker.js",
    keep_vars: true,
    compatibility_date: "2026-08-01",
    compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"],
    assets: {
      directory: ".open-next/assets",
      binding: "ASSETS"
    },
    services: [
      {
        binding: "WORKER_SELF_REFERENCE",
        service: "kurodev-hp-opennext"
      }
    ],
    ratelimits: [
      {
        name: "CONTACT_RATE_LIMITER",
        namespace_id: "78106443",
        simple: {
          limit: 10,
          period: 60
        }
      }
    ],
    observability: {
      enabled: true,
      head_sampling_rate: 1,
      logs: {
        invocation_logs: false
      }
    },
    workers_dev: true,
    preview_urls: true
  });
  assert.match(gitignore, /^\.open-next\/$/m);
  assert.match(nextConfig, /images:\s*{\s*unoptimized:\s*true\s*}/);
  assert.match(nextConfig, /initOpenNextCloudflareForDev\(\)/);
  assert.doesNotMatch(contactRoute, /export const runtime\s*=\s*["']edge["']/);
  assert.match(contactRoute, /getCloudflareContext/);
  assert.match(contactRoute, /checkContactRateLimit/);
  assert.match(contactRoute, /logEvent:\s*logContactRateLimitEvent/);
  assert.ok(
    contactRoute.indexOf("const rateLimitResult = await checkContactRateLimit") <
      contactRoute.indexOf("body = await readBoundedContactJson"),
    "Contact rate limiting must run before reading the request body"
  );
  assert.match(
    contactRoute,
    /if \(!rateLimitResult\.ok\) \{[\s\S]*?return jsonResponse\([\s\S]*?rateLimitResult\.status[\s\S]*?\);\s*\}\s*let body;/,
    "Denied or unavailable rate limits must return before body and provider processing"
  );
  const invalidInputResponse = contactRoute.indexOf(
    'return jsonResponse({ ok: false, error: "INVALID_INPUT" }, 400);'
  );
  assert.ok(invalidInputResponse > contactRoute.indexOf("validateContactInput(payload)"));
  assert.ok(invalidInputResponse < contactRoute.indexOf("await verifyTurnstile"));
  assert.ok(invalidInputResponse < contactRoute.indexOf("await sendContactEmail"));
  assert.doesNotMatch(ogRoute, /export const runtime\s*=\s*["']edge["']/);
  assert.match(middleware, /getCloudflareContext/);
  assert.match(middleware, /WORKER_SELF_REFERENCE/);
  assert.match(middleware, /fetchStaticSourceResponse/);
  assert.doesNotMatch(middleware, /await fetch\(staticGuideSourceUrl/);
});
