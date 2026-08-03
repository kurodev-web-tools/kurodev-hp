# Home Heading and Background Polish Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the global studio grid and make the three annotated Japanese desktop headings read in one or two intentional lines without regressing mobile CJK wrapping.

**Architecture:** Preserve the existing localized `titleLines` content as the mobile/tablet semantic contract. At the desktop breakpoint, change only the shared display-line presentation so the spans participate in natural balanced wrapping, with a Guide-specific width override. Keep the atmospheric radial light and section rules while removing the grid layers and token.

**Tech Stack:** Next.js 14, React 18, CSS, Node test runner, Playwright/browser visual QA

---

## Chunk 1: Contract and implementation

### Task 1: Lock the approved visual contract

**Files:**
- Modify: `DESIGN.md`
- Modify: `tests/design-contract.test.mjs`

- [ ] **Step 1: Update the design contract**

Replace the atmosphere rule requiring a low-opacity studio grid with the approved no-grid direction. State that desktop section headings use one or two balanced lines while mobile keeps semantic line groups.

- [ ] **Step 2: Write failing assertions**

Assert that `app/globals.css` does not contain `--studio-grid` or the two linear grid gradients, and that `app/styles/components.css` contains a desktop rule changing `.display-line` to inline flow with `white-space: normal`.

- [ ] **Step 3: Run the focused test and verify RED**

Run: `node --test tests/design-contract.test.mjs`

Expected: FAIL because the grid token/layers still exist and desktop display lines remain block-level.

### Task 2: Implement background and desktop heading polish

**Files:**
- Modify: `app/globals.css`
- Modify: `app/styles/components.css`

- [ ] **Step 1: Remove the global grid**

Delete `--studio-grid` from light and dark token maps. Remove both repeating linear-gradient layers and their grid sizes from `body`; retain the cyan radial light and canvas.

- [ ] **Step 2: Relax display lines only on desktop**

Under `@media (min-width: 1024px)`, set `.section-intro .display-line` to `display: inline` and `white-space: normal` so the semantic spans can combine and balance across one or two lines. Preserve `.creator-hero__title-line` and all mobile/tablet block/nowrap behavior.

- [ ] **Step 3: Give Guide enough desktop width**

Within the desktop rule, allow `.guide-list`'s preceding section intro to use the available container width so the Guide heading resolves to one or two lines rather than three.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `node --test tests/design-contract.test.mjs tests/content-registry.test.mjs`

Expected: all tests pass.

## Chunk 2: Verification

### Task 3: Verify the rendered Home

**Files:**
- Verify: `app/globals.css`
- Verify: `app/styles/components.css`
- Verify: `output/playwright/home-ja-*.png`

- [ ] **Step 1: Run project checks**

Run: `npm test`, `npm run lint`, `npm run build`, and `git diff --check`.

Expected: all exit 0.

- [ ] **Step 2: Run browser checks**

Capture Japanese Home at 375, 768, 1024, and 1280px in dark mode, plus 1280px in light mode. Confirm no overflow, one H1, no console errors, and no undersized interactive targets.

- [ ] **Step 3: Review the annotated regions**

Confirm:

- Kuro Stream Kit heading is one or two lines on desktop.
- Guide heading is one or two lines on desktop.
- kurodev heading is one or two lines on desktop.
- Mobile semantic line groups remain natural.
- No repeated full-page grid remains in either theme.

- [ ] **Step 4: Inspect final diff and status**

Run: `git diff --check`, `git diff --stat`, and `git status --short --branch`.

Expected: only intended implementation, test, and design-plan changes are present; commit, push, PR, and deploy remain approval-gated.
