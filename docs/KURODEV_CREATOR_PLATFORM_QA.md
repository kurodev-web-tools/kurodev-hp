# Creator Platform pre-merge QA

## Checkpoint

- QA date: `2026-07-31` JST
- Dependency re-audit date: `2026-08-01` JST
- Scheduled coordinated production activation date: `2026-08-04`
- Surface: local integration production build at `http://localhost:3100`
- Runtime: Next.js `15.5.21`, React / React DOM `18.3.1`
- Overall verdict: **PASS for the local pre-merge gate — `DEP-AUDIT-001`, Task 14 browser, and Lighthouse gates pass locally**
- Live-provider boundary: no live Turnstile, Siteverify, Resend, Contact delivery, secrets, provider settings, or real-person PII were used.

The seven legal documents and six Contact consent copies use the exact fixed IDs, versions, dates, and SHA-256 values recorded by the active launch manifests and tests. Their public-use gate relies on the repository owner's owner-designated AI-assisted internal substitute and accepted residual risk. No human lawyer or independent human legal reviewer participated, and this evidence must not be described as human or attorney review.

## Task 14 Steps 1–9

| Step | Result | Evidence |
| --- | --- | --- |
| 1. Automated suite | PASS | `npm test` passes 105 / 105, and `npm run lint`, `npm run diagnose:react`, and `npm run build` exit 0. The final production build generated 41 pages. React Doctor retains 13 documented warnings. The separately requested dependency-security audit passes with 0 vulnerabilities after the bounded `DEP-AUDIT-001` override. |
| 2. Production server | PASS | Next.js 15.5.21 production server reached Ready on local port 3100. |
| 3. Four-width route QA | PASS | The earlier 36-route inventory remains recorded. A fresh final-build sweep of the five Task 14 Lighthouse routes added 20 current captures at 375 / 768 / 1024 / 1280 px: all HTTP 200, with the correct static marker, no horizontal overflow, broken loaded image, App Router chunk, Flight payload, or incomplete initial-theme state. |
| 4. Interactions and states | PASS | On the current build, all five routes passed visible keyboard focus, mobile-menu forward/backward focus trap, Escape close/focus return, theme and locale persistence, reduced motion, and forced colors. Contact passed six-error validation order, focus-on-first-error, polite/assertive live regions, direct-email fallback, consent-gated fictional Turnstile sequencing, and intercepted API delivery. |
| 5. Lighthouse | PASS | Three real-Chrome runs per route and preset produced 100/100/100/100 medians for all five routes on mobile and desktop. |
| 6. Publication/privacy review | PASS for local pre-merge scope | Tracked secret-pattern scan found no matching files. No credential, token, cookie, browser storage value, raw response, private identifier, or fixture body is included in this report. Provider calls were intercepted or absent. |
| 7. Sanitized evidence | PASS | Per-route and per-width rows, interaction results, Lighthouse reports, stitched-capture provenance, and command summaries are stored in the workstation-local evidence directory below. |
| 8. `task.md` | PASS | The locally completed Task 14 performance gate and resolved `DEP-AUDIT-001` are recorded; final PR, production activation, and Task 15 remain explicitly pending. |
| 9. Final pre-merge checkpoint | PASS for the local gate | The dependency re-audit started from exact fetched preview commit `6de9dd67f46f29f8843422ff7559a431b26b46eb` on isolated branch `codex/dep-audit-001`. Only `package.json`, `package-lock.json`, this QA record, and `task.md` changed. `git diff --check` passes. No commit, push, PR, merge, deploy, activation, live-provider call, or worktree cleanup was performed. |

### Coverage matrix and issue labels

| Coverage | Width / theme | Result | Sanitized issue label |
| --- | --- | --- | --- |
| 36-route final-build inventory | 375 / 768 / 1024 / 1280, system light | PASS | none |
| Home, Contact, forced-color focus | 375 / 1280, forced colors | PASS | none |
| Contact consent and synthetic provider sequencing | 375 / 1280, reduced motion | PASS | none |
| Five Lighthouse routes | desktop preset, three runs per route | PASS | none |
| Five Lighthouse routes | mobile preset, three runs per route | PASS | none |
| Production dependency graph | local audit | PASS | none |

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

## DEP-AUDIT-001 resolution

