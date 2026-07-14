# kurodev Creator Platform Redesign

**Date:** 2026-07-11
**Status:** Approved design, implementation not started
**Target repository:** `D:/kurodev-hp`

## 1. Purpose

Reposition `kuro-lab.com` from a general developer portal into the official site of a creator-focused product maker and web creator.

The site must connect two user journeys without making either feel secondary:

1. A streamer or creator discovers and uses Kuro Stream Kit.
2. A creator who needs an owned activity hub requests a creator website, whether or not they use Kuro Stream Kit.

Kuro Stream Kit is the flagship product and proof of product-design, implementation, responsive-design, and continuous-improvement capability. `kurodev` remains the umbrella brand so future products and non-creator web work can still fit under one identity.

## 2. Goals

- Present Kuro Stream Kit as a real product suite, not as an internal repository or a generic portfolio card.
- Make the path from tool discovery to tool use clear.
- Explain when a creator website becomes useful without implying that every creator must own one.
- Convert suitable tool users into creator-website inquiries.
- Accept direct website inquiries from people who have never used the tools.
- Accumulate tool guides and creator-activity content on `kuro-lab.com`.
- Support Japanese and English discovery with crawlable, language-specific URLs.
- Show only currently available capabilities as available.
- Preserve a clear distinction between published, beta, in-development, and conceptual work.

## 3. Non-goals

- Automated synchronization between Kuro Stream Kit and creator websites is not part of this redesign.
- Schedule Calendar data will not be described as automatically updating a website schedule.
- Unimplemented integrations will not be marketed as planned deliverables.
- The Kuro Stream Kit application does not need to migrate to language-specific URLs as part of this project.
- The first release will not include a large documentation search system, account area, CMS, or personalization engine.
- Tool cards will not use random ordering.

## 4. Audience and Primary Funnel

### Primary audience

- VTubers and streamers
- Video creators, illustrators, and adjacent independent creators
- Creators whose activity information has outgrown a social profile or link page
- Creators who need a clearer profile, archive, commission, collaboration, or contact surface

### Primary funnel

```text
Tool or guide discovery
  -> understand Kuro Stream Kit
  -> use a tool or read a guide
  -> recognize that activity information is becoming fragmented
  -> view creator website examples
  -> submit a website inquiry
```

### Direct inquiry funnel

```text
Search or referral
  -> creator website service page
  -> review examples and process
  -> confirm scope and reassurance
  -> submit an inquiry
```

## 5. Brand Architecture

```text
kurodev
├─ Kuro Stream Kit: flagship creator-tool product
├─ Creator website design and development: service
└─ HP-portal: supporting web-production platform and separate work
```

- `kurodev` is the site and maker brand.
- `Kuro Stream Kit` is the public product name. The internal repository name `V-streamer-tools` is not shown to visitors.
- Creator website production is a first-class service, not an add-on inside the tool product.
- HP-portal remains supporting evidence of web-production capability but is not the flagship case study.

## 6. Information Architecture

### Japanese routes

```text
/
/tools
/creator-site
/works
/works/kuro-stream-kit
/guide
/guide/<slug>
/guide/<category>/<slug>
/about
/contact
/terms
/privacy
/legal/tokushoho
```

### English routes

```text
/en
/en/tools
/en/creator-site
/en/works
/en/works/kuro-stream-kit
/en/guide
/en/guide/<slug>
/en/guide/<category>/<slug>
/en/about
/en/contact
/en/terms
/en/privacy
```

### Global navigation

The logo links to the locale home page. The main navigation contains:

```text
Tools | Creator websites | Works | Guide | kurodev | Contact
```

Japanese labels are used on Japanese routes. English labels are used on English routes. A persistent text language switch displays `日本語 / EN`; country flags are not used.

Desktop uses a horizontal top navigation with a visually distinct Contact action. Mobile uses a top header and menu. The current app-like fixed bottom navigation is removed from the marketing site.

## 7. Home Page

### 7.1 Hero

Primary Japanese message:

> 配信準備から、活動をまとめるホームページまで。
> クリエイターの発信基盤を、ツールとWeb制作で整えます。

