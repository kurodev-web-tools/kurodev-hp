# Creator Platform Task 12 Legal Routes and Consent Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the five original Task 12 legal-route candidates only after Task 14 Step 0 has fixed their dates, versions, and fingerprints and recorded exact owner and human-legal approval, then activate bilingual, fail-closed Contact consent only after every remaining gate passes.

**Architecture:** Repository-owned Markdown remains the legal source of truth. A fail-closed loader renders only manifest-approved documents. A public-safe consent registry owns locale, document IDs, scopes, provider groups, and direct-email templates; the API validates those values independently and appends a server-generated evidence block to the owner email. No consent database, analytics, nationality field, or provider mutation is added.

**Tech Stack:** Next.js 14 App Router, React 18, ES modules, Node test runner, `gray-matter`, `marked`, Creator Studio CSS, Cloudflare Turnstile, Resend.

**Design:** `docs/superpowers/specs/2026-07-17-creator-platform-foreign-processing-consent-design.md`

**Approval boundary:** This plan is not implementation authorization. Do not edit application/legal sources, dates, routes, footer, Contact, or provider settings until Task 1 passes. Do not run `npm ci` or `npm install`. Do not stage, commit, push, open a PR, merge, deploy, or call live providers without separate explicit approval.

**2026-07-30 R2 legal-gate exception and implementation authorization:** Approval record `creator-platform-task14-step0-r2-owner-designated-public-use-approval-20260730-v1` applies only to the corrected R2 seven-document set and its recorded canonical SHA-256 values. It explicitly records `humanLegalReviewCompleted: false` and `attorneyReviewCompleted: false`; the repository owner accepts the residual risk and adopts the owner-designated AI-assisted review as this project's internal substitute for the human-legal gate. Never represent the set as human- or attorney-reviewed. The exact recorded bytes may be promoted to `ready / approved / satisfied`, and local route, footer, Contact destination, Task 13, and Task 14 implementation and verification may proceed. Commit, push, PR, merge, deploy, production activation, live provider calls, provider-setting changes, dependency installation, and content outside the recorded hashes remain unauthorized.

---

## File map

- Legal sources: existing five files under `content/legal/{ja,en}/`; conditional `content/legal/ja/foreign-processing.md` and `content/legal/en/foreign-processing.md`
- Legal loader/view: create `lib/legal/legal-loader.mjs`, `components/pages/legal-page.js`, `app/styles/legal-page.css`
- Routes: create `app/terms/page.js`, `app/en/terms/page.js`, `app/privacy/page.js`, `app/en/privacy/page.js`, and `app/legal/tokushoho/page.js`; only after separate scope approval create `app/privacy/foreign-processing/page.js` and `app/en/privacy/foreign-processing/page.js`
- Contact: create `lib/contact-consent.mjs`; modify `lib/contact-validation.mjs`, `components/contact-form.js`, `lib/content/about-contact-content.mjs`, `app/api/contact/route.js`, `app/styles/contact-page.css`
- Navigation: modify `components/layout/site-footer.js`; modify `components/layout/language-switch.js` only if its existing mapping is insufficient
- Tests: create `tests/legal-routes.test.mjs`, `tests/contact-consent.test.mjs`; modify `tests/contact-validation.test.mjs` and, if needed, `tests/shell-contract.test.mjs`
- Evidence: update `docs/active/KURODEV_REDESIGN_LAUNCH_CONTENT.md`, `docs/active/KURODEV_TASK12_LEGAL_REVIEW_PACKET.md`, and during Task 14 `docs/KURODEV_CREATOR_PLATFORM_QA.md`

---

## Chunk 1: Approval freeze and legal routes

### Task 1: Pass every implementation gate

**Files:** Read `docs/superpowers/specs/2026-07-17-creator-platform-foreign-processing-consent-design.md`, `docs/superpowers/plans/2026-07-11-kurodev-creator-platform-redesign.md`, `docs/active/KURODEV_REDESIGN_LAUNCH_CONTENT.md`, `docs/active/KURODEV_TASK12_LEGAL_REVIEW_PACKET.md`, and the exact candidate sources.

