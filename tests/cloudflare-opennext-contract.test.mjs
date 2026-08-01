import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("OpenNext repository configuration keeps the approved Workers contract", async () => {
  // Given: the repository files consumed by the OpenNext and Wrangler CLIs.
  const [packageJson, lockfile, openNextConfig, wranglerConfig, gitignore, nextConfig, contactRoute, ogRoute] =
    await Promise.all([
      readFile(new URL("../package.json", import.meta.url), "utf8").then(JSON.parse),
      readFile(new URL("../package-lock.json", import.meta.url), "utf8").then(JSON.parse),
      readFile(new URL("../open-next.config.ts", import.meta.url), "utf8"),
      readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8").then(JSON.parse),
      readFile(new URL("../.gitignore", import.meta.url), "utf8"),
      readFile(new URL("../next.config.mjs", import.meta.url), "utf8"),
      readFile(new URL("../app/api/contact/route.js", import.meta.url), "utf8"),
      readFile(new URL("../app/opengraph-image.js", import.meta.url), "utf8")
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
    workers_dev: true,
    preview_urls: true
  });
  assert.match(gitignore, /^\.open-next\/$/m);
  assert.match(nextConfig, /images:\s*{\s*unoptimized:\s*true\s*}/);
  assert.doesNotMatch(contactRoute, /export const runtime\s*=\s*["']edge["']/);
  assert.doesNotMatch(ogRoute, /export const runtime\s*=\s*["']edge["']/);
});
