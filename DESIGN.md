# kurodev Creator Studio Design System

## 1. Direction and visual contract

The site is a calm creator studio before a stream: focused, capable, and visibly built around real tools. The memorable moment is the product-screen stack emerging from a deep navy work surface while the main message stays quiet and readable.

Visual references:

- `docs/mockups/kurodev-creator-platform/home-desktop.png`
- `docs/mockups/kurodev-creator-platform/home-mobile.png`
- `docs/mockups/kurodev-creator-platform/tools-desktop.png`

The generated images establish hierarchy, rhythm, and atmosphere. They are not sources for text, product status, or inaccessible geometry. Real copy, verified product records, responsive behavior, and accessibility override image-generation artifacts.

Do not reproduce:

- misspelled or synthetic text inside the mockups;
- the mockup's unverified fourth tool or invented integrations;
- app-style sidebars or fixed bottom navigation on the marketing site;
- hexagon/circle hero decoration, code-editor identity, purple blobs, card grids repeated section after section, or nested glass panels.

## 2. Tokens

### Color roles

Dark is the primary launch presentation. Light mode keeps the same cyan identity and information hierarchy.

```css
:root {
  --color-ink-950: #061019;
  --color-ink-900: #081520;
  --color-ink-850: #0b1a25;
  --color-ink-800: #10222e;
  --color-ink-700: #18313d;
  --color-paper-50: #f4f8fa;
  --color-paper-100: #e8f0f3;
  --color-slate-300: #a7b7bf;
  --color-slate-400: #82949d;
  --color-cyan-300: #55ded8;
  --color-cyan-400: #28c8c2;
  --color-cyan-500: #13aaa8;
  --color-cyan-700: #087273;
  --color-magenta-400: #d0509e;
  --color-success: #3dd6a3;
  --color-warning: #f3ba63;
  --color-danger: #ef7185;
}
```

Semantic mapping:

- `--canvas`: ink-950 dark / paper-50 light.
- `--surface`: ink-900 dark / white light.
- `--surface-raised`: ink-850 dark / paper-50 light.
- `--surface-muted`: ink-800 dark / paper-100 light.
- `--text-primary`: paper-50 dark / ink-950 light.
- `--text-secondary`: slate-300 dark / ink-700 light.
- `--text-muted`: slate-400.
- `--border-subtle`: paper at 12% dark / ink at 12% light.
- `--border-strong`: cyan-400 at 45%.
- `--action`: cyan-400; `--action-hover`: cyan-300; `--action-pressed`: cyan-500.
- `--announcement`: magenta-400. It is never the default CTA color.

Contrast requirements:

- Normal text: at least 4.5:1.
- Large text and non-text UI: at least 3:1.
- Cyan filled buttons use ink-950 text unless verified white text passes.
- Status is always communicated by label/icon in addition to color.

### Typography

- Display and body: `Noto Sans JP`, with `Hiragino Sans`, `Yu Gothic UI`, and sans-serif fallbacks.
- Latin product names may use the same family; avoid an unrelated display face.
- Maximum content line length: 68 characters; supporting copy targets 36–52 Japanese characters per line on desktop.

| Token | Desktop | Mobile | Line height | Weight |
| --- | --- | --- | --- | --- |
| `display-xl` | 56px | 36px | 1.18 | 700 |
| `display-lg` | 44px | 32px | 1.22 | 700 |
| `heading-md` | 30px | 26px | 1.3 | 700 |
| `heading-sm` | 22px | 20px | 1.4 | 650 |
| `body-lg` | 18px | 17px | 1.8 | 400 |
| `body-md` | 16px | 16px | 1.75 | 400 |
| `body-sm` | 14px | 14px | 1.7 | 400 |
| `label` | 13px | 13px | 1.4 | 650 |

Hero headlines use two or three lines at most. Accent-colored words are semantic emphasis, not gradients.

### Spacing and geometry

- Base unit: 4px.
- Space tokens: 4, 8, 12, 16, 24, 32, 48, 64, 80, 112, 144px.
- Desktop page gutter: 40px; tablet: 28px; mobile: 20px.
- Maximum layout width: 1440px; primary readable content: 1180–1280px.
- Section block spacing: 112px desktop, 80px tablet, 64px mobile.
- Radius: 6px controls, 10px media/panels, 14px only for prominent grouped surfaces. No pill containers except status/filter chips.
- Border: 1px subtle line. Prefer borders and tonal shifts to large shadows.
- Raised-product shadow: `0 24px 80px rgb(0 0 0 / 28%)`, paired with a one-pixel cyan-tinted rim.

### Atmosphere

