# kurodev redesign launch content intake

## Baseline

- Reviewed site line: `codex-kurodev-portal-initial` at `a221567` when the preview worktree was created.
- Preview integration branch: `codex/creator-platform-redesign-preview`.
- `origin/main` was fetched on 2026-07-11. Merging it into preview remains a separate explicit mutation gate.
- Preview mode is currently `local-integration-production-build`; no hosted preview configuration was changed.

## Publication-safe product media

| Public file | Source role | SHA-256 |
| --- | --- | --- |
| `portal-home.png` | Kuro Stream Kit suite overview | `bada1b81175936a126817cf3d620fcc524f35ff7c4c7b540731bb9d886ee8a1a` |
| `schedule-calendar.png` | Schedule Calendar product screen | `96e017fedce218ef34103d0798644304566457c42097428dddb2130158310061` |
| `thumbnail-editor.png` | Thumbnail Editor product screen | `b18db331f51333cf925e479461b2474a3c3431bbcc655eeb231d132bf0b89c32` |
| `sns-split.png` | SNS Split Image Maker product screen | `70b5c00e26c6674e3d885e19572503b1eeee84475ce1dd6d3e6f5ebf68420596` |

The source images came from a publication-oriented launch-announcement output and were manually inspected. They contain sample UI rather than credentials or raw user submissions. Recheck alt text and crop before launch.

## Verified public inventory

The inspected public metadata and copy currently name three available tools:

1. Schedule Calendar
2. Thumbnail Editor
3. SNS分割画像メーカー / SNS Split Image Maker

The user previously described four current tools, but the fourth available item is not verified in the inspected public source. Until its title, URL, locale coverage, and status are confirmed:

- Home may feature the three verified tools.
- Tools may reserve a layout position but must not label it available or expose a Use action.
- Generated mock labels such as `配信ワークフロー` are not product records.

## Launch blockers requiring owner content

- Confirm the fourth tool record: public name, Japanese/English copy, status, URL, guide URL, and publication-safe screen.
- Confirm production destinations for the three verified tool actions.
- Approve creator-site service scope and the canonical HP-portal pricing link before pricing-related copy ships.
- Approve public identity details for About and all legal texts before those routes launch.
- Confirm which client work can be named or must be anonymized.

## Hard exclusions

- No automatic Schedule Calendar to creator-website synchronization claim.
- No random tool ordering.
- No conceptual item presented as available.
- No internal repository name on public pages.
- No secret, token, cookie, authorization header, browser storage, raw response, or raw user content in evidence or UI.
