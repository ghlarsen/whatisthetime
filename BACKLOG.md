# whatisthetime.now — Backlog

Features and ideas not yet ready for implementation. When ready to build, convert to a GitHub Issue.

---

## Ready

### Footer city link grid (SEO — internal linking)
**Why:** time.is's domain authority comes largely from a sitemap-style footer on every page, passing PageRank to every city. We currently have zero internal links in the footer — 990 city pages are SEO islands.

**What we want:**
- Footer expands below the brand/copyright bar with a curated grid of ~30-40 cities (major world capitals + high-traffic cities)
- "Browse all cities →" link to a future `/cities` index page
- Links are `<a href="/[slug]">City</a>` — plain, crawlable, no JS
- Grouped loosely by region or alphabetical (TBD)
- Visually subtle — small type, low opacity — doesn't compete with the brand bar

**Implementation notes:**
- Hardcode the featured city list (no need to pull from full 990 list)
- Add to `Footer.astro`, below existing brand bar
- Mobile: 2-column grid. Desktop: 4-5 column grid.

---

### Week number + sunrise/sunset in ClockHero
**Why:** time.is shows week number (huge in Scandinavia/Germany/enterprise) and sunrise/sunset. We're missing both. Adds data density without complexity.

**What we want:**
- Week number (ISO 8601) displayed near the date in ClockHero
- Sunrise and sunset times for the city's location (approximate, lat/lon from cities data or a lookup table)
- Subtle display — not competing with the clock

**Implementation notes:**
- Week number: pure JS, no library needed
- Sunrise/sunset: SunCalc (~4kb) or a minimal trig formula — city lat/lon needed (add to CityEntry or separate lookup)

---

### "Compare with" related city links on city pages
**Why:** Internal linking between related city pages. Keeps users on site, passes link equity, mirrors time.is's "Time difference" section.

**What we want:**
- Below CityContent, a row of 4-6 "Compare [City] with [Other City]" links
- Logic: same region + major world hubs (NY, London, Tokyo, Sydney)
- Generates internal links naturally — no JS needed, pure `<a>` tags

---

### Ad slot layout zones
**Why:** We have no defined ad placement areas. time.is wraps their content in a layout that reserves ad slots. We should define zones now so we can activate Setupad/Snigel when traffic hits threshold.

**What we want:**
- One leaderboard slot below ClockHero (above MeetingGrid)
- One rectangle slot in the right gutter of CityContent on desktop
- Slots are empty `<div class="ad-slot">` placeholders for now — Setupad fills them later
- Mobile: collapse gracefully (no layout shift)

---

### "Ad-free" subscription CTA
**Why:** time.is has this above the fold on every page. Low-effort revenue signal even before ads are live — builds waitlist.

**What we want:**
- Small sticky or inline CTA: "Enjoying the clean experience? Keep it that way — remove future ads for $X/year"
- Links to a Stripe Checkout or waitlist form
- Not intrusive — one line, dismissible, max once per session

---

### Sunrise/sunset theme auto-detection
**Current state:** Light/dark toggle exists in Nav, preference stored in localStorage.

**What we want:**
- On page load, detect whether it's currently day or night at the user's location
- Set theme automatically: dark after sunset, light after sunrise
- Manual override button remains (already exists in Nav)
- Store the **manual override** in a cookie (not localStorage) so it works across subdomains and persists correctly across sessions
- If no override cookie: auto-mode runs on every page load
- If override cookie set: respect it, ignore sunrise/sunset logic

**Implementation notes:**

Cloudflare injects `CF-IPLatitude` and `CF-IPLongitude` on every edge request — use these for server-side sunrise/sunset calculation. No geolocation API needed.

**SSR pages (homepage, `/when/` routes):**
- Read `CF-IPLatitude` / `CF-IPLongitude` + `Cookie` header in the Astro frontmatter
- If override cookie present → use it, skip sun calc
- Otherwise → run SunCalc server-side, set `data-theme` directly in the HTML response
- Result: correct theme baked into HTML before a single byte reaches the browser. Zero flash, zero JS required for initial render.

**Static city pages (prerendered, no server context):**
- Inline script in Base.astro reads cookie first
- If no cookie → client-side SunCalc with `navigator.geolocation` (or reuse IP lat/lon if stored in cookie by a prior SSR page visit)
- Falls back to system preference if geolocation denied

**Manual override:**
- Toggle button writes a `theme` cookie (not localStorage)
- SSR pages read the cookie on next request → override respected before HTML is sent
- Cookie format: `theme=dark` / `theme=light` / absent = auto

**SunCalc:** ~4kb pure JS, no dependencies, can be inlined or bundled. Alternatively roll a minimal formula (sunrise/sunset only needs ~20 lines of trig).

---

## Planned (post-launch)

### Variable font playground + `<wtit-clock>` widget embed
The "Make it yours" section with weight/optical size/spacing/color sliders and embed CTA. Drives backlinks via widget installs. See design spec for full details.

### Article generation pipeline
Cloudflare Worker cron → Claude API → Cloudflare D1 → `/articles/[slug]` edge SSR pages. Weekly auto-generated SEO articles about timezone pairs. See design spec for architecture.

### Display ads (Setupad or Snigel)
Hold until 30–50k PV/month. Contact Setupad (Latvia) or Snigel (Ireland) — both EU-based header bidding networks, no self-serve signup but will respond fast once traffic exists.

### Widget Pro upsell tier
Freemium SaaS play: remove "powered by whatisthetime.now" branding from `<wtit-clock>` embed for $5–15/month. Needs billing infrastructure. Build after widget has meaningful embed traction.

---

## Ideas (unvalidated)

- `/timezone/[tz]` pages — IANA timezone info pages (e.g. `/timezone/Europe/Copenhagen`)
- Meeting planner — schedule across timezones with business hours overlay
- Cal.com affiliate integration on `/when/` pages ("Schedule a meeting at this time →")