Task 14 Step 0 is a prerequisite outside this implementation plan. Task 1 performs read-only verification only; it must not insert dates, change approval states, rewrite legal/provider text, or generate approval evidence. If Task 14 Step 0 is incomplete, keep every candidate blocked and stop.

- [ ] **Step 1: Verify isolated base and worktree state**

```bash
git fetch origin --prune
git rev-parse HEAD
git merge-base --is-ancestor d175636bb5bf6c07da626b454f05c8a6b64434ff HEAD
git status --short --branch
```

Expected: approved preview base contained; isolated worktree; no unknown changes.

- [ ] **Step 2: Require all five original entries to be ready**

For Japanese/English Terms, Japanese/English Privacy, and Japanese commercial disclosure, require exact source path, owner, `ready` state, non-null effective/update dates, SHA-256, repository-owner approval, and human legal approval, all matching the completed Task 14 Step 0 record. Merely finding non-null values is insufficient. Any `blocked`, `unapproved`, `null`, missing Task 14 record, or mismatch stops the plan before tests.

- [ ] **Step 3: Verify the approved independent notice-route decision**

The owner selected independent candidate routes on `2026-07-17`. Require exact two approved sources, routes, notice IDs/versions, and locale URLs for `/privacy/foreign-processing` and `/en/privacy/foreign-processing`. This design approval does not authorize implementation or publication. Only after separate route-implementation authorization and Task 14 publication-candidate inclusion authorization may Task 14 Step 0 add the two conditional notice rows. Task 14 then pins their dates, IDs, versions, URLs and hashes and obtains the exact repository-owner and human legal public-use approvals; the earlier inclusion authorization is not publication approval. Until every resulting row is `ready`, the missing approval or Task 14 record stops Task 1. Anchor mode is not an approved fallback.

- [ ] **Step 4: Require exact provider notice and consent approval**

Require approved entities, stages, data, purposes, countries or inability reasons, country-system summaries, safeguards, subprocessors, review dates, Contact wording, direct-email wording/metadata allowlist, the GitHub personal-data exclusion boundary, Google Drive/Stripe wording, retention, and export procedure. No placeholders or inferred facts.

- [ ] **Step 5: Verify the approved consent-gated Turnstile mode**

The packet must contain `consent-gated-explicit`: no Turnstile script/challenge before foreign-transfer consent, script load after consent, explicit execution on submit, pre-clearance disabled, and server registry validation before Siteverify. Any other, unknown or absent mode blocks Contact activation.

- [ ] **Step 6: Report and stop if any gate fails**

Do not simulate progress with placeholder tests, routes, links, dates, consent controls, or provider records.

### Task 2: Write legal-route tests and observe RED

**Files:** Create `tests/legal-routes.test.mjs`.

- [ ] Assert the five route files exist; Terms/Privacy have reciprocal `ja`, `en`, and `x-default`; `/legal/tokushoho` is self-canonical with no English alternate.
- [ ] Assert exactly two reciprocal routes at `/privacy/foreign-processing` and `/en/privacy/foreign-processing` with fixed route-backed IDs/versions/URLs; reject anchor mode and mixed mode.
- [ ] Add loader rejection cases for blocked/unapproved metadata, null dates, wrong locale/type/ID, unknown path, raw HTML, unsafe links, fingerprint mismatch, and any English commercial-disclosure source. Unsafe-link cases include executable schemes, protocol-relative URLs, malformed/control-character destinations, and unapproved schemes.
- [ ] Assert the English footer label is exactly `Commercial disclosure (Japanese)` and Contact cannot activate from blocked sources.
- [ ] Name cases with `loader`, `routes/render`, and `footer` groups, then run `node --test tests/legal-routes.test.mjs`.

Expected: RED because loader/routes do not exist.

### Task 3: Implement the fail-closed legal loader

**Files:** Create `lib/legal/legal-loader.mjs`; test `tests/legal-routes.test.mjs`.

