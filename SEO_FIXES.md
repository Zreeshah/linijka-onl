# SEO Fixes Log

Generated: 2026-08-16

This file summarizes the SEO and indexing work completed for `https://www.linijka.onl/`.

## Current Status

- Site is live on the canonical `www` host: `https://www.linijka.onl/`.
- Previous live technical sweep passed before the blog consolidation:
  - 25 sitemap URLs checked.
  - 40 internal links checked.
  - Canonicals are aligned to `https://www.linijka.onl/`.
  - Meta descriptions are present and improved.
  - Blog pages have one H1 each.
  - No stale `/guides/`, `/resources/`, or bare-domain internal URL patterns found.
- Latest SEO content commit: `b9b374a Add controlled SEO blog improvements`.
- Current working-tree SEO cleanup is documented in [BLOG_CONSOLIDATION.md](./BLOG_CONSOLIDATION.md).
- Current local production build generates 18 pages, including 13 surviving blog URLs.

## Completed Fixes

### 1. Google Search Console Verification

Commit: `0dcdbb7 feat: add Google Search Console verification meta tag`

- Added Google Search Console verification meta tag to the site.
- This allows ownership verification and performance monitoring in GSC.

### 2. SEO Blog Section

Commit: `9e1c9b0 feat: implement fully SEO-optimized blog section with 20 articles and custom featured images`

- Added a blog section with 20 SEO-focused articles.
- Added blog index and dynamic blog post pages.
- Added article titles, descriptions, hero images, internal links, and structured article layout.

### 3. AdSense Approval Setup

Commit: `b63a8a8 Add AdSense approval files`

- Added Google AdSense approval script:
  - Publisher ID: `ca-pub-6218065184548996`
- Added `public/ads.txt`:
  - `google.com, pub-6218065184548996, DIRECT, f08c47fec0942fa0`

### 4. IndexNow Setup

Commit: `a274fa9 Add IndexNow verification key`

- Added IndexNow verification key file.
- Submitted sitemap URLs through IndexNow to speed up discovery.
- Later IndexNow submissions were also run after major SEO updates.

### 5. Homepage Backlink

Commit: `b4683d2 Add homepage backlink`

- Previously added a dofollow homepage backlink to:
  - `https://linijka-online.pl/`
- REMOVED in Phase 3 cleanup per requirements.

### 6. Homepage Infographic

Commit: `f933670 Add homepage infographic`

- Added the provided Polish infographic to the homepage before the FAQ section.
- Made the infographic responsive and clearly visible across device sizes.

### 7. Top SEO Audit Fixes

Commit: `995439c Fix top SEO audit issues`

- Fixed canonical host mismatch:
  - Updated site config, canonicals, sitemap, robots, schema, and Open Graph URLs to use `https://www.linijka.onl/`.
- Fixed broken internal links:
  - Replaced old `/guides/` and `/resources/` URLs with live canonical URLs.
  - Fixed stale blog slug references.
- Fixed duplicate H1s on blog posts:
  - Blog layout remains the only H1.
  - Markdown article headings were changed from `#` to `##`.
- Verified live:
  - Sitemap and robots used `www`.
  - Blog pages had one H1.
  - Internal link crawl passed.

### 8. Remaining SEO Quick Wins

Commit: `0b42ff6 Fix remaining SEO quick wins`

- Improved meta descriptions across:
  - Homepage
  - Blog index
  - Printable ruler page
  - About page
  - Privacy policy
  - All blog posts
- Optimized the homepage infographic:
  - Replaced the 5.4 MB PNG load with responsive AVIF/JPEG variants.
  - Removed the oversized PNG from deployed assets.
- Added richer homepage schema:
  - `Organization`
  - `WebSite`
  - `WebApplication`
  - Existing `HowTo`
  - Existing `FAQPage`
- Updated privacy/trust copy:
  - Added Google AdSense and cookie disclosure.
  - Added links to Google ad settings and ad technology policies.
- Verified live:
  - Metadata/assets/schema/privacy checks passed.
  - Live crawl passed.
  - IndexNow accepted 25 updated URLs.

### 9. GSC-Driven Blog Improvements

Commit: `b9b374a Add controlled SEO blog improvements`

Based on GSC keyword data, broad rewrites were avoided. Only controlled additions were made to pages with clear opportunity.

Updated pages:

- `/blog/10-cm/`
- `/blog/linijka-w-telefonie/`
- `/blog/miarka-w-telefonie/`
- `/blog/zmierzyc-ekran-w-calach/`

Changes made:

- Added focused "Szybka odpowiedz" sections.
- Added practical tables and examples.
- Added extra FAQs matching query intent.
- Added internal links between related pages.
- Added `updatedDate` support for blog frontmatter.
- Updated Article schema to output `dateModified` from `updatedDate`.
- Added cautious homepage internal links to priority pages:
  - `/blog/10-cm/`
  - `/blog/linijka-w-telefonie/`
  - `/blog/miarka-w-telefonie/`
  - `/blog/zmierzyc-ekran-w-calach/`
  - `/blog/cm-na-cale/`

Verification:

- `npm run build` passed.
- Live target pages showed new answer sections.
- Live Article schema showed `dateModified: 2026-08-12`.
- All blog pages still had one H1.
- Live crawl passed.
- IndexNow accepted 5 changed URLs.

## Important Strategy Decisions

- The homepage is the main ranking asset and was protected from major SEO/content changes.
- The homepage remains the primary ranking asset and was protected from content changes.
- Generic blog URLs that duplicate homepage-owned intent now redirect permanently to the homepage.
- Phone-use duplicates now consolidate into one supplementary article.
- Conversion and accuracy duplicates now consolidate into one destination each.
- The blog now publishes 13 distinct use-case articles instead of 20 overlapping posts.
- The current consolidation follows the supplied GSC snapshot; a complete fresh query export was unavailable in the workspace.

### 10. Blog Consolidation for AdSense Low-Value Content

This blog-only pass rewrote the surviving articles with distinct intent, examples, device notes, six-question FAQ blocks, and clearer measurement limitations. Seven obsolete blog URLs receive permanent redirects through `vercel.json` and `public/_redirects`. The full map and rollout guidance are in [BLOG_CONSOLIDATION.md](./BLOG_CONSOLIDATION.md).

Verification:

- `npm run build` passed.
- Astro generated 18 pages.
- The sitemap contains 13 surviving blog URLs.
- The homepage's visible copy was preserved; only two existing blog-link destinations were updated.

## Remaining SEO Work

These are not urgent technical fixes. They are ongoing growth tasks:

1. Monitor GSC for 14 to 28 days after the latest blog improvements.
2. Track performance for the surviving blog URLs and confirm the seven old URLs resolve with 301 responses.
3. Inspect changed URLs manually in Google Search Console if possible.
4. Wait 2-4 weeks before considering any homepage content changes.
5. Build more support content only after new GSC data confirms which clusters are improving.
6. Continue backlink and authority building.

## Useful Commands

```bash
npm run build
```

```bash
git log --oneline -12
```

```bash
rg -n "https://linijka\\.onl|/guides/|/resources/|^# " src blog-posts public astro.config.mjs
```
