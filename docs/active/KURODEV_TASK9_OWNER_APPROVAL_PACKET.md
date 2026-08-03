# Task 9 Works and Kuro Stream Kit owner approval packet

## Purpose

This packet freezes the exact public copy, media, publication scope, and unresolved dependencies for Creator Platform redesign Task 9.

It is a review artifact, not an approval record. Nothing in this file means that the repository owner has approved publication. Owner approval must be added to `docs/active/KURODEV_REDESIGN_LAUNCH_CONTENT.md` only after the owner responds with an explicit approval statement tied to the fingerprints in this packet.

## Packet identity

- Packet ID: `task9-owner-approval-2026-07-13-v5`
- Prepared date: `2026-07-13`
- Approval manifest ID: `b7d5af49a50b906edce19c8093b8fd1979cc9cb02b0a4182e1ce9ef586bce8d6`
- Manifest rule: SHA-256 of the 19 governed `path:sha256` entries using ordinal ascending path order, lowercase hashes, UTF-8 without BOM, LF separators, and no trailing newline
- Approval rule: an owner response must reference both the Packet ID and Approval manifest ID

The packet itself is intentionally not self-hashed. The manifest fixes the enumerated Task 9 content registries, direct copy and label sources, route metadata wrappers, and media files covered by the public-use approval. Visual styling and shared shell implementation are verified separately and are not claimed to be exhaustively fixed by this content-approval manifest. Any governed-file change requires a new manifest ID, an incremented Packet ID, and a new review before approval can be recorded.

## Superseded packet and accepted change request

Packet ID `task9-owner-approval-2026-07-13-v1` and Approval manifest ID `4f8e85f09574febe94b3b58234be1bf77b15ca1a0f77ec52b218bae57872259c` were explicitly not approved for public use on 2026-07-13. The owner requested this replacement packet with the following bounded changes:

- replace `evidence` in the two Japanese Works sentences with `根拠`;
- localize the Japanese HP-portal external-link assistive label to `（新しいタブで開きます）`;
- normalize `thumbnail-editor.png` from JPEG-encoded bytes to a real PNG while preserving its decoded pixels;
- complete missing record fields only when supported by repository evidence;
- keep the unverified fourth tool out of the rendered inventory;
- keep the Guide CTA absent until Task 10 implements and verifies its Japanese and English destinations.

Repository evidence does not establish the missing publish/update dates, an HP-portal publication-safe image and localized alt text, direct production URLs, or tool categories. This packet does not invent those values; they remain owner-input blockers below.

The unapproved v2 draft (`task9-owner-approval-2026-07-13-v2`, manifest `c2707d45d29a40ed9462b69ed7765137df6a405d7228f8e28601b376e8b98cd9`) was superseded during fresh visual QA. The v3 candidate added localized skip-link copy and responsive comparison-layout fixes. Independent evidence review then found that current product screens support the `Current` states but cannot by themselves prove the historical `Before` states. The unapproved v4 candidate (`task9-owner-approval-2026-07-13-v4`, manifest `5753a87c0ac8d8107898a03595d9343bb8e68cf65a60e8f741c41342b71bb4e4`) added a separate repository-owner and product-history attestation gate. Exactness review then found that its rendered-record table omitted the attestation requirement from the displayed Kuro Stream Kit `evidenceSource`. This v5 candidate reproduces the complete governed value and ties the requirement to v5.

## Current decision state

| Decision | Current state | Release effect |
| --- | --- | --- |
| Japanese and English Works copy | Awaiting exact owner approval | Blocks Task 9 release |
| Japanese and English Kuro Stream Kit case-study copy | Awaiting exact owner approval | Blocks Task 9 release |
| Four media assets | Publication-safe intake exists; exact Task 9 use awaits owner approval | Blocks Task 9 release |
| Kuro Stream Kit work record | Local preview draft has `publicationApproved: true`, but owner approval is not recorded and required dates are missing | Must not be committed, pushed, or released in this state |
| HP-portal work record | Creator-site scope was approved on 2026-07-12; exact Works copy, dates, image, and alt text remain unresolved | Blocks Task 9 release |
| Three existing tool destinations | Screens and public names are verified; direct production URLs and Guide mappings are not | Blocks launch actions and complete Section 15 records |
| Fourth major tool | Owner confirmed it must remain blocked while no public record or screen is verified | Blocks the four-tool completion criterion |
| Guide destination | Owner confirmed the Guide CTA must remain absent until Task 10 implements and verifies both locales | Guide CTA remains absent |
| Client work and outcome metrics | None rendered | No approval requested |

## Approval boundaries

An approval of this packet covers only:

- the exact Works and case-study copy and labels reproduced below;
- the exact source fingerprints listed below;
- the exact four media files and hashes listed below;
- the qualitative, non-numeric evidence statements shown below;
- the repository owner's factual attestation, as product-development owner, that the three `Before` -> `Current` comparisons accurately describe Kuro Stream Kit's development history;
- Kuro Stream Kit and HP-portal as the only rendered work records.

It does not approve:

- an unspecified fourth tool;
- Comment Translator availability, launchability, URL, copy, or screenshots;
- any client work, anonymized case study, or client evidence;
- any numeric outcome metric;
- automatic website synchronization;
- credentials, browser storage, raw comments, raw responses, private URLs, approval labels, or private identifiers;
- a Guide CTA before its destination is implemented and verified.

## Exact source fingerprints

These hashes identify the local Task 9 draft reviewed by this packet.

| Source | SHA-256 |
| --- | --- |
| `app/layout.js` | `c27d76c6ef39c2dff1bc86bbd19acf5581336110c19515e9f951c55727822374` |
| `lib/content/work-content.mjs` | `c1973ef8efa49df4195b8bf265ce46b61ed500453cde7f4af43618979c598f0c` |
| `lib/content/tool-content.mjs` | `862fe57089e0191967d4dfb8880329381008eb073d6c40a330bcecf032bad1f2` |
| `lib/content/status.mjs` | `ffd5a47aaeff10169ed8128cc50e3176221560b5b1d1278d84149c5bf1df2609` |
| `components/pages/works-page.js` | `ed0d88dab4aea1207497d8e56b46645bcc91774aac4e25195e1e29d930092d97` |
| `components/pages/kuro-stream-kit-case-study.js` | `885b7e9dab7215b4859bf3ad92025e85784de0925c41e758190344c4212041ae` |
| `components/sections/work-evidence.js` | `e9a7f44172873bb004a590b94d2a7c8f83877dff04c78b6c205e866c6087f493` |
| `components/sections/product-map.js` | `ea4d2e40121a598c7c0399f581cafaed8ff8c79420b1f810105b902d59f150e2` |
| `components/ui/breadcrumbs.js` | `9a0439103fb09077e4432163edfd0bcf06da8d89def455a52d0ed6ed7c7b1c5a` |
| `components/ui/status-badge.js` | `c35397dcaa8f172cfcc1e296dcee5721a885c3c5da8f8741414b78d629842710` |
| `components/ui/action-link.js` | `4f5d70116cb80d736f83cf95b252ae8aef9d8f6aa1a5e94b4e92bdf67b317836` |
| `app/works/page.js` | `630a799f73a4c35bc4195d5a6d14e8b4eff5e98b8f3eb84cbbbaff26a5aec693` |
| `app/en/works/page.js` | `5bbab7851bdcb2389a214534ae9e44fb3097dc5516dbd78c90c4a03572fbe252` |
| `app/works/kuro-stream-kit/page.js` | `e437205c0527338c14982d644a1ac757893995893b5987baebdcecfa3c23ce71` |
| `app/en/works/kuro-stream-kit/page.js` | `9b960eb57d2075ee300f7c168bbfb72a89675c92650155e920ceb235419c6bfe` |

Any governed source or media change invalidates this manifest. The packet must receive a new Packet ID and manifest ID, the changed output must be reproduced in the packet, and the owner must approve that new snapshot before approval is recorded.

## Exact public media

| Public file | Intended use | Dimensions and detected format | SHA-256 | Current review state |
| --- | --- | --- | --- | --- |
| `public/images/kuro-stream-kit/portal-home.png` | Case-study hero and flagship Works card | 1920 x 1080 PNG | `bada1b81175936a126817cf3d620fcc524f35ff7c4c7b540731bb9d886ee8a1a` | Publication-safe intake exists; approve exact Task 9 use |
| `public/images/kuro-stream-kit/schedule-calendar.png` | Schedule Calendar product screen | 1920 x 1080 PNG | `96e017fedce218ef34103d0798644304566457c42097428dddb2130158310061` | Publication-safe intake exists; approve exact Task 9 use |
| `public/images/kuro-stream-kit/thumbnail-editor.png` | Thumbnail Editor product screen | 1920 x 1080 PNG | `507f454445cb05b8f9e460d226011a411ef623130ed501514cfc902b3eebbee1` | Format normalized; decoded RGB pixels match the v1 source; approve exact Task 9 use |
| `public/images/kuro-stream-kit/sns-split.png` | SNS Split Image Maker product screen | 1920 x 1080 PNG | `70b5c00e26c6674e3d885e19572503b1eeee84475ce1dd6d3e6f5ebf68420596` | Publication-safe intake exists; approve exact Task 9 use |