- [ ] Define an immutable registry containing the Task 14 Step 0-approved document IDs, versions, source paths, and expected canonical SHA-256 values. The commercial disclosure has `equivalent: null`; the approved notice entries are independent reciprocal routes. Missing or malformed expected hashes fail closed.
- [ ] Canonicalize source as UTF-8 with LF line endings and one trailing newline, compute SHA-256, and require equality with the registry before parsing. Parse front matter with `gray-matter`; require exact ID, version, locale, type, `status: ready`, approved state, dates, and review evidence. Never derive dates dynamically or trust a hash declared by the source being checked.
- [ ] Use `Marked.lexer()` and allow only headings, paragraphs, text/emphasis, lists, links, codespan, tables, and whitespace. Reject raw HTML, images, code blocks, embedded media, and unknown tokens before rendering.
- [ ] Validate every link token before rendering. Permit only the exact approved destination forms: same-document fragments, root-relative site paths, and `https:` URLs; add another scheme only when the Task 14-approved source and review packet explicitly require it. Reject executable schemes, protocol-relative URLs, malformed URLs, control characters, credentials in URLs, and every unapproved form.
- [ ] Return only `{ documentId, locale, documentType, title, effectiveDate, updateDate, html, equivalent }`; do not expose paths, hashes, or private evidence.
- [ ] Run `node --test --test-name-pattern="loader" tests/legal-routes.test.mjs`. Expect loader cases PASS while `routes/render` and `footer` remain RED.

### Task 4: Render the approved legal surface

**Files:** Create `components/pages/legal-page.js`, `app/styles/legal-page.css`, `app/terms/page.js`, `app/en/terms/page.js`, `app/privacy/page.js`, `app/en/privacy/page.js`, `app/legal/tokushoho/page.js`; modify `app/layout.js`; only in approved route mode create `app/privacy/foreign-processing/page.js` and `app/en/privacy/foreign-processing/page.js`.

- [ ] Render one `h1`, localized effective/update labels, restricted Markdown, and a language switch only when an approved equivalent exists.
- [ ] Keep content near `68ch`; wrap links/tables without page overflow; preserve semantic headings/lists, keyboard focus, forced colors, and reduced motion.
- [ ] Use `buildPageMetadata`. Terms/Privacy use `equivalentLocales: ["ja", "en"]`; commercial disclosure uses `["ja"]` only.
- [ ] Implement only the approved independent notice route pair after separate route-implementation authorization.
- [ ] Run `node --test --test-name-pattern="loader|routes/render" tests/legal-routes.test.mjs`. Expect loader and route/render cases PASS while footer cases remain RED.

### Task 5: Enable verified footer destinations

**Files:** Modify `components/layout/site-footer.js`; optionally `components/layout/language-switch.js`; test legal/shell contracts.

- [ ] Replace placeholder spans only for existing approved routes. English links to Japanese `/legal/tokushoho` with the exact label; the route receives no English hreflang.
- [ ] Add a notice footer destination only after the independent notice routes are separately approved and ready. Until then, do not add a notice link or activate the redesigned Contact flow; anchor or Privacy-section fallback is not approved.
- [ ] Run `node --test tests/legal-routes.test.mjs tests/shell-contract.test.mjs` and expect the complete legal/shell set PASS.

---

## Chunk 2: Contact consent and evidence

### Task 6: Write consent tests and observe RED

**Files:** Create `tests/contact-consent.test.mjs`; modify `tests/contact-validation.test.mjs`.

- [ ] Group cases as `registry/validation/mailto`, `UI`, and `API/Turnstile/Resend`. Assert each locale registry entry contains `contact-privacy-acknowledgement-v1`, `contact-foreign-transfer-v1`, locale, Privacy ID/version, approved route-backed notice ID/version/URL, and exactly `cloudflare-contact,resend-contact,google-gmail-contact,google-gmail-followup,cloudflare-email-routing-followup`. GitHub, Drive, Stripe and preview processing must be absent.
- [ ] Reject unchecked Privacy acknowledgement, unchecked foreign-transfer consent, truthy string values, unknown locale, stale IDs/versions, wrong locale pair, and unknown scope before Turnstile or Resend.
- [ ] With a fixed clock, assert the server evidence record includes both fixed IDs, covered providers and purposes, exact document IDs/versions, both copy hashes, and immutable canonical document hashes; exclude IP, User-Agent, token, raw responses, and extra personal fields.
- [ ] Assert direct-email `mailto:` includes locale-specific URL, both IDs/versions, locale, and `direct-email-inquiry-v1`; no bare consent-free fallback.
- [ ] Mock provider fetches and assert invalid consent calls neither provider; valid consent calls Turnstile before Resend.
- [ ] Run `node --test tests/contact-consent.test.mjs tests/contact-validation.test.mjs`; expect RED.

