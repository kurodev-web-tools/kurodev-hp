# Task 9 Works and Kuro Stream Kit owner approval packet v10

## Purpose and approval state

This packet freezes the changed Task 9 public records, destinations, media, and publication-safety corrections after the approved v5 snapshot and the superseded, unapproved v6, v7, v8, and v9 drafts.

- Packet ID: `task9-owner-approval-2026-07-13-v10`
- Prepared date: `2026-07-13`
- Approval manifest ID: `f77189b830aaf1a730233ac892656f990a310d821c945cf9c7fac215469226f6`
- Governed entries: 29 source, presentation, route, and media fingerprints
- Current state: superseded historical draft; never approved; the only current approval candidate is v11

The approved v5 packet remains unchanged at `docs/active/KURODEV_TASK9_OWNER_APPROVAL_PACKET.md`. Its product-history attestation and exact copy approval remain evidence for the unchanged copy carried into v10. This packet does not rewrite or broaden that attestation.

The manifest is SHA-256 of the 29 governed `path:sha256` entries below using ordinal ascending path order, lowercase hashes, UTF-8 without BOM, LF separators, and no trailing newline. This packet is not self-hashed. Any governed-file change requires a new Packet ID, manifest ID, review, and explicit approval.

## Owner-confirmed v10 input decisions

| Record | Exact v10 value |
| --- | --- |
| Kuro Stream Kit publish date | `2026-05-18` |
| Kuro Stream Kit updated date | `2026-05-18` |
| Kuro Stream Kit update boundary | The partially public translation tool is excluded while Google Auth Platform review is pending. |
| HP-portal publish date | `2026-03-16` |
| HP-portal updated date | `2026-04-06` |
| HP-portal image | `/images/works/hp-portal.png` |
| HP-portal Japanese alt | `HP-portalのWebサイトテンプレートを紹介するキービジュアル` |
| HP-portal English alt | `Key visual introducing HP-portal website templates` |
| Product-level action | `/tools` and `/en/tools` hubs |
| Initial client work | None |
| Initial numeric outcome metrics | None |
| Guide action | Absent until Task 10 implements and verifies both locales |
| Fourth tool | Non-public; no record, claim, media, or action rendered |
| Task 9 completion | Exactly the three publication-verified tools below satisfy the current Task 9 scope |

## Exact tool records fixed in v10

| Tool | Production URL | Category | Publish date | Updated date | Media dimensions | Guide action |
| --- | --- | --- | --- | --- | --- | --- |
| Schedule Calendar | `https://streamer-tools.kuro-lab.com/tools/schedule-calendar/` | `配信ワークフロー / Stream Workflow` | `2026-05-18` | `2026-05-18` | `1920 x 1080` | Absent |
| Thumbnail Editor | `https://streamer-tools.kuro-lab.com/tools/thumbnail-editor/` | `配信ワークフロー / Stream Workflow` | `2026-05-18` | `2026-05-18` | `1920 x 1080` | Absent |
| SNS Split Image Maker | `https://streamer-tools.kuro-lab.com/tools/sns-split-image-maker/` | `配信ワークフロー / Stream Workflow` | `2026-05-18` | `2026-05-18` | `1920 x 1080` | Absent |

All three supplied destinations returned HTTP `200` during the sanitized local verification on 2026-07-13. The registry contains no fourth record and no `guideHref`.

## Exact work-record values

### Kuro Stream Kit

- `publishedAt`: `2026-05-18`
- `updatedAt`: `2026-05-18`
- `imageWidth`: `1920`
- `imageHeight`: `1080`
- `evidenceSource`: `launch-content-manifest:publication-safe-product-media; owner-attestation:task9-owner-approval-2026-07-13-v5; owner-record-input:2026-07-13`

### HP-portal

