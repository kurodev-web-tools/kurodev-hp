# Creator Platform pre-merge QA

## Checkpoint

- QA date: `2026-07-31` JST
- Scheduled coordinated production activation date: `2026-08-04`
- Surface: local integration production build at `http://localhost:3100`
- Runtime: Next.js `15.5.21`, React / React DOM `18.3.1`
- Overall verdict: **FAIL — release blocked only by the separate `DEP-AUDIT-001`; Task 14 browser and Lighthouse gates pass locally**
- Live-provider boundary: no live Turnstile, Siteverify, Resend, Contact delivery, secrets, provider settings, or real-person PII were used.

The seven legal documents and six Contact consent copies use the exact fixed IDs, versions, dates, and SHA-256 values recorded by the active launch manifests and tests. Their public-use gate relies on the repository owner's owner-designated AI-assisted internal substitute and accepted residual risk. No human lawyer or independent human legal reviewer participated, and this evidence must not be described as human or attorney review.

## Task 14 Steps 1–9

| Step | Result | Evidence |
| --- | --- | --- |
| 1. Automated suite | PASS | `npm test` passes 105 / 105, and `npm run lint`, `npm run diagnose:react`, and `npm run build` exit 0. The final production build generated 41 pages. React Doctor retains 13 documented warnings. The separately requested dependency-security audit remains red as `DEP-AUDIT-001`. |
| 2. Production server | PASS | Next.js 15.5.21 production server reached Ready on local port 3100. |
| 3. Four-width route QA | PASS | The earlier 36-route inventory remains recorded. A fresh final-build sweep of the five Task 14 Lighthouse routes added 20 current captures at 375 / 768 / 1024 / 1280 px: all HTTP 200, with the correct static marker, no horizontal overflow, broken loaded image, App Router chunk, Flight payload, or incomplete initial-theme state. |
| 4. Interactions and states | PASS | On the current build, all five routes passed visible keyboard focus, mobile-menu forward/backward focus trap, Escape close/focus return, theme and locale persistence, reduced motion, and forced colors. Contact passed six-error validation order, focus-on-first-error, polite/assertive live regions, direct-email fallback, consent-gated fictional Turnstile sequencing, and intercepted API delivery. |
| 5. Lighthouse | PASS | Three real-Chrome runs per route and preset produced 100/100/100/100 medians for all five routes on mobile and desktop. |
| 6. Publication/privacy review | PASS for local pre-merge scope | Tracked secret-pattern scan found no matching files. No credential, token, cookie, browser storage value, raw response, private identifier, or fixture body is included in this report. Provider calls were intercepted or absent. |
| 7. Sanitized evidence | PASS | Per-route and per-width rows, interaction results, Lighthouse reports, stitched-capture provenance, and command summaries are stored in the workstation-local evidence directory below. |
| 8. `task.md` | PASS | The locally completed Task 14 performance gate and the separate remaining `DEP-AUDIT-001` release blocker are recorded; final PR, production activation, and Task 15 remain explicitly pending. |
| 9. Final pre-merge checkpoint | FAIL because the separate dependency gate remains | Work started from exact fetched preview commit `72c6c303345f2aca1496fd77f029a521b0267ce8` on isolated branch `codex/creator-platform-task14-performance-remaining`; PR #17 head `c6dcc1fd5d313de5c8357a9cd2c6d38a2d6d1386` is contained. Package manifests remain unchanged and `git diff --check` passes. No commit, push, PR, merge, deploy, activation, or worktree cleanup was performed. |

### Coverage matrix and issue labels

| Coverage | Width / theme | Result | Sanitized issue label |
| --- | --- | --- | --- |
| 36-route final-build inventory | 375 / 768 / 1024 / 1280, system light | PASS | none |
| Home, Contact, forced-color focus | 375 / 1280, forced colors | PASS | none |
| Contact consent and synthetic provider sequencing | 375 / 1280, reduced motion | PASS | none |
| Five Lighthouse routes | desktop preset, three runs per route | PASS | none |
| Five Lighthouse routes | mobile preset, three runs per route | PASS | none |
| Production dependency graph | local audit | FAIL | `DEP-AUDIT-001` |

Per-route Step 7 record:

