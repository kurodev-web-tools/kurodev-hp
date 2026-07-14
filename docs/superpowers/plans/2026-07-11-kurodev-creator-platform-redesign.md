# kurodev Creator Platform Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `kuro-lab.com` as a bilingual creator-platform site that presents Kuro Stream Kit as the flagship product and converts suitable visitors into creator-website inquiries.

**Architecture:** Keep Japanese routes at the root and add explicit English routes under `/en`. Share page views, localized content registries, status rules, SEO helpers, and shell components across both route trees. Publish controlled Markdown guides through a small server-only loader, retain the bounded Contact API, and deliver the redesign in independently reviewable slices.

**Tech Stack:** Next.js 14 App Router, React 18, JavaScript/ES modules, Tailwind CSS 3, controlled Markdown via `gray-matter` + `marked`, Node built-in test runner, Resend, Cloudflare Turnstile, Codex in-app browser QA.

**Source design:** `docs/superpowers/specs/2026-07-11-kurodev-creator-platform-redesign-design.md`

**Git policy:** Execute in isolated `codex/` worktrees behind the preview integration branch defined below. Each task ends with a review checkpoint. Commit, push, and PR creation occur only when the user explicitly requests them.

**Chunk/slice mapping:** Plan chunks are document-review groups, not PR boundaries. Spec implementation Slice 1 spans Tasks 2–5 because the shared shell consumes the locale/content foundation. Recommended PR boundaries are defined at the end of this plan.

---

## Mock-first Visual Contract Gate

Implementation starts only after the visual direction has been approved through the following mock sequence. The first generated image is a review artifact, not a production asset.

### Task 0A: Home desktop direction mock

- Generate one 1280px-class desktop Home mock using publication-safe Kuro Stream Kit product screenshots as the focal material.
- Preserve the approved Creator Studio direction: deep navy/charcoal foundation, cyan for brand/action, magenta only for restrained announcements, editorial spacing, and fewer repetitive cards.
- Show the primary journey in the first viewport: creator-focused value proposition, `無料ツールを見る`, `HP制作を相談する`, and a visible bridge from Kuro Stream Kit to website production.
- Avoid generic SaaS dashboards, decorative code editors, hexagon/circle motifs, excessive glass effects, and invented product capabilities.
- Obtain explicit user approval on hierarchy, density, color balance, product-screen treatment, and overall tone before continuing.

### Task 0B: Home mobile behavior mock

- After Task 0A approval, generate a 375px-class mobile Home mock from the same visual language.
- Confirm navigation priority, CTA order, product-image cropping, bilingual controls, tap-target sizing, and content order rather than merely shrinking the desktop composition.
- Obtain explicit user approval before continuing.

### Task 0C: Tools desktop direction mock

- After the Home direction is approved, generate one desktop Tools hub mock showing the four launch tools in a stable curated order.
- Define the scalable future pattern in the mock: featured tools remain curated and fixed; the complete inventory uses deterministic filtering/sorting rather than random display.
- Distinguish `使う`, `詳細を見る`, and guide/status affordances without implying unavailable cross-tool or website integrations.
- Obtain explicit user approval before implementation begins.

### Approved mock handoff

- Copy only approved final mocks into `docs/mockups/kurodev-creator-platform/`; keep rejected explorations outside the implementation source tree.
- Add a short `README.md` beside the approved mocks recording viewport, exact copy, referenced product assets, intentional responsive differences, and known image-generation artifacts that must not be reproduced.
- Translate the approved direction into measurable tokens and layout rules in `DESIGN.md` before component implementation: color roles, type scale, spacing rhythm, radii, borders, shadows, grid width, and motion constraints.
- Treat approved mocks as a visual contract, not pixel-perfect generated source. Accessibility, responsive behavior, real copy, and real product data take precedence where the generated image is ambiguous.
- Any material departure in information hierarchy, color system, navigation, or CTA priority requires a new user review checkpoint.

## Branch and Preview Integration Strategy

The redesign does not send each implementation slice directly to `main`.

```text
main
└─ codex/creator-platform-redesign-preview
   ├─ codex/creator-platform-foundation
   ├─ codex/creator-platform-home
   ├─ codex/creator-platform-tools
   ├─ codex/creator-platform-creator-site
   ├─ codex/creator-platform-works
   ├─ codex/creator-platform-guide
   ├─ codex/creator-platform-contact
   ├─ codex/creator-platform-legal
   └─ codex/creator-platform-release-qa
```

### Integration rules

1. Do not assume `origin/main` is the reviewed site baseline. At execution intake, fetch and record the current `origin/main`, `codex-kurodev-portal-initial`, merge base, divergence counts, and required-file inventory. The observed planning-time state on 2026-07-11 was `origin/main=8a46bce`, current site line `a221567`, divergence `origin/main...current = 9/1`, with merge base `95dbe07`; these values must be reverified because they can drift.
2. Use the explicitly user-approved current site line as the preview baseline. The default recommendation is to branch preview from the then-current `codex-kurodev-portal-initial` tip, then merge the freshly fetched `origin/main` into preview without rebase or force-push. If the user instead merges the remaining site commits to `main` first, re-evaluate and use the new reviewed `origin/main` tip.
3. Configure or verify a preview deployment for the integration branch before page slices begin. If no hosted preview exists, record `previewMode=local-integration-production-build`; a local production build of the combined preview branch qualifies as preview QA when labeled this way. Hosted preview deployment remains optional and must never be created or changed without separate authorization.
4. Create each slice branch from the latest reviewed preview integration branch, never from stale `main` and never from an older sibling feature branch.
5. Target every slice PR at `codex/creator-platform-redesign-preview`, not at `main`.
6. Require slice tests, build, browser QA, and diff review before merging a slice PR into the preview integration branch.
7. After each slice merge, verify the combined preview state before creating the next slice branch.
8. Keep `main` stable while the redesign is incomplete. Do not open partial redesign PRs against `main`.
9. Before release QA and again immediately before final-merge approval, require a clean preview worktree, run `git fetch origin --prune`, inspect divergence, and merge `origin/main` into preview through an explicitly approved `git merge origin/main`. Do not rebase or force-push reviewed preview history. Review conflicts by intent, then rerun the complete automated suite and combined preview QA.
10. Require `git merge-base --is-ancestor origin/main codex/creator-platform-redesign-preview` to exit 0 after drift integration and immediately before final merge. Re-fetch and repeat if `origin/main` changes.
11. Freeze feature additions after release QA starts. Only verified release-blocking fixes enter the preview branch during the freeze.
12. Open one final PR from `codex/creator-platform-redesign-preview` to `main` only after all pre-merge slices and release gates pass.
13. Merge to `main`, deploy, and run production verification only after separate explicit approval.
14. Retain the preview integration branch and worktree until the final `main` merge and production verification are complete; cleanup is a separate approval-gated action.

