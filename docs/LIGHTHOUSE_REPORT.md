# Lighthouse Report

## 2026-04-23 Production Baseline

URL: `https://kuro-lab.com/`

### Desktop
- Performance: 100
- Accessibility: 94
- Best Practices: 81
- SEO: 100
- Key metrics: FCP 0.3s, LCP 0.5s, TBT 0ms, CLS 0

### Mobile
- Performance: 81
- Accessibility: 94
- Best Practices: 81
- SEO: 100
- Key metrics: FCP 1.0s, LCP 2.4s, TBT 700ms, CLS 0

### Findings
- `favicon.png` was oversized for icon and header usage: about 1.9MB before optimization.
- Header/sidebar image usage now points to `brand-icon.png`; `favicon.png` remains for browser icon metadata.
- Accessibility follow-ups remain: primary button contrast and heading order.
- Best Practices deprecation warnings appear to come from Cloudflare challenge scripts, not app code.

## Follow-up
- Deploy the favicon and brand icon changes.
- Re-run Lighthouse for Desktop and Mobile after deploy.
- If Accessibility remains 94, fix primary button contrast and heading order in the next batch.
