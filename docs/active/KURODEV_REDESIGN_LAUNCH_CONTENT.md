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
| `thumbnail-editor.png` | Thumbnail Editor product screen | `507f454445cb05b8f9e460d226011a411ef623130ed501514cfc902b3eebbee1` |
| `sns-split.png` | SNS Split Image Maker product screen | `70b5c00e26c6674e3d885e19572503b1eeee84475ce1dd6d3e6f5ebf68420596` |
| `hp-portal.png` | HP-portal Works key visual | `04c6f763a4b0219a6259bd261b07d764c55b6c006db100377bae8d179260ba80` |

The source images came from a publication-oriented launch-announcement output and were manually inspected. They contain sample UI rather than credentials or raw user submissions. Recheck alt text and crop before launch.

`thumbnail-editor.png` was losslessly normalized from JPEG-encoded bytes to a PNG file on 2026-07-13. Its 1920 x 1080 dimensions and decoded RGB pixels were verified unchanged before the launch-manifest hash was updated.

`hp-portal.png` reproduces the public 1200 x 630 RGB PNG served by HP-portal. It has only `IHDR`, `IDAT`, and `IEND` chunks, with no text/EXIF chunks or trailing bytes. The owner approved its Works use and the localized alt text recorded below on 2026-07-13. Its inclusion in the governed v11 snapshot was approved with the exact v11 manifest on 2026-07-14.

## Verified public inventory

The inspected public metadata and copy currently name three available tools:

1. Schedule Calendar
2. Thumbnail Editor
3. SNS分割画像メーカー / SNS Split Image Maker

The user previously described four current tools, but the fourth available item is not verified in the inspected public source. The owner directed that it remain non-public and approved Task 9 completion with exactly the three publication-verified tools. Until a separate fourth-tool intake is approved:

- Home may feature the three verified tools.
- Tools and the Kuro Stream Kit case study render only these three records.
- No fourth title, capability, status, image, or action is inferred.
- `配信ワークフロー / Stream Workflow` is the owner-approved category label for the three verified records; it is not a fourth product name.

## Deferred content outside the approved Task 9 completion scope

- A future fourth tool still requires its public name, Japanese/English copy, status, URL, guide URL, dates, category, and publication-safe screen before it can render.
- Approve public identity details for About and all legal texts before those routes launch.
- Client work and numeric metrics remain absent. Any future addition requires its own evidence and exact public-use approval.

## Task 12 legal candidate intake

The repository owner fixed the following five paths as the original Creator Platform legal publication candidates. On `2026-07-30`, Task 14 Step 0 fixed their publication IDs, version `1.0.0`, coordinated `2026-08-04` effective/update date, routes and fresh candidate fingerprints. Approval record `creator-platform-task14-step0-r2-owner-designated-public-use-approval-20260730-v1` authorizes the exact R2 bytes for `ready` promotion and local implementation while explicitly recording that no human or attorney review occurred.

| Entry | candidateSourcePath | documentId | version | owner | approvalState | effectiveDate | updateDate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Japanese Terms | `content/legal/ja/terms.md` | `creator-platform-terms-ja-v1` | `1.0.0` | KuroDev repository owner | `ready` | `2026-08-04` | `2026-08-04` |
| English Terms | `content/legal/en/terms.md` | `creator-platform-terms-en-v1` | `1.0.0` | KuroDev repository owner | `ready` | `2026-08-04` | `2026-08-04` |
| Japanese Privacy | `content/legal/ja/privacy.md` | `creator-platform-privacy-ja-v1` | `1.0.0` | KuroDev repository owner | `ready` | `2026-08-04` | `2026-08-04` |
| English Privacy | `content/legal/en/privacy.md` | `creator-platform-privacy-en-v1` | `1.0.0` | KuroDev repository owner | `ready` | `2026-08-04` | `2026-08-04` |
| Japanese commercial disclosure | `content/legal/ja/tokushoho.md` | `creator-platform-tokushoho-ja-v1` | `1.0.0` | KuroDev repository owner | `ready` | `2026-08-04` | `2026-08-04` |

