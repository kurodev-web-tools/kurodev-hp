import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { Marked } from "marked";
import { guideRouteAvailability } from "../content/guide-routes.mjs";

const MODULE_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = resolve(MODULE_DIRECTORY, "..", "..");
const DEFAULT_CONTENT_ROOT = join(REPOSITORY_ROOT, "content", "guides");
const DEFAULT_PUBLIC_ROOT = join(REPOSITORY_ROOT, "public");
const APPROVED_IMAGE_MANIFEST = join(DEFAULT_CONTENT_ROOT, "approved-images.json");
const PUBLICATION_CANDIDATE = join(DEFAULT_CONTENT_ROOT, "publication-candidate.json");
export const APPROVED_GUIDE_PACKET_ID = "d6c09046449ac394e702af782465099784449c41fe69c0baa6dc0cb6cde2a8b4";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TRANSLATION_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ALLOWED_STATUSES = new Set(["published", "beta", "unavailable", "in-development", "concept"]);
const ALLOWED_TOOLS = new Set([
  "kuro-stream-kit",
  "schedule-calendar",
  "thumbnail-editor",
  "sns-split",
  "comment-translator",
  "creator-site"
]);
const REQUIRED_FRONT_MATTER = [
  "title",
  "description",
  "updated",
  "category",
  "applicableTool",
  "status",
  "locale",
  "translationKey",
  "outcome",
  "prerequisites",
  "steps",
  "commonProblems",
  "relatedGuides",
  "toolAction",
  "images"
];
const REQUIRED_SECTIONS = {
  ja: ["できること", "準備", "手順", "よくある問題", "関連ガイド"],
  en: ["Outcome", "Prerequisites", "Steps", "Common problems", "Related guides"]
};
const ALLOWED_TOKEN_TYPES = new Set([
  "space",
  "code",
  "heading",
  "list",
  "list_item",
  "paragraph",
  "codespan",
  "link",
  "image",
  "text",
  "escape"
]);
const controlledMarked = new Marked({ gfm: false, breaks: false });
let cachedInventoryPromise;

export class GuideValidationError extends Error {
  constructor(sourcePath, detail) {
    super(`Invalid guide ${sourcePath}: ${detail}`);
    this.name = "GuideValidationError";
  }
}

function fail(sourcePath, detail) {
  throw new GuideValidationError(sourcePath, detail);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function requireString(data, field, sourcePath) {
  if (!isNonEmptyString(data[field])) fail(sourcePath, `${field} must be a non-empty string`);
  return data[field].trim();
}

function requireStringArray(data, field, sourcePath) {
  const value = data[field];
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => !isNonEmptyString(item))) {
    fail(sourcePath, `${field} must be a non-empty string list`);
  }
  return value.map((item) => item.trim());
}

