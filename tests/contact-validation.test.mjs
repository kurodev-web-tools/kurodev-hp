import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const validationUrl = pathToFileURL(`${repositoryRoot}/lib/contact-validation.mjs`).href;
const requestUrl = pathToFileURL(`${repositoryRoot}/lib/contact-request.mjs`).href;

const validContact = {
  name: "Studio Kuro",
  email: "hello@example.com",
  category: "creator-site",
  referenceUrl: "https://example.com/profile",
  message: "This fixture contains enough detail for a production inquiry."
};

test("contact validation accepts the complete locale-independent payload", async () => {
  // Given: a complete inquiry using a stable category ID.
  const { validateContactInput } = await import(validationUrl);

  // When: the client and server validate the same payload.
  const errors = validateContactInput(validContact, "en");

  // Then: no localized field errors are returned.
  assert.deepEqual(errors, {});
});

test("required contact fields return localized errors in DOM order", async () => {
  // Given: an otherwise empty Japanese inquiry.
  const { firstInvalidContactField, validateContactInput } = await import(validationUrl);

  // When: all required fields are validated together.
  const errors = validateContactInput({ ...validContact, name: "", email: "", message: "" }, "ja");

  // Then: errors follow the stable form order and focus starts at name.
  assert.deepEqual(Object.keys(errors), ["name", "email", "message"]);
  assert.equal(firstInvalidContactField(errors), "name");
  assert.match(errors.name, /名前/);
  assert.match(errors.email, /メール/);
  assert.match(errors.message, /相談内容/);
});

test("email and optional URL types are validated in both locales", async () => {
  // Given: malformed typed values in an English inquiry.
  const { validateContactInput } = await import(validationUrl);

  // When: email and reference URL types are checked.
  const errors = validateContactInput({ ...validContact, email: "invalid", referenceUrl: "javascript:alert(1)" }, "en");

  // Then: both corrections are explained in English.
  assert.deepEqual(Object.keys(errors), ["email", "referenceUrl"]);
  assert.match(errors.email, /email/i);
  assert.match(errors.referenceUrl, /https/i);
});

test("message guidance and validation share the minimum length", async () => {
  // Given: a message below the published minimum.
  const { CONTACT_MIN_MESSAGE_LENGTH, validateContactInput } = await import(validationUrl);

  // When: the message is one character short after trimming.
  const errors = validateContactInput({ ...validContact, message: "x".repeat(CONTACT_MIN_MESSAGE_LENGTH - 1) }, "en");

  // Then: the localized message names the same minimum.
  assert.equal(CONTACT_MIN_MESSAGE_LENGTH, 20);
  assert.match(errors.message, /20/);
});

test("message minimum counts Unicode code points instead of UTF-16 units", async () => {
  const { validateContactInput } = await import(validationUrl);
  const errors = validateContactInput({ ...validContact, message: "😀".repeat(10) }, "en");

  assert.match(errors.message, /20/);
});

test("contact categories keep stable IDs and localized labels", async () => {
  // Given: the shared bilingual category registry.
  const { CONTACT_CATEGORIES } = await import(validationUrl);

  // When: category IDs and labels are projected for submission and display.
  const ids = CONTACT_CATEGORIES.map(({ id }) => id);

  // Then: submission IDs stay locale-independent while labels are localized.
  assert.deepEqual(ids, ["creator-site", "site-improvement", "tool-service", "other"]);
  for (const category of CONTACT_CATEGORIES) {
    assert.notEqual(category.label.ja, category.label.en);
  }
});

test("unknown categories fail closed before provider delivery", async () => {
  // Given: a category label instead of an approved stable ID.
  const { validateContactInput } = await import(validationUrl);

  // When: the payload crosses the shared validation boundary.
  const errors = validateContactInput({ ...validContact, category: "新規制作" }, "ja");

  // Then: the category is rejected without accepting locale-specific values.
  assert.deepEqual(Object.keys(errors), ["category"]);
});