### Explicit mutation gates

The following actions each require explicit approval at the action point: creating a branch/worktree, installing dependencies, committing, pushing, creating each slice PR, merging each slice PR, creating the final PR, merging the final PR, deploying or changing preview/production configuration, sending a production Contact test, and deleting branches/worktrees.

### Slice branch lifecycle

For every slice:

```text
verify approved baseline and refresh preview integration branch
  -> create isolated slice branch/worktree
  -> implement and verify slice
  -> review diff
  -> optional commit/push after explicit approval
  -> PR to preview integration branch after explicit approval
  -> slice merge after explicit approval
  -> combined preview QA
  -> next slice starts from refreshed preview branch
```

The preview integration branch is an integration and review surface, not a substitute for production verification.

---

## File Structure

### New foundation files

- `DESIGN.md` — Creator Studio tokens, typography, component states, motion, responsive, and accessibility contract.
- `lib/i18n.mjs` — locale constants, path mapping, language alternates, and missing-translation fallback.
- `lib/seo.mjs` — canonical, Open Graph, Twitter, and `hreflang` metadata construction.
- `lib/content/tool-content.mjs` — localized tool records, status, editorial order, dates, destinations, and guide mappings.
- `lib/content/work-content.mjs` — localized public work records and publication-approval fields.
- `lib/content/site-copy.mjs` — localized navigation, Home, Creator Site, About, Contact, footer, and legal-navigation copy.
- `lib/content/guide-registry.mjs` — guide route inventory, locale availability, category, status, and related-content mappings.
- `lib/content/status.mjs` — allowed status vocabulary and action/indexing behavior.
- `lib/guides/guide-loader.mjs` — controlled Markdown front matter and HTML rendering.
- `content/guides/<locale>/**/*.md` — source-controlled public guide content.
- `components/layout/site-header.js` — desktop/mobile header, active route state, and language switch.
- `components/layout/site-footer.js` — localized product, service, guide, and legal navigation.
- `components/layout/language-switch.js` — explicit equivalent-route navigation; never automatic redirect.
- `components/layout/english-suggestion.js` — dismissible English suggestion on Japanese Home only.
- `components/pages/*.js` — shared localized page views used by Japanese and English route wrappers.
- `components/sections/*.js` — focused Hero, Tool Showcase, Workflow, Case Study, Guide, Service, CTA, and reassurance sections.
- `components/ui/status-badge.js` — status label plus non-color semantic cue.
- `components/ui/product-media.js` — sized product media with controlled aspect ratio and accessible alt.
- `components/ui/action-link.js` — internal, external, disabled, and unavailable action variants.
- `components/ui/breadcrumbs.js` — localized guide/case-study breadcrumbs.
- `tests/*.test.mjs` — pure locale, status, content-registry, guide, SEO, and validation tests.

### Existing files replaced or substantially modified

- `app/layout.js` — root metadata, font loading, skip link, shared shell.
- `app/globals.css` — Creator Studio tokens and components; remove sidebar/bottom-nav assumptions.
- `components/site-shell.js` — top-header/footer marketing shell.
- `components/contact-form.js` — localized accessible validation and bounded submission behavior.
- `app/api/contact/route.js` — retain delivery boundary; add only requirements needed by localized form and fallback behavior.
- `app/page.js`, `app/tools/page.js`, `app/creator-site/page.js`, `app/works/page.js`, `app/works/kuro-stream-kit/page.js`, `app/guide/**`, `app/about/page.js`, `app/contact/page.js`, legal routes — Japanese wrappers and metadata.
- `app/en/**` — English wrappers and metadata.
- `app/sitemap.js`, `app/robots.js`, `app/opengraph-image.js` — bilingual index and brand output.
- `package.json`, `package-lock.json` — test script and approved Markdown dependencies.

### Removed after replacements are verified

- `components/sidebar.js`
- `components/mobile-nav.js`
- `components/hexagon-background.js`
- `components/profile-code-card.js`
- obsolete old-page-only UI components and legacy `/profile`, `/web`, `/tool` routes after redirects are verified

---

## Chunk 1: Foundation, Design System, Localization, and Content Boundaries

### Task 1: Execution intake and publication-safe asset manifest

**Files:**
- Create: `docs/active/KURODEV_REDESIGN_LAUNCH_CONTENT.md`
- Read: `docs/superpowers/specs/2026-07-11-kurodev-creator-platform-redesign-design.md`
- Read: `D:/V_streamer_tools/AGENTS.md`
- Read: `D:/V_streamer_tools/task.md`

- [ ] **Step 1: Reverify and approve the real baseline**

Run:

```powershell
git fetch origin --prune
git rev-parse origin/main
git rev-parse codex-kurodev-portal-initial
git merge-base origin/main codex-kurodev-portal-initial
git rev-list --left-right --count origin/main...codex-kurodev-portal-initial
git status --short
```