The hero shows real Kuro Stream Kit screens, such as Schedule Calendar, Thumbnail Editor, and Comment Translator. Abstract glowing geometry is not the focal object.

Primary actions:

- View free creator tools
- Discuss a creator website

### 7.2 Kuro Stream Kit

Show up to three manually selected flagship tools. The selection is stable and changes only through an editorial update. Each item includes a real screen, a short outcome-focused description, status, and direct tool action.

### 7.3 Why an owned website becomes useful

Explain that profiles, schedules, activity records, commissions, collaboration conditions, and multiple social links can become difficult to communicate through social platforms alone.

### 7.4 Creator website service

Introduce the service only after visitors understand the creator workflow. Summarize the information a creator website can organize and link to `/creator-site`.

### 7.5 Flagship work

Feature the Kuro Stream Kit case study first. Other public and anonymized works follow with lower visual priority.

### 7.6 Guide entry

Show three to six relevant guides. Tool instructions link back to tools. Creator-activity guides may link to the creator website service when the connection is relevant.

### 7.7 Maker introduction and final actions

Explain why kurodev builds creator tools and creator websites. End with distinct actions for tool use and website inquiries.

## 8. Tools Hub

`/tools` is a product showcase and comparison hub. The global navigation does not redirect directly to the Kuro Stream Kit application.

### 8.1 Hero

Present Kuro Stream Kit as a suite that reduces individual parts of stream preparation and publishing work.

Actions:

- Open Kuro Stream Kit
- Read the getting-started guide

### 8.2 Workflow map

Describe the tools as parts of a creator workflow without claiming data synchronization:

```text
Plan a stream
  -> create announcement visuals
  -> prepare social images
  -> support live comment handling
```

The map describes related activities, not automated handoffs.

### 8.3 Tool presentation

With four current tools, all four receive a substantial horizontal product section with a real screen, purpose, suitable audience, availability, direct-use action, and guide action. Alternating image and copy placement prevents a repetitive card grid.

Current tool set:

- Schedule Calendar
- Thumbnail Editor
- SNS Split Image Maker
- Comment Translator

### 8.4 Tool ordering and growth

- Home: up to three manually selected tools.
- Tools hero: one editorially selected featured tool or suite-level visual.
- Getting started: up to three stable recommendations.
- All tools: every public tool, in stable category and editorial order.
- New and updated labels: derived from actual publish and update dates.
- Random ordering: prohibited.

When the catalog reaches approximately eight items, add category sections. When it exceeds approximately fifteen items and browsing becomes measurably difficult, add search or filtering. These thresholds are review triggers, not automatic implementation requirements.

### 8.5 Creator website bridge

Place a restrained creator-website introduction after the tool content. It explains that creators can also organize profiles, records, and inquiry routes on their own site. It does not claim tool-to-site integration.

## 9. Creator Website Service

### 9.1 Hero

Primary message:

> SNSに流れていく活動を、自分の場所にまとめる。

Explain that profiles, stream information, work history, and inquiry routes can be organized in one owned site.

### 9.2 Recognition section

Help visitors recognize relevant situations:

- Profile information no longer fits in social profiles.
- Past activity or work is difficult to find.
- A commission or collaboration route is needed.
- YouTube and social links need a coherent hierarchy.
- Announcements and activity information need a stable home.

### 9.3 Site content examples

Explain creator-facing outcomes rather than selling page counts:

- Home
- Profile
- Schedule or news
- Works or archive
- Commission or contact
- Links
- Guidelines

### 9.4 Creator-workflow understanding

Replace any automated-integration promise with this value:

> Kuro Stream Kitの開発経験を生かし、配信者の活動フローに合ったHPを設計します。

Current capabilities that may be offered:

- Links to Kuro Stream Kit or individual tools
- A manually maintainable stream schedule section
- Organized YouTube, social, and contact routes
- Clear update instructions and operational guidance

Automated data synchronization is not shown on this page. It may be introduced only after a production implementation is available and verified.

### 9.5 Examples, process, pricing, and FAQ

