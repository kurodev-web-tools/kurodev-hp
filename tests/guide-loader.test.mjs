import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const loaderUrl = new URL("../lib/guides/guide-loader.mjs", import.meta.url);
const languageSwitchUrl = new URL("../components/layout/language-switch.js", import.meta.url);
const toolContentUrl = new URL("../lib/content/tool-content.mjs", import.meta.url);
const nextConfigUrl = new URL("../next.config.mjs", import.meta.url);
const guideRegistryUrl = new URL("../lib/content/guide-registry.mjs", import.meta.url);
const guideEntryUrl = new URL("../components/sections/guide-entry.js", import.meta.url);
const toolGettingStartedUrl = new URL("../components/sections/tool-getting-started.js", import.meta.url);
const sitemapUrl = new URL("../app/sitemap.js", import.meta.url);
const guideRouteUrl = new URL("../components/pages/guide-route.js", import.meta.url);

const expectedRoutes = [
  "/guide/getting-started",
  "/guide/schedule-calendar/getting-started",
  "/guide/thumbnail-editor/getting-started",
  "/guide/sns-split-image-maker/getting-started",
  "/guide/comment-translator/getting-started",
  "/guide/creator-site/profile-information",
  "/guide/creator-site/what-to-include",
  "/guide/creator-site/inquiry-route",
  "/en/guide/getting-started",
  "/en/guide/schedule-calendar/getting-started",
  "/en/guide/thumbnail-editor/getting-started",
  "/en/guide/sns-split-image-maker/getting-started",
  "/en/guide/comment-translator/getting-started"
];

const routeFiles = [
  "../app/guide/page.js",
  "../app/en/guide/page.js",
  "../app/guide/[segment]/page.js",
  "../app/guide/[segment]/[slug]/page.js",
  "../app/en/guide/[segment]/page.js",
  "../app/en/guide/[segment]/[slug]/page.js"
].map((pathname) => new URL(pathname, import.meta.url));

const physicalArticleRouteFiles = expectedRoutes
  .map((route) => new URL(`../app${route}/page.js`, import.meta.url));

function validFrontMatter(overrides = "") {
  return `---
title: Sample guide
description: A controlled sample guide.
updated: 2026-07-14
category: schedule-calendar
applicableTool: schedule-calendar
status: published
locale: en
translationKey: schedule-calendar/getting-started
outcome: Organize a sample stream plan.
prerequisites:
  - Use sample data only.
steps:
  - Open the sample calendar.
  - Review the sample plan.
commonProblems:
  - problem: The sample is not visible.
    resolution: Return to the guide index.
relatedGuides:
  - getting-started
toolAction: schedule-calendar
images:
  - src: /images/guide/sample.png
    alt: Sample calendar with fictional stream data
    width: 1600
    height: 900
${overrides}---

## Outcome

Organize a sample stream plan.

## Prerequisites

- Use sample data only.

## Steps

1. Open the sample calendar.
2. Review the sample plan.

![Sample calendar with fictional stream data](/images/guide/sample.png)

## Common problems

- Return to the guide index if the sample is not visible.

## Related guides

- [Getting started](/en/guide/getting-started)
`;
}