Expected: exact SHAs and divergence are recorded in the launch manifest. Stop and ask for direction if the current site line is not the intended baseline or contains unrelated unreviewed work.

- [ ] **Step 1a: Preserve the approved plan/spec before worktree creation**

Confirm both files exist in the current worktree. Because they are currently untracked, either commit them after explicit approval or copy them unchanged into the new preview worktree and verify hashes before any implementation. Never assume untracked files appear in a new worktree.

- [ ] **Step 1b: Check worktree and branch safety**

Run:

```powershell
git branch --list codex/creator-platform-redesign-preview
Test-Path D:/kurodev-hp-worktrees/creator-platform-redesign-preview
git worktree list --porcelain
```

Expected: the branch does not exist, the target path is absent, and no existing worktree owns the target branch/path. If a partial prior run exists, stop and audit it rather than retrying blindly.

- [ ] **Step 1c: Create the preview integration worktree only after explicit branch/worktree approval**

Run from `D:/kurodev-hp`:

```powershell
git fetch origin --prune
git worktree add D:/kurodev-hp-worktrees/creator-platform-redesign-preview -b codex/creator-platform-redesign-preview codex-kurodev-portal-initial
Set-Location D:/kurodev-hp-worktrees/creator-platform-redesign-preview
```

Expected: a clean isolated worktree on `codex/creator-platform-redesign-preview` containing the approved current site line. Do not run this step during planning.

- [ ] **Step 1d: Merge current `origin/main` only after separate merge approval**

Run in the clean preview worktree:

```powershell
git fetch origin --prune
git merge origin/main
git merge-base --is-ancestor origin/main HEAD
```

Expected: merge completes without history rewrite and the containment command exits 0. Resolve conflicts by reviewed intent and rerun required-file checks.

- [ ] **Step 1e: Verify required files and preserved documents**

Confirm `package.json`, `app/page.js`, `task.md`, the approved spec, and this plan exist in the preview worktree. If the documents were copied, compare file hashes with the originals before proceeding.

- [ ] **Step 1f: Verify the preview deployment contract**

Record the preview branch name, `previewMode=hosted` or `previewMode=local-integration-production-build`, hosted preview URL when authorized and available, deployment trigger, environment-variable visibility by name/existence only, and the exact local production-server fallback. Do not print environment values. Local labeled integration QA satisfies preview QA; hosted deployment is not a prerequisite unless separately authorized.

- [ ] **Step 2: Record the launch inventory**

Create a table covering every required route, locale, CTA, asset, tool URL, guide URL, publication owner, and approval state. Use `ready`, `blocked`, or `not-required`; do not use TODO/TBD. For each of Japanese Terms, English Terms, Japanese Privacy, English Privacy, and Japanese commercial disclosure, record the approved source path, owner, approval state, effective date, and update date.

- [ ] **Step 3: Verify public destinations**

Check the production Kuro Stream Kit URL, HP-portal plan URL, feedback route, and `contact@kuro-lab.com`. Record URLs only; do not expose credentials, cookies, browser storage, or raw responses.

- [ ] **Step 4: Select sanitized product media**

For Schedule Calendar, Thumbnail Editor, SNS Split Image Maker, and Comment Translator, record one approved desktop image and one approved mobile image or a documented shared responsive image. Images must use sample data and contain no raw comments or identifiers.

- [ ] **Step 5: Gate page implementation on content readiness**

Expected: Foundation tasks may proceed while a page is blocked, but a page task cannot start until its required rows are `ready`. A blocked tool destination may enter the registry only as `unavailable` or `in-development`, with no launch URL or enabled launch action. Only `published` and `beta` require a verified production URL.

- [ ] **Step 6: Review checkpoint**

Inspect the manifest and confirm that no public asset or work evidence relies on inference. Do not commit unless explicitly requested.

### Task 2: Design system contract and base test harness

**Files:**
- Create: `DESIGN.md`
- Create: `tests/design-contract.test.mjs`
- Modify: `package.json`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the failing design contract test**