- `publishedAt`: `2026-03-16`
- `updatedAt`: `2026-04-06`
- `image`: `/images/works/hp-portal.png`
- `imageWidth`: `1200`
- `imageHeight`: `630`
- `publicationScope`: `public template-platform summary, publication-safe media, and public destination`
- `evidenceSource`: `owner-reviewed-creator-site-scope:2026-07-12; owner-record-and-media-input:2026-07-13`
- Japanese alt: `HP-portalのWebサイトテンプレートを紹介するキービジュアル`
- English alt: `Key visual introducing HP-portal website templates`

Published work validation now fails closed when a publication-approved work lacks a publish date, updated date, sized image, or either localized alt. Every `outcomeMetrics` entry, including a string such as `40%`, requires documented provenance and explicit public-use approval.

## Publication-safety corrections added after v6 through v9 review

- Home, both case-study routes, the case component, and sitemap now share `getPublicationApprovedWorkBySlug`; revocation removes the public render path and sitemap entry, while an invalid approved record fails closed.
- Kuro Stream Kit and all three tool screens use their verified `1920 x 1080` intrinsic dimensions on Home, Tools, and the case study.
- The Home product stage and Tools hero consume the approved flagship and tool records as their media SSOT; they contain no duplicated image path, alt, or dimensions.
- Japanese external Use actions announce `（新しいタブで開きます）`; English actions retain `(opens in a new tab)`.
- The mobile language action uses `white-space: nowrap` and cannot split `日本語` across lines.
- Japanese page and footer copy uses phrase-aware line breaking in supporting browsers, preserving the exact approved copy while preventing one-character, particle, auxiliary, and compound-word orphans.
- Sections 15 and 21 and Task 4 now state that only three publication-verified tools launch initially, the fourth remains non-public, and Guide mappings/actions are added only after Task 10 implements and verifies their localized routes.

## Exact public media

| Public file | Intended use | Dimensions and format | SHA-256 | Review state |
| --- | --- | --- | --- | --- |
| `public/images/kuro-stream-kit/portal-home.png` | Case-study hero and flagship Works card | 1920 x 1080 PNG | `bada1b81175936a126817cf3d620fcc524f35ff7c4c7b540731bb9d886ee8a1a` | Approved in v5; carried forward unchanged |
| `public/images/kuro-stream-kit/schedule-calendar.png` | Schedule Calendar product screen | 1920 x 1080 PNG | `96e017fedce218ef34103d0798644304566457c42097428dddb2130158310061` | Approved in v5; carried forward unchanged |
| `public/images/kuro-stream-kit/thumbnail-editor.png` | Thumbnail Editor product screen | 1920 x 1080 PNG | `507f454445cb05b8f9e460d226011a411ef623130ed501514cfc902b3eebbee1` | Approved in v5; carried forward unchanged |
| `public/images/kuro-stream-kit/sns-split.png` | SNS Split Image Maker product screen | 1920 x 1080 PNG | `70b5c00e26c6674e3d885e19572503b1eeee84475ce1dd6d3e6f5ebf68420596` | Approved in v5; carried forward unchanged |
| `public/images/works/hp-portal.png` | HP-portal Works card | 1200 x 630 RGB PNG | `04c6f763a4b0219a6259bd261b07d764c55b6c006db100377bae8d179260ba80` | Owner approved the public OG image and localized alt inputs; final v10 manifest approval pending |

The HP-portal image contains only `IHDR`, `IDAT`, and `IEND` PNG chunks. It contains no text/EXIF chunk and no bytes after `IEND`. Manual review found no credentials, browser storage, raw user content, private URL, private identifier, or approval label.

## Governed source and media fingerprints