- Re-audit date: `2026-08-01` JST.
- RED: `npm audit --omit=dev --json` reported three high package findings through `next@15.5.21`: nested `postcss@8.4.31`, optional `sharp@0.34.5`, and the direct Next aggregation.
- Approved bounded change: retain Next.js `15.5.21` and override only its PostCSS to `8.5.23` and Sharp to `0.35.3`.
- Resolved graph: `next@15.5.21 overridden -> postcss@8.5.23 overridden` and `sharp@0.35.3 overridden`; top-level development PostCSS resolves independently to `8.5.25`.
- Lockfile scope: 30 changed package entries consist only of the nested PostCSS entry, Sharp, Sharp platform/libvips packages, and Sharp's resulting SemVer dependency.
- GREEN: `npm audit --omit=dev` and the install-time full audit report 0 vulnerabilities.
- Targeted compatibility: Next's nested PostCSS processed authored CSS successfully. Sharp `0.35.3` with libvips `8.18.3` read the approved 1920 x 1080 PNG correctly.
- Broad verification: `npm test` 105 / 105, lint, React Doctor, and the 41-page production build exit 0. React Doctor retains the same 13 documented warnings.
- Production smoke: `/`, `/tools`, `/creator-site`, `/guide/getting-started`, and `/contact` passed in real Chrome at 375 and 1280 px with one `h1`, one `main`, correct Japanese document metadata, no horizontal overflow, broken image, console error, or external request. The production image optimizer separately returned HTTP 200 and a decoded WebP response for the approved PNG.
- Boundary: no application, legal, consent, content, provider, deployment, or production setting changed. No live provider or real-person data was used.
- Runtime prerequisite: local verification used Node.js `22.22.2`. Sharp `0.35.3` requires Node.js `>=20.9.0`. A read-only Cloudflare Pages check on `2026-08-01` confirmed build system v3 for both production and preview, with no `NODE_VERSION` override; Cloudflare's documented v3 default Node.js `22.16.0` satisfies the requirement. No Cloudflare setting was changed.

## Diagnostics

- React Doctor: 13 warnings.
  - One dynamic HTML-sink warning in `components/pages/legal-page.js` is a high-confidence false positive at this boundary: the legal loader only returns exact hash-bound approved Markdown after controlled-Markdown sanitization, with focused tests for rejected HTML and unsafe URLs.
  - Twelve unused-file warnings identify legacy, unreachable UI/data files plus the doctor config. They are pre-existing maintainability surface and were not deleted in this release slice.
- Next.js migration: Lighthouse initially reproduced missing SEO descriptions because Next 15 streamed metadata after the initial document head. `htmlLimitedBots: /.*/` now keeps metadata in the initial response, and the final Lighthouse SEO score is 100 on every audited run.
- Language-switch accessibility: the visible `日本語 / EN` label is now included in the accessible name. The final Lighthouse Accessibility score is 100 on every audited run.
- Visual evidence: the initial five over-limit legal screenshots and the 1024 px Contact title wrap were sanitized QA-artifact defects, not hidden application failures. Both were corrected and re-inspected; provenance is recorded beside the replacement captures.
- Independent visual re-review: PASS. The final current-build set includes all five routes at four widths as both top and full-page captures, five settled skip-link focus captures, three settled theme frames, and the loaded Guide image at all four widths. The final CJK and integrity reviewers reported no remaining product or evidence blocker.

## Release blockers and next approvals

`DEP-AUDIT-001` is resolved locally by the exact repository-owner-approved Next-scoped override recorded above. `PERF-MOBILE-001` remains resolved locally: all five Task 14 routes meet the required mobile and desktop three-run medians.

Task 14's local browser, accessibility, performance, and dependency-security verification is complete. Final PR creation, merge, deployment, production activation, live-provider verification, and Task 15 remain pending separate approval.

## OpenNext / Workers migration local checkpoint