Test that `DESIGN.md` names the fixed cyan brand ramp, light/dark surface tokens, text contrast rule, typography scale, spacing scale, shared primitives, focus state, reduced-motion rule, and required 375/768/1024/1280 widths.

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
node --test tests/design-contract.test.mjs
```

Expected: FAIL because `DESIGN.md` does not exist.

- [ ] **Step 3: Write `DESIGN.md` from the approved spec**

Define these sections exactly: Brand Direction, Color, Typography, Spacing, Primitives and States, Motion, Responsive, Accessibility. Cyan remains the action color in both themes; magenta is announcement-only.

- [ ] **Step 4: Replace root CSS tokens**

Use semantic tokens such as `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-action`, `--color-action-text`, `--color-focus`, `--space-*`, and `--radius-*`. Remove the theme-dependent cyan-to-purple brand swap. Ensure normal text token pairs meet 4.5:1.

- [ ] **Step 5: Add the test script**

Add:

```json
"test": "node --test tests/*.test.mjs"
```

- [ ] **Step 6: Run design test, lint, and build**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all exit 0. Build may retain the known Edge static-generation warning but must compile successfully.

- [ ] **Step 7: Review checkpoint**

Confirm every new raw color in `app/globals.css` is declared in `DESIGN.md`. Do not commit unless explicitly requested.

### Task 3: Locale paths and metadata foundation

**Files:**
- Create: `lib/i18n.mjs`
- Create: `lib/seo.mjs`
- Create: `tests/i18n.test.mjs`
- Create: `tests/seo.test.mjs`
- Create: `components/layout/language-switch.js`
- Create: `components/layout/english-suggestion.js`

- [ ] **Step 1: Write failing locale tests**

Cover `ja` and `en`, Japanese-root/English-prefix paths, equivalent page pairs, `/en` Home, Japanese-only `/legal/tokushoho`, and missing-guide fallback to `/en/guide` or `/guide`.

- [ ] **Step 2: Write failing SEO tests**

Assert self-canonical URLs, reciprocal `ja`/`en` alternates only for existing pairs, and `x-default` targeting the matching Japanese route. Japanese-only guides must emit neither an English alternate nor `x-default` for a nonexistent equivalent.

- [ ] **Step 3: Run tests and verify RED**

Run:

```powershell
node --test tests/i18n.test.mjs tests/seo.test.mjs
```

Expected: FAIL because the modules do not exist.

- [ ] **Step 4: Implement `lib/i18n.mjs`**

Export `supportedLocales`, `defaultLocale`, `localePath(locale, path)`, `equivalentLocalePath(locale, path, inventory)`, and `guideFallbackPath(locale)`. Do not read IP or redirect from stored/browser language.

- [ ] **Step 5: Implement `lib/seo.mjs`**

Export one metadata builder accepting locale, pathname, title, description, image, and equivalent inventory. Return localized canonical, Open Graph locale, Twitter data, and alternates.

- [ ] **Step 6: Implement explicit language controls**

The language switch is an actual link to an equivalent URL. Store a preference only after a click. The English suggestion is rendered on Japanese Home only, on first visit when browser preference or an explicitly stored preference is English, is non-blocking and dismissible, and never navigates automatically. Add these cases to `tests/i18n.test.mjs`.

- [ ] **Step 7: Run tests**

Run:

```powershell
npm test
```

Expected: PASS for locale and SEO tests.

- [ ] **Step 8: Review checkpoint**

Search for `router.push` or redirect logic tied to navigator language. Expected: none in locale initialization.

### Task 4: Shared content registries and status behavior

**Files:**
- Create: `lib/content/status.mjs`
- Create: `lib/content/tool-content.mjs`
- Create: `lib/content/work-content.mjs`
- Create: `lib/content/site-copy.mjs`
- Create: `lib/content/guide-registry.mjs`
- Create: `tests/content-registry.test.mjs`
- Create: `components/ui/status-badge.js`
- Create: `components/ui/action-link.js`
- Create: `components/ui/product-media.js`

- [ ] **Step 1: Write failing registry tests**

Assert unique IDs, complete required locale copy, stable editorial order, valid statuses, status-appropriate destination URLs, guide mappings, no enabled launch action for unavailable/development/concept states, and publication approval for rendered works. Validate every required schema field:

- tool: localized name, summary, outcome, suitable audience, status, media/alt and intrinsic dimensions, category, order, optional featured rank, publish/update dates, optional locale guide mapping only after its route is implemented and verified, and URL only when status permits launch;
- work: stable ID, stable unique slug, localized title/summary, category, status, responsibilities, safe outcome evidence, media/alt, route or external URL, publish/update dates, and publication fields;
- guide: locale, stable slug, title, description, category, applicable tool/status, updated date, related guides, related tool action, and optional creator-service action.

- [ ] **Step 2: Run registry tests and verify RED**

Run:

```powershell
node --test tests/content-registry.test.mjs
```

Expected: FAIL because the registries do not exist.

- [ ] **Step 3: Implement status rules**

Encode `published`, `beta`, `unavailable`, `in-development`, and `concept` with labels, indexing permission, launch-action behavior, and guide-action behavior from the spec.

- [ ] **Step 4: Implement tool and guide records**

Add the three publication-verified current tools with localized name, summary, outcome, suitable audience, sanitized media paths and alt, intrinsic dimensions, status, dates, category, order, and featured rank. Add exact production URLs from Task 1 only for `published` or `beta`; blocked destinations use a non-launchable status and omit the URL. Add Guide mappings only after Task 10 implements and verifies the localized destination; the unverified fourth tool remains non-public.

- [ ] **Step 5: Implement work records**

Add Kuro Stream Kit and HP-portal with stable ID, stable unique slug, localized title/summary, responsibilities, safe outcome evidence, media/alt, route or external URL, publish/update dates, and publication fields. Add anonymized work only when `publicationApproved`, `publicationScope`, and `evidenceSource` are approved in the launch manifest.

- [ ] **Step 6: Implement localized site copy**

Add navigation, Home, Creator Site, About, Contact, footer, status, and unavailable messages. Add guide records with related guides, related tool actions, and optional creator-service actions. Keep Japanese and English complete for every required launch route.

- [ ] **Step 7: Implement shared UI primitives**

`StatusBadge` includes visible text and a non-color cue. Every `unavailable` record requires a localized `publicReason`; the unavailable presentation renders that reason adjacent to the status and replaces the launch action. `ActionLink` supports internal, external, disabled, and unavailable variants. `ProductMedia` requires width, height or aspect ratio, localized alt, and loading priority. Add registry assertions for the reason and presentation contract.

- [ ] **Step 8: Run tests, lint, and build**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 9: Review checkpoint**

Confirm page code will consume registries instead of defining status, URLs, or labels locally.

---

## Chunk 2: Marketing Shell, Home, and Tools Hub

### Task 5: Replace the app-like shell with the Creator Studio marketing shell

**Files:**
- Create: `components/layout/site-header.js`
- Create: `components/layout/site-footer.js`
- Modify: `components/site-shell.js`
- Modify: `app/layout.js`
- Modify: `app/globals.css`
- Modify: `components/theme-toggle.js`
- Delete after verification: `components/sidebar.js`
- Delete after verification: `components/mobile-nav.js`
- Delete after verification: `components/hexagon-background.js`

- [ ] **Step 1: Add a shell contract test**

Create `tests/shell-contract.test.mjs` that checks for skip-link target, header/footer, explicit language switch, mobile menu accessible state, and absence of legacy sidebar/bottom-nav imports. Assert that the logo points to the locale Home, all six localized destinations exist (`Tools`, `Creator websites`, `Works`, `Guide`, `kurodev`, `Contact`), Japanese and English labels come from shared copy, and Contact uses the distinct action variant. Assert footer links for Tools, Guide, Creator websites, Works, Contact, Terms, Privacy, and `/legal/tokushoho`; English copy must visibly label commercial disclosure as Japanese-only.

- [ ] **Step 2: Run the shell test and verify RED**

Run:

```powershell
node --test tests/shell-contract.test.mjs
```

Expected: FAIL because the new shell does not exist.

- [ ] **Step 3: Implement the shared shell**

Use a top header, centered content container, `main#main-content`, and localized footer with every destination from the shell contract. Desktop navigation is horizontal. Mobile navigation uses a menu button with `aria-expanded`, Escape close, backdrop close, focus return, and body scroll lock.