| Path | SHA-256 |
| --- | --- |
| `app/en/works/kuro-stream-kit/page.js` | `01ea543893113411aefecd213b1f051574ea333f3ad8f9adee113dc06e8f2b35` |
| `app/en/works/page.js` | `5bbab7851bdcb2389a214534ae9e44fb3097dc5516dbd78c90c4a03572fbe252` |
| `app/layout.js` | `c27d76c6ef39c2dff1bc86bbd19acf5581336110c19515e9f951c55727822374` |
| `app/sitemap.js` | `c82bf2af2a6ae3cf3eae462d7949e331f0f31ed4d2c443c484089da3a2b224a7` |
| `app/styles/shell.css` | `0f8bdb9076c8a7f02f5dcc97777cab0971e684a570203a9dd2c863822cb87a9a` |
| `app/styles/works-page.css` | `7ffc7338c5af6f95569d4ed5d9398d9bc0995d7a00f38b9bed7c79ef8df815db` |
| `app/works/kuro-stream-kit/page.js` | `8a34d752df03a3ed1f3c0aed50b278c68670508647a2cd27d6428591b92e3fa1` |
| `app/works/page.js` | `630a799f73a4c35bc4195d5a6d14e8b4eff5e98b8f3eb84cbbbaff26a5aec693` |
| `components/pages/home-page.js` | `f2a2342e64de8f3cc58b8a1f8d01b871e2bedd0c3fa063777fca77ed80a1daac` |
| `components/pages/kuro-stream-kit-case-study.js` | `3757b8e0536c2cf12e50be7b47b4b4951ca992897b404f2be89b4771aa89d343` |
| `components/pages/tools-page.js` | `e7f636119bede7f957fdf2b41a2b8ff4a8b701e26f88757a945d47bcce4e4e8b` |
| `components/pages/works-page.js` | `0a9ef2c28f97915d6f39ff6e40494d8ff1f06d8f423161bc483d93865a9db811` |
| `components/sections/creator-hero.js` | `61d15838e458a7a3ab390a49ecf9cfbc29a8a14dd8567d1a267b60eedf671052` |
| `components/sections/featured-tools.js` | `59d6fa7800a4c2f3111cb4017f39d87525705aa580b204ed5b2d9d67a7318a9a` |
| `components/sections/featured-work.js` | `b3bd1979ccbc4516023f5b70ee7fca4fef0cf12277205f554e5a7d860e5749b3` |
| `components/sections/product-map.js` | `ea4d2e40121a598c7c0399f581cafaed8ff8c79420b1f810105b902d59f150e2` |
| `components/sections/tool-product-section.js` | `dae7118a4c7814130318bfa7c66d60f808442dc864022a486a3989ce66a0166c` |
| `components/sections/work-evidence.js` | `e9a7f44172873bb004a590b94d2a7c8f83877dff04c78b6c205e866c6087f493` |
| `components/ui/action-link.js` | `4f5d70116cb80d736f83cf95b252ae8aef9d8f6aa1a5e94b4e92bdf67b317836` |
| `components/ui/breadcrumbs.js` | `9a0439103fb09077e4432163edfd0bcf06da8d89def455a52d0ed6ed7c7b1c5a` |
| `components/ui/status-badge.js` | `c35397dcaa8f172cfcc1e296dcee5721a885c3c5da8f8741414b78d629842710` |
| `lib/content/status.mjs` | `ffd5a47aaeff10169ed8128cc50e3176221560b5b1d1278d84149c5bf1df2609` |
| `lib/content/tool-content.mjs` | `2e29eb41ff0a4aead2c9292c07b549968a1accd41379f13ce05abb6bcee13e5c` |
| `lib/content/work-content.mjs` | `b766c594eb6e52738ff769e4e4324bbf382ee9c1140b3457aff0e0d00978b96f` |
| `public/images/kuro-stream-kit/portal-home.png` | `bada1b81175936a126817cf3d620fcc524f35ff7c4c7b540731bb9d886ee8a1a` |
| `public/images/kuro-stream-kit/schedule-calendar.png` | `96e017fedce218ef34103d0798644304566457c42097428dddb2130158310061` |
| `public/images/kuro-stream-kit/sns-split.png` | `70b5c00e26c6674e3d885e19572503b1eeee84475ce1dd6d3e6f5ebf68420596` |
| `public/images/kuro-stream-kit/thumbnail-editor.png` | `507f454445cb05b8f9e460d226011a411ef623130ed501514cfc902b3eebbee1` |
| `public/images/works/hp-portal.png` | `04c6f763a4b0219a6259bd261b07d764c55b6c006db100377bae8d179260ba80` |

