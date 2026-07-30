import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import matter from "gray-matter";
import { Marked } from "marked";

const APPROVED_EFFECTIVE_DATE = "2026-08-04";
const REVIEW_EVIDENCE = "docs/active/KURODEV_TASK12_LEGAL_REVIEW_PACKET.md";
const ALLOWED_BLOCK_TOKENS = new Set(["space", "heading", "paragraph", "list", "table"]);
const ALLOWED_INLINE_TOKENS = new Set(["text", "strong", "em", "codespan", "link", "br"]);
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const markdown = new Marked({ gfm: true });

export const LEGAL_DOCUMENT_REGISTRY = Object.freeze({
  "/terms": Object.freeze({
    documentId: "creator-platform-terms-ja-v1",
    version: "1.0.0",
    locale: "ja",
    documentType: "terms",
    route: "/terms",
    equivalent: Object.freeze({ documentId: "creator-platform-terms-en-v1", route: "/en/terms" }),
    sourcePath: "content/legal/ja/terms.md",
    draftDate: "2026-07-15",
    sha256: "5118cce0e62313b624f4206fbcce5bb2aa78f124ad8696ebbc2e0b78edf5edd8"
  }),
  "/en/terms": Object.freeze({
    documentId: "creator-platform-terms-en-v1",
    version: "1.0.0",
    locale: "en",
    documentType: "terms",
    route: "/en/terms",
    equivalent: Object.freeze({ documentId: "creator-platform-terms-ja-v1", route: "/terms" }),
    sourcePath: "content/legal/en/terms.md",
    draftDate: "2026-07-15",
    sha256: "031921848942e0dc56d365398d822f1abfe91b971806d4a5309cc4d87c62a1b2"
  }),
  "/privacy": Object.freeze({
    documentId: "creator-platform-privacy-ja-v1",
    version: "1.0.0",
    locale: "ja",
    documentType: "privacy",
    route: "/privacy",
    equivalent: Object.freeze({ documentId: "creator-platform-privacy-en-v1", route: "/en/privacy" }),
    sourcePath: "content/legal/ja/privacy.md",
    draftDate: "2026-07-15",
    sha256: "ab100451e2eb7d746edba2a784eca94df553d4a69b0695b44fd123669e49f64a"
  }),
  "/en/privacy": Object.freeze({
    documentId: "creator-platform-privacy-en-v1",
    version: "1.0.0",
    locale: "en",
    documentType: "privacy",
    route: "/en/privacy",
    equivalent: Object.freeze({ documentId: "creator-platform-privacy-ja-v1", route: "/privacy" }),
    sourcePath: "content/legal/en/privacy.md",
    draftDate: "2026-07-15",
    sha256: "4fef73465af57fab69defb6c680ad6f8f0a0c8594c94c0fced43dab36bd9f140"
  }),
  "/legal/tokushoho": Object.freeze({
    documentId: "creator-platform-tokushoho-ja-v1",
    version: "1.0.0",
    locale: "ja",
    documentType: "commercial-disclosure",
    route: "/legal/tokushoho",
    equivalent: null,
    sourcePath: "content/legal/ja/tokushoho.md",
    draftDate: "2026-07-15",
    sha256: "cb550d998b435b0502ac7ecea0e290e7f3d4afb482ff21e830cbc8f35217adc8"
  }),
  "/privacy/foreign-processing": Object.freeze({
    documentId: "creator-platform-foreign-processing-ja-v1",
    version: "1.0.0",
    locale: "ja",
    documentType: "foreign-processing",
    route: "/privacy/foreign-processing",
    equivalent: Object.freeze({
      documentId: "creator-platform-foreign-processing-en-v1",
      route: "/en/privacy/foreign-processing"
    }),
    sourcePath: "content/legal/ja/foreign-processing.md",
    draftDate: "2026-07-17",
    providerReviewDate: "2026-07-30",
    sha256: "7056b68e78b70139a39486e80d7fc695dc523baed035f100caff744f9f57c193"
  }),
  "/en/privacy/foreign-processing": Object.freeze({
    documentId: "creator-platform-foreign-processing-en-v1",
    version: "1.0.0",
    locale: "en",
    documentType: "foreign-processing",
    route: "/en/privacy/foreign-processing",
    equivalent: Object.freeze({
      documentId: "creator-platform-foreign-processing-ja-v1",
      route: "/privacy/foreign-processing"
    }),
    sourcePath: "content/legal/en/foreign-processing.md",
    draftDate: "2026-07-17",
    providerReviewDate: "2026-07-30",
    sha256: "2d67da9979ab69f39b00910d80124d96b68843ae48c4c4361c17dab8469761d2"
  })
});

function canonicalize(source) {
  return `${source.replaceAll("\r\n", "\n").trimEnd()}\n`;
}

function sha256(source) {
  return createHash("sha256").update(canonicalize(source), "utf8").digest("hex");
}

function dateValue(value) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  return typeof value === "string" ? value : null;
}

function requireEqual(actual, expected, field) {
  if (actual !== expected) {
    throw new Error(`Legal source ${field} does not match the approved registry.`);
  }
}