The launch-content intake records that these screens use sample UI and were manually inspected for credentials and raw user submissions. Task 9 browser QA additionally verified that the images render without crop or broken-image findings at 375, 768, 1024, and 1280 pixels.

## Exact Works index copy

### Japanese

- Metadata title: `実績 | Kuro Stream Kitと公開制作基盤 | kurodev`
- Metadata description: `Kuro Stream Kitを旗艦プロダクトとして、公開範囲と根拠を確認できる制作実績を優先度ごとに紹介します。`
- Eyebrow: `Selected works`
- Category eyebrows: `Flagship`, `Published work`, `Research and development`
- Hero title: `実装したものを、確かな範囲で伝える。`
- Hero body: `旗艦プロダクト、公開中の制作基盤、研究・開発を同じ重さにせず、確認できる根拠とともに紹介します。`
- Flagship heading: `中心となるプロダクト`
- Flagship description: `企画、情報設計、実装、改善を継続して扱うkurodevの旗艦プロダクトです。`
- Published heading: `公開中の制作基盤`
- Published description: `公開範囲と根拠を確認できる実績だけを掲載します。`
- Research and development heading: `研究・開発`
- Research and development description: `開発中・検討中の取り組みは、公開できる範囲が確認できたものだけを低い優先度で掲載します。`
- Empty-state copy: `公開範囲を確認できた取り組みのみ、ここに追加します。`
- Flagship CTA: `ケーススタディを見る`
- Published-work CTA: `公開サイトを見る`
- Card labels: `Flagship product`, `Published foundation`
- External-link assistive label appended to the HP-portal CTA: ` （新しいタブで開きます）`

The requested Japanese localization changes are included in this v5 snapshot. The English Works copy and English external-link assistive label remain unchanged.

### English

- Metadata title: `Works | Kuro Stream Kit and published foundations | kurodev`
- Metadata description: `Explore Kuro Stream Kit as the flagship product and published work presented within verified public boundaries.`
- Eyebrow: `Selected works`
- Category eyebrows: `Flagship`, `Published work`, `Research and development`
- Hero title: `Work presented with clear public boundaries.`
- Hero body: `Flagship product work, published foundations, and research are separated by priority and shown only within verified public boundaries.`
- Flagship heading: `The product at the center of the work`
- Flagship description: `kurodev's flagship product, shaped continuously across planning, information architecture, implementation, and improvement.`
- Published heading: `Public production foundations`
- Published description: `Only work with a verified publication scope and evidence is included.`
- Research and development heading: `Research and development`
- Research and development description: `In-development and conceptual work stays lower in priority and appears only when its public scope is verified.`
- Empty-state copy: `Only work with a verified public scope will be added here.`
- Flagship CTA: `Read the case study`
- Published-work CTA: `Visit the public site`
- Card labels: `Flagship product`, `Published foundation`
- External-link assistive label appended to the HP-portal CTA: ` (opens in a new tab)`

## Exact rendered work records

### Kuro Stream Kit

- Category: `flagship`
- Status: `published`
- Publication scope: `flagship product summary, case-study route, and verified product media`
- Evidence source: `launch-content-manifest:publication-safe-product-media; owner-attestation-required:task9-owner-approval-2026-07-13-v5`
- Destination: `/works/kuro-stream-kit` and `/en/works/kuro-stream-kit`
- Japanese summary: `配信準備の流れに合わせて、予定・告知画像・SNS投稿素材を整えるクリエイターツール群。`
- English summary: `A creator tool suite for organizing schedules, announcement visuals, and social-ready assets around stream preparation.`
- Japanese alt text: `Kuro Stream Kitの製品ホーム画面`
- English alt text: `Kuro Stream Kit product home screen`
- Qualitative evidence only: workflow clarity and responsive product surface
- Publish date: missing
- Updated date: missing

### HP-portal

- Category: `published`
- Status: `published`
- Publication scope: `public template-platform summary and public destination`
- Evidence source: `owner-reviewed-creator-site-scope:2026-07-12`
- Destination: `https://templates.kuro-lab.com/`
- Japanese summary: `公開後も情報を育てやすい、Web制作テンプレート基盤。`
- English summary: `A template foundation for websites designed to remain maintainable after launch.`
- Qualitative evidence only: maintainable site foundation
- Image: missing
- Japanese and English alt text: missing because no image is assigned
- Publish date: missing
- Updated date: missing

No client work or numeric outcome metric is rendered.

### Work-record completion gate

Section 15 requires every work record to own publish and update dates plus an image and alt text. The current records are therefore not complete launch records.

Before Task 9 release:

- the owner must supply or approve Kuro Stream Kit publish and updated dates;
- the owner must supply or approve HP-portal publish and updated dates;
- the owner must approve a publication-safe HP-portal image and localized alt text, or explicitly approve a design/spec amendment that makes the image optional;
- changed record values must be added to the packet, receive new fingerprints and a new manifest ID, and be approved as a new snapshot.

Both current local records use `publicationApproved: true` so the isolated preview can be reviewed. That flag is provisional preview state, not durable owner approval. Kuro Stream Kit's `evidenceSource` deliberately records that exact v5 owner attestation is still required. Until explicit approval and the attestation are recorded in `docs/active/KURODEV_REDESIGN_LAUNCH_CONTENT.md`, this branch must not be committed, pushed, used for a PR, merged, or deployed with those values. If the owner does not approve the records and attest to the development history, the flags must become `false` before any such action.

## Existing three-tool destination and record gaps

The three screens and public names are verified, but the current tool records do not yet satisfy every Section 15 launch field.

| Tool | Direct production URL | Guide mapping | Category | Publish date | Updated date | Launch effect |
| --- | --- | --- | --- | --- | --- | --- |
| Schedule Calendar | Not verified | Not implemented | Missing | Missing | Missing | No direct Use or Guide action |
| Thumbnail Editor | Not verified | Not implemented | Missing | Missing | Missing | No direct Use or Guide action |
| SNS Split Image Maker | Not verified | Not implemented | Missing | Missing | Missing | No direct Use or Guide action |

The current case-study product action goes to the implemented `/tools` or `/en/tools` hub, not to an unverified product URL. Before launch, the owner must either approve the hub as the product-level action required by Section 10.2 or provide and verify the direct production destinations. Guide mappings remain blocked on Task 10.

## Exact Kuro Stream Kit case-study copy

### Shared visible and assistive labels

- Japanese breadcrumb navigation label: `パンくずリスト`
- English breadcrumb navigation label: `Breadcrumbs`
- Japanese skip-link label: `本文へ移動`
- English skip-link label: `Skip to main content`
- Japanese published-status label: `公開中`
- English published-status label: `Available`
- Improvement comparison labels in both locales: `Before`, `Current`
- Ordered item labels: `01`, `02`, `03`, and `04` where a fourth responsibility item exists

### Metadata

#### Japanese

- Title: `Kuro Stream Kit ケーススタディ | kurodev`
- Description: `配信準備を支えるKuro Stream Kitの製品計画、情報設計、UI/UX、フロントエンド、アクセシビリティ、継続改善を紹介します。`

#### English

- Title: `Kuro Stream Kit case study | kurodev`
- Description: `A case study covering product planning, information architecture, UI/UX, frontend implementation, accessibility, and continuous improvement for Kuro Stream Kit.`

### 1. Product hero

#### Japanese

- Breadcrumbs: `ホーム / 実績 / Kuro Stream Kit`
- Eyebrow: `Flagship case study`
- Title: `配信準備の流れを、迷いにくい道具へ。`
- Body: `Kuro Stream Kitは、配信予定、告知画像、SNS投稿素材を、それぞれの作業に集中して整えるクリエイターツール群です。`

#### English

- Breadcrumbs: `Home / Works / Kuro Stream Kit`
- Eyebrow: `Flagship case study`
- Title: `Turn stream preparation into a clearer set of focused tools.`
- Body: `Kuro Stream Kit is a creator tool suite for organizing schedules, announcement visuals, and social-ready assets as focused tasks.`

### 2. Creator-workflow problem

#### Japanese

- Eyebrow: `Creator workflow`
- Title: `準備ごとに分かれる判断を、必要な作業からたどれるようにする。`
- Body: `配信前には、予定の整理、告知画像の作成、SNS投稿用素材の準備など、性質の異なる作業が続きます。各ツールは独立し、今必要な作業へ直接進める構成です。`

#### English

- Eyebrow: `Creator workflow`
- Title: `Make each preparation decision reachable from the task at hand.`
- Body: `Before a stream, creators move through different kinds of work: planning the schedule, preparing an announcement visual, and arranging social assets. Each tool remains independent and reachable from the task at hand.`

### 3. Current product map

#### Japanese

- Eyebrow: `Current product map`
- Title: `現在公開を確認できる3つの入口`
- Body: `ツールは独立して利用でき、作業の順番に合わせて選べます。`
- Step 01: `予定を整理する` / `配信予定と準備状況を見通せる形に整えます。`
- Step 02: `告知画像をつくる` / `文字と画像を見比べながら、告知内容を組み立てます。`
- Step 03: `SNS用素材を整える` / `投稿時の並びを確認しながら、分割画像を準備します。`

#### English

