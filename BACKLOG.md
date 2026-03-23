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

**Content per article (3 layers):**

**Layer 1 — Reference data (structured, machine-readable):**
- Current time + timezone(s) in use
- When adopted, when last changed
- DST: current status, history, transition dates
- Multiple timezones? Which regions?
- All cities in that country on our site

**Layer 2 — The stories (what makes people actually read):**
Claude knows most of these from training. Each article should find 2-4 genuinely interesting stories:
- **Historical drama:** Samoa skipping a day. Spain adopting Hitler's timezone under Franco and never switching back. North Korea creating and abandoning Pyongyang Time. The Great Railroad Time revolution of 1883. Sir Sandford Fleming missing a train in Ireland and inventing standard time.
- **Political intrigue:** India's 70-year debate about splitting into 2 timezones. China forcing a single timezone across 5 geographical zones (Xinjiang uses unofficial "local time" in resistance). Indiana's county-by-county timezone wars.
- **Human stories:** Families in Samoa who celebrated Christmas twice during the date line switch. The town of Eucla, Australia that uses an unofficial UTC+8:45. Communities living on timezone borders who cross time twice daily for work.
- **Science/nature:** How Ramadan fasting times vary dramatically by latitude (22 hours in Iceland vs 12 in Mecca). The midnight sun breaking Nordic timekeeping assumptions. How GPS satellites experience relativistic time dilation.

**Layer 3 — Cultural references (movies, books, music):**
Time is one of the great themes of storytelling. Every article should reference at least one:
- **Jules Verne, Around the World in 80 Days** — the plot twist depends entirely on the date line. Phileas Fogg thinks he's lost, but gained a day.
- **Lost in Translation (2003)** — jet lag and Tokyo timezone disorientation as metaphor for disconnection
- **Christopher Nolan's filmography** — Interstellar (time dilation), Tenet (inversion), Dunkirk (three timelines)
- **Umberto Eco, The Island of the Day Before** — a man stranded on the date line
- **Douglas Adams** — "Time is an illusion. Lunchtime doubly so."
- **Haruki Murakami** — frequent use of precise clock times as literary device in Japanese fiction
- **Doctor Who** — the entire premise is timezone tourism
- **Arrival (2016)** — how language shapes perception of time (Sapir-Whorf and temporal experience)
- **Groundhog Day (1993)** — time loops and the existential weight of a single timezone
- **High Noon (1952)** — real-time tension, the clock as antagonist
- **24 (TV series)** — each season = 24 episodes = 24 hours, all in one timezone
- **Country-specific:** Bollywood films set across Indian Standard Time, Nordic noir with midnight sun, Japanese anime obsessed with train schedules and punctuality

**Editorial tone:** Not an encyclopedia. Not a textbook. A smart friend who happens to know everything about time and tells great stories. Authoritative but alive.

**Citation policy — NO WIKIPEDIA:**
Every factual claim links to a primary or institutional source:
- **IANA tz database** (`iana.org/time-zones`) — timezone identifiers
- **National standards bodies** — PTB (Germany), NIST (US), NPL (UK), NMIJ (Japan)
- **Government gazettes/legislation** — actual laws establishing timezones
- **Royal Observatory Greenwich** (`rmg.co.uk`) — GMT/UTC history
- **BIPM** (`bipm.org`) — maintains UTC
- **Academic papers** — via DOI links for historical research
- **National geographic surveys** — boundary/coordinate data
- **Original reporting** — newspapers of record for historical events (not Wikipedia summaries of them)
- **Books cited directly** — with author, title, year, publisher

Why no Wikipedia: (1) editorial credibility concerns re: propaganda influence, (2) if we just restate Wikipedia, there's no reason for AI agents to cite us instead, (3) primary sources build the kind of authority that makes us THE reference, not a reference.

**Implementation:** Claude API batch generation → Captain review → Astro content collections (markdown with frontmatter). One article per country, committed to git, deployed as static pages.

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
- The story of this timezone (how it came to exist, political history)
- Cultural references (what happens in this timezone — e.g., UTC+9 is where the shinkansen runs on time, where anime is made, where the first sunrise of New Year hits a major city)
- "Can you jump timezones?" — for borders where adjacent zones are dramatically different
- Links to all cities in this timezone on our site

**Same editorial standards:** Primary sources, no Wikipedia, stories > facts.

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