- [ ] **Step 4: Preserve theme behavior without changing brand hue**

Keep explicit light/dark control, initial system preference, persisted user choice, and reduced-motion behavior. Theme changes surface lightness only.

- [ ] **Step 5: Verify keyboard and mobile menu behavior in browser**

Run the production build, open Home at 375 and 1280 px, Tab through the header, open/close the mobile menu with keyboard, and confirm visible focus.

- [ ] **Step 6: Remove legacy shell files**

Delete legacy files only after `rg` confirms no imports remain.

- [ ] **Step 7: Run full checks**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 8: Review checkpoint**

Capture 375, 768, and 1280 px screenshots of the shell in both themes. Do not commit unless explicitly requested.

### Task 6: Build bilingual Home

**Files:**
- Create: `components/pages/home-page.js`
- Create: `components/sections/creator-hero.js`
- Create: `components/sections/featured-tools.js`
- Create: `components/sections/owned-site-need.js`
- Create: `components/sections/creator-service-bridge.js`
- Create: `components/sections/featured-work.js`
- Create: `components/sections/guide-entry.js`
- Create: `components/sections/maker-introduction.js`
- Create: `components/sections/final-actions.js`
- Modify: `app/page.js`
- Create: `app/en/page.js`
- Create: `tests/home-contract.test.mjs`

- [ ] **Step 1: Write the failing Home contract**