- Verification date: `2026-08-01` JST.
- Base / branch: `43625b4a841fdae6652512a43cd2092cbb7062ff` / `codex/cloudflare-opennext-workers` in the isolated `1f6f` worktree.
- Repository slice: retained Next.js `15.5.21`; added exact `@opennextjs/cloudflare@1.20.2` and `wrangler@4.118.0`, the approved OpenNext / Wrangler repository configuration, unoptimized images, and Node runtime for Contact and OG by removing only their Edge runtime declarations.
- Characterization: the pre-change Contact, consent, OG, route-inventory, and static-islands set passed 42 / 42. The new OpenNext repository contract first failed on the missing adapter configuration and passed after the bounded repository changes. The combined focused set passed 43 / 43.
- Broad local gates: `npm test` 106 / 106, lint with no warnings or errors, the same 13 documented React Doctor warnings, 43-page Next production build, `npm audit --omit=dev` with 0 vulnerabilities, Git Bash OpenNext build, and `git diff --check` all exited 0.
- Local runtime: OpenNext preview started Wrangler `4.118.0` on Windows and real Chrome `151` inspected 11 route states at 375 / 1280 px. Japanese Home, Tools, Creator Site, and Contact returned 200 with the expected static-island rendering header. Their English routes returned 200. All passing pages had one `h1`, one `main`, the expected document language, no horizontal overflow, and the configured security headers.
- Navigation / assets: the mobile menu opened; `/tool`, `/web`, and `/profile` returned exact 308 redirects; the synthetic missing route returned 404; OG, favicon, and robots returned 200.
- Visible Home / Tools images in both locales and widths were scrolled into view and decoded. Every sample reported its expected 1920 x 1080 natural size, 256 / 256 opaque downsample pixels, and non-zero channel range.
- Contact boundary: both locales surfaced client validation, submitted only synthetic `example.test` data with the matching locale and both approved consent flags, and returned `TURNSTILE_FAILED` with provider secrets absent. No browser request reached an external provider.
- Guide runtime fix: retained the existing publication packet, image hash, controlled Markdown, route, locale, status, and thirteen-route validation at build time. A deterministic tracked ES module now carries only the validated plain inventory, and Guide routes plus sitemap import a filesystem-free runtime facade. The check command rejects stale generated bytes.
- Guide characterization: the new contract first failed on the missing facade, artifact, and generator. After implementation, the Guide loader / route inventory / OpenNext focused set passed 25 / 25, including source-to-artifact equality, runtime-consumer import separation, current-byte acceptance, and stale-byte rejection.
- Current broad gates: `npm test` passed 110 / 110; lint had no warnings or errors; the 43-page Next build and Git Bash OpenNext build completed; production audit reported 0 vulnerabilities; and `git diff --check` exited 0. React Doctor exited 0 with the thirteen existing source warnings plus six heuristic warnings from generated `.open-next` bundle files.
- Bundle inspection: the generated `.open-next` tree contains no Guide loader module name, `content/guides/publication-candidate.json`, or build-worktree Guide absolute path.
- Production-build fallback observation: the same build served `/guide/getting-started`, `/en/guide/getting-started`, and `/sitemap.xml` with HTTP 200 under the normal Next production server. The Japanese route retained `x-kurodev-rendering: static-guide-islands`; both Guide pages had their localized title and `h1`; the sitemap contained both localized getting-started URLs. This is not recorded as Worker runtime verification.
- Current runtime blocker: two attempts to start the rebuilt local Worker, with and without a TTY, connected the configured bindings and then failed before listening because the Windows `workerd` binary called `std::terminate()`. Both attempts returned the same native stack and Wrangler runtime-start error; no application request ran.
- Incomplete gates: the prior-build Guide / sitemap 500 root cause is removed from the repository and bundle, but the rebuilt Worker could not start. Therefore current-build Guide / sitemap behavior, 375 / 1280 px Chrome smoke, visible-image evidence, and five-route Lighthouse remain unverified rather than passed.
- Repository publication: implementation commit `c0b7043` was pushed to `codex/cloudflare-opennext-workers`, and Draft PR #21 was opened against `codex/creator-platform-redesign-preview` after the local gates above.
- Boundary: no WSL / remote build, Cloudflare upload or deploy, Worker/account mutation, provider call, real-person data, secret registration, domain / DNS / route change, production activation, or merge was performed.

## Remote OpenNext Worker runtime QA

- Verification date: `2026-08-01` JST.
- Target: `https://kurodev-hp-opennext.kurodev-web-tools.workers.dev/`.
- Repository checkpoint: clean detached worktree at `2c2d61244125a1eafa7b3824002f95502c1414ce`, after `git fetch origin --prune`; the specified preview tip is contained and no existing worktree was changed.
- Build identity: PR #22 reports `Workers Builds: kurodev-hp-opennext` SUCCESS for `80ec84fbfc423ba73b42fc4eee4e0387002ff576`. That head and merge commit `2c2d612` share exact tree `b69f2ea96652287b8a9f72898ff70492c8dbde2c`. Runtime checks below are separate from this repository / OpenNext build evidence.
- Browser: installed Google Chrome `151.0.7922.71`; 10 routes × 375 / 1280 px = 20 fresh full-page captures.
- Sanitized evidence: `C:/Users/taka/.codex/visualizations/2026/08/01/019fbce4-9bfa-7c53-8292-8ab71050307f/remote-worker-qa-20260801`.

### Runtime route and browser result

- Japanese `/`, `/tools`, `/creator-site`, `/contact`, and `/guide/getting-started` return 200 with the expected `x-kurodev-rendering` value, matching static marker, no App Router chunk, and no Flight payload.
- `/en`, `/en/tools`, `/en/creator-site`, `/en/contact`, and `/en/guide/getting-started` return 200 with the correct English `lang`, localized title, and one `h1` / `main`. They retain App Router / Flight delivery because the approved predicates and tests intentionally limit static islands to the exact Japanese routes; this is not recorded as a regression.
- All 20 route / width combinations have no horizontal overflow, console error, page error, or unexpected external browser request. Every visible `<img>` decoded with a non-zero natural size and produced opaque, non-single-color canvas samples.
- The 375 px Japanese Home mobile menu opens, transfers focus into the dialog, closes on Escape, and returns focus to the menu button.
- `/en/` redirects once to `/en`; `/tool`, `/web`, and `/profile` redirect once to `/tools`, `/works`, and `/about`; the synthetic missing route returns 404.
- HSTS, nosniff, Referrer-Policy, X-Frame-Options, and Permissions-Policy match `next.config.mjs` on the audited documents.

