import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const worksPageUrl = new URL("../components/pages/works-page.js", import.meta.url);
const caseStudyPageUrl = new URL("../components/pages/kuro-stream-kit-case-study.js", import.meta.url);
const evidenceUrl = new URL("../components/sections/work-evidence.js", import.meta.url);
const productMapUrl = new URL("../components/sections/product-map.js", import.meta.url);
const breadcrumbsUrl = new URL("../components/ui/breadcrumbs.js", import.meta.url);
const phraseAwareTextUrl = new URL("../components/ui/phrase-aware-text.js", import.meta.url);
const toolProductSectionUrl = new URL("../components/sections/tool-product-section.js", import.meta.url);
const worksStylesUrl = new URL("../app/styles/works-page.css", import.meta.url);
const shellStylesUrl = new URL("../app/styles/shell.css", import.meta.url);
const homePageUrl = new URL("../components/pages/home-page.js", import.meta.url);
const featuredWorkUrl = new URL("../components/sections/featured-work.js", import.meta.url);
const sitemapUrl = new URL("../app/sitemap.js", import.meta.url);
const hpPortalImageUrl = new URL("../public/images/works/hp-portal.png", import.meta.url);
const designSpecUrl = new URL("../docs/superpowers/specs/2026-07-11-kurodev-creator-platform-redesign-design.md", import.meta.url);
const implementationPlanUrl = new URL("../docs/superpowers/plans/2026-07-11-kurodev-creator-platform-redesign.md", import.meta.url);
const routeUrls = [
  new URL("../app/works/page.js", import.meta.url),
  new URL("../app/works/kuro-stream-kit/page.js", import.meta.url),
  new URL("../app/en/works/page.js", import.meta.url),
  new URL("../app/en/works/kuro-stream-kit/page.js", import.meta.url)
];

test("Works routes share one bilingual publication-safe hierarchy", async () => {
  [worksPageUrl, caseStudyPageUrl, evidenceUrl, productMapUrl, breadcrumbsUrl, ...routeUrls].forEach((url) => {
    assert.equal(existsSync(url), true, `${url.pathname} must exist`);
  });

  const [japaneseIndex, japaneseCaseStudy, englishIndex, englishCaseStudy] = await Promise.all(
    routeUrls.map((url) => readFile(url, "utf8"))
  );
  assert.match(japaneseIndex, /WorksPage locale="ja"/);
  assert.match(englishIndex, /WorksPage locale="en"/);
  assert.match(japaneseCaseStudy, /KuroStreamKitCaseStudy locale="ja"/);
  assert.match(englishCaseStudy, /KuroStreamKitCaseStudy locale="en"/);

  const page = await readFile(worksPageUrl, "utf8");
  assert.match(page, /getPublicationApprovedWorks/);
  assert.match(page, /flagship/);
  assert.match(page, /published/);
  assert.match(page, /research-development/);
  assert.doesNotMatch(page, /確認できる evidence/);
  assert.match(page, /確認できる根拠/);
  assert.match(page, /externalLabel=\{locale === "ja" \? "（新しいタブで開きます）" : "\(opens in a new tab\)"\}/);
});