The Japanese commercial disclosure remains the only authorized commercial-disclosure candidate. No English translation or English `hreflang` is approved.

The Privacy candidates now use the owner-approved zero-cost operating model: Gmail and Drive in a Google Account managed exclusively for business, encrypted local primary storage, and advance information plus any required consent for processing outside Japan. Publication remains blocked until a separately reviewed foreign-processing notice identifies each actual provider and its formal legal name, processing stage, relevant country, country-system information, safeguards, processed information, purpose, subprocessors or lookup method, and review date; the Contact flow exposes the applicable inquiry-stage notice with an unchecked consent control and retains the timestamp, document versions, and covered processing; Google Drive and Stripe are addressed before their respective production and payment use; GitHub is limited to non-identifying source code and receives no User personal data; and the direct-email notice and approved consent-record mechanism are available before the address is used. No additional legal route, footer link, Contact control, consent-log storage, or provider setting is authorized or implemented by this intake entry.

### Task 12 foreign-processing review candidates

The repository owner authorized preparation of the following Japanese and English texts as unapproved drafts for human legal review and selected independent candidate routes at `/privacy/foreign-processing` and `/en/privacy/foreign-processing` on `2026-07-17`. On `2026-07-30`, the owner separately authorized route implementation and Task 14 publication-candidate inclusion, then adopted the exact corrected R2 hashes for `ready` promotion under the owner-designated exception described above.

| Entry | candidateSourcePath | documentId | version | candidateRoute | owner | approvalState | effectiveDate | updateDate | providerReviewDate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Japanese foreign-processing notice | `content/legal/ja/foreign-processing.md` | `creator-platform-foreign-processing-ja-v1` | `1.0.0` | `/privacy/foreign-processing` | KuroDev repository owner | `ready` | `2026-08-04` | `2026-08-04` | `2026-07-30` |
| English foreign-processing notice | `content/legal/en/foreign-processing.md` | `creator-platform-foreign-processing-en-v1` | `1.0.0` | `/en/privacy/foreign-processing` | KuroDev repository owner | `ready` | `2026-08-04` | `2026-08-04` | `2026-07-30` |

The corrected R2 seven-document snapshot set has been encrypted, decrypted/read back, checksum-verified, and promoted to `ready / approved / satisfied` under the owner-designated approval record. The record explicitly states that human and attorney review were not completed and must not be represented otherwise. Commit, push, PR, merge, deploy, production activation, live provider calls, provider-setting changes, and dependency installation remain unauthorized.

On `2026-07-31`, the repository owner separately accepted the residual risk of using the fixed six-copy Contact consent set without a human lawyer or independent human legal reviewer and adopted its exact ID/version/SHA-256-bound owner-designated AI-assisted review as the project's internal substitute for that Contact-copy human-legal gate. The six-copy packet is therefore `ready` for the scheduled publication candidate while remaining explicitly not human- or attorney-reviewed. Git, provider and production actions remain separately gated.

The canonical SHA-256 values and reserved snapshot candidate IDs for all seven dated sources are recorded in `docs/active/KURODEV_TASK12_LEGAL_REVIEW_PACKET.md` under `2026-07-30 dated publication-candidate fingerprints`. Canonicalization is UTF-8, LF line endings, and exactly one trailing newline.

## Approved owner content

- Approved creator-site service scope on 2026-07-12: `Template` uses HP-portal and links to the canonical plan page at `https://templates.kuro-lab.com/plans`; kurodev does not copy numeric prices. `Custom` remains `個別見積 / Custom quote` with a Contact action.

## Approved Task 9 owner attestation

Approved by the repository owner and Kuro Stream Kit product-development owner on 2026-07-13:

- Packet ID: `task9-owner-approval-2026-07-13-v5`
- Approval manifest ID: `b7d5af49a50b906edce19c8093b8fd1979cc9cb02b0a4182e1ce9ef586bce8d6`
- Governed entries: 19 source and media fingerprints reproduced in `docs/active/KURODEV_TASK9_OWNER_APPROVAL_PACKET.md`