- Launch with two examples: one streamer or VTuber demonstration and one broader creator demonstration. If a publishable real project is approved before launch, it may replace the matching demonstration.
- Demonstration sites use sample identities and sample assets, are labeled `制作例 / Demonstration`, and never imply client engagement or production results.
- Describe the process from activity and goal clarification through launch and optional improvement support.
- Present exactly two service routes:
  - `Template`: uses an HP-portal template. The kurodev site describes the suitable use case and links to the canonical HP-portal plan page for current inclusions and prices. It does not copy numeric HP-portal prices.
  - `Custom`: uses an individually designed structure and is labeled `個別見積 / Custom quote` with a Contact action.
- HP-portal is the only source of truth for Template prices. A later HP-portal price revision does not require changing copied prices on the kurodev site.
- The kurodev service page explains the boundary between Template and Custom, including what causes an inquiry to move to Custom. It does not introduce a separate creator-only price table.
- Answer questions about incomplete materials, activity names, privacy, self-updating, domains, and use without Kuro Stream Kit.

General small-business website inquiries remain possible through a short secondary note and the contact page.

## 10. Works and Kuro Stream Kit Case Study

### 10.1 Works hierarchy

```text
Flagship
  -> Kuro Stream Kit

Published work
  -> HP-portal
  -> public website work
  -> anonymized client work

Research and development
  -> in-development or conceptual work
```

Published and conceptual work do not share the same visual hierarchy.

### 10.2 Case study structure

`/works/kuro-stream-kit` includes:

1. Product hero with a real screen
2. Creator-workflow problem
3. Current product map
4. Publication-verified major tools and their current availability
5. kurodev's responsibilities
6. UI and operational design principles
7. Selected before-and-after improvements
8. Current product status
9. Links to the product, guides, and creator website service

The case study emphasizes product planning, information architecture, UI/UX, frontend implementation, responsive behavior, accessibility, safe data handling, and continuous improvement. Internal pull-request numbers, approval labels, credentials, raw user content, and private operational details are excluded.

### 10.3 Publication approval

- Real client work is published only after the repository owner has explicitly approved the exact copy, images, labels, and evidence for public use.
- Anonymized work must remove client names, domains, identifiers, screenshots containing real content, private metrics, operational details, and combinations of facts that could reasonably re-identify the client.
- Outcome metrics are shown only when their source is documented and their public use is explicitly approved. Otherwise use qualitative, bounded descriptions.
- Every work entry records `publicationApproved`, `publicationScope`, and `evidenceSource`. Entries without approval remain private and are not rendered.
- A pre-release review confirms that case studies contain no credentials, browser storage, raw comments, private responses, approval labels, or internal-only URLs.

## 11. Guide

### 11.1 Guide role

`/guide` contains both Kuro Stream Kit instructions and creator-activity guidance. Public content lives on `kuro-lab.com`; Notion may be used for drafts but is not the public source.

### 11.2 Initial categories

- Getting started
- Schedules
- Thumbnails and announcements
- Social posting
- Comment handling
- Creator websites and inquiry routes

### 11.3 Initial content set

The launch guide inventory contains Japanese and English versions of:

- `/guide/getting-started`
- `/guide/schedule-calendar/getting-started`
- `/guide/thumbnail-editor/getting-started`
- `/guide/sns-split-image-maker/getting-started`
- `/guide/comment-translator/getting-started`

The Comment Translator guide reflects its actual launch status and conditions. If the tool is not publicly launchable, the guide explains availability without rendering an enabled launch action.

The following creator-activity guides launch in Japanese and may receive English versions after their Japanese content is stable:

- `/guide/creator-site/profile-information`
- `/guide/creator-site/what-to-include`
- `/guide/creator-site/inquiry-route`

### 11.4 Article template

Every article includes:

- Title
- Updated date
- Applicable tool and status
- Outcome
- Prerequisites
- Step-by-step instructions
- Sanitized screenshots
- Common problems
- Related guides
- Related tool action

Creator website actions appear only where editorially relevant. Screenshots use sample data and exclude credentials, browser storage, raw comments, or private identifiers.

### 11.5 Growth rules