Assert one H1, two distinct primary actions, exactly three editorially selected tools, Kuro Stream Kit as flagship work, three-to-six guide entries, creator-service bridge, maker introduction, final dual actions, complete Japanese/English wrappers, and the dismissible English suggestion on Japanese Home only.

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
node --test tests/home-contract.test.mjs
```

Expected: FAIL because the shared Home view is absent.

- [ ] **Step 3: Build the shared Home view**

Use product media as the hero focal object. Implement every section in spec Section 7, including maker introduction and final tool/service actions. Render three-to-six guide entries from the registry. Do not add integration or synchronization claims.

- [ ] **Step 4: Add Japanese and English route wrappers**

Each wrapper passes locale and localized metadata. English Home lives at `/en`; Japanese remains `/`.

- [ ] **Step 5: Run test, lint, and build**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 6: Manual QA gate**

At 375/768/1024/1280 px, verify visual hierarchy, no horizontal overflow, correct language links, two distinct funnels, and reduced motion. Check both themes.

- [ ] **Step 7: Review checkpoint**

Compare rendered Home against the Creator Studio section of `DESIGN.md`; reject generic equal-card layouts.

### Task 7: Build bilingual Tools hub

**Files:**
- Create: `components/pages/tools-page.js`
- Create: `components/sections/tool-workflow.js`
- Create: `components/sections/tool-product-section.js`
- Create: `components/sections/tool-getting-started.js`
- Create: `app/tools/page.js`
- Create: `app/en/tools/page.js`
- Create: `tests/tools-contract.test.mjs`
- Delete after redirect verification: `app/tool/page.js`

- [ ] **Step 1: Write failing Tools tests**

Assert all four current tools render in stable order, one suite-level hero, hero actions for opening Kuro Stream Kit and reading Getting Started, no randomness, up to three stable getting-started recommendations, status-controlled actions, guide actions, workflow copy without sync claims, and creator-site bridge after product content.

- [ ] **Step 2: Run tests and verify RED**

Run:

```powershell
node --test tests/tools-contract.test.mjs
```

Expected: FAIL because `/tools` is absent.

- [ ] **Step 3: Build the Tools hub**

Use alternating horizontal product sections with real media. Add the two hero actions and a stable getting-started section sourced from editorial ranks. `published` and `beta` actions launch; other statuses follow shared rules.

- [ ] **Step 4: Add the old-route redirect**

Redirect `/tool` to `/tools` using a permanent server redirect only after destination verification. Do not redirect the global Tools navigation directly to Kuro Stream Kit.

- [ ] **Step 5: Run tests, lint, and build**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 6: Manual QA gate**

Verify `/tools` and `/en/tools` at all required widths, each tool/guide destination, external-link labeling, unavailable behavior, and tool-to-service bridge.

- [ ] **Step 7: Review checkpoint**

Confirm all tool content comes from the registry and screenshots contain sample data only.

---

## Chunk 3: Creator Service, Works, and Guides

### Task 8: Build bilingual Creator Website service

**Files:**
- Create: `components/pages/creator-site-page.js`
- Create: `components/sections/creator-recognition.js`
- Create: `components/sections/site-outcomes.js`
- Create: `components/sections/service-routes.js`
- Create: `components/sections/service-process.js`
- Create: `components/sections/service-faq.js`
- Create: `app/creator-site/page.js`
- Create: `app/en/creator-site/page.js`
- Create: `tests/creator-site-contract.test.mjs`

- [ ] **Step 1: Write the failing service-page contract**

Assert Template links to the canonical HP-portal plan page without copying a numeric price, Custom uses individual quote, two demonstration examples are labeled, and no automated Kuro Stream Kit integration claim appears.

- [ ] **Step 2: Run the test and verify RED**

Expected: FAIL because the service page does not exist.

- [ ] **Step 3: Build the service page from approved copy**

Follow spec Section 9 order. Use creator outcomes, workflow understanding, examples, process, two service routes, FAQ, and Contact action.

- [ ] **Step 4: Verify examples**

Use sample identities/assets and visible `制作例 / Demonstration` labels. Do not imply client results.

- [ ] **Step 5: Run checks and manual QA**

Run test, lint, build, then verify both locales and all required widths. Confirm the Template price remains external-source-only.

- [ ] **Step 6: Review checkpoint**

Check every current-capability statement against the launch manifest.

### Task 9: Build bilingual Works and Kuro Stream Kit case study

**Files:**
- Create: `components/pages/works-page.js`
- Create: `components/pages/kuro-stream-kit-case-study.js`
- Create: `components/sections/work-evidence.js`
- Create: `components/sections/product-map.js`
- Create: `components/ui/breadcrumbs.js`
- Create: `app/works/page.js`
- Create: `app/works/kuro-stream-kit/page.js`
- Create: `app/en/works/page.js`
- Create: `app/en/works/kuro-stream-kit/page.js`
- Create: `tests/works-contract.test.mjs`
- Delete after redirect verification: `app/web/page.js`

- [ ] **Step 1: Write failing publication tests**

Assert only `publicationApproved` works render, Kuro Stream Kit is flagship, conceptual work is lower priority, case-study breadcrumbs exist, and both locale routes exist. Require `publicationScope` and `evidenceSource`, documented provenance plus explicit approval for every numeric metric, and anonymization checks that reject both direct identifiers and combinations of facts that can re-identify a client.

- [ ] **Step 2: Run the test and verify RED**

Expected: FAIL because the new work views are absent.

- [ ] **Step 3: Build the Works index**

Render Flagship, Published Work, and Research/Development as separate hierarchies.

- [ ] **Step 4: Build the Kuro Stream Kit case study**

Implement all nine case-study sections: product hero with real screen, creator-workflow problem, current product map, the three publication-verified major tools and statuses, kurodev responsibilities, UI/operational design principles, safe selected before-and-after improvements, current product status, and product/guide/creator-service actions. Include localized breadcrumbs. Task 9 is complete with these three verified records while the fourth tool remains non-public; a future fourth record still requires its own complete publication intake and approval.

- [ ] **Step 5: Add the old-route redirect**

Redirect `/web` to `/works` after verifying the destination and metadata.

- [ ] **Step 6: Run the sanitized evidence review**

Search the page content and media manifest for credentials, browser storage, raw comments, raw responses, internal-only URLs, approval labels, private identifiers, unapproved metrics, missing evidence provenance, and re-identifying fact combinations. Expected: zero findings.

- [ ] **Step 7: Run checks and visual QA**

Run test, lint, build, then verify both locales and required widths.

- [ ] **Step 8: Review checkpoint**

Require explicit repository-owner approval for the exact public case-study copy and assets before release.

### Task 10: Build Markdown guide foundation and launch inventory

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `lib/guides/guide-loader.mjs`
- Create: `components/pages/guide-index-page.js`
- Create: `components/pages/guide-article-page.js`
- Modify: `components/ui/breadcrumbs.js`
- Create: `app/guide/page.js`
- Create: `app/guide/[slug]/page.js`
- Create: `app/guide/[category]/[slug]/page.js`
- Create: `app/en/guide/page.js`
- Create: `app/en/guide/[slug]/page.js`
- Create: `app/en/guide/[category]/[slug]/page.js`
- Create: `content/guides/ja/getting-started.md`
- Create: `content/guides/ja/schedule-calendar/getting-started.md`
- Create: `content/guides/ja/thumbnail-editor/getting-started.md`
- Create: `content/guides/ja/sns-split-image-maker/getting-started.md`
- Create: `content/guides/ja/comment-translator/getting-started.md`
- Create: `content/guides/ja/creator-site/profile-information.md`
- Create: `content/guides/ja/creator-site/what-to-include.md`
- Create: `content/guides/ja/creator-site/inquiry-route.md`
- Create: `content/guides/en/getting-started.md`
- Create: `content/guides/en/schedule-calendar/getting-started.md`
- Create: `content/guides/en/thumbnail-editor/getting-started.md`
- Create: `content/guides/en/sns-split-image-maker/getting-started.md`
- Create: `content/guides/en/comment-translator/getting-started.md`
- Create: `tests/guide-loader.test.mjs`

- [ ] **Step 1: Request dependency approval at execution start**

Install only after explicit approval:

```powershell
npm install gray-matter marked
```

Purpose: parse controlled source Markdown and front matter without introducing a CMS.

- [ ] **Step 2: Write failing guide-loader tests**

Cover front matter validation, English-slug rules, route uniqueness, all thirteen exact source files, sanitized HTML, raw HTML rejection, missing-English fallback, related links, and Comment Translator status-controlled action. Assert every article contains outcome, prerequisites, ordered steps, common problems, related tool action, and at least one approved repository-local screenshot with non-empty alt text.

- [ ] **Step 3: Run tests and verify RED**

Expected: FAIL because the loader and content do not exist.

- [ ] **Step 4: Implement the controlled Markdown loader**

Allow headings, paragraphs, lists, links, code, and images. Strip or reject raw HTML. Allow link protocols only from `https:`, `http:`, `mailto:`, or same-site relative paths; allow images only from approved repository-local `/images/guide/` paths. Reject protocol-relative, `javascript:`, `data:`, remote image, and traversal paths. Require title, description, updated date, category, applicable tool, status, locale, outcome, prerequisites, ordered steps, common problems, and related mappings.

- [ ] **Step 5: Create the exact launch guides**

Create the thirteen files listed in this task: five Japanese and five English tool guides plus three Japanese creator-activity guides. Use sanitized repository-local screenshots and verified current behavior only.

- [ ] **Step 6: Build guide index and article views**

Render categories without search, localized breadcrumbs, updated date, tool/status metadata, steps, common problems, related guides, and controlled actions.

- [ ] **Step 7: Add static params and metadata**

Generate only existing routes. Emit alternates only for reciprocal pairs. Japanese-only creator guides must not emit nonexistent English alternates.

- [ ] **Step 8: Run checks**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all exit 0 and all guide paths appear in build output.

- [ ] **Step 9: Manual QA gate**

Verify one tool guide and one creator guide at all required widths, keyboard link order, screenshot alt text, language switching, and missing-translation behavior.

- [ ] **Step 10: Review checkpoint**

Confirm no public Notion URL duplicates guide content and every screenshot uses sample data.

---

## Chunk 4: About, Contact, Legal, SEO, and Release QA

### Task 11: Build bilingual About and accessible Contact

**Files:**
- Create: `components/pages/about-page.js`
- Create: `components/pages/contact-page.js`
- Create: `lib/contact-validation.mjs`
- Create: `tests/contact-validation.test.mjs`
- Modify: `components/contact-form.js`
- Modify: `app/contact/page.js`
- Create: `app/about/page.js`
- Create: `app/en/about/page.js`
- Create: `app/en/contact/page.js`
- Modify: `app/api/contact/route.js`

- [ ] **Step 1: Write failing contact validation tests**

Cover required name/email/message, email and URL types, minimum message length, localized messages, first-invalid-field order, payload size boundary, and the four stable submitted category IDs: `creator-site`, `site-improvement`, `tool-service`, and `other`. Japanese and English labels differ, but the submitted IDs and server validation are locale-independent.

- [ ] **Step 2: Run tests and verify RED**

Expected: FAIL because validation is embedded in the client component.

- [ ] **Step 3: Extract and implement pure validation**

Return field-keyed localized errors in stable DOM order. The client sets `aria-invalid`, `aria-describedby`, and focuses the first invalid field. Render required/optional labels and minimum-input guidance before submission.

- [ ] **Step 4: Rebuild the Contact layout**

DOM and visible order are introduction, reassurance, form, pricing guide, FAQ. Desktop may use columns without CSS order inversion.

- [ ] **Step 5: Preserve the bounded submission boundary**

Keep `POST /api/contact`, Turnstile, timeouts, request-size limit, Resend, and anonymous logging. Update client and server to share the four stable category IDs. Disable during submit; no automatic retry. Link Privacy beside submit. Announce sending/success/failure through `role="status"` or `role="alert"` as appropriate. On service failure, show `contact@kuro-lab.com` without discarding the typed values.

- [ ] **Step 6: Build About**

Use maker purpose, creator focus, process, supported scope, and flagship links. Remove the code-editor identity card and technology-first hierarchy.

- [ ] **Step 7: Add complete reassurance copy**

Show localized activity-name acceptance, reply expectations, non-publication of submitted content, and the statement that an inquiry is not a contract.

- [ ] **Step 8: Run tests, lint, and build**

Expected: all exit 0.

- [ ] **Step 9: Manual QA gate**

At 375 and 1280 px, submit empty form locally, verify required/optional labels, minimum guidance, error association/focus, live-region status, all four localized category labels with stable submitted IDs, keyboard order, reassurance copy, and form-before-pricing order. Test success/failure only with approved non-production fixtures. Do not send real personal data during QA.

- [ ] **Step 10: Review checkpoint**

Confirm no message body, email, token, raw response, or identifier appears in console or server logs.

### Task 12: Add bilingual Terms/Privacy and Japanese commercial disclosure

**Files:**
- Create: `components/pages/legal-page.js`
- Create: `app/terms/page.js`
- Create: `app/en/terms/page.js`
- Create: `app/privacy/page.js`
- Create: `app/en/privacy/page.js`
- Create: `app/legal/tokushoho/page.js`
- Create: `tests/legal-routes.test.mjs`

- [ ] **Step 1: Gate on approved legal copy**

Do not generate legal claims. Require repository-owner-approved Japanese Terms, English Terms, Japanese Privacy, English Privacy, and Japanese commercial disclosure copy in the launch manifest, each with source path, owner, approval state, effective date, and update date. If any required entry is `blocked`, stop this task and do not create a placeholder route.

- [ ] **Step 2: Write failing legal-route tests**

Assert exact route inventory, bilingual metadata pairs for Terms/Privacy, Japanese-only self-canonical for commercial disclosure, and labeled English-footer link to the Japanese route.

- [ ] **Step 3: Run tests and verify RED**

Expected: FAIL because legal routes are absent.

- [ ] **Step 4: Build the shared legal page**

Render approved headings, effective/update date, readable line length, and language switch where an approved equivalent exists.

- [ ] **Step 5: Run checks and manual QA**

Run tests, lint, build; verify footer destinations and metadata in both locales.

- [ ] **Step 6: Review checkpoint**

Confirm commercial disclosure has no unreviewed English translation or English hreflang.

### Task 13: Complete sitemap, robots, Open Graph, and redirect inventory

**Files:**
- Modify: `app/sitemap.js`
- Modify: `app/robots.js`
- Modify: `app/opengraph-image.js`
- Modify: `next.config.mjs`
- Create: `tests/route-inventory.test.mjs`

- [ ] **Step 1: Write the failing route-inventory test**

Assert every required indexable route, locale pair, guide path, canonical, redirect, sitemap entry, unique localized title/description, localized Open Graph fields, and Japanese-only legal exception. Assert no `/tool`, `/web`, or `/profile` index page remains after redirects.

- [ ] **Step 2: Run test and verify RED**

Expected: FAIL until the bilingual inventory is complete.

- [ ] **Step 3: Implement sitemap and robots from registries**

Emit only existing/indexable routes. Include alternates only for reciprocal locale pairs. Exclude concept and thin in-development item pages.

- [ ] **Step 4: Update Open Graph output**

Use the kurodev umbrella brand and Creator Studio visual language. Generate localized title, description, locale, alt text, and image metadata for every indexable Japanese and English route. Do not use stale portal copy.

- [ ] **Step 5: Implement permanent legacy redirects**

Map `/tool` to `/tools`, `/web` to `/works`, and `/profile` to `/about`. Preserve relevant locale intent only where a legacy English route exists.

- [ ] **Step 6: Run checks**

Run test, lint, and build. Inspect generated `robots.txt`, `sitemap.xml`, and Open Graph route in the production server.

- [ ] **Step 7: Review checkpoint**

Confirm no redirect chain, nonexistent alternate, or duplicate canonical.

### Task 14: Pre-merge release-wide browser, accessibility, and performance verification

**Files:**
- Update: `docs/active/KURODEV_REDESIGN_LAUNCH_CONTENT.md`
- Update: `task.md`
- Create: `docs/KURODEV_CREATOR_PLATFORM_QA.md`

- [ ] **Step 1: Run the complete automated suite**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 2: Start the production server**

Run:

```powershell
npm run start -- -p 3100
```

Expected: Next.js production server ready at `http://localhost:3100`.

