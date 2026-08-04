# Static-First Cloudflare Delivery Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve normal public GETs for kuro-lab.com directly from Cloudflare Static Assets, delegate `/api/*` to OpenNext, and limit non-API asset misses to a lightweight guard that cannot enter OpenNext SSR.

**Architecture:** Keep Next/OpenNext as the source build, snapshot the complete public route inventory from a local built server, strip framework runtime payloads at build time, and atomically publish validated documents into `.open-next/assets`. Remove runtime self-fetch and configure Cloudflare assets to invoke the Worker first only for APIs.

**Tech Stack:** Next.js 15, React 18, OpenNext Cloudflare 1.20, Wrangler 4.118, Node.js built-in test runner

---

## Constraints and approval boundary

- This plan does not authorize implementation, dependency changes, build/upload/deploy, or Cloudflare mutations.
- Keep `package.json` and `package-lock.json` unchanged unless separately approved.
- Never send a Contact POST or call live Turnstile/Resend while implementing or verifying the build pipeline.
- Never remove the full production Route. Any later rollback restores the previous Worker version.
- Generated `.next` and `.open-next` output stays untracked.

## Chunk 1: Build-time authority and generation

### Task 1: Establish one public-route authority and failing contracts

**Files:**

- Create: `lib/public-route-inventory.mjs`
- Modify: `app/sitemap.js`
- Modify: `tests/cloudflare-opennext-contract.test.mjs`
- Modify: `tests/performance-contract.test.mjs`
- Test: `tests/cloudflare-opennext-contract.test.mjs`
- Test: `tests/performance-contract.test.mjs`

- [ ] Add failing tests that require a shared inventory for primary, localized, legal, publication-approved Works, and Guide routes.
- [ ] Add failing assertions for the intended asset-first Wrangler contract and the absence of a self-service binding.
- [ ] Add failing transformer assertions that public documents contain required metadata/content but no Next hydration, Flight, or script-preload payloads.
- [ ] Run `node --test tests/cloudflare-opennext-contract.test.mjs tests/performance-contract.test.mjs` and record the expected RED failures.
- [ ] Implement `lib/public-route-inventory.mjs` by extracting the route pairs and visibility rules currently embedded in `app/sitemap.js`; preserve Guide `indexable` and publication-approved Work filtering.
- [ ] Refactor `app/sitemap.js` to consume the shared authority and preserve current alternate-language and `lastModified` output.
- [ ] Rerun the two focused test files and confirm only later-task assertions remain RED.
- [ ] Commit this bounded slice as `test: define static-first route and asset contracts` after separate commit approval.

**Acceptance:** Sitemap behavior is preserved, one inventory owns the public surface, and contracts precisely describe the future static asset/runtime boundary.

### Task 2: Build and validate the static document candidate atomically

**Files:**

- Create: `scripts/build-static-first-cloudflare.mjs`
- Modify: `lib/static-guide-document.mjs`
- Delete: `middleware.js`
- Modify: `package.json`
- Modify: `tests/performance-contract.test.mjs`
- Modify: `.gitignore` only if the existing generated-output rules are insufficient

- [ ] Refactor `lib/static-guide-document.mjs` into a pure response-to-document transformer; retain theme, menu, skip-link, Guide, and Contact islands while removing runtime fetch helpers. Delete `middleware.js`; the snapshot request itself must set `x-kurodev-locale` from the pathname so English output remains English.
- [ ] Implement orchestration that preserves the previous complete `.open-next` output in a sibling recovery directory, refuses an ambiguous stale recovery state, runs the existing OpenNext build cleanly, starts the built server on an isolated local port, snapshots every inventory route, and always terminates the server.
- [ ] Initialize the candidate with the complete generated asset tree, then add transformed documents, `404.html`, `_headers`, and `_redirects`. Keep the new full `.open-next` output only after validation; restore the previous output on ordinary failure and make interruption recovery explicit on the next invocation.
- [ ] Validate status/content type, route completeness, metadata landmarks, prohibited Next payloads, required islands, sitemap parity, redirects, headers, 404, robots, and every local `src`, `srcset`, and `href` target. Verify extensionless Open Graph output has the intended MIME type.
- [ ] Require an approved, correctly formed `NEXT_PUBLIC_TURNSTILE_SITE_KEY` when producing the Contact island; fail the build on a missing/empty value without printing it.
- [ ] Add a `build:cloudflare:static` script that calls the orchestrator without adding dependencies.
- [ ] Ensure the build issues GET requests only to the isolated local server and cannot submit `/api/contact` or call live providers.
- [ ] Run `node --test tests/performance-contract.test.mjs` and then `npm test`.
- [ ] Run `npm run build:cloudflare:static` and inspect the generated inventory without committing generated output.
- [ ] Commit this bounded slice as `build: generate validated static Cloudflare documents` after separate commit approval.

