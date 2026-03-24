# whatisthetime.now — Backlog

Features and ideas not yet ready for implementation. When ready to build, convert to a GitHub Issue.

---

## Ready

### `/compare/[city1]/[city2]` — City comparison pages
**Why:** time.is has `time.is/compare/City1/City2`. We only have `/when/9am-city1/city2` which requires a specific time. A general compare page shows side-by-side clocks, time difference, business hours overlap, and "Compare with" links to other city pairs. Massive SEO surface (990 x 989 possible combinations).

**What we want:**
- Side-by-side live clocks for two cities
- Time difference, DST status comparison
- Business hours overlap visualization
- Links to both city pages and both country articles
- "Also compare" suggestions (related pairs)
- URL: `/compare/copenhagen/tokyo`

---

### "Compare with" related city links on city pages
**Why:** Internal linking between related city pages. Keeps users on site, passes link equity.

**What we want:**
- Below CityContent, a row of 4-6 "Compare [City] with [Other City]" links
- Logic: same region + major world hubs (NY, London, Tokyo, Sydney)
- Links to `/compare/city1/city2` pages
- Pure `<a>` tags, no JS

---

### `/summertime` — Global DST status page
**Why:** Single page capturing all "is it summertime" / "daylight saving time" long-tail queries.

**What we want:**
- Grid of all countries/major cities showing DST active/inactive
- Color-coded: green = DST active, neutral = standard time, grey = no DST
- Countdown to next clock change
- FAQ schema for GEO

---

### `/timezone/[tz]` — ~40 timezone article pages
**Why:** People search "what is CET", "UTC+9 countries", "EST vs EDT". The /timezones directory page exists but individual timezone articles don't.

**What we want:**
- Full article per timezone (like country articles: stories + reference + cultural refs)
- Abbreviation-based slugs: `/timezone/cet`, `/timezone/est`, `/timezone/jst`
- Content: history, which countries use it, DST variant, cultural context
- Links to all cities in this timezone

---

### Jet lag article
**Why:** High-search-volume topic that connects naturally to every city page 5+ hours from the reader.

**What we want:**
- Deep article at `/articles/jet-lag`
- Science: circadian disruption, eastbound-is-worse research, recovery rate per timezone crossed
- NASA studies, sleep science citations
- Cultural references (Lost in Translation, frequent flyer culture)
- Link from city pages when offset > 5 hours from visitor

---

### og.png for social sharing
**Why:** Social sharing cards are broken (og.png referenced but doesn't exist). Need a 1200x630 image.

---

### Proton banner WebP conversion
**Why:** 348KB of PNGs could be ~140KB as WebP. Loaded on every page.

---

### "Ad-free" subscription CTA
**Why:** Revenue signal. Small inline CTA: "Remove future ads for $X/year". Links to Stripe/waitlist.

---

## Planned — Features

### Variable font playground + `<wtit-clock>` widget embed
"Make it yours" section with weight/optical size/spacing/color sliders and embed CTA. Drives backlinks via widget installs.

### Display ads (Setupad or Snigel)
Hold until 30-50k PV/month. EU-based header bidding networks.

### Widget Pro upsell tier
Remove branding from embed for $5-15/month. Needs billing infrastructure.

### Sunrise/sunset theme auto-detection
Detect day/night at user's location, set theme automatically. CF-IPLatitude/CF-IPLongitude for SSR, client-side SunCalc fallback for static.

### Timezone map Phase 2
Real timezone boundary map with hover-to-highlight individual timezones (not just offset groups), click-to-navigate to `/timezone/[tz]` pages. Requires individual timezone pages to exist first.

---

## Ideas (unvalidated)

- Meeting planner standalone page (schedule across timezones)
- Cal.com affiliate integration on `/when/` pages
- `isitsummertime.in` / `isitsummertime.now` domain play
- Article pipeline: Cloudflare Worker cron for auto-generated timezone pair articles

---

## Done

- ~~Footer city link grid~~ — 4-column grid, 45 cities, grouped by region (expanded with Africa, South America, Middle East)
- ~~Ad slot layout zones~~ — Proton VPN banners on all pages (2 per page, never stacked)
- ~~DST status badge~~ — DST/STD/No DST on every city page ClockHero
- ~~Sunrise/sunset~~ — SunCalc on all 990 cities, displayed in ClockHero
- ~~Week number~~ — ISO 8601, displayed in ClockHero
- ~~245 country articles~~ — Three-layer content, primary sources, no Wikipedia
- ~~990 city stories~~ — With internal links to country, co-zone cities, /when/ conversions
- ~~Interactive timezone map~~ — 406 IANA boundaries, Robinson projection, hover/click
- ~~/timezones directory~~ — 37 UTC offsets, all countries linked, FAQ schema
- ~~/cities directory~~ — 990 cities grouped by continent + timezone
- ~~Dual clock~~ — Your time vs subject time on city pages + country articles
- ~~Security headers~~ — CSP, X-Frame-Options, HSTS, Permissions-Policy
- ~~Code review remediation~~ — XSS fixes, WCAG AA contrast, client bundle reduction, keyboard nav
- ~~Mobile fixes~~ — Horizontal scroll, search on mobile, touch targets, font zoom prevention
- ~~Nav logo size~~ — Bumped to --t-base for JMB hierarchy
- ~~Footer nav links~~ — /timezones, /cities links in footer
- ~~llms.txt~~ — AI agent welcome message, accurate page listings