- Do not add search while the guide remains easy to scan by category.
- Review search around fifteen articles.
- Review tool-specific sidebars or popular-content modules around thirty articles.
- Keep URLs short, stable, and English-slug based for both locales.
- Suite-level guides such as `/guide/getting-started` use `/guide/<slug>`. Tool and topic guides use `/guide/<category>/<slug>`.

## 12. About, Contact, and Footer

### 12.1 About

Explain what kurodev builds, why creator tools are a focus, how work moves from clarification through improvement, and what production areas are supported. Technology lists are secondary to working approach and verifiable output.

### 12.2 Contact separation

Production inquiries and Kuro Stream Kit support are separate routes. The production form supports:

- Creator website inquiry
- Existing website improvement
- Tool or web-service production
- Other production inquiry

Tool feedback and usage questions link to the Kuro Stream Kit support or feedback route.

### 12.3 Contact layout

Mobile order:

```text
Page introduction
  -> short reassurance
  -> inquiry form
  -> pricing guide
  -> FAQ
```

The form precedes pricing on mobile. Desktop may use a two-column layout only if DOM order and visible order remain aligned.

The form clearly labels required and optional fields, explains minimum input requirements before submission, associates validation errors with fields, focuses the first invalid field, and announces submission status.

Reassurance includes incomplete-scope acceptance, activity-name use, reply expectations, non-publication of submitted content, and the fact that an inquiry is not a contract.

The form keeps the current bounded delivery path:

- Client submits to `POST /api/contact`.
- Server validates input and Turnstile, enforces the existing request-size and external-call timeouts, and sends through Resend.
- Recipient and sender addresses remain environment-configured; secret values are never rendered or logged.
- The form links to the Privacy page beside the submit action and explains that submitted content is used to respond to the inquiry.
- The submit action is disabled while a request is in progress. The client does not retry automatically. A visitor may retry manually after an error.
- Cloudflare Turnstile remains the application-level abuse check, and the production route remains protected by Cloudflare rate limiting.
- If the form service is unavailable, show a non-submitting fallback with the public contact address `contact@kuro-lab.com`; never silently discard input.
- Application logs remain anonymous and minimal. Message bodies, email addresses, Turnstile tokens, and raw provider responses are not logged.

### 12.4 Footer

The footer links to tools, guide, creator website service, works, contact, terms, privacy, and legally required commercial disclosure.

- Terms and Privacy have Japanese and English routes and reciprocal locale metadata.
- The legally required commercial disclosure is published at the Japanese authoritative route `/legal/tokushoho`.
- English footers link to that same route with a visible label such as `Commercial disclosure (Japanese)`; no unreviewed English legal translation is implied.
- `/legal/tokushoho` uses a self-referencing canonical and has no English `hreflang` alternate until an English version receives an explicit legal-content review.

## 13. Visual Direction: Creator Studio

The visual concept is a calm pre-stream production studio.

### 13.1 Color and material

- Deep navy and charcoal form the primary atmosphere.
- Cyan is the stable interaction and link color in both themes.
- Magenta or warm accent colors are limited to announcements and new states.
- Light and dark themes may change surface lightness, but they do not change the core brand hue.
- Glass is limited to focal or layered surfaces, not every section.

### 13.2 Focal material

Real product screens are the primary visual material. Tool screens may overlap like studio monitors. Abstract circles, generic dashboard cards, code-editor decoration, and hexagonal glow are secondary or removed.

### 13.3 Typography

- Japanese content uses a reliably delivered, readable Japanese sans-serif.
- Display headings use a distinct but practical Japanese face or weight treatment.
- English and numeric accents may use a restrained monospace.
- Japanese labels lead on Japanese pages; English eyebrow labels are reduced.

### 13.4 Motion

- Screens may move by a few pixels through transform and opacity only.
- Workflow steps may illuminate in order.
- Recently updated tools may receive a short restrained highlight.
- Reduced-motion preference produces a complete static experience.

## 14. Localization

### 14.1 Release strategy

Localization architecture is included from the first implementation slice.

Japanese and English launch together for:

- Home
- Tools
- Creator website service
- Works index
- Kuro Stream Kit case study
- About
- Contact
- Getting started and essential instructions for each public tool

Broader creator-activity articles may launch in Japanese first and receive English versions after the Japanese content is stable.