**Acceptance:** A failed route or validation leaves no mixed asset set; a successful run produces the complete public surface with no framework runtime payload on public documents.

## Chunk 2: Runtime cutover and regression protection

### Task 3: Make assets authoritative and remove Worker self-recursion

**Files:**

- Create: `worker/static-first-entry.mjs`
- Modify: `wrangler.jsonc`
- Modify: `tests/cloudflare-opennext-contract.test.mjs`
- Modify: `tests/performance-contract.test.mjs`

- [ ] Remove `WORKER_SELF_REFERENCE` and every runtime self-fetch assertion/helper.
- [ ] Add a stable entry wrapper that delegates `/api/*` to the generated OpenNext handler and returns `env.ASSETS.fetch(request)` for every other Worker invocation. It must never execute OpenNext page SSR for a non-API request.
- [ ] Configure assets with `run_worker_first: ["/api/*"]`, `html_handling: "drop-trailing-slash"`, and `not_found_handling: "404-page"`.
- [ ] Preserve `CONTACT_RATE_LIMITER`, observability, `keep_vars`, `workers_dev`, preview URLs, compatibility flags, and the OpenNext Worker entry point.
- [ ] Add negative tests proving public paths do not opt into Worker-first routing and `/api/contact` still does. Include unknown-document and missing-asset GETs without `Sec-Fetch-Mode`; both must return the static asset 404 path without entering OpenNext SSR.
- [ ] Confirm the Contact handler keeps rate limit → JSON → validation → consent → Turnstile → Resend ordering and that no secret/provider logic moved client-side.
- [ ] Run `node --test tests/cloudflare-opennext-contract.test.mjs tests/performance-contract.test.mjs` and `npm test`.
- [ ] Commit this bounded slice as `fix: route public documents through static assets` after separate commit approval.

**Acceptance:** Matching public assets bypass Worker code; non-API misses execute only the lightweight asset guard and never OpenNext SSR; no self-binding remains; and the Contact API contract is unchanged.

## Chunk 3: Full verification and release-ready evidence

### Task 4: Prove the artifact, browser behavior, and staged rollout controls

**Files:**

- Modify: `docs/KURODEV_CREATOR_PLATFORM_QA.md`
- Modify: `task.md` only if the repository workflow requires current-task evidence there
- Modify tests or build validators only when verification exposes a real contract gap

- [ ] Run `npm test`, `npm run lint`, `npm run build`, and `npm run build:cloudflare:static` from a clean worktree.
- [ ] Run `npx wrangler deploy --dry-run --keep-vars --strict`; do not upload or deploy.
- [ ] Start `npx wrangler dev` locally against the generated artifact. Send GET-only probes for documents, `_headers`, redirects, 404, `/api/*` routing, an unknown URL, and a missing asset; do not submit Contact.
- [ ] Confirm `git status --short`, `git diff --stat`, and `git diff --check`; verify no generated assets, dependency changes, secrets, IDs, or unrelated files are present.
- [ ] Browser-test the local Wrangler origin at widths 375 and 1280 across the five primary routes, seven legal routes, Japanese/English Guide boundaries, redirects, 404, robots, sitemap, Open Graph assets, and favicon.
- [ ] Verify theme, mobile menu, skip link, Guide interactions, Contact client validation, zero unexpected console/network errors, and no horizontal overflow. Do not submit Contact.
- [ ] Disable JavaScript and confirm that public content, navigation, metadata-relevant text, and legal documents remain readable.
- [ ] Run the formal Lighthouse 13.4.1 matrix: five routes × mobile/desktop × three runs; require every median to remain 100.
- [ ] Record sanitized evidence and UNKNOWNs in `docs/KURODEV_CREATOR_PLATFORM_QA.md`, including the no-POST boundary and dry-run-only Cloudflare result.
- [ ] Request a fresh semantic review, address findings, and rerun affected checks.
- [ ] Commit, push, and open a Draft PR only under their separate approvals. Keep upload, preview activation, production deploy, Route changes, and cleanup unperformed.

**Acceptance:** The PR contains reproducible local evidence for the static boundary and preserves a clear approval gate before any external mutation.

## Later release sequence (not authorized by this plan)

After merge and separate owner approval: upload a new Worker version without traffic, GET-test the version-specific preview URL, approve production deployment separately, then check the custom domain immediately and at 15 minutes, 1 hour, and 2 hours. Require zero new-version `exceededResources` events. Roll back to the captured previous Worker version on any 5xx, unexpected 404, rendering/header/redirect/control-file regression, Contact binding failure, unexpected public Worker invocation, or resource-limit error.
