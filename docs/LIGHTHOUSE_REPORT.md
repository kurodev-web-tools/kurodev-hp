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

## 2026-04-23 Production Recheck

URL: `https://kuro-lab.com/`

### Desktop
- Performance: 100
- Accessibility: 94
- Best Practices: 77
- SEO: 100
- Key metrics: FCP 0.3s, LCP 0.5s, TBT 0ms, CLS 0

### Mobile
- Performance: 96
- Accessibility: 94
- Best Practices: 77
- SEO: 100
- Key metrics: FCP 1.0s, LCP 2.3s, TBT 180ms, CLS 0

### Result
- Mobile Performance improved from 81 to 96 after favicon optimization and brand icon separation.
- The previous 1.9MB favicon payload issue is resolved.
- Remaining app-side accessibility items are primary button contrast and heading order.
- Remaining image delivery note points to `brand-icon.png` at about 65KB; this is no longer a blocking payload issue.
- Best Practices warnings include Cloudflare challenge deprecations and Cloudflare Insights being blocked by the audit client.

## Next Follow-up
- Fix primary button contrast and heading order if targeting Accessibility 100.
- Consider a smaller or WebP brand icon only if future audits still flag image delivery.
