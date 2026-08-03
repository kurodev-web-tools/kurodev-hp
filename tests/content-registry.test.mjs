import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

const toolsUrl = new URL("../lib/content/tool-content.mjs", import.meta.url);
const copyUrl = new URL("../lib/content/site-copy.mjs", import.meta.url);

test("Home exposes exactly the three publication-verified tools in stable order", async () => {
  // Given: the publication-safe tool registry.
  assert.equal(existsSync(toolsUrl), true, "tool content registry must exist");
  const { featuredHomeTools, tools } = await import(toolsUrl);

  // When: available and Home-featured records are selected.
  const available = tools.filter((tool) => tool.status === "published" || tool.status === "beta");

  // Then: only the three verified tools are presented as available.
  assert.deepEqual(available.map((tool) => tool.id), ["schedule-calendar", "thumbnail-editor", "sns-split"]);
  assert.deepEqual(featuredHomeTools.map((tool) => tool.id), ["schedule-calendar", "thumbnail-editor", "sns-split"]);
  assert.equal(new Set(tools.map((tool) => tool.id)).size, tools.length);
  const expectedDestinations = new Map([
    ["schedule-calendar", "https://streamer-tools.kuro-lab.com/tools/schedule-calendar/"],
    ["thumbnail-editor", "https://streamer-tools.kuro-lab.com/tools/thumbnail-editor/"],
    ["sns-split", "https://streamer-tools.kuro-lab.com/tools/sns-split-image-maker/"]
  ]);
  const expectedGuideDestinations = new Map([
    ["schedule-calendar", "/guide/schedule-calendar/getting-started"],
    ["thumbnail-editor", "/guide/thumbnail-editor/getting-started"],
    ["sns-split", "/guide/sns-split-image-maker/getting-started"]
  ]);
  available.forEach((tool) => {
    assert.equal(tool.href, expectedDestinations.get(tool.id));
    assert.equal(tool.category, "stream-workflow");
    assert.equal(tool.publishedAt, "2026-05-18");
    assert.equal(tool.updatedAt, "2026-05-18");
    assert.equal(tool.imageWidth, 1920);
    assert.equal(tool.imageHeight, 1080);
    assert.equal(tool.ja.categoryLabel, "配信ワークフロー");
    assert.equal(tool.en.categoryLabel, "Stream Workflow");
    assert.equal(tool.guideHref, expectedGuideDestinations.get(tool.id));
  });
});

test("localized Home copy does not claim automatic schedule-to-site integration", async () => {
  // Given: complete Japanese and English Home copy.
  assert.equal(existsSync(copyUrl), true, "localized site copy must exist");
  const { siteCopy } = await import(copyUrl);

  // When: serialized public copy is inspected.
  const publicCopy = JSON.stringify(siteCopy);

  // Then: both locales exist and prohibited synchronization claims are absent.
  assert.ok(siteCopy.ja.home.hero.title.includes("配信準備"));
  assert.ok(siteCopy.en.home.hero.title.length > 0);
  assert.doesNotMatch(publicCopy, /自動(?:連携|同期)|automatic(?:ally)?\s+(?:sync|integration)/i);
});

test("Japanese display copy provides semantic line groups and English hero stays within three lines", async () => {
  // Given: localized display copy used at every QA width.
  const { siteCopy } = await import(copyUrl);

  // When: explicit display-line contracts are read.
  const japaneseTitles = [
    siteCopy.ja.home.hero,
    siteCopy.ja.home.tools,
    siteCopy.ja.home.ownedSite,
    siteCopy.ja.home.service,
    siteCopy.ja.home.maker,
    siteCopy.ja.home.final
  ];

  // Then: semantic phrases are not left to arbitrary single-character wrapping.
  japaneseTitles.forEach((copy) => {
    assert.equal(Array.isArray(copy.titleLines), true, `${copy.title} must define titleLines`);
    assert.ok(copy.titleLines.length >= 2);
  });
  assert.equal(Array.isArray(siteCopy.en.home.hero.titleLines), true);
  assert.ok(siteCopy.en.home.hero.titleLines.length <= 3);
});