### 14.2 Language selection

- Connection region and IP location are not used to choose language.
- Browser language may trigger a non-blocking suggestion on first visit.
- Automatic language redirect is not used.
- The user explicitly changes language with `日本語 / EN`.
- The selected preference may be stored and used to maintain same-language navigation after an explicit user choice.
- A stored preference never redirects the current request. Japanese URLs continue rendering Japanese and English URLs continue rendering English.
- On `/`, browser or stored English preference may show a dismissible English suggestion, but the visitor remains on `/` until activating the language link.
- Switching language navigates to the equivalent language-specific URL when available.
- If an equivalent article does not exist, the visitor is directed to the target-language guide index with an availability notice.

### 14.3 SEO relationship

- Each language version has its own URL and self-referencing canonical.
- Equivalent pages declare reciprocal `hreflang="ja"` and `hreflang="en"` entries.
- `x-default` points to the Japanese route for the same content, for example `/tools` for the `/tools` and `/en/tools` pair.
- A guide without an English equivalent has only its self-referencing canonical and no English or `x-default` alternate for a nonexistent page.
- The sitemap emits locale alternates only for existing reciprocal page pairs.
- Each page uses a single language for primary content and navigation.
- Language versions link to one another.
- English copy is localized for creator intent and is not a mechanical word-for-word translation.

The Kuro Stream Kit application's existing client-side language switch remains outside this redesign scope.

## 15. Content Boundaries

### Tool content record

Each tool record owns:

- Stable ID
- Localized name and summary
- Localized outcome and suitable audience
- Status
- Image and alt text
- Tool URL
- Guide mapping by locale after its route is implemented and verified
- Category
- Editorial order
- Optional featured rank
- Publish date
- Updated date

### Work content record

Each work record owns:

- Stable ID and slug
- Localized title and summary
- Publication category
- Status
- Responsibilities
- Outcome evidence that is safe to publish
- Image and alt text
- Case-study route or external URL
- Publish and update dates

### Guide record

Each guide record owns:

- Stable slug and locale
- Title and description
- Category
- Applicable tool and status
- Updated date
- Related guides
- Related tool action
- Optional creator-service action

Page components consume these records and do not duplicate status or URL rules in page markup.

### Status vocabulary and behavior

| Status | Indexable | Launch action | Guide action | Visitor label |
|---|---:|---|---|---|
| `published` | yes | enabled | enabled when guide exists | 公開中 / Available |
| `beta` | yes | enabled with conditions | enabled | ベータ版 / Beta |
| `unavailable` | yes | replaced by reason | enabled when useful | 一時利用不可 / Unavailable |
| `in-development` | no dedicated thin page | hidden or disabled | status guide only | 開発中 / In development |
| `concept` | no | absent | absent | 検討中 / Concept |

- Status transitions are editorial changes to the shared tool or work record, not page-local conditionals.
- An item moves to `published` or `beta` only after its destination, status copy, and launch action are verified. A guide mapping is added only after the localized guide route is implemented and verified.
- `unavailable` requires a public reason and must not retain an enabled launch action.
- `in-development` and `concept` are excluded from sitemap output unless they are part of a substantive roadmap page rather than a thin item page.

## 16. States and Error Handling

- A temporarily unavailable tool remains visible with an unavailable label, reason, guide availability, and disabled or replaced launch action.
- In-development and conceptual tools do not show an enabled use action.
- Missing guide translations never lead to a not-found page from the language switch.
- External links announce that they open the product or a separate site when necessary.
- Inquiry validation errors identify the field, describe the fix, and are available to assistive technology.
- Submission success and failure use live status messaging.
- No button remains visually enabled when its destination or action is unavailable.

## 17. Responsive and Accessibility Requirements

Required review widths:

- 375 px
- 768 px
- 1024 px
- 1280 px and above

Requirements:

- No horizontal page overflow.
- Product media has stable aspect ratios and dimensions.
- Tap targets are at least 44 px where practical.
- Normal text meets a minimum 4.5:1 contrast ratio.
- Focus indicators remain visible across light, dark, and image-backed surfaces.
- Color is not the only status signal.
- Heading hierarchy is sequential.
- Skip-to-content navigation is available.
- Keyboard focus order matches visual order.
- Reduced-motion behavior is complete.
- Mobile Contact shows the form before pricing.