- [ ] **Step 3: Verify all key routes at four widths**

Check Japanese and English Home, Tools, Creator Site, Works, case study, Guide index, all five Japanese/English tool-guide pairs, all three Japanese-only creator guides, About, Contact, Terms, Privacy, and commercial disclosure at 375/768/1024/1280 px. Verify every public tool-to-tool and tool-to-guide destination.

- [ ] **Step 4: Verify interactions and states**

Test keyboard navigation, mobile menu, language links, theme switch, unavailable tool, external links, Contact validation/live regions, reduced motion, and missing-English guide fallback. Record evidence for horizontal overflow, minimum 44 px targets, 4.5:1 normal-text contrast, sequential headings, skip link, color-independent statuses, stable media dimensions, and visible focus.

- [ ] **Step 5: Run browser-based performance/accessibility audits**

Use real Chrome against the production build for `/`, `/tools`, `/creator-site`, `/guide/getting-started`, and `/contact`, with mobile and desktop presets and three runs per route. Record the median Performance, Accessibility, Best Practices, and SEO scores plus LCP, CLS, and TBT. Required threshold is 100 in all four Lighthouse categories on both presets; diagnose app-owned failures and do not remove features or motion to buy scores.

- [ ] **Step 6: Review publication and privacy gates**

Confirm exact public images/copy were approved. Confirm no credential, token, cookie, Authorization/header value, browser storage, raw response, raw comment, or private identifier is rendered or logged.

