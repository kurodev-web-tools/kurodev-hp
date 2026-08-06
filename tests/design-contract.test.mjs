import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const headingLines = await import(new URL("../lib/heading-lines.mjs", import.meta.url)).catch(() => null);

const requiredDesignTerms = [
  "--color-cyan-300",
  "--color-cyan-400",
  "--canvas",
  "--surface",
  "--text-primary",
  "4.5:1",
  "SiteHeader",
  "ActionLink",
  "ProductStage",
  "StatusBadge",
  "prefers-reduced-motion",
  "375",
  "768",
  "1024",
  "1280"
];

test("design contract names the approved tokens, primitives, and QA widths", async () => {
  // Given: the approved Creator Studio design document.
  const design = await readFile(new URL("../DESIGN.md", import.meta.url), "utf8");

  // When: its required implementation terms are inspected.
  const missingTerms = requiredDesignTerms.filter((term) => !design.includes(term));

  // Then: every approved term is present.
  assert.deepEqual(missingTerms, []);
});

test("global styles use the Creator Studio semantic palette without purple brand drift", async () => {
  // Given: the global stylesheet that implements the approved design.
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  // When: semantic tokens and retired hues are inspected.
  const requiredTokens = ["--canvas", "--surface", "--text-primary", "--action", "--focus-ring"];

  // Then: the shared semantic palette exists and purple is absent.
  requiredTokens.forEach((token) => assert.match(css, new RegExp(token)));
  assert.doesNotMatch(css, /#(?:8b5cf6|7c3aed|6d28d9)/i);
});

test("Home background stays quiet without a repeated studio grid", async () => {
  // Given: the global canvas implementation.
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  // Then: atmosphere comes from light and tonal surfaces, not a repeated grid.
  assert.doesNotMatch(css, /--studio-grid/);
  assert.doesNotMatch(css, /linear-gradient\(var\(--studio-grid\)/);
});

test("A3-M Soft Pulp keeps the body canvas static, textured, and glow-free", async () => {
  // Given: the approved A3-M background contract.
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const body = css.match(/body\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  const decodedCss = css.replace(/data:image\/svg\+xml,([^\"]+)/g, (_, payload) => decodeURIComponent(payload));
  const textureMatrices = [...decodedCss.matchAll(/<feColorMatrix\b[^>]*\bvalues=['"]([^'"]+)['"]/g)].map(([, values]) => values.trim().split(/\s+/));

  // Then: both themes use the approved bases and two static SVG noise layers.
  assert.match(css, /--canvas:\s*#f1f5f4;/i);
  assert.match(css, /html\[data-theme="dark"\][\s\S]*--canvas:\s*#08141b;/i);
  assert.doesNotMatch(body, /radial-gradient|circle\s+at/i);
  assert.match(decodedCss, /feTurbulence[^>]*type=['"]fractalNoise['"][^>]*baseFrequency=['"]\.018 \.05['"][^>]*numOctaves=['"]4['"][^>]*seed=['"]8['"]/);
  assert.match(decodedCss, /feTurbulence[^>]*type=['"]fractalNoise['"][^>]*baseFrequency=['"]\.82['"][^>]*numOctaves=['"]2['"][^>]*stitchTiles=['"]stitch['"]/);
  assert.match(decodedCss, /\.12[^\n]*\.62[^\n]*\.60[^\n]*\.10/);
  assert.match(decodedCss, /\.17[^\n]*\.72[^\n]*\.69[^\n]*\.075/);
  assert.match(decodedCss, /\.045/);
  assert.match(decodedCss, /\.065/);
  assert.deepEqual(textureMatrices, [
    ["0", "0", "0", "0", ".12", "0", "0", "0", "0", ".62", "0", "0", "0", "0", ".60", ".10", "0", "0", "0", "0"],
    ["0", "0", "0", "0", ".12", "0", "0", "0", "0", ".62", "0", "0", "0", "0", ".60", ".045", "0", "0", "0", "0"],
    ["0", "0", "0", "0", ".17", "0", "0", "0", "0", ".72", "0", "0", "0", "0", ".69", ".075", "0", "0", "0", "0"],
    ["0", "0", "0", "0", ".17", "0", "0", "0", "0", ".72", "0", "0", "0", "0", ".69", ".065", "0", "0", "0", "0"]
  ]);
});

test("A3-M Soft Pulp keeps both low-frequency texture tiles seamless", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const decodedCss = css.replace(/data:image\/svg\+xml,([^\"]+)/g, (_, payload) => decodeURIComponent(payload));
  const lowFrequencyNoise = [...decodedCss.matchAll(/<feTurbulence\b[^>]*baseFrequency=['"]\.018 \.05['"][^>]*>/g)].map(([tag]) => tag);

  assert.equal(lowFrequencyNoise.length, 2);
  lowFrequencyNoise.forEach((tag) => assert.match(tag, /stitchTiles=['"]stitch['"]/));
});

test("Works heroes stay free of circular atmosphere glows", async () => {
  const styles = await readFile(new URL("../app/styles/works-page.css", import.meta.url), "utf8");

  assert.doesNotMatch(styles, /\.works-index-hero::before|\.case-study-hero::before/);
  assert.doesNotMatch(styles, /radial-gradient\(circle,\s*var\(--studio-light\)/);
});

test("approved Japanese headings use one comma break on desktop only", async () => {
  const [sectionIntro, componentStyles, creatorPage, creatorContent, creatorStyles, guidePage, guideStyles, aboutPage, aboutContent, aboutStyles, contactStyles] = await Promise.all([
    readFile(new URL("../components/ui/section-intro.js", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/components.css", import.meta.url), "utf8"),
    readFile(new URL("../components/pages/creator-site-page.js", import.meta.url), "utf8"),
    readFile(new URL("../lib/content/creator-site-content.mjs", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/creator-site.css", import.meta.url), "utf8"),
    readFile(new URL("../components/pages/guide-index-page.js", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/guide-page.css", import.meta.url), "utf8"),
    readFile(new URL("../components/pages/about-page.js", import.meta.url), "utf8"),
    readFile(new URL("../lib/content/about-contact-content.mjs", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/about-page.css", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/contact-page.css", import.meta.url), "utf8")
  ]);

  assert.match(sectionIntro, /desktopBreakAfter/);
  assert.match(sectionIntro, /className="desktop-title-line"/);
  assert.match(creatorContent, /title:\s*"活動と目的を整理してから、公開後の運用まで考える。"[\s\S]*desktopBreakAfter:\s*1/);
  assert.match(creatorContent, /title:\s*"内容に合わせて、個別に構成を考えます。"[\s\S]*desktopBreakAfter:\s*0/);
  assert.match(creatorContent, /title:\s*"活動の情報を、たどれる場所にまとめる。"[\s\S]*desktopBreakAfter:\s*0/);
  assert.match(creatorPage, /copy\.final\.desktopBreakAfter/);
  assert.match(componentStyles, /\.desktop-title-line\s*\{[^}]*display:\s*contents/);
  assert.match(componentStyles, /@media \(min-width:\s*1024px\)[\s\S]*\.desktop-title-line\s*\{[^}]*display:\s*block;[^}]*white-space:\s*nowrap/);
  assert.doesNotMatch(creatorStyles, /\.creator-site-final h2 span\s*\{/);
  assert.match(creatorStyles, /\.creator-site-final h2 > \.display-line\s*\{[^}]*display:\s*block/);
  assert.match(creatorStyles, /@media \(min-width:\s*1024px\)[\s\S]*\.service-process \.section-intro h2 > \.display-line,[\s\S]*\.service-routes \.section-intro h2 > \.display-line,[\s\S]*\.creator-site-final h2 > \.display-line\s*\{[^}]*display:\s*inline/);

  assert.match(guidePage, /titleLines:\s*\["配信準備と活動発信を、",\s*"確認しながら進めるガイド。"\]/);
  assert.match(guidePage, /desktopBreakAfter:\s*0/);
  assert.match(guideStyles, /\.guide-index-hero h1 > \.display-line\s*\{[\s\S]*display:\s*inline/);
  assert.match(guideStyles, /@media \(min-width:\s*1024px\)[\s\S]*\.guide-index-hero h1\s*\{[^}]*max-width:\s*none/);

  assert.match(aboutContent, /title:\s*"確認から公開後の改善まで、小さな判断を積み重ねる。"[\s\S]*titleLines:\s*\["確認から公開後の改善まで、",\s*"小さな判断を積み重ねる。"\][\s\S]*desktopBreakAfter:\s*0/);
  assert.match(aboutPage, /copy\.process\.desktopBreakAfter/);
  assert.match(aboutStyles, /\.about-section-intro h2 > \.display-line\s*\{[\s\S]*display:\s*inline/);
  assert.match(aboutStyles, /@media \(min-width:\s*1024px\)[\s\S]*\.about-section-intro h2\s*\{[^}]*max-width:\s*none/);

  assert.doesNotMatch(aboutStyles, /\.about-hero::before|radial-gradient\(circle,\s*var\(--studio-light\)/);
  assert.doesNotMatch(contactStyles, /\.contact-hero::before|radial-gradient\(circle,\s*var\(--studio-light\)/);
});

test("desktop section headings relax semantic mobile lines into balanced flow", async () => {
  // Given: shared section heading styles.
  const css = await readFile(new URL("../app/styles/components.css", import.meta.url), "utf8");

  // Then: desktop can combine semantic spans while mobile keeps the base block rule.
  assert.match(css, /@media \(min-width: 1024px\)[\s\S]*\.section-intro \.display-line\s*\{[^}]*display:\s*inline;[^}]*white-space:\s*normal;/);
});

test("validatedLinePlan accepts only complete, non-empty line regroupings without mutation", () => {
  assert.ok(headingLines, "heading line utilities should be available");

  const { validatedLinePlan } = headingLines;
  const lines = ["配信準備から、", "活動をまとめるホームページまで。"];
  const candidate = ["配信準備から、活動を", "まとめるホームページまで。"];
  const originalLines = [...lines];
  const originalCandidate = [...candidate];

  assert.strictEqual(validatedLinePlan(lines, candidate), candidate);
  assert.equal(validatedLinePlan(["abcd"], ["wxyz"]), null, "same-length but different content is rejected");
  assert.equal(validatedLinePlan(["abcd"], ["abcdef"]), null, "longer content is rejected");
  assert.equal(validatedLinePlan(lines, []), null, "an empty plan is rejected");
  assert.equal(validatedLinePlan(["abcd"], ["", "abcd"]), null, "empty entries are rejected");
  assert.deepEqual(lines, originalLines);
  assert.deepEqual(candidate, originalCandidate);
});

test("approved Japanese mobile heading plans use validated shared markers at eight callsites", async () => {
  const [sectionIntro, home, creator, guideEntry, featuredTools, makerIntroduction, siteOutcomes, serviceProcess, serviceRoutes, creatorSitePage] = await Promise.all([
    readFile(new URL("../components/ui/section-intro.js", import.meta.url), "utf8"),
    import(new URL("../lib/content/site-copy.mjs", import.meta.url)),
    import(new URL("../lib/content/creator-site-content.mjs", import.meta.url)),
    readFile(new URL("../components/sections/guide-entry.js", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/featured-tools.js", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/maker-introduction.js", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/site-outcomes.js", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/service-process.js", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/service-routes.js", import.meta.url), "utf8"),
    readFile(new URL("../components/pages/creator-site-page.js", import.meta.url), "utf8")
  ]);

  const plans = [
    ["Home tools", home.siteCopy.ja.home.tools, ["配信準備を、", "ひとつずつ軽くする。"]],
    ["Home about", home.siteCopy.ja.home.maker, ["つくる前に、活動の", "流れを理解する。"]],
    ["Creator hero", creator.creatorSiteCopy.ja.hero, ["SNSに流れていく活動を、", "自分の場所にまとめる。"]],
    ["Creator workflow", creator.creatorSiteCopy.ja.workflow, ["配信者の活動フローを", "理解して、運用できる形へ。"]],
    ["Creator process", creator.creatorSiteCopy.ja.process, ["活動と目的を整理してから、", "公開後の運用まで考える。"]],
    ["Creator routes", creator.creatorSiteCopy.ja.routes, ["内容に合わせて、", "個別に構成を考えます。"]],
    ["Creator final", creator.creatorSiteCopy.ja.final, ["活動の情報を、", "たどれる場所にまとめる。"]]
  ];

  plans.forEach(([name, entry, mobileLines]) => {
    assert.deepEqual(entry.mobileLines, mobileLines, `${name} keeps its approved mobile plan`);
    assert.equal(entry.mobileLines.join(""), entry.title, `${name} mobile plan retains the complete title`);
  });
  assert.equal(plans.length, 7);
  assert.match(guideEntry, /const mobileLines = locale === "ja" \? \["迷ったときに、", "次の一手がわかるガイド。"\] : null;/);
  assert.match(guideEntry, /mobileLines=\{mobileLines\}/);
  assert.equal(home.siteCopy.en.home.tools.mobileLines, undefined);
  assert.equal(home.siteCopy.en.home.maker.mobileLines, undefined);
  assert.equal(creator.creatorSiteCopy.en.hero.mobileLines, undefined);
  assert.equal(creator.creatorSiteCopy.en.workflow.mobileLines, undefined);

  assert.match(sectionIntro, /DisplayLines\(\{ lines, mobileLines, tabletLines, desktopBreakAfter, desktopLines, mobileLocked = true \}\)/);
  assert.match(sectionIntro, /const validatedMobileLines = validatedLinePlan\(lines, mobileLines\);/);
  assert.match(sectionIntro, /const mobileBreaks = new Set\(breakOffsets\(validatedMobileLines \?\? lines\)\);/);
  assert.match(sectionIntro, /mobileLines=\{mobileLines\}/);
  assert.match(featuredTools, /mobileLines=\{copy\.mobileLines\}/);
  assert.match(makerIntroduction, /mobileLines=\{copy\.mobileLines\}/);
  assert.match(siteOutcomes, /workflow\.mobileLines/);
  assert.match(serviceProcess, /mobileLines=\{copy\.mobileLines\}/);
  assert.match(serviceRoutes, /mobileLines=\{copy\.mobileLines\}/);
  assert.match(creatorSitePage, /mobileLines=\{copy\.hero\.mobileLines\}/);
  assert.match(creatorSitePage, /mobileLines=\{copy\.final\.mobileLines\}/);
});

test("mobile-only plans preserve higher-width fallback text while service process may wrap at 375px", async () => {
  const [sectionIntro, componentStyles, serviceProcess] = await Promise.all([
    readFile(new URL("../components/ui/section-intro.js", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/components.css", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/service-process.js", import.meta.url), "utf8")
  ]);

  assert.match(serviceProcess, /mobileLines=\{copy\.mobileLines\}[\s\S]*mobileLocked=\{false\}/);
  assert.match(sectionIntro, /if \(validatedMobileLines && !validatedTabletLines && !hasDesktopPlan\)/);
  assert.match(sectionIntro, /display-lines--mobile-only\$\{/);
  assert.match(sectionIntro, /className="display-lines--mobile-only-fallback"/);
  assert.match(sectionIntro, /<OriginalDisplayLines lines=\{lines\} \/>/);
  assert.match(sectionIntro, /index < lines\.length - 1 \? " " : null/);
  assert.match(componentStyles, /\.display-lines--mobile-only-fallback\s*\{[^}]*display:\s*none;/);
  assert.match(componentStyles, /@media \(min-width:\s*768px\)[\s\S]*\.display-lines--mobile-only\s*\{[^}]*display:\s*none;[\s\S]*\.display-lines--mobile-only-fallback\s*\{[^}]*display:\s*contents;/);
});

test("Home and Guide heading fit exceptions stay inside the tablet range", async () => {
  const [homeStyles, guideStyles] = await Promise.all([
    readFile(new URL("../app/styles/home-hero.css", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/guide-page.css", import.meta.url), "utf8")
  ]);
  const tabletQuery = /@media \(min-width: 768px\) and \(max-width: 1023px\)\s*\{([\s\S]*?)\n\}/;
  const homeTablet = homeStyles.match(tabletQuery)?.[1] ?? "";
  const guideTablet = guideStyles.match(tabletQuery)?.[1] ?? "";

  assert.match(homeTablet, /\.creator-hero h1\s*\{[^}]*max-width:\s*17ch;/);
  assert.doesNotMatch(homeTablet, /font-size:/);
  assert.match(guideTablet, /\.guide-index-hero h1\s*\{[^}]*max-width:\s*none;/);
  assert.doesNotMatch(homeTablet + guideTablet, /(^|[,{])\s*h1\s*\{/m);
  assert.doesNotMatch(homeStyles.replace(tabletQuery, ""), /\.creator-hero h1\s*\{[^}]*max-width:\s*17ch;/);
  assert.doesNotMatch(guideStyles, /@media \(min-width: 768px\)\s*\{[^{}]*\.guide-index-hero h1/);
});

test("Japanese heading line plans are tablet-only, phrase-specific, and accessible once", async () => {
  const [sectionIntro, componentStyles, homeHeroStyles, creatorStyles, home, creator, about, guide, aboutPage, guidePage] = await Promise.all([
    readFile(new URL("../components/ui/section-intro.js", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/components.css", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/home-hero.css", import.meta.url), "utf8"),
    readFile(new URL("../app/styles/creator-site.css", import.meta.url), "utf8"),
    import(new URL("../lib/content/site-copy.mjs", import.meta.url)),
    import(new URL("../lib/content/creator-site-content.mjs", import.meta.url)),
    import(new URL("../lib/content/about-contact-content.mjs", import.meta.url)),
    readFile(new URL("../components/sections/guide-entry.js", import.meta.url), "utf8"),
    readFile(new URL("../components/pages/about-page.js", import.meta.url), "utf8"),
    readFile(new URL("../components/pages/guide-index-page.js", import.meta.url), "utf8")
  ]);

  const expectedLines = [
    ["Home hero", home.siteCopy.ja.home.hero, ["配信準備から、", "活動をまとめる", "ホームページまで。"]],
    ["Home tools", home.siteCopy.ja.home.tools, ["配信準備を、", "ひとつずつ軽くする。"]],
    ["Home service", home.siteCopy.ja.home.service, ["ツールだけじゃない、あなたの", "活動を伝えるホームページを。"]],
    ["Home guide entry", null, ["迷ったときに、", "次の一手がわかるガイド。"]],
    ["Home maker", home.siteCopy.ja.home.maker, ["つくる前に、活動の", "流れを理解する。"]],
    ["Tools creator website bridge", home.siteCopy.ja.home.service, ["ツールだけじゃない、あなたの", "活動を伝えるホームページを。"]],
    ["Creator hero", creator.creatorSiteCopy.ja.hero, ["SNSに流れていく活動を、", "自分の場所にまとめる。"]],
    ["Creator recognition", creator.creatorSiteCopy.ja.recognition, ["情報はあるのに、活動の", "全体像が伝わりにくい。"]],
    ["Creator outcomes", creator.creatorSiteCopy.ja.outcomes, ["ページ数ではなく、伝えたい", "情報から組み立てる。"]],
    ["Creator process", creator.creatorSiteCopy.ja.process, ["活動と目的を整理してから、", "公開後の運用まで考える。"]],
    ["Creator routes", creator.creatorSiteCopy.ja.routes, ["内容に合わせて、", "個別に構成を考えます。"]],
    ["Creator final", creator.creatorSiteCopy.ja.final, ["活動の情報を、", "たどれる場所にまとめる。"]],
    ["Guide hero", null, ["配信準備と活動発信を、", "確認しながら進めるガイド。"]],
    ["About purpose", about.aboutContactContent.ja.about.purpose, ["つくるものより先に、", "何を分かりやすく", "するかを決める。"]],
    ["About focus", about.aboutContactContent.ja.about.creatorFocus, ["日々の準備と、", "外へ伝える場所を", "ひとつの流れで考える。"]],
    ["About process", about.aboutContactContent.ja.about.process, ["確認から公開後の", "改善まで、小さな", "判断を積み重ねる。"]]
  ];

  const dataBackedPlans = expectedLines.filter(([, entry]) => entry).map(([name, entry, lines]) => ({ name, title: entry.title, lines, tabletLines: entry.tabletLines }));

  dataBackedPlans.forEach(({ title, lines, tabletLines }) => {
    assert.deepEqual(tabletLines, lines);
    assert.equal(tabletLines.join(""), title);
  });

  const quotedStrings = (value) => [...value.matchAll(/"([^"]+)"/g)].map(([, string]) => string);
  const guideEntryTitle = guide.match(/const title = locale === "ja" \? "([^"]+)"/)?.[1];
  const guideEntryTablet = quotedStrings(guide.match(/const tabletLines = locale === "ja" \? \[([^\]]+)\] : null/)?.[1] ?? "");
  const guideHeroTitle = guidePage.match(/ja:\s*\{[\s\S]*?title:\s*"([^"]+)"/)?.[1];
  const guideHeroTablet = quotedStrings(guidePage.match(/ja:\s*\{[\s\S]*?tabletLines:\s*\[([^\]]+)\]/)?.[1] ?? "");
  const allPlans = [
    ...dataBackedPlans,
    { name: "Home guide entry", title: guideEntryTitle, tabletLines: guideEntryTablet },
    { name: "Guide hero", title: guideHeroTitle, tabletLines: guideHeroTablet }
  ];

  assert.equal(allPlans.length, 16);
  allPlans.forEach(({ name, title, tabletLines }) => assert.equal(tabletLines.join(""), title, `${name} tablet plan retains the complete title`));
  assert.match(guide, /tabletLines\s*=\s*locale === "ja" \? \["迷ったときに、", "次の一手がわかるガイド。"\]/);
  assert.match(guidePage, /tabletLines:\s*\["配信準備と活動発信を、",\s*"確認しながら進めるガイド。"\]/);

  assert.match(sectionIntro, /DisplayLines\(\{ lines, mobileLines, tabletLines, desktopBreakAfter, desktopLines, mobileLocked = true \}\)/);
  assert.match(sectionIntro, /const hasDesktopPlan = Boolean\(desktopLines\) \|\| Number\.isInteger\(desktopBreakAfter\);/);
  assert.match(sectionIntro, /display-lines--desktop-locked/);
  assert.match(sectionIntro, /className="heading-line-break heading-line-break--tablet"/);
  assert.match(sectionIntro, /aria-hidden="true"/);
  assert.doesNotMatch(sectionIntro, /sr-only|visually-hidden|aria-label=/);
  assert.match(componentStyles, /@media \(min-width:\s*768px\) and \(max-width:\s*1023px\)[\s\S]*\.heading-line-break--tablet\s*\{[^}]*display:\s*inline/);
  assert.match(componentStyles, /@media \(max-width:\s*767px\)[\s\S]*\.display-lines--mobile-locked\s*\{[^}]*white-space:\s*nowrap/);
  assert.match(componentStyles, /@media \(min-width:\s*768px\) and \(max-width:\s*1023px\)[\s\S]*\.display-lines--tablet\s*\{[^}]*white-space:\s*nowrap/);
  assert.doesNotMatch(componentStyles, /@media \(max-width:\s*767px\)\s*\{[^{}]*\.heading-line-break--tablet/);
  assert.doesNotMatch(componentStyles, /@media \(min-width:\s*1024px\)\s*\{[^{}]*\.heading-line-break--tablet/);
  assert.match(componentStyles, /\.display-lines--tablet \.display-line\s*\{[^}]*display:\s*contents;[^}]*white-space:\s*inherit;/);
  assert.match(componentStyles, /@media \(min-width:\s*1024px\)[\s\S]*\.display-lines--desktop-locked\s*\{[^}]*white-space:\s*nowrap;/);
  const desktopStyles = componentStyles.match(/@media \(min-width:\s*1024px\)\s*\{([\s\S]*)/)?.[1] ?? "";
  assert.doesNotMatch(desktopStyles, /\.display-lines--tablet\s*\{[^}]*white-space:\s*nowrap;/);
  const broadDesktopLineRule = desktopStyles.indexOf(".section-intro .display-line");
  const lockedDesktopLineRule = desktopStyles.indexOf(".section-intro .display-lines--desktop-locked .display-line");
  assert.ok(broadDesktopLineRule >= 0, "the broad desktop line rule remains present");
  assert.ok(lockedDesktopLineRule > broadDesktopLineRule, "the locked desktop line rule follows the broad rule");
  assert.match(desktopStyles.slice(lockedDesktopLineRule), /^\.section-intro \.display-lines--desktop-locked \.display-line\s*\{[^}]*white-space:\s*nowrap;/);
  assert.doesNotMatch(componentStyles, /\.section-intro\s+span\s*\{|h[12]\s+span\s*\{/);
  assert.doesNotMatch(homeHeroStyles, /\.creator-hero h1 span\s*\{/);
  assert.doesNotMatch(creatorStyles, /\.creator-site-hero h1 span\s*\{/);
  assert.match(aboutPage, /copy\.purpose\.tabletLines \? <DisplayLines lines=\{\[copy\.purpose\.title\]\} tabletLines=\{copy\.purpose\.tabletLines\} \/> : copy\.purpose\.title/);
  assert.match(aboutPage, /copy\.creatorFocus\.tabletLines \? <DisplayLines lines=\{\[copy\.creatorFocus\.title\]\} tabletLines=\{copy\.creatorFocus\.tabletLines\} \/> : copy\.creatorFocus\.title/);
  assert.doesNotMatch(aboutPage, /<h2><DisplayLines lines=\{\[copy\.(?:purpose|creatorFocus)\.title\]\}/);
  assert.equal(home.siteCopy.en.about.purpose.tabletLines, undefined);
  assert.equal(home.siteCopy.en.about.creatorFocus.tabletLines, undefined);
  assert.match(sectionIntro, /lines\.length > 1 && mobileLocked \? " display-lines--mobile-locked" : ""/);
  assert.match(sectionIntro, /DisplayLines lines=\{titleLines\} mobileLines=\{mobileLines\} tabletLines=\{tabletLines\} desktopBreakAfter=\{desktopBreakAfter\} mobileLocked=\{mobileLocked\}/);
  assert.match(guidePage, /desktopBreakAfter=\{labels\.desktopBreakAfter\} mobileLocked=\{false\}/);
  assert.match(aboutPage, /desktopBreakAfter=\{copy\.process\.desktopBreakAfter\} mobileLocked=\{false\}/);
});