## 18. SEO and Discovery Requirements

- Unique localized title and description for every indexable page
- Self-referencing canonical for each language URL
- `hreflang` for available equivalents
- Localized Open Graph data
- Sitemap entries for indexable Japanese and English routes
- Breadcrumbs on guide and case-study pages
- Crawlable HTML links between home, tools, guides, works, and creator website service
- Updated dates on guides and case studies when content materially changes
- No duplicated placeholder or thin English pages
- No public Notion page competing with the canonical guide content

## 19. Verification

Before release:

1. Confirm the Home-to-tool journey.
2. Confirm the Home-to-creator-site-to-contact journey.
3. Confirm every public tool maps to a valid guide and tool destination.
4. Confirm published and in-development states are visually and semantically distinct.
5. Confirm equivalent Japanese and English pages switch correctly.
6. Confirm untranslated guides use the defined fallback behavior.
7. Verify Contact validation, focus, success, and failure states without exposing submitted content.
8. Verify all routes at 375, 768, 1024, and 1280 px.
9. Verify light and dark contrast and focus states.
10. Run project lint and production build.
11. Inspect the production deployment to confirm that deployed copy and assets match the reviewed version.

## 20. Implementation Slices

The redesign is delivered in reviewable slices:

1. Design system, localized content interfaces, global header, footer, route foundation, locale metadata, and shared accessibility primitives
2. Home with Japanese and English routes and slice-level responsive and accessibility verification
3. Tools hub with Japanese and English routes, status behavior, and slice-level responsive and accessibility verification
4. Creator website service with Japanese and English routes and approved service content
5. Works index and Kuro Stream Kit case study with publication-approval checks
6. Guide foundation plus the five defined Japanese and English tool guides and three Japanese creator-activity guides
7. About and Contact with the bounded contact-delivery path and Japanese and English routes
8. Release-wide SEO, accessibility, localization, production-build, and full responsive regression verification

Every slice includes its own SEO metadata, locale behavior, keyboard behavior, responsive checks, and content-state verification. Slice 8 is a regression pass, not the first time these concerns are addressed. Each slice must remain independently reviewable. Automated tool-to-website integration remains excluded unless separately designed and approved after a real implementation path exists.

## 21. Launch Content Matrix

| Surface | Japanese | English | Required launch content | Owner and approval |
|---|---|---|---|---|
| Home | required | required | hero, three featured tools, creator-site bridge, flagship work, guide entry, final actions | repository owner approves copy and tool order |
| Tools | required | required | suite hero, workflow map, three publication-verified tools, status, and implemented tool links; the unverified fourth tool and Guide links remain non-public | publication-approved tool records are source of truth |
| Creator website service | required | required | recognition, page outcomes, current capabilities, two examples, process, Template link to canonical HP-portal pricing, Custom quote route, FAQ, contact action | repository owner approves copy and HP-portal remains the price source |
| Works | required | required | Kuro Stream Kit flagship, HP-portal, only approved public or anonymized work | publication approval required per work |
| Kuro Stream Kit case study | required | required | real screens, current tools, responsibilities, selected safe improvements, current status | sanitized evidence review required |
| Guide index | required | required | categories and the five tool guides | guide inventory is explicit in Section 11.3 |
| Creator-activity guides | three required | optional after launch | profile information, site contents, inquiry route | Japanese content reviewed before translation |
| About | required | required | maker purpose, process, supported scope, flagship link | repository owner approves public identity details |
| Contact | required | required | inquiry categories, form, privacy link, response expectations, fallback | existing contact API boundary retained |
| Terms | required | required | localized service terms and language switch | repository owner approves both texts before publication |
| Privacy | required | required | localized data-use, contact, and external-provider disclosure | repository owner approves both texts before publication |
| Commercial disclosure | required | Japanese authoritative route only | required commercial disclosure and clear English-footer label | Japanese route is the published source; translation requires separate review |

No route launches with placeholder copy, an empty index, an unavailable required asset, or an unapproved client example.