test("payload size accepts the exact boundary and rejects the next byte", async () => {
  // Given: ASCII JSON bodies at and immediately above the request limit.
  const { CONTACT_MAX_BODY_BYTES, contactPayloadByteLength, isContactPayloadTooLarge } = await import(validationUrl);
  const emptyBytes = contactPayloadByteLength({ message: "" });
  const atBoundary = { message: "x".repeat(CONTACT_MAX_BODY_BYTES - emptyBytes) };
  const overBoundary = { message: `${atBoundary.message}x` };

  // When: the shared byte-length boundary is evaluated.
  const sizes = [contactPayloadByteLength(atBoundary), contactPayloadByteLength(overBoundary)];

  // Then: exactly 16 KiB is accepted and the following byte is rejected.
  assert.deepEqual(sizes, [CONTACT_MAX_BODY_BYTES, CONTACT_MAX_BODY_BYTES + 1]);
  assert.equal(isContactPayloadTooLarge(atBoundary), false);
  assert.equal(isContactPayloadTooLarge(overBoundary), true);
});

test("raw contact requests reject oversized bodies before JSON parsing", async () => {
  const { readBoundedContactJson } = await import(requestUrl);
  const { CONTACT_MAX_BODY_BYTES } = await import(validationUrl);
  const atBoundary = `${" ".repeat(CONTACT_MAX_BODY_BYTES - 2)}{}`;
  const acceptedRequest = new Request("https://example.test/api/contact", {
    method: "POST",
    body: atBoundary
  });
  const rejectedRequest = new Request("https://example.test/api/contact", {
    method: "POST",
    body: ` ${atBoundary}`
  });

  assert.deepEqual(await readBoundedContactJson(acceptedRequest), {});
  await assert.rejects(
    readBoundedContactJson(rejectedRequest),
    (error) => error?.code === "PAYLOAD_TOO_LARGE" && error?.phase === "stream"
  );
});

test("bounded contact request parsing distinguishes malformed JSON", async () => {
  const { readBoundedContactJson } = await import(requestUrl);
  const request = new Request("https://example.test/api/contact", { method: "POST", body: "{" });

  await assert.rejects(readBoundedContactJson(request), (error) => error?.code === "INVALID_JSON");
});