- Eyebrow: `Current product map`
- Title: `Three publication-verified starting points`
- Body: `Each tool can be used independently and selected in the order the work requires.`
- Step 01: `Plan the schedule` / `Keep upcoming streams and preparation status visible together.`
- Step 02: `Create the announcement` / `Arrange copy and imagery while reviewing the finished visual.`
- Step 03: `Prepare social assets` / `Preview the posting order while dividing the source image.`

### 4. Verified tools

#### Japanese

- Eyebrow: `Verified tools`
- Title: `公開確認済みの製品画面と現在の状態`
- Body: `確認できた3つのツールだけを掲載しています。未確認の製品名や機能は補いません。`

#### English

- Eyebrow: `Verified tools`
- Title: `Publication-verified product screens and current status`
- Body: `Only the three verified tools are shown. Unverified product names or capabilities are not filled in.`

The three rendered records are exactly:

1. Schedule Calendar
   - Japanese summary: `配信予定と準備状況を、見通しよく整理します。`
   - Japanese outcome: `月ごとの予定と準備状況を同じ画面で確認し、次に進める作業を見つけやすくします。`
   - Japanese alt text: `Schedule Calendarの月間予定と配信準備画面`
   - English summary: `Keep upcoming streams and preparation status visible in one calendar.`
   - English outcome: `Review monthly plans and preparation status together so the next task is easier to find.`
   - English alt text: `Schedule Calendar monthly planning and stream preparation screen`
2. Thumbnail Editor
   - Japanese summary: `配信告知に使う画像を、迷わず組み立てられます。`
   - Japanese outcome: `文字と画像を見比べながら、配信内容が伝わる告知画像を組み立てられます。`
   - Japanese alt text: `Thumbnail Editorのキャンバスと編集パネル`
   - English summary: `Build clear stream announcement visuals with a focused editing flow.`
   - English outcome: `Arrange text and imagery together to create an announcement visual that explains the stream clearly.`
   - English alt text: `Thumbnail Editor canvas and editing controls`
3. SNS Split Image Maker
   - Japanese summary: `SNS投稿用の分割画像を、プレビューしながら作成します。`
   - Japanese outcome: `投稿時の並びを確認しながら、1枚の画像を複数の投稿用画像へ分割できます。`
   - Japanese alt text: `SNS Split Image Makerの分割プレビュー画面`
   - English summary: `Prepare split social images while checking the final post layout.`
   - English outcome: `Preview the posting order while dividing one visual into a coordinated set of social images.`
   - English alt text: `SNS Split Image Maker split-image preview screen`

### 5. Responsibilities

#### Japanese

- Eyebrow: `Responsibilities`
- Title: `企画から運用改善まで、ひとつの判断軸でつなぐ。`
- Body: `製品計画、情報設計、UI/UX、フロントエンド実装、レスポンシブ対応、アクセシビリティ、安全なデータ境界、継続改善を担当範囲として扱います。`
- `製品計画と情報設計`: `作業の目的と次の行動が読み取れる構造を設計します。`
- `UI/UXとフロントエンド`: `実際の操作順に沿う画面を、複数の画面幅で使える形へ実装します。`
- `アクセシビリティと安全性`: `状態を色だけに頼らず伝え、公開画面へ不要な利用情報を持ち込みません。`
- `継続改善`: `公開後も、迷いやすい箇所を小さな単位で見直します。`

#### English

- Eyebrow: `Responsibilities`
- Title: `Connect product planning and ongoing improvement through one decision framework.`
- Body: `The scope covers product planning, information architecture, UI/UX, frontend implementation, responsive behavior, accessibility, safe data boundaries, and continuous improvement.`
- `Product planning and information architecture`: `Shape the structure around the task, its purpose, and the next useful action.`
- `UI/UX and frontend`: `Implement the real interaction order across the required viewport range.`
- `Accessibility and safety`: `Communicate status beyond color and keep unnecessary usage data out of public surfaces.`
- `Continuous improvement`: `Review points of friction in small, bounded iterations after release.`

### 6. Design principles

#### Japanese

- Eyebrow: `Design principles`
- Title: `作業を増やさず、判断を減らすための設計。`
- Body: `ひとつの大きな画面へ機能を詰め込まず、目的ごとの道具として独立性を保ちます。`
- `現在地がわかる`: `画面名、状態、次の操作を同じ視線の流れで確認できます。`
- `小さな画面でも主目的を失わない`: `操作と製品情報の優先順位を保ったまま、内容を一列へ並べ替えます。`
- `公開データを必要最小限にする`: `製品紹介には、公開用画面から確認できる情報だけを用います。`

#### English