## Non-public completion-contract amendment

The owner approved Task 9 completion with exactly three publication-verified tools while the fourth remains non-public.

- Design specification SHA-256: `cf634db5d3bbb39df42a4558059c7d5b5fa9d4f8ce268b204fce53540f8550c9`
- Implementation plan SHA-256: `05981b7683a6a612885aefb857813b27fc5f953c13de549da160ceb369e3bf54`

Section 10.2 requires `Publication-verified major tools and their current availability`. Sections 15 and 21, Task 4, and Task 9 now consistently limit the initial shared Tools inventory to the same three verified records, preserve the independent approval gate for any future fourth record, and defer Guide mappings/actions until Task 10 implements and verifies the localized routes.

## Exclusions that remain binding

- No fourth tool record or inferred capability.
- No client work or anonymized client work.
- No numeric outcome metric.
- No automatic website synchronization claim.
- No Guide CTA before Task 10 implements and verifies the destination.
- No credential, token, cookie, Authorization data, browser storage, raw comment, raw response, raw user content, private URL, private identifier, repository-internal name, or re-identifying fact combination.
- No commit, push, PR, merge, deployment, or production activation through approval of this packet.

## Verification ledger

| Check | Current result |
| --- | --- |
| Supplied production destinations | 3 of 3 returned HTTP `200` |
| Targeted content/Tools/Works contracts | 18 of 18 passed after an expected 6-test RED state for the publication review corrections; final media-SSOT assertions passed 15 of 15 after the expected 2-test RED state; the earlier Task 9 cycle passed 17 of 17 after its expected 5-test RED state |
| Full test suite | 38 of 38 passed |
| Lint | Passed with no warnings or errors |
| React diagnostics | No issues found in changed scope |
| Production build | Passed; 17 of 17 static pages generated |
| Sanitized evidence scan | Pending final verification |
| Browser QA at required locales and widths | Pending final verification |
| Diff and manifest reproduction | Pending final verification |

## Superseded approval statement — do not use

Do not use the historical statement below. Use only the v11 statement in `KURODEV_TASK9_OWNER_APPROVAL_PACKET_V11.md` after its verification ledger is complete and its manifest reproduces exactly.

> I am the repository owner and the product-development owner for Kuro Stream Kit. I approve for public use the exact Task 9 Works and Kuro Stream Kit case-study snapshot fixed by Packet ID `task9-owner-approval-2026-07-13-v10` and Approval manifest ID `f77189b830aaf1a730233ac892656f990a310d821c945cf9c7fac215469226f6`. This approval carries forward the v5 product-history attestation and unchanged approved copy and media, and additionally approves the exact Kuro Stream Kit and HP-portal publish/update dates, evidence-source values, HP-portal image and localized alt text, three production tool URLs and intrinsic media dimensions, localized `配信ワークフロー / Stream Workflow` category labels, three tool publish/update dates, `/tools` plus `/en/tools` product-level actions, phrase-aware Japanese line breaking, and the publication-safety and media-SSOT corrections reproduced in v10. I approve Task 9 completion with exactly the three publication-verified tools while the unverified fourth tool remains non-public. I approve the initial Task 9 release without client work or numeric outcome metrics. I do not approve a fourth tool, automatic website synchronization, a Guide CTA before Task 10, or any content, capability, destination, metric, client evidence, or media outside the v10 manifest.

Approval of this statement authorizes only the exact governed public snapshot. Commit, push, PR, merge, and deployment remain separate explicit authorization gates.