- [ ] **Step 7: Record pre-merge QA evidence**

Write pass/fail, route, width, theme, and sanitized issue labels to `docs/KURODEV_CREATOR_PLATFORM_QA.md`. Do not paste raw form input or responses.

- [ ] **Step 8: Update `task.md`**

Move only verified pre-merge slices to Done. Record post-merge production verification as explicitly pending; it is not a blocker for creating the final preview-to-`main` PR.

- [ ] **Step 9: Final pre-merge review checkpoint**

Inspect `git diff --check`, `git status --short`, the full diff, and current `origin/main` containment. Commit, push, final PR creation, and final merge remain separate explicit user decisions.

- [ ] **Step 10: Final PR, merge, and deployment handoff sequence**

After the final PR is approved but before final merge:

```text
re-fetch origin/main
  -> if changed, separately approve merge of origin/main into preview
  -> rerun all Task 14 checks
  -> require containment command exit 0
  -> separately approve final PR merge
  -> merge final PR
  -> separately approve production deployment
  -> deploy
  -> begin Task 15
```

Do not collapse the final-merge and deployment approvals into one implied approval.

### Task 15: Post-merge production verification

**Files:**
- Update: `docs/KURODEV_CREATOR_PLATFORM_QA.md`
- Update: `task.md`

- [ ] **Step 1: Verify production after approved merge/deployment**

Confirm production headers, routes, redirects, sitemap, Open Graph, language alternates, all tool/guide destinations, and Contact behavior using safe approved test data. Label checks as production evidence; do not record raw form content or responses.

- [ ] **Step 2: Close production-only checklist items**

Update QA and `task.md` only for checks actually observed on production. Leave blocked external configuration items open with a sanitized reason.

- [ ] **Step 3: Retain preview until completion**

Do not delete the preview integration branch or worktree until production verification is complete and cleanup receives separate explicit approval.

---

## Execution Order and PR Boundaries

Recommended slice PRs targeting `codex/creator-platform-redesign-preview`:

1. Foundation and shared shell: Tasks 1–5
2. Home: Task 6
3. Tools hub: Task 7
4. Creator website service: Task 8
5. Works and case study: Task 9
6. Guide system and launch content: Task 10
7. About and Contact: Task 11
8. Legal pages: Task 12
9. SEO, legacy redirects, and pre-merge release QA: Tasks 13–14

Each boundary must satisfy its own automated checks and browser QA before the next boundary begins. Do not create a PR for a boundary that has not met its completion criteria.

After boundary 9 passes, create one final PR from `codex/creator-platform-redesign-preview` to `main` only after explicit approval. The final PR must contain hosted-preview evidence or explicitly labeled `local-integration-production-build` evidence, current `origin/main` containment check, build/test results, sanitized publication review, and an explicit statement that Task 15 production-only checks remain pending.

Task 15 begins only after separately approved final merge and deployment. It is not part of boundary 9 and does not block final PR creation, but the overall redesign remains operationally incomplete until its production-only checks are resolved.