### Contact, metadata, and assets

- Japanese and English empty Contact submission produces six ordered visible errors and focuses `name`.
- Browser interception captured only synthetic `example.test` form submissions. The sanitized payloads contain the matching locale, both approved consent booleans, current consent version fields, an approved category, and no real-person data. The intercepted API response exercises the error and direct-email fallback UI without contacting a provider.
- A direct remote API request with the complete current consent contract and an empty Turnstile token returns HTTP 400 `TURNSTILE_FAILED`. The route rejects the missing token before provider fetch; no Turnstile Siteverify or Resend call was made.
- Metadata points to `/favicon.png`. `/opengraph-image` is a decoded, nonblank 1200 x 630 PNG; `/favicon.png` is a decoded, nonblank 64 x 64 PNG. `robots.txt` allows the public site, disallows `/api/`, and names the production sitemap. `sitemap.xml` includes both Japanese and English getting-started URLs.

### Transfer and performance evidence

- Cold-browser transfer observations are recorded without inventing a new threshold: Japanese routes span 8.3–1871.1 KiB and English routes span 120.6–1989.5 KiB. The English App Router routes use 7–13 resources while the Japanese static-island routes use 1–5.
- Chrome DevTools traces at 375 / 1280 px, 1× CPU, and no network throttle report LCP 218–402 ms, TTFB 50–66 ms, and CLS 0 across the five Task 14 routes. These traces are runtime performance evidence, not substitutes for a Lighthouse Performance score.
- Thirty Lighthouse navigation runs were attempted under the existing five-route, mobile / desktop, three-run matrix. Accessibility and Best Practices medians are 100 for all routes. SEO is 100 for Home and Tools, 91 for Creator Site and Contact, and 92 for Guide in both presets.
- The three SEO failures are reproducible in navigation mode as `meta-description` failures even though the HTTP response and settled Chrome DOM contain the expected description element. This is recorded as a remote audit/runtime timing incompatibility rather than silently treated as a pass.
- The available Chrome DevTools Lighthouse bundle filters out Performance audits. Its resulting Performance 100 is invalid and excluded. A formal four-category median cannot be claimed until the same matrix runs in an approved runner with full Lighthouse `13.4.1` already available; no dependency was installed in this worktree.
- Non-destructive local characterization remains green: `node --test tests/performance-contract.test.mjs tests/cloudflare-opennext-contract.test.mjs` passes 14 / 14.

### Remote runtime verdict and boundary

- Repository / OpenNext build: **verified built** by the successful check on the same Git tree as preview tip `2c2d612`.
- Remote Worker runtime: **verified for route, static-island, document, browser, image, navigation, Contact fail-closed, redirect, 404, asset, sitemap, and security-header behavior**.
- Existing Lighthouse gate: **not passed**. The observed SEO medians are below 100 for three routes and the approved environment cannot produce a valid Lighthouse Performance category.
- Independent visual gate: **REVISE** after both read-only reviewers opened all 20 captures. The functional pass found no overflow, clipped glyphs, tofu, form collapse, or broad responsive failure. The CJK precision pass flagged the existing forced Japanese `自分の / 場所` and `活動 / フロー`, the Tools modifier / noun split, and mobile English one-word / article orphans as product-level wrap issues. No source change was authorized.
- Capture evidence also remains imperfect: `home-1280` and `guide-getting-started-375` contain one unpainted lazy image each despite successful decode / canvas sampling, and five captures expose the valid skip-link focus state instead of a labeled resting state. These are evidence defects, not proof of broken runtime images.
- One reviewer initially treated English App Router delivery as a regression. Repository predicates and focused tests explicitly exclude English routes from static islands, so that finding is rejected against the approved source contract; English 200 / locale / document behavior remains the applicable gate.
- Activation-preflight: **NO-GO** until a full Lighthouse 13.4.1 runner repeats 5 routes × 2 presets × 3 runs. If the meta-description failure reproduces there, source behavior change, Workers rebuild / deploy, and the exact same remote matrix require new approvals.
- Visual revalidation also requires separate source-change authority for the listed wrap issues, followed by focus-cleared, fully painted fresh captures of all 20 route / width combinations and a new independent review.
- No Cloudflare account setting, Worker resource, build, upload, deployment, secret / variable, domain / DNS / route, activation, provider, Pages production environment, dependency, manifest / lockfile, application source, commit, push, PR, merge, branch, or worktree was changed.