function normalizeUpdated(value, sourcePath) {
  const normalized = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (!isNonEmptyString(normalized) || !DATE_PATTERN.test(normalized)) {
    fail(sourcePath, "updated must use YYYY-MM-DD");
  }
  const parsed = new Date(`${normalized}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== normalized) {
    fail(sourcePath, "updated must be a real calendar date");
  }
  return normalized;
}

function validateRelativePath(pathname, label, sourcePath) {
  if (!pathname.startsWith("/") || pathname.startsWith("//") || pathname.includes("\\")) {
    fail(sourcePath, `${label} must be a root-relative same-site path`);
  }
  let decoded = pathname;
  try {
    while (true) {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    }
  } catch {
    fail(sourcePath, `${label} contains invalid encoding`);
  }
  if (decoded.includes("//") || decoded.includes("\\")) {
    fail(sourcePath, `${label} must remain a root-relative same-site path after decoding`);
  }
  if (decoded.split(/[/?#]/).includes("..") || decoded.includes("/../")) {
    fail(sourcePath, `${label} traversal is not allowed`);
  }
}

function validateLink(href, sourcePath) {
  if (!isNonEmptyString(href)) fail(sourcePath, "link href is required");
  const trimmed = href.trim();
  if (trimmed.startsWith("//")) fail(sourcePath, "protocol-relative link is not allowed");
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) {
    if (trimmed.startsWith("/")) validateRelativePath(trimmed, "link", sourcePath);
    return;
  }
  let url;
  try {
    url = new URL(trimmed);
  } catch {
    fail(sourcePath, "link must use http, https, mailto, an anchor, or a same-site path");
  }
  if (!new Set(["http:", "https:", "mailto:"]).has(url.protocol)) {
    fail(sourcePath, `${url.protocol.replace(":", "")} link protocol is not allowed`);
  }
}

function normalizeGuideImagePath(src, sourcePath) {
  if (!isNonEmptyString(src)) fail(sourcePath, "image src is required");
  const trimmed = src.trim();
  if (trimmed.startsWith("//") || /^https?:/i.test(trimmed)) {
    fail(sourcePath, "remote image is not allowed");
  }
  validateRelativePath(trimmed, "image", sourcePath);
  let decoded;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    fail(sourcePath, "image contains invalid encoding");
  }
  if (decoded !== trimmed) fail(sourcePath, "encoded image path is not allowed");
  if (!/^\/images\/guide\/[a-z0-9][a-z0-9/_-]*\.(?:avif|jpe?g|png|webp)$/.test(trimmed)) {
    fail(sourcePath, "image must be an approved /images/guide/ asset");
  }
  return trimmed;
}

function publicImageFile(publicRoot, src, sourcePath) {
  const root = resolve(publicRoot);
  const imageFile = resolve(root, src.slice(1));
  const fromRoot = relative(root, imageFile);
  if (fromRoot.startsWith("..") || fromRoot.split(sep).includes("..")) {
    fail(sourcePath, "image traversal is not allowed");
  }
  return imageFile;
}

export async function hashGuideImage(imagePath) {
  const bytes = await readFile(imagePath);
  return createHash("sha256").update(bytes).digest("hex");
}

async function hashPublicationFile(pathname, filePath) {
  if (!pathname.endsWith(".md")) return hashGuideImage(filePath);

  const source = await readFile(filePath, "utf8");
  return createHash("sha256").update(source.replaceAll("\r\n", "\n")).digest("hex");
}

function repositoryPath(root, pathname, sourcePath) {
  const target = resolve(root, ...pathname.split("/"));
  const fromRoot = relative(root, target);
  if (fromRoot.startsWith("..") || fromRoot.split(sep).includes("..")) {
    fail(sourcePath, `publication candidate path escapes the repository: ${pathname}`);
  }
  return target;
}

export async function validatePublicationCandidate(options) {
  const { contentRoot, approvedImages, candidatePath = PUBLICATION_CANDIDATE, expectedPacketId } = options;
  let candidate;
  try {
    candidate = JSON.parse(await readFile(candidatePath, "utf8"));
  } catch (error) {
    fail(candidatePath, `publication candidate could not be read: ${error instanceof Error ? error.message : "unknown error"}`);
  }
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    fail(candidatePath, "publication candidate must be an object");
  }
  if (candidate.algorithm !== "sha256" || !/^[a-f0-9]{64}$/.test(candidate.packetId ?? "")) {
    fail(candidatePath, "publication candidate must use sha256 with a valid packetId");
  }
  if (!candidate.files || typeof candidate.files !== "object" || Array.isArray(candidate.files)) {
    fail(candidatePath, "publication candidate files must be an object");
  }

  const repositoryRoot = resolve(contentRoot, "..", "..");
  const markdownKeys = (await guideFiles(contentRoot)).map((path) => (
    relative(repositoryRoot, path).split(sep).join("/")
  ));
  const imageKeys = [...approvedImages.keys()].map((src) => `public${src}`);
  const approvedKeys = [...markdownKeys, ...imageKeys].toSorted();
  const candidateKeys = Object.keys(candidate.files).toSorted();
  if (JSON.stringify(candidateKeys) !== JSON.stringify(approvedKeys)) {
    fail(candidatePath, "publication candidate must list every and only approved Guide source and image");
  }

  const packetId = createHash("sha256").update(JSON.stringify(candidate.files)).digest("hex");
  if (packetId !== candidate.packetId) fail(candidatePath, "publication candidate packetId does not match its file manifest");
  if (expectedPacketId && candidate.packetId !== expectedPacketId) {
    fail(candidatePath, "publication candidate packetId is not the owner-approved packet");
  }

  for (const pathname of candidateKeys) {
    const expectedHash = candidate.files[pathname];
    if (!/^[a-f0-9]{64}$/.test(expectedHash)) fail(candidatePath, `invalid publication candidate hash: ${pathname}`);
    const actualHash = await hashPublicationFile(pathname, repositoryPath(repositoryRoot, pathname, candidatePath));
    if (actualHash !== expectedHash) fail(candidatePath, `publication candidate hash does not match: ${pathname}`);
  }
  for (const [src, imageHash] of approvedImages) {
    if (candidate.files[`public${src}`] !== imageHash) {
      fail(candidatePath, `approved image manifest differs from publication candidate: ${src}`);
    }
  }
}

async function validateApprovedImage(src, publicRoot, approvedImages, sourcePath) {
  const expectedHash = approvedImages.get(src);
  if (!expectedHash) fail(sourcePath, `unapproved local image: ${src}`);
  const imageFile = publicImageFile(publicRoot, src, sourcePath);
  if (!existsSync(imageFile)) fail(sourcePath, `approved image file is missing: ${src}`);
  const imageStats = await lstat(imageFile);
  if (imageStats.isSymbolicLink() || !imageStats.isFile()) fail(sourcePath, `approved image must be a regular file: ${src}`);
  const [realPublicRoot, realImageFile] = await Promise.all([realpath(publicRoot), realpath(imageFile)]);
  const fromRealRoot = relative(realPublicRoot, realImageFile);
  if (fromRealRoot.startsWith("..") || fromRealRoot.split(sep).includes("..")) {
    fail(sourcePath, `approved image escapes the public root: ${src}`);
  }
  const actualHash = await hashGuideImage(imageFile);
  if (actualHash !== expectedHash) fail(sourcePath, `approved image hash does not match: ${src}`);
}

function sourceRoute(sourcePath, locale) {
  const normalized = sourcePath.replaceAll("\\", "/");
  const marker = `/guides/${locale}/`;
  const markerIndex = normalized.indexOf(marker);
  const relativeSource = markerIndex >= 0 ? normalized.slice(markerIndex + marker.length) : normalized;
  const segments = relativeSource.replace(/\.md$/, "").split("/").filter(Boolean);
  if (segments.length < 1 || segments.length > 2 || segments.some((segment) => !SLUG_PATTERN.test(segment))) {
    fail(sourcePath, "source path must use one or two English slug segments");
  }
  const routePath = `/guide/${segments.join("/")}`;
  return {
    categorySegment: segments.length === 2 ? segments[0] : null,
    slug: segments.at(-1),
    translationKey: segments.join("/"),
    route: locale === "en" ? `/en${routePath}` : routePath
  };
}

function validateCommonProblems(value, sourcePath) {
  if (!Array.isArray(value) || value.length === 0) fail(sourcePath, "commonProblems must not be empty");
  return value.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      fail(sourcePath, `commonProblems[${index}] must be an object`);
    }
    return {
      problem: requireString(item, "problem", sourcePath),
      resolution: requireString(item, "resolution", sourcePath)
    };
  });
}

async function validateImages(value, publicRoot, approvedImages, sourcePath) {
  if (!Array.isArray(value) || value.length === 0) fail(sourcePath, "images must not be empty");
  const images = [];
  for (const [index, item] of value.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      fail(sourcePath, `images[${index}] must be an object`);
    }
    const src = normalizeGuideImagePath(requireString(item, "src", sourcePath), sourcePath);
    const alt = requireString(item, "alt", sourcePath);
    if (!Number.isInteger(item.width) || item.width <= 0 || !Number.isInteger(item.height) || item.height <= 0) {
      fail(sourcePath, `images[${index}] must include positive integer width and height`);
    }
    await validateApprovedImage(src, publicRoot, approvedImages, sourcePath);
    images.push({ src, alt, width: item.width, height: item.height });
  }
  return images;
}

function validateFrontMatter(data, sourcePath) {
  if (!data || typeof data !== "object" || Array.isArray(data)) fail(sourcePath, "front matter is required");
  const missingFields = REQUIRED_FRONT_MATTER.filter((field) => !Object.hasOwn(data, field));
  if (missingFields.length > 0) fail(sourcePath, `front matter is missing: ${missingFields.join(", ")}`);
  const unknownFields = Object.keys(data).filter((field) => !REQUIRED_FRONT_MATTER.includes(field));
  if (unknownFields.length > 0) fail(sourcePath, `front matter has unknown fields: ${unknownFields.join(", ")}`);

  const locale = requireString(data, "locale", sourcePath);
  if (!new Set(["ja", "en"]).has(locale)) fail(sourcePath, "locale must be ja or en");
  const status = requireString(data, "status", sourcePath);
  if (!ALLOWED_STATUSES.has(status)) fail(sourcePath, `unsupported status: ${status}`);
  const applicableTool = requireString(data, "applicableTool", sourcePath);
  if (!ALLOWED_TOOLS.has(applicableTool)) fail(sourcePath, `unsupported applicableTool: ${applicableTool}`);
  const category = requireString(data, "category", sourcePath);
  if (!SLUG_PATTERN.test(category)) fail(sourcePath, "category must be an English slug");
  const translationKey = requireString(data, "translationKey", sourcePath);
  if (!TRANSLATION_KEY_PATTERN.test(translationKey)) fail(sourcePath, "translationKey must use English slug segments");
  const toolAction = data.toolAction === null ? null : requireString(data, "toolAction", sourcePath);
  if (toolAction !== null && !ALLOWED_TOOLS.has(toolAction)) fail(sourcePath, `unsupported toolAction: ${toolAction}`);

  return {
    title: requireString(data, "title", sourcePath),
    description: requireString(data, "description", sourcePath),
    updatedAt: normalizeUpdated(data.updated, sourcePath),
    category,
    applicableTool,
    status,
    locale,
    translationKey,
    outcome: requireString(data, "outcome", sourcePath),
    prerequisites: requireStringArray(data, "prerequisites", sourcePath),
    steps: requireStringArray(data, "steps", sourcePath),
    commonProblems: validateCommonProblems(data.commonProblems, sourcePath),
    relatedGuides: requireStringArray(data, "relatedGuides", sourcePath),
    toolAction
  };
}

function tokenChildren(token) {
  const children = [];
  for (const key of ["tokens", "items"]) {
    if (Array.isArray(token[key])) children.push(...token[key]);
  }
  return children;
}

function validateMarkdownTokens(tokens, sourcePath) {
  const headings = [];
  const bodyImages = [];
  let hasOrderedList = false;
  const visit = (token) => {
    if (!ALLOWED_TOKEN_TYPES.has(token.type)) {
      fail(sourcePath, token.type === "html" ? "raw HTML is not allowed" : `${token.type} Markdown is not allowed`);
    }
    if (token.type === "heading") {
      if (token.depth < 2 || token.depth > 3) fail(sourcePath, "only level 2 and 3 headings are allowed");
      if (token.depth === 2) headings.push(token.text.trim());
    }
    if (token.type === "list" && token.ordered) hasOrderedList = true;
    if (token.type === "link") validateLink(token.href, sourcePath);
    if (token.type === "image") {
      bodyImages.push({
        src: normalizeGuideImagePath(token.href, sourcePath),
        alt: isNonEmptyString(token.text) ? token.text.trim() : fail(sourcePath, "image alt text is required")
      });
    }
    tokenChildren(token).forEach(visit);
  };
  tokens.forEach(visit);
  return { headings, bodyImages, hasOrderedList };
}

function validateArticleStructure(markdown, locale, images, sourcePath) {
  const tokens = controlledMarked.lexer(markdown);
  const { headings, bodyImages, hasOrderedList } = validateMarkdownTokens(tokens, sourcePath);
  const missingSections = REQUIRED_SECTIONS[locale].filter((heading) => !headings.includes(heading));
  if (missingSections.length > 0) fail(sourcePath, `required sections are missing: ${missingSections.join(", ")}`);
  if (!hasOrderedList) fail(sourcePath, "Steps must contain an ordered list");
  const declared = new Map(images.map((image) => [image.src, image.alt]));
  if (bodyImages.length !== images.length) fail(sourcePath, "body images must match front matter images");
  for (const image of bodyImages) {
    if (declared.get(image.src) !== image.alt) fail(sourcePath, `body image is not declared exactly: ${image.src}`);
  }
  const imageRecords = new Map(images.map((image) => [image.src, image]));
  return normalizeArticleBlocks(tokens, imageRecords, sourcePath);
}

function normalizeInlineTokens(tokens, imageRecords, sourcePath) {
  return tokens.flatMap((token) => {
    if (token.type === "text" || token.type === "escape") {
      if (Array.isArray(token.tokens) && token.tokens.length > 0) {
        return normalizeInlineTokens(token.tokens, imageRecords, sourcePath);
      }
      return [{ type: "text", value: token.text }];
    }
    if (token.type === "codespan") return [{ type: "code", value: token.text }];
    if (token.type === "link") {
      return [{
        type: "link",
        href: token.href,
        children: normalizeInlineTokens(token.tokens ?? [], imageRecords, sourcePath)
      }];
    }
    if (token.type === "image") {
      const image = imageRecords.get(token.href);
      if (!image) fail(sourcePath, `body image is not declared exactly: ${token.href}`);
      return [{ type: "image", ...image }];
    }
    fail(sourcePath, `${token.type} cannot be rendered inline`);
  });
}

function normalizeArticleBlock(token, imageRecords, sourcePath) {
  if (token.type === "space") return null;
  if (token.type === "heading") {
    return {
      type: "heading",
      depth: token.depth,
      children: normalizeInlineTokens(token.tokens ?? [], imageRecords, sourcePath)
    };
  }
  if (token.type === "paragraph" || token.type === "text") {
    return {
      type: "paragraph",
      children: normalizeInlineTokens(token.tokens ?? [token], imageRecords, sourcePath)
    };
  }
  if (token.type === "code") return { type: "codeBlock", value: token.text };
  if (token.type === "list") {
    return {
      type: "list",
      ordered: token.ordered,
      items: token.items.map((item) => normalizeArticleBlocks(item.tokens ?? [], imageRecords, sourcePath))
    };
  }
  fail(sourcePath, `${token.type} cannot be rendered as an article block`);
}

function normalizeArticleBlocks(tokens, imageRecords, sourcePath) {
  return tokens
    .map((token) => normalizeArticleBlock(token, imageRecords, sourcePath))
    .filter(Boolean);
}

export async function parseGuideSource(source, options) {
  const { sourcePath, publicRoot = DEFAULT_PUBLIC_ROOT, approvedImages = new Map() } = options;
  if (!/^---(?:\r?\n)/.test(source)) {
    fail(sourcePath, "front matter opening delimiter must be exactly ---");
  }
  let parsed;
  try {
    parsed = matter(source);
  } catch (error) {
    fail(sourcePath, `front matter could not be parsed: ${error instanceof Error ? error.message : "unknown error"}`);
  }
  const frontMatter = validateFrontMatter(parsed.data, sourcePath);
  const routeFields = sourceRoute(sourcePath, frontMatter.locale);
  if (frontMatter.translationKey !== routeFields.translationKey) {
    fail(sourcePath, "translationKey must match the source path");
  }
  if (routeFields.categorySegment && frontMatter.category !== routeFields.categorySegment) {
    fail(sourcePath, "category must match the source path");
  }
  const images = await validateImages(parsed.data.images, publicRoot, approvedImages, sourcePath);
  const articleBlocks = validateArticleStructure(parsed.content, frontMatter.locale, images, sourcePath);
  return { ...frontMatter, ...routeFields, images, articleBlocks };
}

async function guideFiles(directory) {
  if (!existsSync(directory)) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return guideFiles(path);
    return entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
  }));
  return nested.flat();
}

async function readApprovedImages(manifestPath) {
  if (!existsSync(manifestPath)) return new Map();
  const parsed = JSON.parse(await readFile(manifestPath, "utf8"));
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new GuideValidationError(manifestPath, "approved image manifest must be an object");
  }
  return new Map(Object.entries(parsed));
}

function validateInventory(guides, enforceLaunchInventory) {
  const routes = new Set();
  const localeKeys = new Set();
  for (const guide of guides) {
    if (routes.has(guide.route)) fail(guide.route, "duplicate route");
    routes.add(guide.route);
    const localeKey = `${guide.locale}:${guide.translationKey}`;
    if (localeKeys.has(localeKey)) fail(guide.route, "duplicate locale translation key");
    localeKeys.add(localeKey);
  }
  for (const guide of guides) {
    for (const related of guide.relatedGuides) {
      if (!localeKeys.has(`${guide.locale}:${related}`)) {
        fail(guide.route, `related guide does not exist in ${guide.locale}: ${related}`);
      }
    }
  }
  if (enforceLaunchInventory) {
    const expectedRoutes = guideRouteAvailability.flatMap((route) => route.locales.map((locale) => (
      locale === "en" ? `/en${route.pathname}` : route.pathname
    ))).toSorted();
    const actualRoutes = guides.map((guide) => guide.route).toSorted();
    if (JSON.stringify(actualRoutes) !== JSON.stringify(expectedRoutes)) {
      fail(DEFAULT_CONTENT_ROOT, "launch inventory must contain the exact thirteen approved route slots");
    }
  }
}

export async function loadGuideInventory(options = {}) {
  const contentRoot = options.contentRoot ?? DEFAULT_CONTENT_ROOT;
  const publicRoot = options.publicRoot ?? DEFAULT_PUBLIC_ROOT;
  const approvedImages = options.approvedImages ?? await readApprovedImages(options.manifestPath ?? APPROVED_IMAGE_MANIFEST);
  const enforcePublicationCandidate = options.enforcePublicationCandidate ?? contentRoot === DEFAULT_CONTENT_ROOT;
  if (enforcePublicationCandidate) {
    await validatePublicationCandidate({
      contentRoot,
      publicRoot,
      approvedImages,
      candidatePath: options.publicationCandidatePath ?? PUBLICATION_CANDIDATE,
      expectedPacketId: options.expectedPacketId ?? APPROVED_GUIDE_PACKET_ID
    });
  }
  const files = (await guideFiles(contentRoot)).toSorted();
  const guides = await Promise.all(files.map(async (sourcePath) => parseGuideSource(await readFile(sourcePath, "utf8"), {
    sourcePath,
    publicRoot,
    approvedImages
  })));
  validateInventory(guides, options.enforceLaunchInventory ?? contentRoot === DEFAULT_CONTENT_ROOT);
  return guides.toSorted((left, right) => left.route.localeCompare(right.route, "en"));
}

export function getGuideInventory() {
  cachedInventoryPromise ??= loadGuideInventory();
  return cachedInventoryPromise;
}

export function getGuideByRoute(guides, locale, segments) {
  const pathname = `/guide/${segments.join("/")}`;
  const route = locale === "en" ? `/en${pathname}` : pathname;
  return guides.find((guide) => guide.route === route);
}

export function getGuideStaticParams(guides, locale, segmentCount) {
  return guides
    .filter((guide) => guide.locale === locale && (guide.categorySegment ? 2 : 1) === segmentCount)
    .map((guide) => guide.categorySegment
      ? { category: guide.categorySegment, slug: guide.slug }
      : { slug: guide.slug });
}

export function getGuideCatchAllParams(guides, locale) {
  return guides
    .filter((guide) => guide.locale === locale)
    .map((guide) => ({
      segments: guide.categorySegment ? [guide.categorySegment, guide.slug] : [guide.slug]
    }));
}

export function getGuideAlternates(guide, guides) {
  const locales = new Set(
    guides.filter((candidate) => candidate.translationKey === guide.translationKey).map((candidate) => candidate.locale)
  );
  return locales.has("ja") && locales.has("en") ? ["ja", "en"] : [guide.locale];
}

export function getGuideLanguageTarget(guide, targetLocale, guides) {
  const translation = guides.find(
    (candidate) => candidate.locale === targetLocale && candidate.translationKey === guide.translationKey
  );
  if (translation) return translation.route;
  return targetLocale === "en" ? "/en/guide?translation=unavailable" : "/guide?translation=unavailable";
}