> I am the repository owner and the product-development owner for Kuro Stream Kit. I attest that the three Before -> Current comparisons reproduced in this packet accurately describe Kuro Stream Kit's development history, and I approve that owner attestation as public evidence. I approve for public use the exact Japanese and English Works and Kuro Stream Kit case-study copy and labels, metadata, current Kuro Stream Kit and HP-portal record values, and four media assets fixed by Packet ID task9-owner-approval-2026-07-13-v5 and Approval manifest ID b7d5af49a50b906edce19c8093b8fd1979cc9cb02b0a4182e1ce9ef586bce8d6. I approve the four media assets for use on the Works index and Kuro Stream Kit case study. This approval includes the Japanese 根拠 wording, the localized Japanese and English assistive labels, the product-history wording in the selected-improvement section, and the normalized PNG bytes for thumbnail-editor.png. This approval does not approve missing record fields, unverified production destinations, a fourth tool, client work, numeric metrics, automatic website synchronization, or a Guide CTA before its destination is implemented.

This approval resolves the exact v5 copy, label, media-use, current-record-value, and selected-improvement product-history checkpoint. It did not by itself supply or approve the then-missing work/tool record fields, production destinations, fourth tool, client work, numeric metrics, automatic synchronization, or Guide CTA. The later owner inputs below resolve the bounded Task 9 record gaps and amend its three-tool completion rule; the changed v11 snapshot received its own manifest-bound approval on 2026-07-14. Commit, push, PR, merge, and deployment remain separate explicit authorization gates.

## Owner-confirmed Task 9 inputs for the v11 snapshot

Confirmed by the repository owner on 2026-07-13 for preparation of the current approval snapshot:

- Kuro Stream Kit: published `2026-05-18`; updated `2026-05-18` for the latest fully public version. The translation tool's partially public state while Google Auth Platform review is pending is not counted as a public update.
- HP-portal: published `2026-03-16`; updated `2026-04-06`; the public OG PNG above is approved for the Works card.
- HP-portal alt text: Japanese `HP-portalのWebサイトテンプレートを紹介するキービジュアル`; English `Key visual introducing HP-portal website templates`.
- Product-level case-study action: `/tools` and `/en/tools` are approved as the initial implemented destinations.
- Schedule Calendar: `https://streamer-tools.kuro-lab.com/tools/schedule-calendar/`; category `配信ワークフロー / Stream Workflow`; published and updated `2026-05-18`.
- Thumbnail Editor: `https://streamer-tools.kuro-lab.com/tools/thumbnail-editor/`; category `配信ワークフロー / Stream Workflow`; published and updated `2026-05-18`.
- SNS Split Image Maker: `https://streamer-tools.kuro-lab.com/tools/sns-split-image-maker/`; category `配信ワークフロー / Stream Workflow`; published and updated `2026-05-18`.
- Initial Task 9 release contains no client work and no numeric outcome metrics.
- Task 9 completes with exactly the three publication-verified tools. The fourth tool remains non-public and requires a future independent intake.
- Guide actions remain absent until Task 10 implements and verifies the Japanese and English destinations.

The unapproved v6 through v10 drafts were superseded after independent review found stale four-tool/Guide requirements, publication-gate gaps, remaining duplicated media metadata, and Japanese phrase-breaking defects in the final visual passes. The v11 packet retains the v10 fail-closed publication, media-SSOT, localized assistive-text, mobile language-label, contract-alignment, and phrase-aware Japanese line-breaking corrections. It additionally shares the exact non-breaking `見つけやすく` treatment between the case study and Tools product detail so the approved copy does not split at the 375px Tools viewport.

These inputs authorized preparation and verification of the changed snapshot. The repository owner and Kuro Stream Kit product-development owner then supplied the following exact manifest-bound public-use approval on 2026-07-14:

> I am the repository owner and the product-development owner for Kuro Stream Kit. I approve for public use the exact Task 9 Works and Kuro Stream Kit case-study snapshot fixed by Packet ID task9-owner-approval-2026-07-13-v11 and Approval manifest ID 0f22f54d1870d8e2ebc6f3ca6524333c179df51dddfbbd229abc081d49bb6fbe. This approval carries forward the v5 product-history attestation and unchanged approved copy and media, and approves the exact Kuro Stream Kit and HP-portal publish/update dates, evidence-source values, HP-portal image and localized alt text, three production tool URLs and intrinsic media dimensions, localized 配信ワークフロー / Stream Workflow category labels, three tool publish/update dates, /tools plus /en/tools product-level actions, phrase-aware Japanese line breaking including the shared non-breaking 見つけやすく treatment on the case study and Tools page, and the publication-safety and media-SSOT corrections reproduced in v11. I approve Task 9 completion with exactly the three publication-verified tools while the unverified fourth tool remains non-public. I approve the initial Task 9 release without client work or numeric outcome metrics. I do not approve a fourth tool, automatic website synchronization, a Guide CTA before Task 10, or any content, capability, destination, metric, client evidence, or media outside the v11 manifest.

This approval authorizes only the exact v11 governed public snapshot. Commit, push, PR, merge, deployment, and production activation remain separate explicit authorization gates.

## Approved Task 10 Guide publication packet

Approved by the repository owner on 2026-07-14:

- Packet ID: `e96b2390dd636c48e3bc59889ab1c1988c21de67fc272c94479ddc4e9d2eee74`
- Governed entries: 13 Japanese and English Guide sources plus 6 Guide images reproduced in `content/guides/publication-candidate.json`
- Image allowlist: exact SHA-256 values reproduced in `content/guides/approved-images.json`

> 私はリポジトリ所有者として、Packet ID e96b2390dd636c48e3bc59889ab1c1988c21de67fc272c94479ddc4e9d2eee74 に固定されたTask 10の13件の日本語・英語Guide本文、front matter、6件のGuide画像、画像alt textを公開利用向けに承認します。Comment Translatorは一般公開前のstatus guideとしてのみ承認し、製品起動操作は承認しません。未確認の第4ツール、自動Webサイト同期、公開Notion複製、未記載の機能・宛先・実績は承認しません。この承認はcommit、push、PR作成、merge、deployの承認を含みません。

This approval authorizes only the manifest-bound Guide copy and media. It does not authorize an enabled Comment Translator action or any commit, push, PR, merge, or deployment operation.

### Approved Task 10 replacement packet

The repository owner approved the following replacement packet on 2026-07-14. It supersedes the previous Task 10 packet only for the exact Thumbnail Editor image bytes and the corresponding Japanese and English front matter dimensions; the 13 Guide sources, 6-image set, and existing image alt text otherwise carry forward unchanged.

- Packet ID: `d6c09046449ac394e702af782465099784449c41fe69c0baa6dc0cb6cde2a8b4`
- Thumbnail Editor image: sample announcement canvas verified in the in-app Browser, `1774 x 930` PNG
- The `公開中ツール 6個` display in the separately approved overview image is owner-managed follow-up work and is not a Task 10 blocker.

> 私はリポジトリ所有者として、Packet ID d6c09046449ac394e702af782465099784449c41fe69c0baa6dc0cb6cde2a8b4 に固定されたTask 10 Guide publication packetを公開利用向けに承認します。このpacketは従来の13件のGuide本文と6件のGuide画像を引き継ぎ、Thumbnail Editorの日英front matter画像寸法を1774×930へ更新し、thumbnail-editor.pngをin-app Browserで確認したサンプル告知画像入り画面へ置き換えます。既存の画像alt textは変更しません。「公開中ツール 6個」の表示は私が別途修正するため、今回のTask 10進行を妨げないものとします。この承認はcommit、push、PR作成、merge、deployの承認を含みません。

This replacement approval does not authorize an enabled Comment Translator product action, publication of the unverified fourth tool, automatic website synchronization, a public Notion duplicate, unlisted behavior, or any commit, push, PR, merge, or deployment operation.

## Hard exclusions

- No automatic Schedule Calendar to creator-website synchronization claim.
- No random tool ordering.
- No conceptual item presented as available.
- No internal repository name on public pages.
- No secret, token, cookie, authorization header, browser storage, raw response, or raw user content in evidence or UI.
