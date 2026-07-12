# Home Heading and Background Polish Design

## Status

Approved in the visual companion on 2026-07-12. Selected direction: **A — no global grid**.

## Goal

Reduce visual noise on the Creator Studio Home while making desktop section headings read as intentional one- or two-line statements.

## Background

- Remove the repeated full-page studio grid from both themes.
- Keep the deep navy or paper canvas, restrained cyan radial light, tonal gradients, and existing section dividers.
- Do not replace the grid with another decorative pattern.
- Forced-colors behavior remains unchanged.

## Heading behavior

- At desktop widths, the annotated Japanese section headings may reflow naturally into one or two lines.
- Kuro Stream Kit introduction: two lines at typical desktop widths.
- Guide introduction: one line when the container permits, otherwise two balanced lines.
- kurodev introduction: two lines within its two-column layout.
- At mobile and tablet widths, keep the existing semantic `titleLines` blocks to avoid unnatural CJK breaks.
- The hero heading is outside this polish slice and retains its approved line groups.

## Responsive and accessibility constraints

- Breakpoint for relaxed desktop line grouping: `1024px` and above.
- No horizontal overflow at 375, 768, 1024, or 1280px.
- Dark and light themes must retain readable contrast.
- Existing heading hierarchy, DOM text, and one-H1 contract remain unchanged.

## Verification

- Contract tests cover the no-grid background and desktop line-flow rule.
- Browser captures cover Japanese Home at 375, 768, 1024, and 1280px, plus a 1280px light-theme check.
- Review the three annotated headings and confirm the background no longer reads as a blueprint grid.
