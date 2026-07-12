import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const toolsPageUrl = new URL("../components/pages/tools-page.js", import.meta.url);
const japaneseRouteUrl = new URL("../app/tools/page.js", import.meta.url);
const englishRouteUrl = new URL("../app/en/tools/page.js", import.meta.url);
const workflowUrl = new URL("../components/sections/tool-workflow.js", import.meta.url);
const productSectionUrl = new URL("../components/sections/tool-product-section.js", import.meta.url);
const gettingStartedUrl = new URL("../components/sections/tool-getting-started.js", import.meta.url);

test("Japanese and English Tools routes share one complete Tools hub", async () => {
  // Given: the approved Task 7 route and section boundaries.
  [toolsPageUrl, japaneseRouteUrl, englishRouteUrl, workflowUrl, productSectionUrl, gettingStartedUrl].forEach((url) => {
    assert.equal(existsSync(url), true, `${url.pathname} must exist`);
  });

  const japaneseRoute = await readFile(japaneseRouteUrl, "utf8");
  const englishRoute = await readFile(englishRouteUrl, "utf8");
  const page = await readFile(toolsPageUrl, "utf8");

  // Then: locale wrappers render the same editorial composition.
  assert.match(japaneseRoute, /ToolsPage locale="ja"/);
  assert.match(englishRoute, /ToolsPage locale="en"/);
  ["ToolWorkflow", "ToolProductSection", "ToolGettingStarted", "CreatorServiceBridge"].forEach((section) => {
    assert.match(page, new RegExp(section));
  });
  assert.ok(page.lastIndexOf("<ToolProductSection") < page.lastIndexOf("<CreatorServiceBridge"));
});

test("Tools hub exposes exactly the three verified products in registry order", async () => {
  // Given: the shared publication-safe tool registry.
  const { tools } = await import(new URL("../lib/content/tool-content.mjs", import.meta.url));

  // Then: only verified records are eligible for the hub and ordering is deterministic.
  assert.deepEqual(tools.map((tool) => tool.id), ["schedule-calendar", "thumbnail-editor", "sns-split"]);
  assert.equal(tools.length, 3);
  const page = await readFile(toolsPageUrl, "utf8");
  assert.match(page, /tools\.map/);
  assert.doesNotMatch(page, /Math\.random|sort\(\(\)\s*=>/);
});

test("Use and guide actions remain hidden until their destinations are approved", async () => {
  // Given: three published records whose production and guide destinations are not yet approved.
  const { tools } = await import(new URL("../lib/content/tool-content.mjs", import.meta.url));
  tools.forEach((tool) => {
    assert.equal(Object.hasOwn(tool, "href"), false);
    assert.equal(Object.hasOwn(tool, "guideHref"), false);
  });

  const productSection = await readFile(productSectionUrl, "utf8");

  // Then: actions are controlled by both shared status rules and an actual registry destination.
  assert.match(productSection, /statusRules\[tool\.status\]\.launchable\s*&&\s*tool\.href/);
  assert.match(productSection, /tool\.guideHref/);
  assert.doesNotMatch(productSection, /href=["']#["']/);
});

test("Tools copy avoids invented products and automatic website synchronization claims", async () => {
  // Given: localized Tools copy, workflow, and getting-started content.
  const copy = await readFile(new URL("../lib/content/site-copy.mjs", import.meta.url), "utf8");
  const workflow = await readFile(workflowUrl, "utf8");
  const gettingStarted = await readFile(gettingStartedUrl, "utf8");
  const publicSource = `${copy}${workflow}${gettingStarted}`;

  // Then: the public page describes the three verified tools without prohibited claims or placeholder actions.
  assert.doesNotMatch(publicSource, /配信ワークフロー|Stream Workflow/);
  assert.doesNotMatch(publicSource, /自動(?:連携|同期)|automatic(?:ally)?\s+(?:sync|integration)/i);
  assert.doesNotMatch(publicSource, /TODO|coming soon|近日公開/i);
});

test("legacy singular route permanently redirects after the Tools hub is verified", async () => {
  const nextConfig = await readFile(new URL("../next.config.mjs", import.meta.url), "utf8");
  assert.match(nextConfig, /source:\s*["']\/tool["'][\s\S]*destination:\s*["']\/tools["'][\s\S]*permanent:\s*true/);
  assert.equal(existsSync(new URL("../app/tool/page.js", import.meta.url)), false);
});