The canvas uses layered light rather than decorative blobs:

1. deep vertical navy gradient;
2. very low-opacity 48px studio grid;
3. restrained cyan radial light behind the main product screen;
4. top and section dividers at subtle-border opacity.

Never place the grid above text or screenshots. It must disappear in forced-colors mode.

## 3. Layout grammar

- Header: full-width, 64–72px tall, border-bottom, content aligned to the main grid.
- Desktop hero: asymmetric 42/58 split; copy remains dominant in reading order, product stack is the visual focal object.
- Product media can overlap within one controlled stage, but each image has an explicit aspect ratio and remains recognizable.
- Sections alternate between open editorial rows, media-led stages, and thin divided lists. Avoid repeating equal four-card grids.
- Mobile order: message, primary action, secondary action, product stage, flagship introduction, tool list, website-service bridge, footer.
- Mobile product stage may crop supporting screens but never the dominant screen's title or primary navigation.

Breakpoints:

- mobile: 0–767px;
- tablet: 768–1023px;
- desktop: 1024px and above;
- wide layout cap: 1440px.

QA viewports are 375, 768, 1024, and 1280px. Also spot-check 390 and 1366px where source-product media changes cropping.

## 4. Interaction and motion

- Motion tokens: 120ms immediate, 180ms control, 280ms reveal.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Animate only transform, opacity, and filter.
- Header/menu state changes are immediate enough to preserve orientation.
- Product screenshots may use a 4–8px hover lift on pointer devices; no continuous floating.
- Respect `prefers-reduced-motion: reduce` by removing nonessential movement while preserving visible state changes.
- Theme changes must not flash incorrect content and must retain focus.

## 5. Reusable primitives and states

### `SiteHeader`

- Desktop horizontal navigation, text language switch, theme control, and distinct Contact action.
- Mobile wordmark, language control, and menu button; menu uses a dialog-like focus boundary and restores focus on close.
- States: default, current route, hover, focus-visible, menu open, reduced motion.

### `ActionLink`

- Variants: primary fill, secondary outline, quiet text, disabled/unavailable.
- Minimum target: 44 by 44px.
- External destinations expose an accessible external-link label.
- States: default, hover, focus-visible, active, disabled, loading where applicable.

### `ProductStage`

- Dominant real screenshot plus no more than two supporting screenshots.
- Explicit intrinsic dimensions, aspect ratio, alt text, and focal crop.
- States: loaded, loading placeholder, unavailable media fallback.

### `ToolFeature`

- Screenshot, verified title, outcome-focused description, status, primary action, optional details/guide action.
- Desktop may use alternating rows or an asymmetric editorial grid; mobile becomes a single reading column.
- States: available, beta, in development, conceptual. Only available/beta can expose an enabled Use action.

### `StatusBadge`

- Text plus a shape/icon cue. Never color alone.
- Status vocabulary is shared across locales and content records.

### `SectionIntro`

- Optional short kicker, heading, short body, and optional action.
- It is open layout by default and must not create a card wrapper by itself.

### `SiteFooter`

- Product, creator-site, guide, contact, and legal groups; locale-aware paths; no placeholder links.

Primitive review requires default, hover, focus, disabled/unavailable, loading/media-fallback, dark, light, and reduced-motion coverage where applicable.

## 6. Responsive and accessibility contract

- Semantic landmarks: one header, nav, main, and footer; one `h1` per page.
- A skip link becomes visible on focus.
- Keyboard order follows visual reading order.
- No horizontal overflow at QA widths.
- Mobile menu and language controls use text labels and accessible names; no country flags.
- Product screenshots that communicate content have descriptive localized alt text. Decorative supporting crops use empty alt text.
- Focus ring: 2px cyan-300 with 3px canvas offset; must remain visible on both themes.
- Do not encode language, availability, or status using color alone.
- Forms retain labels, field-level error association, focus-on-first-error, success/failure announcements, and sanitized logging.
- Light and dark themes are both supported; dark is the visual reference baseline.

## 7. Content and implementation rules

- `kurodev` is the umbrella brand; `Kuro Stream Kit` is the flagship product.
- Never show the internal repository name `V-streamer-tools` publicly.
- Do not claim automatic schedule-to-website synchronization.
- Tool order is editorial and deterministic, never random.
- Confirmed currently published tools from the inspected public source are Schedule Calendar, Thumbnail Editor, and SNS Split Image Maker. A fourth launch item must be verified before it is presented as available.
- Japanese routes live at root; English routes live under `/en`. Language changes are explicit user actions, not geo-IP redirects.
- Generated mock text is not production copy. Localized content registries are the source of truth.