| Route | Widths | Theme | Result | Issue label |
| --- | --- | --- | --- | --- |
| `/` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/tools` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/tools` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/creator-site` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/creator-site` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/works` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/works` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/guide` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/about` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/about` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/contact` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/contact` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/works/kuro-stream-kit` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/works/kuro-stream-kit` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/terms` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/terms` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/privacy` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/privacy` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/privacy/foreign-processing` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/privacy/foreign-processing` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/legal/tokushoho` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/guide/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/guide/schedule-calendar/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/guide/sns-split-image-maker/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/guide/thumbnail-editor/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide/creator-site/inquiry-route` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide/creator-site/profile-information` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide/creator-site/what-to-include` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide/schedule-calendar/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide/sns-split-image-maker/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide/thumbnail-editor/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/guide/comment-translator/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |
| `/en/guide/comment-translator/getting-started` | 375 / 768 / 1024 / 1280 | system light | PASS | none |

## Route and interaction evidence

- Final route inventory: 36 routes × 4 widths = 144 screenshots.
- Mechanical checks: status, document language, one `h1`, metadata description, main landmark, overflow, console/page errors, and external network requests.
- Visual review artifacts: `contact-sheet-375.jpg`, `contact-sheet-768.jpg`, `contact-sheet-1024.jpg`, and `contact-sheet-1280.jpg`.
- Metadata / SEO: 36 unique localized titles and descriptions, canonical / Open Graph fields present, `robots.txt` allows the site and disallows `/api/`, and `/opengraph-image` returns PNG.
- Redirects: `/tool` → `/tools`, `/web` → `/works`, and `/profile` → `/about` each return one `308` followed by a `200`, with no chain.
- Structure: no heading-level skips, all routes include the skip link, and all rendered product images have explicit dimensions.
- Tap targets: 81 essential controls and consent-label targets checked at 375 px; all were at least 44 × 44 px. Inline prose, breadcrumb, and legal-source links use the design's practical inline-link exception.
- Contrast / focus: Lighthouse Accessibility is 100 on every audited run; visible keyboard focus and forced-colors focus outlines were observed at 375 and 1280 px.
- Missing English article behavior: Japanese-only creator-guide language navigation targets `/en/guide?translation=unavailable`.
- Unavailable tool behavior: the Comment Translator guide is `noindex, nofollow`, has a visible textual status, and exposes no unavailable external tool action.
- External destinations: local `href`, target, and `rel` semantics passed. The five read-only public KuroLab destinations referenced by tool/service actions were opened in real Chrome and each returned HTTP 200 with the expected final URL and title. No form or provider endpoint was invoked.
- Capture integrity: five 375 px legal pages exceeding Chromium's 16,384 px full-page limit were replaced by sticky-header-aware viewport segments composited with Sharp. Their recorded output heights match the live document heights and their seams and real footers were inspected.
- Visual follow-up: the Japanese Contact hero now preserves the two reviewed title lines at all four widths; the 1024 px isolated `ことから、` line no longer occurs.

### Contact consent surface

- Both locale forms start with Privacy acknowledgement and foreign-transfer consent unchecked.
- Empty submit reports six ordered errors and focuses the first invalid field.
- Locale links resolve to the matching Privacy and foreign-processing routes.
- Direct-email fallback appears only after a synthetic local failure and uses the fixed approved `mailto:` copy.
- At 375 and 1280 px, the intercepted Turnstile script request occurs only after foreign-transfer consent.
- Submit ordering is `script request` → explicit widget execution → synthetic token callback → intercepted Contact API request.
- Withdrawing consent removes the widget, prevents the API request, and exposes the foreign-consent validation error.
- The API and Cloudflare script were intercepted in the browser; no live provider endpoint was reached.

Workstation-local sanitized evidence:

`C:/Users/taka/.codex/visualizations/2026/07/17/019f716b-b4c9-7282-8370-07c25abef372/task14-release-qa-20260731`

Static/islands follow-up evidence:

`C:/Users/taka/.codex/visualizations/2026/07/30/019fb417-77a4-71b3-b193-a0a074d9969c/perf-mobile-001-20260731`

Remaining-route performance and fresh visual evidence:

`C:/Users/taka/.codex/visualizations/2026/07/31/019fb63f-5567-7830-aba0-012255bbe6f0/task14-performance-remaining-20260731`

Key machine-readable files:

- `route-width-summary.json`
- `interaction-results.json`
- `turnstile-sequencing-results.json`
- `forced-colors-results.json`
- `metadata-results.json`
- `seo-redirect-results.json`
- `structure-accessibility-results.json`
- `tap-target-results.json`
- `lighthouse-results.json`
- `lighthouse-mobile-failures.json`
- `stitched-legal-capture-results.json`
- `contact-hero-final-results.json`
- `external-destination-results.json`
- `verification-summary.json`
- `privacy-publication-gate.json`
- `git-checkpoint.json`

## Lighthouse medians

Three real-Chrome runs were performed per route and preset.

| Preset | Route | Performance | Accessibility | Best Practices | SEO | LCP ms | CLS | TBT ms |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Desktop | `/` | 100 | 100 | 100 | 100 | 249 | 0 | 0 |
| Desktop | `/tools` | 100 | 100 | 100 | 100 | 255 | 0 | 0 |
| Desktop | `/creator-site` | 100 | 100 | 100 | 100 | 273 | 0 | 0 |
| Desktop | `/guide/getting-started` | 100 | 100 | 100 | 100 | 229 | 0 | 0 |
| Desktop | `/contact` | 100 | 100 | 100 | 100 | 300 | 0 | 0 |
| Mobile | `/` | 100 | 100 | 100 | 100 | 1146 | 0 | 0 |
| Mobile | `/tools` | 100 | 100 | 100 | 100 | 943 | 0 | 0 |
| Mobile | `/creator-site` | 100 | 100 | 100 | 100 | 1011 | 0 | 0 |
| Mobile | `/guide/getting-started` | 100 | 100 | 100 | 100 | 850 | 0 | 0 |
| Mobile | `/contact` | 100 | 100 | 100 | 100 | 1080 | 0 | 0 |

The five routes now deliver the existing production-rendered document as route-specific static HTML with small behavior islands, removing App Router bootstrap and Flight payload from these exact GET surfaces while preserving metadata, inline CSS, approved content, images, theme/language/menu/focus behavior, motion, and link semantics. Contact keeps a separate form island with its existing validation, consent evidence, Turnstile-before-provider order, and direct-email fallback. The middleware source fetch forwards only the HTML accept header and locale; its generated response remains private and no-store, so this local result does not claim CDN cacheability or remove the extra internal server hop.

### `/guide/getting-started` static/islands follow-up

The exact Japanese `/guide/getting-started` route remains the known-good static/islands reference and preserves the existing SSG document, metadata, inline CSS, theme initialization, content, image, navigation, and accessibility behavior while removing the App Router client bootstrap and Flight payload from the delivered document.

| Run | Performance | Accessibility | Best Practices | SEO | LCP ms | CLS | TBT ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 100 | 100 | 100 | 100 | 850 | 0 | 0 |
| 2 | 100 | 100 | 100 | 100 | 825 | 0 | 0 |
| 3 | 100 | 100 | 100 | 100 | 851 | 0 | 0 |
| Median | 100 | 100 | 100 | 100 | 850 | 0 | 0 |

Real-Chrome follow-up QA passed at 375 / 768 / 1024 / 1280 px with no horizontal overflow, App Router chunk request, Flight payload, external request, or page error. Skip-link focus, mobile-menu initial focus and Tab trap, Escape close/focus return, scroll lock, theme and locale persistence, reduced motion, and forced colors remained operable. The static Guide document removes only Next's unselected responsive `srcset` while retaining its native lazy `src`; the approved 1920 px guide image decoded and painted at all four widths without a client runtime.

## Diagnostics

- React Doctor: 13 warnings.
  - One dynamic HTML-sink warning in `components/pages/legal-page.js` is a high-confidence false positive at this boundary: the legal loader only returns exact hash-bound approved Markdown after controlled-Markdown sanitization, with focused tests for rejected HTML and unsafe URLs.
  - Twelve unused-file warnings identify legacy, unreachable UI/data files plus the doctor config. They are pre-existing maintainability surface and were not deleted in this release slice.
- Next.js migration: Lighthouse initially reproduced missing SEO descriptions because Next 15 streamed metadata after the initial document head. `htmlLimitedBots: /.*/` now keeps metadata in the initial response, and the final Lighthouse SEO score is 100 on every audited run.
- Language-switch accessibility: the visible `日本語 / EN` label is now included in the accessible name. The final Lighthouse Accessibility score is 100 on every audited run.
- Visual evidence: the initial five over-limit legal screenshots and the 1024 px Contact title wrap were sanitized QA-artifact defects, not hidden application failures. Both were corrected and re-inspected; provenance is recorded beside the replacement captures.
- Independent visual re-review: PASS. The final current-build set includes all five routes at four widths as both top and full-page captures, five settled skip-link focus captures, three settled theme frames, and the loaded Guide image at all four widths. The final CJK and integrity reviewers reported no remaining product or evidence blocker.

## Release blockers and next approvals

1. `DEP-AUDIT-001` (additional security release gate requested by the repository owner, not the Task 14 Step 5 score criterion): Next.js 15.5.21 carries vulnerable PostCSS 8.4.31 and Sharp 0.34.5. The stable 15.5.22 and 16.2.12 metadata inspected on `2026-07-31` still use the affected dependency ranges. Moving to a 16.3 preview or applying out-of-range overrides is not authorized.
`PERF-MOBILE-001` is resolved locally: all five Task 14 routes meet the required mobile and desktop three-run medians.

Task 14's local browser, accessibility, and performance verification is complete, but the separately requested `DEP-AUDIT-001` still blocks release readiness. Merge, deployment, production activation, live-provider verification, and Task 15 remain pending separate approval.
