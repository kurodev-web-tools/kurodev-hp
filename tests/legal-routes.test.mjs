import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const loaderUrl = new URL("../lib/legal/legal-loader.mjs", import.meta.url);

const routeFiles = [
  ["../app/terms/page.js", "ja", "/terms"],
  ["../app/en/terms/page.js", "en", "/en/terms"],
  ["../app/privacy/page.js", "ja", "/privacy"],
  ["../app/en/privacy/page.js", "en", "/en/privacy"],
  ["../app/legal/tokushoho/page.js", "ja", "/legal/tokushoho"],
  ["../app/privacy/foreign-processing/page.js", "ja", "/privacy/foreign-processing"],
  ["../app/en/privacy/foreign-processing/page.js", "en", "/en/privacy/foreign-processing"]
];

const canonicalize = (source) => `${source.replaceAll("\r\n", "\n").trimEnd()}\n`;
const sha256 = (source) => createHash("sha256").update(canonicalize(source), "utf8").digest("hex");

const validSource = `---
documentId: creator-platform-terms-ja-v1
version: 1.0.0
locale: ja
documentType: terms
status: ready
approvalState: approved
reviewRequirement: satisfied
draftDate: 2026-07-15
effectiveDate: 2026-08-04
updateDate: 2026-08-04
serviceScope: creator-platform
canonicalRoute: /terms
equivalentDocumentId: creator-platform-terms-en-v1
equivalentRoute: /en/terms
equivalentDraft: content/legal/en/terms.md
reviewEvidence: docs/active/KURODEV_TASK12_LEGAL_REVIEW_PACKET.md
---

# 利用規約

安全な[お問い合わせ](/contact)と[外部資料](https://example.com/legal)。
`;

const validExpected = {
  documentId: "creator-platform-terms-ja-v1",
  version: "1.0.0",
  locale: "ja",
  documentType: "terms",
  route: "/terms",
  equivalent: { documentId: "creator-platform-terms-en-v1", route: "/en/terms" },
  sourcePath: "content/legal/ja/terms.md",
  sha256: sha256(validSource)
};

test("routes/render exposes the seven exact approved legal routes", () => {
  // Given: the approved five original routes and independent notice pair.
  // When: their App Router files are resolved.
  const missing = routeFiles.filter(([relativePath]) => !existsSync(new URL(relativePath, import.meta.url)));

  // Then: every approved destination has a concrete route.
  assert.deepEqual(missing, []);
});

test("routes/render emits reciprocal metadata except for Japanese-only commercial disclosure", async () => {
  // Given: all seven approved route wrappers.
  const sources = await Promise.all(routeFiles.map(([relativePath]) => readFile(new URL(relativePath, import.meta.url), "utf8")));

  // When: route metadata and document selection are inspected.
  // Then: bilingual pairs expose alternates while commercial disclosure remains Japanese-only.
  for (const [index, [, locale, route]] of routeFiles.entries()) {
    assert.match(sources[index], new RegExp(`route: "${route.replaceAll("/", "\\/")}"`));
    assert.match(sources[index], new RegExp(`locale: "${locale}"`));
  }
  for (const index of [0, 1, 2, 3, 5, 6]) {
    assert.match(sources[index], /equivalentLocales: \["ja", "en"\]/);
  }
  assert.match(sources[4], /equivalentLocales: \["ja"\]/);
  assert.doesNotMatch(sources[4], /locale: "en"|\/en\/legal\/tokushoho/);
});

test("loader accepts exact ready metadata and returns only public fields", async () => {
  // Given: a canonical source whose independently computed hash matches the registry entry.
  const { parseApprovedLegalSource } = await import(loaderUrl);

  // When: the source crosses the fail-closed loader boundary.
  const document = parseApprovedLegalSource(validSource, validExpected);

  // Then: only the render-safe public contract is returned.
  assert.deepEqual(Object.keys(document), [
    "documentId",
    "locale",
    "documentType",
    "title",
    "effectiveDate",
    "updateDate",
    "html",
    "equivalent"
  ]);
  assert.equal(document.documentId, validExpected.documentId);
  assert.equal(document.equivalent?.route, "/en/terms");
});