test("only approved work records with scope and evidence can render", async () => {
  const { getPublicationApprovedWorkBySlug, getPublicationApprovedWorks, validateWorkPublication, works } = await import(
    new URL("../lib/content/work-content.mjs", import.meta.url)
  );

  works.forEach((work) => {
    assert.equal(typeof work.publicationScope, "string");
    assert.ok(work.publicationScope.length > 0);
    assert.equal(typeof work.evidenceSource, "string");
    assert.ok(work.evidenceSource.length > 0);
    assert.match(work.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(work.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(typeof work.image, "string");
    assert.ok(work.image.length > 0);
    assert.ok(work.imageWidth > 0);
    assert.ok(work.imageHeight > 0);
    assert.ok(work.ja.alt.length > 0);
    assert.ok(work.en.alt.length > 0);
    assert.deepEqual(validateWorkPublication(work), []);
  });

  const flagship = works.find((work) => work.id === "kuro-stream-kit");
  assert.match(flagship.evidenceSource, /launch-content-manifest:publication-safe-product-media/);
  assert.match(
    flagship.evidenceSource,
    /owner-attestation:task9-owner-approval-2026-07-13-v5/
  );
  assert.match(flagship.evidenceSource, /owner-record-input:2026-07-13/);
  assert.equal(flagship.publishedAt, "2026-05-18");
  assert.equal(flagship.updatedAt, "2026-05-18");

  const hpPortal = works.find((work) => work.id === "hp-portal");
  assert.equal(hpPortal.publishedAt, "2026-03-16");
  assert.equal(hpPortal.updatedAt, "2026-04-06");
  assert.equal(hpPortal.image, "/images/works/hp-portal.png");
  assert.equal(hpPortal.ja.alt, "HP-portalのWebサイトテンプレートを紹介するキービジュアル");
  assert.equal(hpPortal.en.alt, "Key visual introducing HP-portal website templates");
  assert.match(hpPortal.evidenceSource, /owner-record-and-media-input:2026-07-13/);

  const missingRequiredFields = {
    ...flagship,
    publishedAt: "",
    ja: { ...flagship.ja, alt: "" }
  };
  assert.match(validateWorkPublication(missingRequiredFields).join(" "), /publish date is required/i);
  assert.match(validateWorkPublication(missingRequiredFields).join(" "), /localized image alt is required/i);

  const hiddenRecord = {
    ...works[0],
    id: "private-record",
    slug: "private-record",
    publicationApproved: false
  };
  const rendered = getPublicationApprovedWorks([...works, hiddenRecord]);
  assert.equal(rendered.some((work) => work.id === "private-record"), false);
  assert.equal(rendered.every((work) => work.publicationApproved === true), true);
  assert.equal(getPublicationApprovedWorkBySlug("private-record", [...works, hiddenRecord]), undefined);

  const invalidFlagship = { ...flagship, evidenceSource: "" };
  assert.throws(
    () => getPublicationApprovedWorkBySlug("kuro-stream-kit", [invalidFlagship]),
    /Unsafe published work record: kuro-stream-kit/
  );
});

test("Home, case-study routes, components, and shared public inventory share the publication gate", async () => {
  const [homePage, featuredWork, caseStudy, inventorySource, japaneseCase, englishCase] = await Promise.all([
    readFile(homePageUrl, "utf8"),
    readFile(featuredWorkUrl, "utf8"),
    readFile(caseStudyPageUrl, "utf8"),
    readFile(new URL("../lib/public-route-inventory.mjs", import.meta.url), "utf8"),
    readFile(routeUrls[1], "utf8"),
    readFile(routeUrls[3], "utf8")
  ]);

  assert.match(homePage, /getPublicationApprovedWorkBySlug/);
  assert.match(homePage, /<CreatorHero[^>]*flagship=\{flagship\}[^>]*tools=\{featuredHomeTools\}/);
  assert.match(homePage, /flagship\s*\?\s*<FeaturedWork/);
  assert.match(featuredWork, /width=\{work\.imageWidth\}/);
  assert.match(featuredWork, /height=\{work\.imageHeight\}/);
  assert.match(caseStudy, /work\.imageWidth/);
  assert.match(caseStudy, /work\.imageHeight/);
  assert.match(caseStudy, /PhraseAwareText/);
  [japaneseCase, englishCase].forEach((route) => {
    assert.match(route, /getPublicationApprovedWorkBySlug/);
    assert.match(route, /notFound\(\)/);
    assert.match(route, /work=\{work\}/);
  });
  assert.match(inventorySource, /getPublicationApprovedWorks/);
  assert.match(inventorySource, /filter\(\(work\) => work\.external !== true\)/);

  const creatorHero = await readFile(new URL("../components/sections/creator-hero.js", import.meta.url), "utf8");
  assert.match(creatorHero, /src=\{flagship\.image\}/);
  assert.match(creatorHero, /width=\{flagship\.imageWidth\}/);
  assert.match(creatorHero, /src=\{schedule\.image\}/);
  assert.match(creatorHero, /src=\{thumbnail\.image\}/);
  assert.doesNotMatch(creatorHero, /kuro-stream-kit\/(?:portal-home|schedule-calendar|thumbnail-editor)\.png/);
});

test("Kuro Stream Kit is the sole flagship and conceptual work cannot receive equal priority", async () => {
  const { workCategoryOrder, works } = await import(new URL("../lib/content/work-content.mjs", import.meta.url));

  assert.deepEqual(works.filter((work) => work.category === "flagship").map((work) => work.id), ["kuro-stream-kit"]);
  assert.ok(workCategoryOrder.flagship < workCategoryOrder.published);
  assert.ok(workCategoryOrder.published < workCategoryOrder["research-development"]);
});

test("numeric metrics and anonymized client evidence fail closed", async () => {
  const { validateWorkPublication, works } = await import(new URL("../lib/content/work-content.mjs", import.meta.url));
  const base = works[0];

  const undocumentedMetric = {
    ...base,
    id: "unsafe-metric",
    outcomeMetrics: [{ label: "time saved", value: 40 }]
  };
  assert.match(validateWorkPublication(undocumentedMetric).join(" "), /metric provenance and public approval/i);

  const stringMetric = {
    ...base,
    id: "unsafe-string-metric",
    outcomeMetrics: [{ label: "time saved", value: "40%" }]
  };
  assert.match(validateWorkPublication(stringMetric).join(" "), /metric provenance and public approval/i);

  const reidentifiableClient = {
    ...base,
    id: "unsafe-client",
    clientVisibility: "anonymized",
    anonymization: {
      directIdentifiersRemoved: true,
      reidentificationRiskReviewed: false,
      identifyingFacts: ["narrow launch month", "unique operating region"]
    }
  };
  assert.match(validateWorkPublication(reidentifiableClient).join(" "), /re-identification review/i);
});

test("case study contains all nine sections and uses only verified tools and implemented destinations", async () => {
  const { caseStudyContent } = await import(new URL("../lib/content/work-content.mjs", import.meta.url));
  const { tools } = await import(new URL("../lib/content/tool-content.mjs", import.meta.url));
  const page = await readFile(caseStudyPageUrl, "utf8");

  const expectedSections = [
    "hero",
    "problem",
    "product-map",
    "major-tools",
    "responsibilities",
    "principles",
    "improvements",
    "status",
    "actions"
  ];
  assert.deepEqual(caseStudyContent.sectionOrder, expectedSections);
  expectedSections.forEach((section) => assert.match(page, new RegExp(`data-case-section=[{]?['\"]${section}`)));

  assert.deepEqual(tools.map((tool) => tool.id), ["schedule-calendar", "thumbnail-editor", "sns-split"]);
  assert.doesNotMatch(JSON.stringify(caseStudyContent), /配信ワークフロー|Stream Workflow/);
  assert.deepEqual(caseStudyContent.actions.map((action) => action.href), ["/tools", "/creator-site"]);
  assert.doesNotMatch(page, /href=["']#|\/guide|TODO|coming soon|近日公開/i);
});

test("Task 9 completion uses the three publication-verified tools and preserves the fourth-tool gate", async () => {
  const [designSpec, implementationPlan] = await Promise.all([
    readFile(designSpecUrl, "utf8"),
    readFile(implementationPlanUrl, "utf8")
  ]);
  const caseStudySection = designSpec.slice(designSpec.indexOf("### 10.2"), designSpec.indexOf("### 10.3"));
  const taskNineSection = implementationPlan.slice(
    implementationPlan.indexOf("### Task 9:"),
    implementationPlan.indexOf("### Task 10:")
  );
  const launchMatrix = designSpec.slice(designSpec.indexOf("## 21."));
  const contentBoundaries = designSpec.slice(designSpec.indexOf("## 15."), designSpec.indexOf("## 16."));
  const registryTask = implementationPlan.slice(
    implementationPlan.indexOf("### Task 4:"),
    implementationPlan.indexOf("### Task 5:")
  );

  assert.match(caseStudySection, /publication-verified major tools/i);
  assert.doesNotMatch(caseStudySection, /Four major tools/i);
  assert.match(taskNineSection, /three publication-verified major tools/i);
  assert.match(taskNineSection, /fourth tool remains non-public/i);
  assert.match(launchMatrix, /\| Tools \|[^\n]*three publication-verified tools/i);
  assert.doesNotMatch(launchMatrix, /\| Tools \|[^\n]*four tools/i);
  assert.match(contentBoundaries, /Guide mapping by locale after its route is implemented and verified/i);
  assert.match(contentBoundaries, /guide mapping is added only after the localized guide route is implemented and verified/i);
  assert.match(registryTask, /three publication-verified current tools/i);
  assert.match(registryTask, /Guide mappings only after Task 10/i);
  assert.doesNotMatch(registryTask, /Add the four current tools/i);
});

test("HP-portal Works image matches the owner-approved public asset", async () => {
  assert.equal(existsSync(hpPortalImageUrl), true);
  const bytes = await readFile(hpPortalImageUrl);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), "04c6f763a4b0219a6259bd261b07d764c55b6c006db100377bae8d179260ba80");
});

test("localized breadcrumbs, inventory routes, and the verified legacy redirect are wired", async () => {
  const breadcrumbs = await readFile(breadcrumbsUrl, "utf8");
  const nextConfig = await readFile(new URL("../next.config.mjs", import.meta.url), "utf8");
  const languageSwitch = await readFile(new URL("../components/layout/language-switch.js", import.meta.url), "utf8");
  const shellStyles = await readFile(shellStylesUrl, "utf8");
  const { getPublicRouteInventory } = await import(new URL("../lib/public-route-inventory.mjs", import.meta.url));

  assert.match(breadcrumbs, /aria-label/);
  assert.match(breadcrumbs, /localePath/);
  assert.match(nextConfig, /source:\s*["']\/web["'][\s\S]*destination:\s*["']\/works["'][\s\S]*permanent:\s*true/);
  assert.doesNotMatch(nextConfig, /source:\s*["']\/works["']/);
  assert.equal(existsSync(new URL("../app/web/page.js", import.meta.url)), false);
  assert.match(languageSwitch, /["']\/works\/kuro-stream-kit["']/);
  assert.match(shellStyles, /\.language-switch\s*\{[^}]*white-space:\s*nowrap/);
  const inventoryPaths = new Set((await getPublicRouteInventory()).map(({ path }) => path));
  ["/works", "/works/kuro-stream-kit", "/en/works", "/en/works/kuro-stream-kit"].forEach((route) => assert.equal(inventoryPaths.has(route), true));
  assert.equal(inventoryPaths.has("/web"), false);
});

test("Works headings preserve semantic lines through tablet widths", async () => {
  const styles = await readFile(worksStylesUrl, "utf8");
  const shellStyles = await readFile(shellStylesUrl, "utf8");
  const evidence = await readFile(evidenceUrl, "utf8");
  const layout = await readFile(new URL("../app/layout.js", import.meta.url), "utf8");
  const baseRules = styles.split("@media", 1)[0];
  const tabletRules = styles.match(/@media \(min-width: 768px\) \{([\s\S]*?)@media \(min-width: 1024px\)/)?.[1] ?? "";

  assert.match(styles, /\.case-study-hero h1 span\s*\{[\s\S]*?white-space:\s*nowrap/);
  assert.match(baseRules, /\.case-study-hero h1\s*\{[\s\S]*?max-width:\s*none/);
  assert.doesNotMatch(tabletRules, /\.works-group__intro[\s\S]*?grid-template-columns/);
  assert.doesNotMatch(tabletRules, /\.case-study-hero__layout[\s\S]*?grid-template-columns/);
  assert.match(styles, /html\[lang="en"\] \.case-study-hero h1[\s\S]*?font-size:\s*30px/);
  assert.match(styles, /html\[lang="ja"\] \.case-study-page \.section-intro \.display-line\s*\{[\s\S]*?display:\s*block;[\s\S]*?white-space:\s*nowrap/);
  assert.match(styles, /html\[lang="ja"\] \.case-study-page \.work-evidence--compact \.work-evidence__layout\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(styles, /html\[lang="ja"\] \.case-study-page \.work-evidence--compact \.section-intro\s*\{[\s\S]*?max-width:\s*none/);
  assert.match(styles, /html\[lang="ja"\] \.case-study-page \.section-intro h2\s*\{[\s\S]*?font-size:\s*26px/);
  assert.match(styles, /@media \(max-width: 420px\)[\s\S]*?html\[lang="ja"\] \.case-study-page \.section-intro \.display-line\s*\{[\s\S]*?white-space:\s*normal/);
  assert.match(styles, /html\[lang="ja"\] \.works-index-hero h1 span\s*\{[\s\S]*?white-space:\s*nowrap/);
  assert.match(styles, /\.work-evidence--comparisons \.work-evidence__layout\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(baseRules, /\.work-evidence__layout,[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(styles, /\.work-evidence__comparisons\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(baseRules, /html\[lang="ja"\] \.case-study-page\s*\{[\s\S]*?word-break:\s*auto-phrase/);
  assert.match(baseRules, /\.phrase-nowrap\s*\{[\s\S]*?white-space:\s*nowrap/);
  assert.match(shellStyles, /html\[lang="ja"\] \.site-main,[\s\S]*?html\[lang="ja"\] \.site-footer\s*\{[\s\S]*?word-break:\s*auto-phrase/);
  assert.equal(existsSync(phraseAwareTextUrl), true, "shared phrase-aware text must exist");
  const [phraseAwareText, toolProductSection, caseStudy] = await Promise.all([
    readFile(phraseAwareTextUrl, "utf8"),
    readFile(toolProductSectionUrl, "utf8"),
    readFile(caseStudyPageUrl, "utf8")
  ]);
  assert.match(phraseAwareText, /className="phrase-nowrap"/);
  assert.match(caseStudy, /PhraseAwareText locale=\{locale\} text=\{localized\.outcome\}/);
  assert.match(toolProductSection, /PhraseAwareText locale=\{locale\} text=\{item\.outcome\}/);
  assert.match(evidence, /work-evidence--comparisons/);
  assert.match(layout, /locale === "ja" \? "本文へ移動" : "Skip to main content"/);
});