async function withGuideFixture(run) {
  const root = await mkdtemp(join(tmpdir(), "kurodev-guide-"));
  const publicRoot = join(root, "public");
  const imagePath = join(publicRoot, "images", "guide", "sample.png");
  await mkdir(join(publicRoot, "images", "guide"), { recursive: true });
  await writeFile(imagePath, Buffer.from("approved sample image"));

  try {
    await run({ root, publicRoot, imagePath });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test("controlled Markdown accepts the approved article shape and safe elements", async () => {
  // Given: a complete guide with one repository-local image approved by hash.
  assert.equal(existsSync(loaderUrl), true, "controlled guide loader must exist");
  const { hashGuideImage, parseGuideSource } = await import(loaderUrl);

  await withGuideFixture(async ({ publicRoot, imagePath }) => {
    const approvedImages = new Map([["/images/guide/sample.png", await hashGuideImage(imagePath)]]);

    // When: the controlled source is parsed and rendered.
    const guide = await parseGuideSource(validFrontMatter(), {
      sourcePath: "content/guides/en/schedule-calendar/getting-started.md",
      publicRoot,
      approvedImages
    });

    // Then: only the contracted article structure is exposed.
    assert.equal(guide.route, "/en/guide/schedule-calendar/getting-started");
    assert.equal(Object.hasOwn(guide, "html"), false);
    assert.ok(guide.articleBlocks.some((block) => block.type === "heading" && block.depth === 2));
    assert.ok(guide.articleBlocks.some((block) => block.type === "list" && block.ordered));
    assert.ok(JSON.stringify(guide.articleBlocks).includes('"type":"image"'));
    assert.equal(guide.images[0].alt, "Sample calendar with fictional stream data");
    assert.equal(guide.images[0].width, 1600);
    assert.equal(guide.images[0].height, 900);
  });
});

test("controlled Markdown rejects unsafe HTML, URLs, image paths, and traversal", async () => {
  assert.equal(existsSync(loaderUrl), true, "controlled guide loader must exist");
  const { GuideValidationError, hashGuideImage, parseGuideSource } = await import(loaderUrl);

  await withGuideFixture(async ({ publicRoot, imagePath }) => {
    const approvedImages = new Map([["/images/guide/sample.png", await hashGuideImage(imagePath)]]);
    const cases = [
      ["raw HTML", "<script>alert(1)</script>", /raw HTML is not allowed/],
      ["javascript link", "[unsafe](javascript:alert(1))", /javascript link protocol is not allowed/],
      ["data link", "[unsafe](data:text/html,unsafe)", /data link protocol is not allowed/],
      ["protocol-relative link", "[unsafe](//example.com/path)", /protocol-relative link is not allowed/],
      ["remote image", "![unsafe](https://example.com/image.png)", /remote image is not allowed/],
      ["image traversal", "![unsafe](/images/guide/../private.png)", /image traversal is not allowed/],
      ["encoded image traversal", "![unsafe](/images/guide/%2e%2e/private.png)", /image traversal is not allowed/],
      ["double encoded link traversal", "[unsafe](/guide/%252e%252e/private)", /link traversal is not allowed/],
      ["undeclared local image", "![unsafe](/images/guide/not-approved.png)", /body images must match front matter images/]
    ];

    for (const [label, unsafeMarkdown, expectedError] of cases) {
      const source = `${validFrontMatter()}\n${unsafeMarkdown}\n`;
      await assert.rejects(
        () => parseGuideSource(source, {
          sourcePath: "content/guides/en/schedule-calendar/getting-started.md",
          publicRoot,
          approvedImages
        }),
        (error) => error instanceof GuideValidationError && expectedError.test(error.message),
        label
      );
    }
  });
});

test("front matter cannot select an executable gray-matter engine", async () => {
  const { parseGuideSource } = await import(loaderUrl);
  globalThis.__guideFrontMatterProbe = false;
  const source = "---javascript\n(globalThis.__guideFrontMatterProbe = true, {})\n---\n";

  await assert.rejects(
    () => parseGuideSource(source, {
      sourcePath: "content/guides/en/executable.md",
      approvedImages: new Map()
    }),
    /opening delimiter/
  );
  assert.equal(globalThis.__guideFrontMatterProbe, false);
  delete globalThis.__guideFrontMatterProbe;
});

test("same-site links reject deeply encoded traversal and separators", async () => {
  const { hashGuideImage, parseGuideSource } = await import(loaderUrl);
  await withGuideFixture(async ({ publicRoot, imagePath }) => {
    const approvedImages = new Map([["/images/guide/sample.png", await hashGuideImage(imagePath)]]);
    for (const href of [
      "/guide/%252525252e%252525252e/private",
      "/guide/%25252f%25252fevil.example/path",
      "/guide/%255c%255cevil.example/path"
    ]) {
      await assert.rejects(() => parseGuideSource(`${validFrontMatter()}\n[unsafe](${href})\n`, {
        sourcePath: "content/guides/en/schedule-calendar/getting-started.md",
        publicRoot,
        approvedImages
      }));
    }
  });
});

test("publication packet pins every approved source and image byte", async () => {
  const { createHash } = await import("node:crypto");
  const { validatePublicationCandidate } = await import(loaderUrl);

  await withGuideFixture(async ({ root, publicRoot, imagePath }) => {
    const contentRoot = join(root, "content", "guides");
    const sourcePath = join(contentRoot, "en", "schedule-calendar", "getting-started.md");
    const candidatePath = join(contentRoot, "publication-candidate.json");
    await mkdir(join(contentRoot, "en", "schedule-calendar"), { recursive: true });
    await writeFile(sourcePath, validFrontMatter());

    const files = {
      "content/guides/en/schedule-calendar/getting-started.md": createHash("sha256").update(validFrontMatter()).digest("hex"),
      "public/images/guide/sample.png": createHash("sha256").update(await import("node:fs/promises").then(({ readFile }) => readFile(imagePath))).digest("hex")
    };
    const packetId = createHash("sha256").update(JSON.stringify(files)).digest("hex");
    await writeFile(candidatePath, JSON.stringify({ algorithm: "sha256", packetId, files }));

    await validatePublicationCandidate({
      contentRoot,
      publicRoot,
      candidatePath,
      approvedImages: new Map([["/images/guide/sample.png", files["public/images/guide/sample.png"]]]),
      expectedPacketId: packetId
    });

    await writeFile(sourcePath, `${validFrontMatter()}\nChanged after approval.\n`);
    await assert.rejects(
      () => validatePublicationCandidate({
        contentRoot,
        publicRoot,
        candidatePath,
        approvedImages: new Map([["/images/guide/sample.png", files["public/images/guide/sample.png"]]])
      }),
      /publication candidate hash does not match/
    );
  });
});

test("publication packet accepts canonical Markdown after a CRLF checkout", async () => {
  // Given: an owner-approved LF source checked out with Windows CRLF endings.
  const { createHash } = await import("node:crypto");
  const { readFile } = await import("node:fs/promises");
  const { validatePublicationCandidate } = await import(loaderUrl);

  await withGuideFixture(async ({ root, publicRoot, imagePath }) => {
    const contentRoot = join(root, "content", "guides");
    const sourcePath = join(contentRoot, "en", "schedule-calendar", "getting-started.md");
    const candidatePath = join(contentRoot, "publication-candidate.json");
    const canonicalSource = validFrontMatter();
    await mkdir(join(contentRoot, "en", "schedule-calendar"), { recursive: true });
    await writeFile(sourcePath, canonicalSource.replaceAll("\n", "\r\n"));

    const files = {
      "content/guides/en/schedule-calendar/getting-started.md": createHash("sha256").update(canonicalSource).digest("hex"),
      "public/images/guide/sample.png": createHash("sha256").update(await readFile(imagePath)).digest("hex")
    };
    const packetId = createHash("sha256").update(JSON.stringify(files)).digest("hex");
    await writeFile(candidatePath, JSON.stringify({ algorithm: "sha256", packetId, files }));

    // When: the publication boundary validates the checked-out files.
    // Then: text line-ending conversion does not invalidate approved content.
    await validatePublicationCandidate({
      contentRoot,
      publicRoot,
      candidatePath,
      approvedImages: new Map([["/images/guide/sample.png", files["public/images/guide/sample.png"]]]),
      expectedPacketId: packetId
    });
  });
});

test("approved Guide images must be regular files inside the public root", async () => {
  const { hashGuideImage, parseGuideSource } = await import(loaderUrl);
  await withGuideFixture(async ({ root, publicRoot, imagePath }) => {
    const outsidePath = join(root, "outside.png");
    await writeFile(outsidePath, Buffer.from("outside approved bytes"));
    await rm(imagePath);
    await symlink(outsidePath, imagePath, "file");
    const approvedImages = new Map([["/images/guide/sample.png", await hashGuideImage(outsidePath)]]);
    await assert.rejects(
      () => parseGuideSource(validFrontMatter(), {
        sourcePath: "content/guides/en/schedule-calendar/getting-started.md",
        publicRoot,
        approvedImages
      }),
      /regular file/
    );
  });
});

test("front matter and required article sections fail closed", async () => {
  assert.equal(existsSync(loaderUrl), true, "controlled guide loader must exist");
  const { hashGuideImage, parseGuideSource } = await import(loaderUrl);

  await withGuideFixture(async ({ publicRoot, imagePath }) => {
    const approvedImages = new Map([["/images/guide/sample.png", await hashGuideImage(imagePath)]]);
    const invalidSources = [
      validFrontMatter().replace("description: A controlled sample guide.\n", ""),
      validFrontMatter().replace("updated: 2026-07-14", "updated: someday"),
      validFrontMatter().replace("translationKey: schedule-calendar/getting-started", "translationKey: 日本語"),
      validFrontMatter().replace(/## Common problems[\s\S]*?## Related guides/, "## Related guides"),
      validFrontMatter().replace("    alt: Sample calendar with fictional stream data", "    alt: \"")
    ];

    for (const source of invalidSources) {
      await assert.rejects(() => parseGuideSource(source, {
        sourcePath: "content/guides/en/invalid.md",
        publicRoot,
        approvedImages
      }));
    }
  });
});

test("launch inventory contains exactly thirteen unique existing routes", async () => {
  assert.equal(existsSync(loaderUrl), true, "controlled guide loader must exist");
  const { loadGuideInventory } = await import(loaderUrl);

  const guides = await loadGuideInventory();
  assert.deepEqual(guides.map((guide) => guide.route).toSorted(), expectedRoutes.toSorted());
  assert.equal(new Set(guides.map((guide) => guide.route)).size, 13);
  guides.forEach((guide) => {
    assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(guide.translationKey, /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/);
    assert.ok(guide.title.length > 0);
    assert.ok(guide.description.length > 0);
    assert.ok(guide.outcome.length > 0);
    assert.ok(guide.prerequisites.length > 0);
    assert.ok(guide.steps.length > 0);
    assert.ok(guide.commonProblems.length > 0);
    assert.ok(guide.relatedGuides.length > 0);
    assert.ok(guide.images.length > 0);
    guide.images.forEach((image) => assert.ok(image.alt.length > 0));
    guide.images.forEach((image) => assert.ok(image.width > 0 && image.height > 0));
  });
});

test("static params and reciprocal alternates are emitted only for existing routes", async () => {
  assert.equal(existsSync(loaderUrl), true, "controlled guide loader must exist");
  const { getGuideAlternates, getGuideCatchAllParams, getGuideStaticParams, loadGuideInventory } = await import(loaderUrl);
  const guides = await loadGuideInventory();

  assert.deepEqual(getGuideStaticParams(guides, "ja", 1), [{ slug: "getting-started" }]);
  assert.equal(getGuideStaticParams(guides, "ja", 2).length, 7);
  assert.deepEqual(getGuideStaticParams(guides, "en", 1), [{ slug: "getting-started" }]);
  assert.equal(getGuideStaticParams(guides, "en", 2).length, 4);
  assert.deepEqual(
    getGuideCatchAllParams(guides, "ja").find(({ segments }) => segments.length === 1),
    { segments: ["getting-started"] }
  );
  assert.equal(getGuideCatchAllParams(guides, "ja").filter(({ segments }) => segments.length === 2).length, 7);
  assert.equal(getGuideCatchAllParams(guides, "en").filter(({ segments }) => segments.length === 2).length, 4);

  const creatorGuide = guides.find((guide) => guide.route === "/guide/creator-site/profile-information");
  const pairedGuide = guides.find((guide) => guide.route === "/guide/schedule-calendar/getting-started");
  assert.deepEqual(getGuideAlternates(creatorGuide, guides), ["ja"]);
  assert.deepEqual(getGuideAlternates(pairedGuide, guides), ["ja", "en"]);
});

test("Guide route topology statically generates only the exact launch routes", async () => {
  routeFiles.forEach((url) => assert.equal(existsSync(url), true, `${url.pathname} must exist`));
  physicalArticleRouteFiles.forEach((url) => assert.equal(existsSync(url), false, `${url.pathname} must use generated params`));

  const conflictingRouteFiles = [
    "../app/guide/[slug]/page.js",
    "../app/guide/[category]/[slug]/page.js",
    "../app/en/guide/[slug]/page.js",
    "../app/en/guide/[category]/[slug]/page.js",
    "../app/guide/[...segments]/page.js",
    "../app/en/guide/[...segments]/page.js"
  ].map((pathname) => new URL(pathname, import.meta.url));

  conflictingRouteFiles.forEach((url) => {
    assert.equal(existsSync(url), false, `${url.pathname} must not conflict with the shared segment route`);
  });

  const { readFile } = await import("node:fs/promises");
  for (const url of routeFiles.slice(2)) {
    const source = await readFile(url, "utf8");
    assert.match(source, /export const dynamicParams = false/);
    assert.match(source, /export async function generateStaticParams/);
  }
  const nextConfig = await readFile(nextConfigUrl, "utf8");
  assert.doesNotMatch(nextConfig, /source:\s*["']\/(?:en\/)?guide["']/);
});

test("Guide routes, fallback language switching, related links, and status-controlled actions share the loader", async () => {
  assert.equal(existsSync(loaderUrl), true, "controlled guide loader must exist");
  routeFiles.forEach((url) => assert.equal(existsSync(url), true, `${url.pathname} must exist`));

  const { getGuideLanguageTarget, loadGuideInventory } = await import(loaderUrl);
  const [languageSwitch, toolContent, guides] = await Promise.all([
    import("node:fs/promises").then(({ readFile }) => readFile(languageSwitchUrl, "utf8")),
    import("node:fs/promises").then(({ readFile }) => readFile(toolContentUrl, "utf8")),
    loadGuideInventory()
  ]);

  const creatorGuide = guides.find((guide) => guide.route === "/guide/creator-site/profile-information");
  const pairedGuide = guides.find((guide) => guide.route === "/guide/schedule-calendar/getting-started");
  assert.equal(getGuideLanguageTarget(creatorGuide, "en", guides), "/en/guide?translation=unavailable");
  assert.equal(getGuideLanguageTarget(pairedGuide, "en", guides), "/en/guide/schedule-calendar/getting-started");
  assert.match(languageSwitch, /guideLanguageTarget|resolveGuideLanguageTarget/);

  const commentTranslator = guides.find((guide) => guide.route === "/guide/comment-translator/getting-started");
  assert.equal(commentTranslator.toolAction, null);
  assert.equal(commentTranslator.status, "in-development");

  for (const toolId of ["schedule-calendar", "thumbnail-editor", "sns-split"]) {
    const tool = guides.find((guide) => guide.locale === "ja" && guide.applicableTool === toolId);
    assert.ok(tool, `${toolId} guide must exist`);
  }
  assert.match(toolContent, /guideHref/);
  assert.doesNotMatch(toolContent, /comment-translator/);
});

test("implemented localized Guide destinations enable Home and Tools Guide entries", async () => {
  const { readFile } = await import("node:fs/promises");
  const [{ homeGuides }, guideEntry, toolGettingStarted] = await Promise.all([
    import(guideRegistryUrl),
    readFile(guideEntryUrl, "utf8"),
    readFile(toolGettingStartedUrl, "utf8")
  ]);
  assert.deepEqual(homeGuides.map((guide) => guide.ja.href), [
    "/guide/getting-started",
    "/guide/schedule-calendar/getting-started",
    "/guide/thumbnail-editor/getting-started"
  ]);
  assert.deepEqual(homeGuides.map((guide) => guide.en.href), [
    "/en/guide/getting-started",
    "/en/guide/schedule-calendar/getting-started",
    "/en/guide/thumbnail-editor/getting-started"
  ]);
  assert.match(guideEntry, /href=\{guide\[locale\]\.href\}/);
  assert.match(toolGettingStarted, /href=\{guide\[locale\]\.href\}/);
});

test("non-indexable status Guides are noindex and excluded from the shared public route inventory", async () => {
  const { readFile } = await import("node:fs/promises");
  const [inventory, guideRoute] = await Promise.all([
    readFile(new URL("../lib/public-route-inventory.mjs", import.meta.url), "utf8"),
    readFile(guideRouteUrl, "utf8")
  ]);
  assert.match(inventory, /statusRules\[guide\.status\]\?\.indexable === true/);
  assert.match(guideRoute, /indexable:\s*statusRules\[guide\.status\]\.indexable/);
});