### Task 7: Implement the consent registry and boundary validation

**Files:** Create `lib/contact-consent.mjs`; modify `lib/contact-validation.mjs`.

- [ ] Store only approved public IDs, locale, scopes, provider group, notice path, and exact approved UI/fallback copy. Exclude account IDs, dashboard evidence, and private values.
- [ ] Normalize tight-length fields and accept only boolean `true` plus exact registry values; never accept `"true"`.
- [ ] Preserve the 16KB request limit and raw-body rejection before JSON parsing.
- [ ] Add pure helpers for a UTC evidence block and percent-encoded direct-email URL. Generate the provider list and IDs from the server registry, never the client.
- [ ] Run `node --test --test-name-pattern="registry/validation/mailto" tests/contact-consent.test.mjs tests/contact-validation.test.mjs`. Expect those cases PASS while UI and API groups remain RED.

Evidence output must follow this shape:

```text
Consent record
Privacy acknowledgement: accepted
Foreign-transfer consent: accepted
Recorded at: <server UTC ISO 8601>
Source: contact-form
Locale: <ja|en>
Privacy acknowledgement ID: contact-privacy-acknowledgement-v1
Scope: contact-foreign-transfer-v1
Privacy policy: <approved ID / version>
Foreign processing notice: <approved ID / version>
Covered processing: cloudflare-contact,resend-contact,google-gmail-contact,google-gmail-followup,cloudflare-email-routing-followup
Privacy acknowledgement copy SHA-256: <approved hash>
Foreign-transfer consent copy SHA-256: <approved hash>
Privacy snapshot SHA-256: <approved hash>
Foreign processing snapshot SHA-256: <approved hash>
```

### Task 8: Add the accessible bilingual consent UI

**Files:** Modify `components/contact-form.js`, `lib/content/about-contact-content.mjs`, `app/styles/contact-page.css`.

- [ ] Add two unchecked native checkboxes with visible full labels, Privacy link, notice route link, versions, descriptions, localized individual errors, and focus refs.
- [ ] Missing acknowledgement/consent focuses the first invalid checkbox in DOM order and prevents Turnstile/API work; keep explicit errors rather than relying only on disabled submit.
- [ ] Implement `consent-gated-explicit`: no script/challenge before foreign-transfer consent, load after selection, explicit execution on submit, reset on withdrawal, and no API call before a valid token.
- [ ] Submit locale, both boolean values, Privacy ID/version, notice ID/version, scope, and token. Do not submit timestamp, hashes, or provider list.
- [ ] Replace the unavailable Privacy state only when every required source is ready.
- [ ] On send failure, show the same-locale notice and registry-generated prefilled `mailto:`, never a bare fallback.
- [ ] Preserve 44px target, visible focus, forced-colors border, readable 375px wrapping, and current 1280px layout.
- [ ] Run `node --test --test-name-pattern="registry/validation/mailto|UI" tests/contact-consent.test.mjs tests/contact-validation.test.mjs`. Expect those groups PASS while API cases remain RED.

### Task 9: Enforce consent and append server evidence

**Files:** Modify `app/api/contact/route.js`; add a narrow injectable helper only if testing requires it.

- [ ] After bounded parsing/size checks, validate ordinary input and current consent before Turnstile. Invalid consent returns generic `INVALID_CONSENT` and calls no provider.
- [ ] Generate `recordedAt = new Date()` server-side after validation and before Turnstile; never accept client time.
- [ ] Preserve Edge runtime, 5s/10s timeouts, 16KB limit, remote IP use only for `siteverify`, HTML escaping, and sanitized logs.
- [ ] Append evidence to plain text and escaped HTML; keep it separate from inquiry content and out of Resend tags.
- [ ] If Resend fails, return `SEND_FAILED`; add no database, persistence retry, body log, or consent log.
- [ ] Run `node --test --test-name-pattern="API/Turnstile/Resend" tests/contact-consent.test.mjs`, then run both focused files without a pattern. Expect the complete consent/validation set PASS.

