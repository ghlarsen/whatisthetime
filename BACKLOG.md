# whatisthetime.now — Backlog

Features and ideas not yet ready for implementation. When ready to build, convert to a GitHub Issue.

---

## Ready

### DST status badge on city pages
**Why:** "Is it summertime in [city]?" is a common query. We already compute `isInDST` — we just don't display it prominently.

**What we want:**
- Large, visible DST badge in ClockHero: "DST ACTIVE" (green) or "STANDARD TIME" (neutral)
- Cities without DST show "No DST" in muted style
- Links to `/summertime` for full worldwide overview

---

### Sunrise/sunset on all city pages
**Why:** time.is has it. High-value passive data that increases time-on-site and positions us for "sunrise in [city]" queries.

**What we want:**
- SunCalc library (pure trig, no API) — calculate from city lat/lng
- Display sunrise + sunset times in ClockHero, subtle row below the clock
- Week number (ISO 8601) alongside
- Requires adding lat/lng to CityEntry data (990 cities)

---

### `/summertime` — Global DST status page
**Why:** Single page capturing all "is it summertime" / "daylight saving time" long-tail queries. Feeds link equity back to city pages.

**What we want:**
- Grid of all countries/major cities showing DST active/inactive
- Color-coded: green = DST active, neutral = standard time, grey = no DST
- Countdown to next clock change
- FAQ schema for GEO
- Route: `whatisthetime.now/summertime`

---

### "Compare with" related city links on city pages
**Why:** Internal linking between related city pages. Keeps users on site, passes link equity, mirrors time.is's "Time difference" section.

**What we want:**
- Below CityContent, a row of 4-6 "Compare [City] with [Other City]" links
- Logic: same region + major world hubs (NY, London, Tokyo, Sydney)
- Generates internal links naturally — no JS needed, pure `<a>` tags

---

### "Ad-free" subscription CTA
**Why:** time.is has this above the fold on every page. Low-effort revenue signal even before ads are live — builds waitlist.

**What we want:**
- Small sticky or inline CTA: "Enjoying the clean experience? Keep it that way — remove future ads for $X/year"
- Links to a Stripe Checkout or waitlist form
- Not intrusive — one line, dismissible, max once per session

---

## Planned — Content Empire

### `/country/[country]` — 198 nation time articles
**Why:** Massive SEO surface area. Every country has a time story. This creates 198 authoritative, interlinked articles that no competitor has in one place.

**URL pattern:** `/country/denmark`, `/country/japan`, `/country/samoa`

**Content per article:**
- Current time + timezone(s) in use
- When did they adopt their current timezone? Historical context.
- Have they ever changed? (Many have — fascinating stories)
- DST: do they observe it? History of DST in that country.
- Multiple timezones? How many, which regions?
- Interesting facts:
  - Samoa skipped December 30, 2011 entirely (crossed date line)
  - North Korea created "Pyongyang Time" (UTC+8:30) in 2015, abandoned it 2018
  - China uses one timezone for a country spanning 5 geographical zones
  - Nepal is UTC+5:45 (only 15-minute offset in the world)
  - Kiribati spans the date line — easternmost and westernmost points
  - Spain should be on GMT but uses CET (Franco aligned with Hitler's timezone)
  - India debated splitting into 2 timezones for decades, never did
- Links to all cities in that country on our site
- Links to relevant timezone pages

**Implementation:** AI-assisted content generation → human review → static pages. Could use Claude API + D1 storage, or generate at build time from a content repo.

**Slug strategy:** Use country names, not ISO codes. `/country/united-states` not `/country/us`. Readable, SEO-friendly.

---

### `/timezone/[tz]` — ~40 timezone explainer pages
**Why:** People search "what is CET", "UTC+9 countries", "EST vs EDT". These are high-intent informational queries with no good single-source answer.

**URL pattern options:**
- `/timezone/cet` — abbreviation (most searched)
- `/timezone/utc+9` — offset-based
- `/timezone/central-european-time` — long form
- All three could exist, with canonical pointing to the abbreviation

**Content per page:**
- Full name, abbreviation, UTC offset
- Which countries/cities use this timezone
- DST variant (CET → CEST, EST → EDT)
- Current time in this timezone (live)
- Map highlighting coverage area
- "Did you know?" facts
- Links to all cities in this timezone on our site

**Count:** ~40 distinct timezones × abbreviation + offset aliases = ~80-100 pages

---

### Article generation pipeline
Cloudflare Worker cron → Claude API → Cloudflare D1 → edge SSR pages. Auto-generated SEO articles about timezone pairs, DST transitions, travel time tips. See content empire items above for the editorial strategy.

---

## Planned — Features

### Variable font playground + `<wtit-clock>` widget embed
The "Make it yours" section with weight/optical size/spacing/color sliders and embed CTA. Drives backlinks via widget installs. See design spec for full details.

### Display ads (Setupad or Snigel)
Hold until 30–50k PV/month. Contact Setupad (Latvia) or Snigel (Ireland) — both EU-based header bidding networks, no self-serve signup but will respond fast once traffic exists.

### Widget Pro upsell tier
Freemium SaaS play: remove "powered by whatisthetime.now" branding from `<wtit-clock>` embed for $5–15/month. Needs billing infrastructure. Build after widget has meaningful embed traction.

### Sunrise/sunset theme auto-detection
On page load, detect day/night at user's location → set theme automatically. Manual override via cookie. Uses CF-IPLatitude/CF-IPLongitude for SSR pages, client-side SunCalc fallback for static pages.

---

## Ideas (unvalidated)

- Meeting planner — schedule across timezones with business hours overlay
- Cal.com affiliate integration on `/when/` pages ("Schedule a meeting at this time →")
- `isitsummertime.in` / `isitsummertime.now` domain play (low priority — content already served by `/summertime` + city pages)

---

## Done

- ~~Footer city link grid~~ — 4-column grid, 36 cities, grouped by region
- ~~Ad slot layout zones~~ — Proton VPN banners in all positions (leaderboard + content slot)