- Eyebrow: `Design principles`
- Title: `Reduce decisions without adding more work.`
- Body: `Keep each tool focused on one purpose instead of compressing every capability into one oversized surface.`
- `Keep orientation visible`: `The screen, current state, and next action remain readable in one flow.`
- `Preserve the primary task on small screens`: `Content moves into one column without losing the order of operations.`
- `Keep public data minimal`: `Product storytelling uses only information visible in publication-safe interface evidence.`

### 7. Selected improvements

#### Japanese

- Eyebrow: `Selected improvements`
- Title: `公開用画面と製品履歴で確認する、情報のまとまり方の改善。`
- Body: `数値成果は用いず、現在の公開用画面と公開確認された製品履歴に基づく、定性的な設計上の変化だけを扱います。`
- `予定と準備状況を別々に読み解く` -> `月間予定と準備状況を同じ画面で確認する`
- `画像と文字の関係を完成後に確認する` -> `編集しながら告知画像のまとまりを確認する`
- `分割後の投稿順を想像する` -> `投稿時の並びをプレビューしながら分割する`

#### English

- Eyebrow: `Selected improvements`
- Title: `Clearer information groupings supported by product screens and development history`
- Body: `The comparison stays qualitative and uses publication-safe product screens plus development history approved for public use.`
- `Read schedules and preparation status separately` -> `Review the monthly plan and preparation status in one view`
- `Judge the copy and image relationship after finishing` -> `Review the announcement composition while editing`
- `Imagine the post order after splitting` -> `Preview the posting order while preparing the split images`

### 8. Current status

#### Japanese

- Eyebrow: `Current status`
- Title: `公開を確認できる範囲から、正確に案内する。`
- Body: `現在このサイトで紹介する製品は、Schedule Calendar、Thumbnail Editor、SNS Split Image Makerです。各ツールの利用先やガイドは、実装済みの案内先がある場合だけ表示します。`

#### English

- Eyebrow: `Current status`
- Title: `Describe the product from the public range that can be verified.`
- Body: `The products currently introduced here are Schedule Calendar, Thumbnail Editor, and SNS Split Image Maker. Tool and guide actions appear only when an implemented destination is available.`

### 9. Current actions

#### Japanese

- Eyebrow: `Next actions`
- Title: `製品を見る。活動を伝える場所を整える。`
- Body: `Kuro Stream Kitの公開確認済みツールを見るか、クリエイター向けHP制作の考え方を確認できます。`
- CTA 1: `ツール一覧を見る` -> `/tools`
- CTA 2: `クリエイター向けHP制作を見る` -> `/creator-site`

#### English

- Eyebrow: `Next actions`
- Title: `Explore the product or shape a clearer home for your work.`
- Body: `Review the publication-verified Kuro Stream Kit tools or see how kurodev approaches creator websites.`
- CTA 1: `Explore the tools` -> `/en/tools`
- CTA 2: `Explore creator websites` -> `/en/creator-site`

There is intentionally no Guide CTA in this draft because Task 10 has not implemented the required Japanese and English destinations.

## Fourth-tool intake: blocked

The design names Comment Translator as the likely fourth tool. That design reference is not publication evidence and does not establish launchability.

Before a fourth record can render, the repository owner must supply or approve every field below:

| Required field | Current value |
| --- | --- |
| Stable ID | Not approved |
| Public Japanese name | Not approved |
| Public English name | Not approved |
| Japanese title, summary, outcome, suitable-for copy, and alt text | Not approved |
| English title, summary, outcome, suitable-for copy, and alt text | Not approved |
| Status: `published`, `beta`, `unavailable`, `in-development`, or `concept` | Not approved |
| Public reason when status is `unavailable` | Required if applicable; missing |
| Public product URL | Not verified |
| Japanese guide URL | Planned as `/guide/comment-translator/getting-started`; not implemented |
| English guide URL | Planned as `/en/guide/comment-translator/getting-started`; not implemented |
| Publication-safe desktop image | Not present in the approved media intake |
| Publication-safe mobile image or documented shared responsive image | Not present in the approved media intake |
| Image SHA-256 and manual sensitive-content review | Missing |
| Publication scope | Missing |
| Evidence source | Missing |
| Launch-action conditions | Missing |
| Category | Missing |
| Editorial order | Missing |
| Featured rank | No value approved; explicitly record a value or `none` |
| Publish date | Missing |
| Updated date | Missing |

If Comment Translator is not publicly launchable, Task 10 may still publish a status-controlled guide without an enabled product action. The Works and Tools surfaces must not present it as available unless its status and public destination support that claim.

## Guide dependency

Task 10 must implement and verify the applicable Japanese and English Guide destinations before Task 9 adds a Guide CTA.

Current repository state:

- `/guide` temporarily redirects to `/#guide`;
- `/en/guide` temporarily redirects to `/en#guide`;
- no guide article route exists under `app/`;
- the design requires `/guide/getting-started` and tool-specific guide routes;
- the current Task 9 action list therefore contains only `/tools` and `/creator-site` locale pairs.

After Task 10 merges into the preview integration branch, Task 9 must rebase or merge the updated preview base, add only verified Guide destinations, and rerun route, metadata, browser, sanitized-evidence, and production-build checks.

## Sanitized evidence review ledger

The Task 9 v5 local verification and governed source/media fingerprint calculation were performed on 2026-07-13. Raw browser logs and raw responses are not retained in this packet. Sixteen sanitized screenshots were retained locally and untracked only for independent v5 review, then deleted after every visual reviewer finished.

| Review surface | Result | Durable evidence or reproducible check |
| --- | --- | --- |
| Credentials, tokens, cookies, Authorization data, browser storage, raw comments, raw responses, raw user content, private URLs, approval labels, and private identifiers in rendered copy | 0 findings in every category | Rendered-copy pattern scan against `caseStudyContent` and rendered work copy; source fixed by manifest ID |
| Numeric outcome metrics | 0 rendered records | `tests/works-contract.test.mjs` rejects undocumented or unapproved numeric metrics |
| Evidence provenance | Current-state media verified; historical-state attestation pending | Current product screens support the three `Current` states. Kuro Stream Kit `evidenceSource` also requires the exact v5 owner/product-history attestation; release remains blocked until it is given and recorded in Launch Content. |
| Client and anonymized work | 0 rendered records | Re-identification review is N/A for the current output; the contract test rejects direct identifiers and identifying-fact combinations when an anonymized record is introduced |
| Private operational details | 0 findings in exact copy review | All rendered strings are reproduced in this packet and tied to the source manifest |
| Automatic website synchronization | 0 claims | Contract and rendered-copy scan cover the prohibited claim |
| Product inventory | Exactly 3 verified records | Schedule Calendar, Thumbnail Editor, and SNS Split Image Maker; no fourth record exists |
| Media integrity and sensitive-content review | 4 of 4 files matched the launch manifest | Exact asset SHA-256 values above; manual sample-UI review; no URL, email address, credential material, PNG text metadata, or EXIF finding |
| Case-study structure | 9 of 9 sections | `tests/works-contract.test.mjs` section-order contract |
| Automated project verification | 35 of 35 tests; lint pass; changed-scope React diagnostics pass; production build pass | `npm test`, `npm run lint`, `react-doctor --scope changed --verbose`, `npm run build` |
| Browser matrix | 16 of 16 route-width combinations passed | Japanese and English Works and case-study routes at 375, 768, 1024, and 1280 pixels; document and internal overflow false, broken images 0, H1 count 1, console issues 0 |
| Independent visual review | Passed | Two independent visual reviewers and the independent QA reviewer inspected the final post-build 16-image matrix. Layout/integrity and Japanese/English line-breaking reviews both returned PASS with high confidence. |

The browser screenshots were temporary QA artifacts used only for the independent review and were deleted after the v5 reviewers finished. The reproducible route-width matrix, source fingerprints, asset hashes, and contract tests remain as durable evidence. A fresh browser matrix remains mandatory after any approved content, media, fourth-tool, or Guide change.

## Owner decisions required now

### Decision A: v5 governed snapshot

Choose exactly one. Do not select both.

- [ ] **A1 — Approve as-is and attest to the product history.** Approve the public copy and labels, metadata, current work-record values, and four media assets fixed by Packet ID `task9-owner-approval-2026-07-13-v5` and manifest ID `b7d5af49a50b906edce19c8093b8fd1979cc9cb02b0a4182e1ce9ef586bce8d6` without changes, and factually attest to the three selected-improvement comparisons as the repository owner and product-development owner.
- [ ] **A2 — Request changes; do not approve.** The current snapshot is not approved. List every section, label, record field, or media file to change and provide the replacement text or required action.

Selecting A2 cannot resolve the exact-copy or media checkpoint. After changes, the packet must receive a new Packet ID and manifest ID and return for a new explicit approval.

### Decision B: missing record and destination inputs

These inputs complete Section 15 records; supplying them does not approve a changed snapshot.

- Kuro Stream Kit publish date: `__________`
- Kuro Stream Kit updated date: `__________`
- HP-portal publish date: `__________`
- HP-portal updated date: `__________`
- HP-portal publication-safe image and localized alt text, or approved image-optional spec amendment: `__________`
- Product-level action decision: `[approve /tools and /en/tools hubs]` or `[provide direct verified destinations]`
- Schedule Calendar production URL, category, publish date, and updated date: `__________`
- Thumbnail Editor production URL, category, publish date, and updated date: `__________`
- SNS Split Image Maker production URL, category, publish date, and updated date: `__________`