---

## Chunk 3: Operations and verification

### Task 10: Record stage-specific owner operations

**Files:** Modify the review packet and launch manifest.

- [ ] Record exact Contact evidence semantics and exclusions.
- [ ] Record the approved direct-email allowlist. Missing, stale, locale-mismatched, or ambiguous wording does not permit substantive use and cannot be cured retroactively; allow only statutory-request intake, security response, or resubmission guidance, then direct the sender to the current Contact form and delete the message to the legally and technically available extent.
- [ ] Transcribe only the exact Google Drive and Stripe templates/allowlist approved in Task 1 Step 4 and Task 14 Step 0. Each names one service, purpose, data, ID/version/URL, and exact reply. Record the separately approved GitHub boundary that permits only non-identifying source code and prohibits User personal data. If any text is missing or changes, do not draft it here; return to Task 1 and stop.
- [ ] Record the GitHub physical-separation checklist: internal project codes and dummy data only; no client data in names, branches, commits, Issues, PRs, Discussions, content, assets or history; real-data copy has no remote; project-start and pre-delivery pass/fail checks.
- [ ] Record `cloudflare-production-preview-v1`: Pages Direct Upload plus Access, engagement-specific Gmail reply before upload, 14-day normal review window, 24-hour Access session, Access disabled within one Business Day, temporary project deleted within three Business Days, and screenshot/recording/screen-share fallback.
- [ ] Retain the Gmail thread for the related record period and export important threads to encrypted local storage. Do not claim export success without private evidence.
- [ ] Re-fingerprint every changed legal source; any content/provider-fact edit invalidates prior approval.

### Task 11: Run automated verification

- [ ] Run focused tests:

```bash
node --test tests/legal-routes.test.mjs tests/contact-consent.test.mjs tests/contact-validation.test.mjs tests/shell-contract.test.mjs
```

- [ ] Run full checks:

```bash
npm test
npm run lint
npm run diagnose:react
npm run build
git diff --check
git status --short
```

Expected: all checks pass, no secrets/PII/private provider evidence, no unexpected files, and no English commercial-disclosure route. Diagnose failures; never weaken tests.

### Task 12: Perform real-browser and server-side QA

**Files:** Update `docs/KURODEV_CREATOR_PLATFORM_QA.md` only during Task 14.

Unless separate live-provider QA approval is granted immediately before the call, all browser/API QA uses deterministic local mocks and must not load live Turnstile script/challenges, call `siteverify`, send through Resend, or use provider dashboards. Provider dashboard, DNS, and account mutation are always out of scope.

- [ ] At 375px and 1280px, verify all five legal routes, dates, typography, tables, links, locale metadata/switches, Japanese-only exception, footer, focus, forced colors, and no overflow.
- [ ] Verify the approved notice route pair and no anchor-mode, placeholder or unreviewed provider claim.
- [ ] In both Contact locales, verify both unchecked states, DOM-order error focus, links, versions, ordinary validation, live regions, fallback IDs/locale/scope, and no overflow using fictional fixtures only.
- [ ] With deterministic mocks, browser network evidence covers only the modeled Turnstile script/challenge behavior. Neither starts before foreign-transfer consent; script loads after consent and challenge executes on submit.
- [ ] A mocked server integration test proves `siteverify` is never called for invalid consent and only after valid current consent. Do not claim browser DevTools observed a server-to-server call.
- [ ] If private live-provider evidence is still required, stop and obtain explicit live-provider QA approval immediately before any Turnstile/Resend request; keep fictional fixtures and perform no provider mutation.
- [ ] Record only route, viewport, pass/fail, and sanitized behavior; exclude inquiry contents, emails, tokens, cookies, IPs, raw responses, account IDs, and dashboard values.

### Task 13: Stop at the Git and release approval gate

- [ ] Re-run focused/full checks and required browser checks after the last change; do not reuse stale evidence.
- [ ] Report routes, IDs/versions, approvals, checks, viewports, Turnstile mode/evidence boundary, and residual provider risks.
- [ ] Wait. Do not stage, commit, push, create a PR, merge, deploy, or activate production without separate explicit authorization.
