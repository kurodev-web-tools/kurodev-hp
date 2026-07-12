import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../components/pages/creator-site-page.js", import.meta.url);
const japaneseRouteUrl = new URL("../app/creator-site/page.js", import.meta.url);
const englishRouteUrl = new URL("../app/en/creator-site/page.js", import.meta.url);
const recognitionUrl = new URL("../components/sections/creator-recognition.js", import.meta.url);
const outcomesUrl = new URL("../components/sections/site-outcomes.js", import.meta.url);
const routesUrl = new URL("../components/sections/service-routes.js", import.meta.url);
const processUrl = new URL("../components/sections/service-process.js", import.meta.url);
const faqUrl = new URL("../components/sections/service-faq.js", import.meta.url);

test("Japanese and English Creator Website routes share the approved section order", async () => {
  const requiredFiles = [pageUrl, japaneseRouteUrl, englishRouteUrl, recognitionUrl, outcomesUrl, routesUrl, processUrl, faqUrl];

  requiredFiles.forEach((url) => {
    assert.equal(existsSync(url), true, `${url.pathname} must exist`);
  });

  const japaneseRoute = await readFile(japaneseRouteUrl, "utf8");
  const englishRoute = await readFile(englishRouteUrl, "utf8");
  const page = await readFile(pageUrl, "utf8");

  assert.match(japaneseRoute, /CreatorSitePage locale="ja"/);
  assert.match(englishRoute, /CreatorSitePage locale="en"/);

  const sectionOrder = ["CreatorRecognition", "SiteOutcomes", "ServiceProcess", "ServiceRoutes", "ServiceFaq"];
  sectionOrder.forEach((section) => assert.match(page, new RegExp(section)));
  sectionOrder.slice(1).forEach((section, index) => {
    assert.ok(page.lastIndexOf(`<${sectionOrder[index]}`) < page.lastIndexOf(`<${section}`));
  });
});

test("Creator Website routes are not shadowed by legacy Home-anchor redirects", async () => {
  const nextConfig = await readFile(new URL("../next.config.mjs", import.meta.url), "utf8");

  assert.doesNotMatch(nextConfig, /source:\s*["']\/creator-site["']/);
  assert.doesNotMatch(nextConfig, /source:\s*["']\/en\/creator-site["']/);
});

test("Creator Website content uses exactly two visibly labeled sample demonstrations", async () => {
  const { siteCopy } = await import(new URL("../lib/content/site-copy.mjs", import.meta.url));

  for (const locale of ["ja", "en"]) {
    const examples = siteCopy[locale].creatorSite.demonstrations.items;
    assert.equal(examples.length, 2);
    assert.deepEqual(examples.map((example) => example.id), ["streamer", "creator"]);

    examples.forEach((example) => {
      assert.equal(example.sampleIdentity, true);
      assert.equal(example.label, locale === "ja" ? "制作例" : "Demonstration");
      assert.ok(example.name.length > 0);
      assert.ok(example.sections.length > 0);
      assert.doesNotMatch(`${example.summary} ${example.note}`, /client|production result|実案件|制作実績/i);
    });
  }
});

test("Template uses the approved canonical HP-portal pricing source without copying prices", async () => {
  const { siteCopy } = await import(new URL("../lib/content/site-copy.mjs", import.meta.url));
  const launchManifest = await readFile(new URL("../docs/active/KURODEV_REDESIGN_LAUNCH_CONTENT.md", import.meta.url), "utf8");
  const publicSource = await Promise.all([pageUrl, recognitionUrl, outcomesUrl, routesUrl, processUrl, faqUrl].map((url) => readFile(url, "utf8")));

  assert.match(launchManifest, /Approved creator-site service scope/);
  assert.match(launchManifest, /https:\/\/templates\.kuro-lab\.com\/plans/);

  for (const locale of ["ja", "en"]) {
    const routes = siteCopy[locale].creatorSite.routes.items;
    assert.deepEqual(routes.map((route) => route.id), ["template", "custom"]);
    assert.equal(routes[0].href, "https://templates.kuro-lab.com/plans");
    assert.equal(routes[0].external, true);
    assert.equal(routes[1].href, "/contact");
    assert.equal(routes[1].quoteLabel, locale === "ja" ? "個別見積" : "Custom quote");
  }

  assert.match(publicSource.join("\n"), /external=\{route\.external\}/);
  assert.doesNotMatch(JSON.stringify(siteCopy.ja.creatorSite) + JSON.stringify(siteCopy.en.creatorSite), /[¥$€£]\s*\d|\d[,.]?\d*\s*(?:円|yen|dollars?)/i);
});

test("Template and Custom cards keep visible separation at every breakpoint", async () => {
  const routesComponent = await readFile(routesUrl, "utf8");
  const styles = await readFile(new URL("../app/styles/creator-site.css", import.meta.url), "utf8");

  assert.match(routesComponent, /className="service-routes__items"/);
  assert.match(styles, /\.service-routes__items\s*\{[\s\S]*?display:\s*grid;[\s\S]*?gap:\s*var\(--space-4\);/);
});

test("FAQ covers all Section 9 topics and copy avoids invented integrations", async () => {
  const { siteCopy } = await import(new URL("../lib/content/site-copy.mjs", import.meta.url));
  const expectedTopics = ["materials", "activity-name", "privacy", "self-updating", "domains", "without-kit"];

  for (const locale of ["ja", "en"]) {
    const creatorSite = siteCopy[locale].creatorSite;
    assert.deepEqual(creatorSite.faq.items.map((item) => item.id), expectedTopics);
    assert.equal(creatorSite.workflow.capabilities.length, 4);
    assert.doesNotMatch(JSON.stringify(creatorSite), /自動(?:連携|同期)|automatic(?:ally)?\s+(?:sync|integration)|real-time\s+sync/i);
  }

  const publicComponents = await Promise.all([pageUrl, recognitionUrl, outcomesUrl, routesUrl, processUrl, faqUrl].map((url) => readFile(url, "utf8")));
  assert.doesNotMatch(publicComponents.join("\n"), /href=["']#["']|TODO|coming soon|近日公開/i);
});

test("Creator Site headings preserve English word spaces and compact Japanese semantic lines", async () => {
  const { siteCopy } = await import(new URL("../lib/content/site-copy.mjs", import.meta.url));
  const sectionIntro = await readFile(new URL("../components/ui/section-intro.js", import.meta.url), "utf8");
  const page = await readFile(pageUrl, "utf8");
  const styles = await readFile(new URL("../app/styles/creator-site.css", import.meta.url), "utf8");
  const japanese = siteCopy.ja.creatorSite;
  const groupedHeadings = [japanese.recognition, japanese.outcomes, japanese.workflow, japanese.process, japanese.routes, japanese.faq, japanese.final];

  assert.match(sectionIntro, /<Fragment key=\{line\}>/);
  assert.match(sectionIntro, /<\/span>\{index < titleLines\.length - 1 \? " " : null\}<\/Fragment>/);
  groupedHeadings.flatMap((section) => section.titleLines).forEach((line) => {
    assert.ok([...line].length <= 9, `semantic line is too long for the desktop split: ${line}`);
  });
  assert.match(page, /className="creator-site-page"/);
  assert.match(styles, /html\[lang="ja"\] \.creator-site-page \.section-intro \.display-line/);
  assert.match(styles, /html\[lang="en"\] \.creator-site-page \.section-intro \.display-line\s*\{[\s\S]*?white-space:\s*normal;/);
});
