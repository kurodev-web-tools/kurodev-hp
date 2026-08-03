import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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

test("desktop section headings relax semantic mobile lines into balanced flow", async () => {
  // Given: shared section heading styles.
  const css = await readFile(new URL("../app/styles/components.css", import.meta.url), "utf8");

  // Then: desktop can combine semantic spans while mobile keeps the base block rule.
  assert.match(css, /@media \(min-width: 1024px\)[\s\S]*\.section-intro \.display-line\s*\{[^}]*display:\s*inline;[^}]*white-space:\s*normal;/);
});