function validateDestination(href) {
  if (CONTROL_CHARACTERS.test(href) || href.startsWith("//")) {
    throw new Error("Legal source contains an unsafe link destination.");
  }
  if (href.startsWith("#") || (href.startsWith("/") && !href.startsWith("//"))) {
    return;
  }

  let destination;
  try {
    destination = new URL(href);
  } catch {
    throw new Error("Legal source contains an invalid link destination.");
  }
  if (destination.protocol !== "https:" || destination.username || destination.password) {
    throw new Error("Legal source contains an unsafe link destination.");
  }
}

function validateInlineTokens(tokens = []) {
  for (const token of tokens) {
    if (!ALLOWED_INLINE_TOKENS.has(token.type)) {
      throw new Error(`Legal source contains prohibited Markdown token: ${token.type}.`);
    }
    if (token.type === "link") {
      validateDestination(token.href);
    }
    validateInlineTokens(token.tokens);
  }
}

function validateMarkdown(tokens) {
  for (const token of tokens) {
    if (!ALLOWED_BLOCK_TOKENS.has(token.type)) {
      throw new Error(`Legal source contains prohibited Markdown token: ${token.type}.`);
    }
    validateInlineTokens(token.tokens);
    if (token.items) {
      for (const item of token.items) {
        validateInlineTokens(item.tokens);
      }
    }
    if (token.header) {
      for (const cell of token.header) {
        validateInlineTokens(cell.tokens);
      }
    }
    if (token.rows) {
      for (const row of token.rows) {
        for (const cell of row) {
          validateInlineTokens(cell.tokens);
        }
      }
    }
  }
}

export function parseApprovedLegalSource(source, expected) {
  if (typeof source !== "string" || CONTROL_CHARACTERS.test(source)) {
    throw new Error("Legal source must be control-character-free UTF-8 text.");
  }
  requireEqual(sha256(source), expected.sha256, "SHA-256");

  const { data, content } = matter(canonicalize(source));
  const expectedMetadataKeys = [
    "documentId",
    "version",
    "locale",
    "documentType",
    "status",
    "approvalState",
    "reviewRequirement",
    "draftDate",
    "effectiveDate",
    "updateDate",
    ...(expected.documentType === "foreign-processing" ? ["providerReviewDate"] : []),
    "serviceScope",
    "canonicalRoute",
    "equivalentDocumentId",
    "equivalentRoute",
    "equivalentDraft",
    "reviewEvidence"
  ];
  requireEqual(Object.keys(data).sort().join("|"), expectedMetadataKeys.sort().join("|"), "metadata schema");
  requireEqual(data.documentId, expected.documentId, "documentId");
  requireEqual(data.version, expected.version, "version");
  requireEqual(data.locale, expected.locale, "locale");
  requireEqual(data.documentType, expected.documentType, "documentType");
  requireEqual(data.status, "ready", "status");
  requireEqual(data.approvalState, "approved", "approvalState");
  requireEqual(data.reviewRequirement, "satisfied", "reviewRequirement");
  requireEqual(dateValue(data.draftDate), expected.draftDate ?? "2026-07-15", "draftDate");
  requireEqual(dateValue(data.effectiveDate), APPROVED_EFFECTIVE_DATE, "effectiveDate");
  requireEqual(dateValue(data.updateDate), APPROVED_EFFECTIVE_DATE, "updateDate");
  requireEqual(data.serviceScope, "creator-platform", "serviceScope");
  requireEqual(data.canonicalRoute, expected.route, "canonicalRoute");
  requireEqual(data.reviewEvidence, REVIEW_EVIDENCE, "reviewEvidence");
  requireEqual(data.equivalentDocumentId, expected.equivalent?.documentId ?? null, "equivalentDocumentId");
  requireEqual(data.equivalentRoute, expected.equivalent?.route ?? null, "equivalentRoute");
  if (expected.equivalent) {
    if (typeof data.equivalentDraft !== "string" || !data.equivalentDraft.startsWith("content/legal/")) {
      throw new Error("Legal source equivalentDraft is invalid.");
    }
  } else {
    requireEqual(data.equivalentDraft, null, "equivalentDraft");
  }
  if (expected.documentType === "foreign-processing") {
    requireEqual(dateValue(data.providerReviewDate), expected.providerReviewDate ?? "2026-07-30", "providerReviewDate");
  }
  if (data.locale === "en" && data.documentType === "commercial-disclosure") {
    throw new Error("An English commercial-disclosure route is not approved.");
  }

  const tokens = markdown.lexer(content);
  validateMarkdown(tokens);
  const titleTokens = tokens.filter((token) => token.type === "heading" && token.depth === 1);
  if (titleTokens.length !== 1 || !titleTokens[0].text.trim()) {
    throw new Error("Legal source must contain exactly one level-one title.");
  }

  return {
    documentId: data.documentId,
    locale: data.locale,
    documentType: data.documentType,
    title: titleTokens[0].text.trim(),
    effectiveDate: APPROVED_EFFECTIVE_DATE,
    updateDate: APPROVED_EFFECTIVE_DATE,
    html: markdown.parse(content),
    equivalent: expected.equivalent
  };
}

export function loadApprovedLegalDocument(route) {
  const expected = LEGAL_DOCUMENT_REGISTRY[route];
  if (!expected) {
    throw new Error(`No approved legal source is registered for ${route}.`);
  }
  const sourceUrl = new URL(`../../${expected.sourcePath}`, import.meta.url);
  return parseApprovedLegalSource(readFileSync(sourceUrl, "utf8"), expected);
}