### Decision C: fourth tool

Choose exactly one.

- [ ] Confirm Comment Translator is the intended fourth tool and provide every missing intake field.
- [ ] Confirm a different fourth tool and provide every missing intake field.
- [x] Keep the fourth tool blocked and do not claim Task 9 release completion. Confirmed by the owner on 2026-07-13.

### Decision D: client work and metrics in the initial Task 9 release

Choose exactly one for the initial release.

- [ ] Launch Task 9 without client work and without numeric outcome metrics.
- [ ] Do not approve the initial release until a separate client/metric evidence intake is completed.

Future client work or metrics always require a separate exact evidence and approval intake, regardless of the initial-release choice.

### Decision E: Guide sequencing

- [x] Confirm that Task 9 must not add a Guide CTA until Task 10 implements and verifies the Japanese and English destinations. Confirmed by the owner on 2026-07-13.

## Paste-ready approval statements

### Approve the current three-tool copy, media, and selected-improvement history only

Use this fixed statement only when selecting A1. Do not edit it into a conditional approval:

> I am the repository owner and the product-development owner for Kuro Stream Kit. I attest that the three `Before` -> `Current` comparisons reproduced in this packet accurately describe Kuro Stream Kit's development history, and I approve that owner attestation as public evidence. I approve for public use the exact Japanese and English Works and Kuro Stream Kit case-study copy and labels, metadata, current Kuro Stream Kit and HP-portal record values, and four media assets fixed by Packet ID `task9-owner-approval-2026-07-13-v5` and Approval manifest ID `b7d5af49a50b906edce19c8093b8fd1979cc9cb02b0a4182e1ce9ef586bce8d6`. I approve the four media assets for use on the Works index and Kuro Stream Kit case study. This approval includes the Japanese `根拠` wording, the localized Japanese and English assistive labels, the product-history wording in the selected-improvement section, and the normalized PNG bytes for `thumbnail-editor.png`. This approval does not approve missing record fields, unverified production destinations, a fourth tool, client work, numeric metrics, automatic website synchronization, or a Guide CTA before its destination is implemented.

This statement resolves only the exact current-copy, current-label, and current-media checkpoint. It does not make the incomplete work/tool records launch-complete. Task 9 remains incomplete until the Section 15 record gaps, production destinations, fourth-tool requirement, and Guide destinations are resolved and any changed snapshot receives its own approval.

### Request changes without approving the current snapshot

Use this statement when selecting A2:

> I am the repository owner. I do not approve Packet ID `task9-owner-approval-2026-07-13-v5` or Approval manifest ID `b7d5af49a50b906edce19c8093b8fd1979cc9cb02b0a4182e1ce9ef586bce8d6` for public use. I request these changes: [list exact section, current value, and replacement or media action]. After the changes, provide a new Packet ID, manifest ID, exact-copy review, and verification results for a new approval decision.

### Approve a future fourth-tool record

Do not use this statement until every fourth-tool intake field and asset hash above is filled in:

> I am the repository owner. I approve the exact fourth-tool record and publication-safe media fixed by Packet ID `[updated packet ID]` and Approval manifest ID `[updated manifest ID]`. I approve its stated public name, Japanese and English copy, status, public reason if unavailable, publication scope, evidence source, destinations, category, editorial order, featured-rank value, publish date, updated date, launch-action conditions, alt text, and asset SHA-256 fingerprints for public use. I do not approve capabilities, availability, URLs, record fields, or media not explicitly fixed by that updated manifest.

## Post-approval sequence

1. If the owner selects A2 or supplies any missing record/destination value, do not record approval for the changed material. Update the sources and packet, increment the Packet ID, generate a new manifest ID, rerun verification, and request a new explicit approval.
2. If the owner selects A1 without changes, record the exact fixed statement, date, Packet ID, and manifest ID in `docs/active/KURODEV_REDESIGN_LAUNCH_CONTENT.md`.
3. Complete the missing Section 15 record fields and existing-tool destination decisions. Treat those additions as a changed snapshot requiring a new packet version and approval.
4. Keep the fourth tool blocked and Task 9 explicitly incomplete until a complete publication-safe intake is supplied and separately approved.
5. Implement Task 10 Guide routes in a separate isolated worktree and PR.
6. Merge Task 10 into `codex/creator-platform-redesign-preview` after its own gates pass.
7. Update the Task 9 branch from the preview base and add only implemented Guide destinations.
8. Rerun tests, lint, React diagnostics, production build, sanitized evidence scan, and Japanese/English browser QA.
9. Request explicit approval immediately before each commit, push, and PR action.