test("loader rejects unapproved metadata, dates, identity, route, and fingerprints", async () => {
  // Given: the exact candidate plus one invalid boundary mutation at a time.
  const { parseApprovedLegalSource } = await import(loaderUrl);
  const cases = [
    validSource.replace("status: ready", "status: blocked"),
    validSource.replace("approvalState: approved", "approvalState: unapproved"),
    validSource.replace("effectiveDate: 2026-08-04", "effectiveDate: null"),
    validSource.replace("locale: ja", "locale: en"),
    validSource.replace("documentType: terms", "documentType: privacy"),
    validSource.replace("documentId: creator-platform-terms-ja-v1", "documentId: unknown"),
    validSource.replace("canonicalRoute: /terms", "canonicalRoute: /unknown"),
    `${validSource}\nchanged`
  ];

  // When/Then: every mismatch fails closed.
  for (const source of cases) {
    assert.throws(() => parseApprovedLegalSource(source, validExpected));
  }
});

test("loader rejects unsafe Markdown and English commercial disclosure", async () => {
  // Given: prohibited render tokens and destination forms.
  const { parseApprovedLegalSource } = await import(loaderUrl);
  const unsafeBodies = [
    "<script>alert(1)</script>",
    "![image](https://example.com/image.png)",
    "```js\nalert(1)\n```",
    "[bad](javascript:alert(1))",
    "[bad](//example.com/path)",
    "[bad](mailto:test@example.com)",
    "[bad](https://user:pass@example.com/path)",
    "[bad](https://example.com/\u0001)"
  ];

  // When/Then: no unsafe token or English statutory source reaches rendering.
  for (const body of unsafeBodies) {
    const source = validSource.replace("安全な[お問い合わせ](/contact)と[外部資料](https://example.com/legal)。", body);
    assert.throws(() => parseApprovedLegalSource(source, { ...validExpected, sha256: sha256(source) }));
  }
  const englishDisclosure = validSource
    .replace("locale: ja", "locale: en")
    .replace("documentType: terms", "documentType: commercial-disclosure");
  assert.throws(() => parseApprovedLegalSource(englishDisclosure, {
    ...validExpected,
    locale: "en",
    documentType: "commercial-disclosure",
    sha256: sha256(englishDisclosure)
  }));
});

test("footer links approved legal routes with the exact English disclosure label", async () => {
  // Given: the shared footer after legal approval.
  const footer = await readFile(new URL("../components/layout/site-footer.js", import.meta.url), "utf8");

  // When/Then: real links replace placeholders and include the independent notice routes.
  assert.match(footer, /Commercial disclosure \(Japanese\)/);
  for (const route of ["/terms", "/privacy", "/legal/tokushoho", "/privacy/foreign-processing"]) {
    assert.match(footer, new RegExp(`"${route.replaceAll("/", "\\/")}"`));
  }
  assert.match(footer, /legalLinks\.map\(\(\[label, href\]\) => <Link/);
  assert.match(footer, /locale === "en" && href === "\/legal\/tokushoho" \? href : localePath\(locale, href\)/);
  assert.doesNotMatch(footer, /legalLinks\.map\(\(\[label, href\]\) => <span/);
});

test("language switching pairs the approved bilingual legal routes only", async () => {
  const switchSource = await readFile(new URL("../components/layout/language-switch.js", import.meta.url), "utf8");

  assert.match(switchSource, /"\/privacy\/foreign-processing"/);
  assert.doesNotMatch(switchSource, /"\/legal\/tokushoho"/);
});

test("Contact exposes the approved same-locale legal destinations and required consent controls", async () => {
  const formSource = await readFile(new URL("../components/contact-form.js", import.meta.url), "utf8");

  assert.match(formSource, /href=\{localePath\(locale, "\/privacy"\)\}/);
  assert.match(formSource, /href=\{localePath\(locale, "\/privacy\/foreign-processing"\)\}/);
  assert.doesNotMatch(formSource, /contact-form__privacy-unavailable/);
  assert.match(formSource, /name="privacyAcknowledged"/);
  assert.match(formSource, /name="foreignTransferConsent"/);
});