test("contact form and API retain the bounded submission contract", async () => {
  // Given: the client form and existing server delivery route.
  const [formSource, routeSource] = await Promise.all([
    readFile(`${repositoryRoot}/components/contact-form.js`, "utf8"),
    readFile(`${repositoryRoot}/app/api/contact/route.js`, "utf8")
  ]);

  // When: the Task 11 form and route contracts are inspected.
  // Then: submission remains single-attempt, bounded, anonymous, and provider-backed.
  assert.match(formSource, /fetch\("\/api\/contact"/);
  assert.doesNotMatch(formSource, /retry|setInterval/);
  assert.match(routeSource, /TURNSTILE_VERIFY_URL/);
  assert.match(routeSource, /RESEND_EMAIL_URL/);
  assert.match(routeSource, /fetchWithTimeout/);
  assert.match(routeSource, /readBoundedContactJson/);
  assert.doesNotMatch(routeSource, /console\.(?:error|log)\([^\n]*(?:message|email|token|body)/i);
});

test("bilingual About and Contact routes share localized page views and metadata", async () => {
  // Given: the four Task 11 route wrappers.
  const routes = await Promise.all([
    readFile(`${repositoryRoot}/app/about/page.js`, "utf8"),
    readFile(`${repositoryRoot}/app/en/about/page.js`, "utf8"),
    readFile(`${repositoryRoot}/app/contact/page.js`, "utf8"),
    readFile(`${repositoryRoot}/app/en/contact/page.js`, "utf8")
  ]);

  // When: their shared views and metadata are inspected.
  // Then: both locale pairs use reciprocal metadata and explicit locale props.
  assert.match(routes[0], /AboutPage locale="ja"/);
  assert.match(routes[1], /AboutPage locale="en"/);
  assert.match(routes[2], /ContactPage locale="ja"/);
  assert.match(routes[3], /ContactPage locale="en"/);
  for (const route of routes) assert.match(route, /equivalentLocales: \["ja", "en"\]/);
});

test("bilingual About and Contact pages are not shadowed by legacy redirects", async () => {
  const nextConfig = await readFile(`${repositoryRoot}/next.config.mjs`, "utf8");

  for (const route of ["/about", "/en/about", "/en/contact"]) {
    assert.doesNotMatch(
      nextConfig,
      new RegExp(`source:\\s*["']${route.replaceAll("/", "\\/")}["']`),
      `${route} must render its Task 11 page instead of a legacy destination`
    );
  }
});

test("Contact keeps semantic and visual order with accessible form states", async () => {
  // Given: the shared Contact page and form components.
  const [pageSource, formSource] = await Promise.all([
    readFile(`${repositoryRoot}/components/pages/contact-page.js`, "utf8"),
    readFile(`${repositoryRoot}/components/contact-form.js`, "utf8")
  ]);

  // When: the page order and field state contracts are inspected.
  const sections = ["introduction", "reassurance", "form", "pricing", "faq"];
  const positions = sections.map((section) => pageSource.indexOf(`data-contact-section="${section}"`));

  // Then: DOM order stays aligned and validation remains available to assistive technology.
  assert.equal(positions.every((position) => position >= 0), true);
  assert.deepEqual(positions, positions.toSorted((left, right) => left - right));
  assert.match(pageSource, /mailto:feedback@kuro-lab\.com\?subject=Kuro%20Stream%20Kit%20feedback/);
  assert.match(formSource, /aria-invalid/);
  assert.match(formSource, /aria-describedby/);
  assert.match(formSource, /firstInvalidContactField/);
  assert.match(formSource, /turnstile-error/);
  assert.match(formSource, /window\.turnstile\.execute/);
  assert.match(formSource, /role=\{status === "error" \? "alert" : "status"\}/);
  assert.match(formSource, /disabled=\{isSubmitting\}/);
  assert.match(formSource, /buildDirectEmailHref\(locale\)/);
});

test("Japanese Contact hero preserves its reviewed title lines at the 1024px grid breakpoint", async () => {
  const stylesheet = await readFile(`${repositoryRoot}/app/styles/contact-page.css`, "utf8");

  assert.match(
    stylesheet,
    /\.contact-page--ja \.contact-hero h1 span\s*\{[^}]*display:\s*block;/s
  );
  assert.match(
    stylesheet,
    /@media \(min-width:\s*1024px\) and \(max-width:\s*1150px\)\s*\{[\s\S]*?\.contact-page--ja \.contact-hero h1\s*\{[^}]*font-size:\s*48px;/s
  );
});

test("Contact links the approved localized Privacy route", async () => {
  // Given: the Task 12 Privacy route pair is approved and implemented.
  const formSource = await readFile(`${repositoryRoot}/components/contact-form.js`, "utf8");

  // When/Then: the submit-adjacent notice resolves through the current locale.
  assert.match(formSource, /href=\{localePath\(locale, "\/privacy"\)\}/);
  assert.doesNotMatch(formSource, /contact-form__privacy-unavailable/);
});

test("About and Contact are included in the localized sitemap inventory", async () => {
  // Given: the static sitemap route inventory.
  const sitemapSource = await readFile(`${repositoryRoot}/app/sitemap.js`, "utf8");

  // When: Task 11 route entries are inspected.
  // Then: both About and Contact locale pairs are crawlable.
  for (const route of ["/about", "/contact", "/en/about", "/en/contact"]) {
    assert.match(sitemapSource, new RegExp(`"${route}"`));
  }
});

test("Creator Website copy no longer describes Contact as Japanese-only", async () => {
  // Given: Task 11 now provides complete Japanese and English Contact routes.
  const creatorSiteSource = await readFile(`${repositoryRoot}/lib/content/creator-site-content.mjs`, "utf8");

  // When: the English service note is inspected.
  // Then: it does not retain the pre-Task-11 language limitation.
  assert.doesNotMatch(creatorSiteSource, /current form is in Japanese/i);
});
