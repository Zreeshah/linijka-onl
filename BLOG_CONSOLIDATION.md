# Blog Consolidation and AdSense Content Cleanup

Updated: 2026-09-01

This pass is limited to the blog. The homepage tool, calibration logic, printable-ruler page, and homepage copy were left unchanged. The only homepage edit is destination cleanup for two existing blog links so they point to the surviving article.

## Evidence and limitation

The supplied Search Console snapshot shows that the homepage owns essentially all current search visibility. It also shows only small blog visibility for `/blog/10-cm/`, `/blog/cm-na-cale/`, and `/blog/zmierzyc-ekran-w-calach/`. No Search Console connector or complete query export was available in the workspace, so a fresh full-query re-check could not be performed. The map below therefore follows the supplied data and uses conservative redirects for terms already owned by the homepage.

## Final blog map

### Surviving URLs

| URL | Primary angle | Treatment |
| --- | --- | --- |
| `/blog/telefon-jako-miarka/` | Supplementary phone measurement guide | Receives the phone cluster |
| `/blog/aplikacja-linijka-online/` | Browser tool vs installed measurement app | Standalone comparison |
| `/blog/linijka-online-20-cm/` | Measuring longer objects on a larger screen | Standalone use case |
| `/blog/linijka-pionowa-online/` | Measuring height and narrow objects | Standalone use case |
| `/blog/kalibracja-linijki-online/` | Screen-scale calibration and accuracy control | Receives the accuracy article |
| `/blog/linijka-do-druku/` | Correct A4 printing and scale checks | Standalone use case |
| `/blog/10-cm/` | 10 cm / 100 mm screen test | Retained because it has impressions |
| `/blog/cm-na-cale/` | Centimeter-to-inch conversion | Standalone conversion |
| `/blog/cm-na-mm/` | Centimeter-to-millimeter conversion | Receives the reverse conversion |
| `/blog/zmierzyc-ekran-w-calach/` | Measuring an active screen diagonal | Retained because it has impressions |
| `/blog/pomiar-sruby-linijka/` | Preliminary screw measurement | Standalone object use case |
| `/blog/rozmiar-karty-bankowej/` | Standard card dimensions as a calibration reference | Standalone reference |
| `/blog/zmierzyc-pierscionek-linijka/` | Measuring a ring's internal diameter | Standalone object use case |

The phone article is explicitly supplementary and does not use `linijka w telefonie` or `miarka w telefonie` as its title or standalone primary target. Generic pages for `linijka online`, `centymetr online`, and `miarka online` redirect to the homepage because the homepage already owns those intents.

### 301 redirects

| Old URL | Permanent destination | Reason |
| --- | --- | --- |
| `/blog/linijka-w-telefonie/` | `/blog/telefon-jako-miarka/` | Duplicate phone-use intent |
| `/blog/miarka-w-telefonie/` | `/blog/telefon-jako-miarka/` | Duplicate phone-use intent |
| `/blog/linijka-online/` | `/` | Homepage owns the generic term |
| `/blog/centymetr-online/` | `/` | Homepage owns the generic term |
| `/blog/miarka-online-cm/` | `/` | Homepage owns the generic term |
| `/blog/czy-linijka-online-dokladna/` | `/blog/kalibracja-linijki-online/` | Accuracy and calibration are one topic |
| `/blog/mm-na-cm/` | `/blog/cm-na-mm/` | Same bidirectional conversion |

Redirects are configured in both `vercel.json` and `public/_redirects` for common static-hosting paths. The legacy generator inputs for removed pages were also removed so the old pages are not recreated by the repository's content-processing script.

## Content changes

Each surviving article received a distinct Polish title, description, structure, example set, and six-question FAQ block. The rewrites add:

- device-specific calibration notes;
- concrete numbers such as 85.60 x 53.98 mm for a standard ID-1 card;
- separate guidance for screens, paper, screws, rings, cards, and longer objects;
- limitations and when to confirm a result with a physical tool;
- relevant internal links between the surviving pages;
- authoritative references for units, CSS length behavior, printing, and card dimensions.

No blog article is presented as a certified measurement method. The copy distinguishes a useful everyday estimate from a technical measurement.

## Sitemap and verification

`npm run build` passed. Astro generated 18 pages and a sitemap containing 13 surviving blog URLs. Removed pages are not included in the sitemap; their old URLs are handled by permanent redirects at the hosting layer.

Before publishing, verify these redirect responses on the deployed host and request recrawling for the surviving URLs in Search Console. IndexNow can be used for discovery, but it does not replace Google Search Console submission or monitoring.

## Monitoring plan

Wait 2-4 weeks before changing homepage content. During that period, compare the previous and current Search Console data for:

1. homepage clicks, impressions, CTR, and average position for the homepage-owned queries;
2. impressions and queries for the 13 surviving articles;
3. redirect coverage and any excluded or soft-404 URLs;
4. AdSense review status and page-level ad-to-content balance.

Do not publish another batch of near-duplicate articles. A safer cadence is one genuinely distinct article every 2-3 weeks, followed by an update to an existing article when Search Console reveals a real query gap. New content should be reviewed for overlap with the homepage before publication.
