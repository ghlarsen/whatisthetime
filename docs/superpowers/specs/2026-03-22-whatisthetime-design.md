# whatisthetime.now — Design Spec

**Date:** 2026-03-22
**Status:** Reviewed

---

## Overview

A world time site that earns passive ad revenue through SEO-optimized city time pages, a
timezone comparison widget, and a variable font clock playground that drives embeds and backlinks.

Two domains point to the same site:
- `whatisthetime.now` — primary (Cloudflare Pages)
- `whatisthetime.in` — redirect to `.now` (Porkbun → Cloudflare nameservers)

**North star:** time.is simplicity + worldtimebuddy utility + a widget funnel that compounds
organic backlinks over time.

> Note: `.now` TLD is valid and works in all modern browsers. Some corporate DNS resolvers and
> older ISPs may not resolve it — not a code issue, but worth monitoring in early analytics.

---

## Core User Flows

### 1. Someone wants to know what time it is somewhere
Land on `whatisthetime.now/copenhagen` → see massive clock, local date, timezone info.
Scroll down → see comparison widget with a few default cities. Done in 3 seconds.

### 2. Someone needs to coordinate across timezones
Visit `whatisthetime.now/when/9am-copenhagen/tokyo` → see converted time, business hours
overlay, day offset. Add cities. Bookmark or share URL.

### 3. Someone discovers the variable font playground
Lands on homepage → sees weight/optical size sliders → plays for 30 seconds → clicks
"GET WIDGET →" → copies embed code → puts it on their site → permanent backlink.

---

## Information Architecture

```
whatisthetime.now/                          # Homepage (auto-detected city)
whatisthetime.now/[city]                    # City time page (~500 cities)
whatisthetime.now/when/[time]-[city]/[city] # Time conversion (~6M+ URLs)
whatisthetime.now/timezone/[tz]             # Timezone info pages (IANA zones)
whatisthetime.now/embed                     # Widget generator / embed landing
whatisthetime.now/articles/[slug]           # Auto-generated SEO articles
```

### URL multiplication strategy
`/when/9am-copenhagen/tokyo` — time + origin city + destination city.
~500 cities × 500 cities × 24 canonical hour values = **~6M indexed pages**.
Canonical hours are whole hours only: `12am`, `1am` … `11pm` (24 values). Half-hours excluded from
canonical set to keep the index tractable. Each URL has a real search query behind it
("what time is it in tokyo when it's 9am in copenhagen").
Cloudflare Pages renders these dynamically via edge SSR; no pre-build required.

### `/when/` URL parsing rule
The time segment is always `{hour}{am|pm}`, e.g. `9am`, `11pm`. It always comes first and
always matches `/^\d{1,2}(am|pm)$/`. Everything after the first `-` is the city slug.

Examples:
- `9am-copenhagen` → time=`9am`, city=`copenhagen`
- `9am-new-york` → time=`9am`, city=`new-york`
- `9am-sao-paulo` → time=`9am`, city=`sao-paulo`

Rule: split on first `-` only. Token before first `-` must match the time pattern. If it
doesn't match, return 404.

Astro route file: `src/pages/when/[timecity]/[dest].astro` where `[timecity]` is the raw
`9am-new-york` segment, split at runtime.

---

## Visual Design

### Layout
Stacked single-column:
1. **Nav** — `whatisthetime.now` wordmark (left) + dark/light toggle (right)
2. **Clock hero** — full-width, left-aligned massive clock
3. **Comparison widget** — worldtimebuddy-style rows below the fold
4. **Widget playground** — variable font sliders + color picker + embed CTA
5. **Footer** — minimal

### Clock hero
- Font: **Bricolage Grotesque** variable font (Google Fonts)
- Default settings: `wght` 800, `opsz` 50
- Size: `clamp(60px, 18vw, 260px)` — fills viewport width
- Alignment: **left-aligned** (`text-align: left`, `font-variant-numeric: tabular-nums`)
- Tabular nums prevents digit-width jumping as seconds tick
- City label above (uppercase, spaced, muted)
- Date line below (muted)

### Theme
- Default: **dark** (`#0a0a0a` background, `#fff` text)
- Toggle: light mode (`#fff` background, `#111` text)
- User preference stored in `localStorage`
- CSS transition on background/color: `0.3s`

### Comparison widget
Worldtimebuddy-style horizontal bar rows:
- City name (left)
- Current time (muted)
- 24-hour bar: dark = off hours, green = business hours (09:00–17:00 local), red line = now
- "Add city" affordance at bottom
- Cities stored in `localStorage` AND synced to URL params for sharing
- **On page load: URL params take precedence over localStorage** if `?cities=` param is present.
  If no URL param, fall back to localStorage. This ensures shared URLs work correctly.

### Variable font playground
Controls (bottom panel):
- **Weight** slider: 200–800 (default 800)
- **Optical size** slider: 12–96 (default 50)
- **Letter spacing** slider: -1 to 3 (step 0.1, default 0, mapped to em via `/100`)
- **Color** swatches: white, matrix green, red, blue, gold, orange, purple (7 options)

Widget embed CTA:
```html
<div class="embed-cta" onclick="showEmbed()">
  ✨ Love this look? Embed it on your site
  <button>GET WIDGET →</button>
</div>
```
Clicking generates an embed snippet with the user's chosen settings as data attributes on the
custom element (not as query params on the script URL — see Widget System section).

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Astro** with `output: 'hybrid'` | Static city pages + edge SSR for `/when/` routes |
| Cloudflare adapter | **`@astrojs/cloudflare`** | Required for edge SSR on Cloudflare Pages |
| Hosting | **Cloudflare Pages** | Free tier, edge rendering, global CDN |
| City → timezone mapping | **`@vvo/tzdb`** | 500+ cities mapped to IANA zone names |
| Current offset + DST | **`Intl.DateTimeFormat`** (built-in) | Zero dependency, always correct for current time |
| Fonts | **Google Fonts** (Bricolage Grotesque) | Variable font, free, reliable CDN |
| Ads | **Google AdSense** at launch; migrate to Carbon Ads once approved | AdSense works immediately; Carbon requires manual approval |
| Articles | **Cloudflare Worker cron + Claude API → Cloudflare D1** | No deploy cycle; articles live immediately |

### Astro config
```js
// astro.config.mjs
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid',       // static by default, opt-in to SSR per route
  adapter: cloudflare(),
});
```

City pages use `export const prerender = true` at the top of their `.astro` file.
`/when/` routes omit this line → edge SSR.

### Rendering strategy
- **Static** (build time): City pages for top 500 cities, homepage, `/embed`, `/articles/`
- **Edge SSR** (Cloudflare): `/when/[timecity]/[dest]` routes — too many to pre-build
- **Client-side only**: Clock tick, comparison widget state, playground controls

### Timezone data flow
```
@vvo/tzdb (bundled at build)
  → city slug → IANA zone name (e.g. "Europe/Copenhagen")
  → Intl.DateTimeFormat(zone) → current UTC offset + DST state (server-rendered)
  → Client JS hydrates live clock, ticking every second
  → localStorage / URL params persist user city list
```

---

## Article Generation

Weekly auto-generated SEO articles. Architecture:

1. **Cloudflare Worker cron** fires weekly (e.g. every Monday 06:00 UTC)
2. Worker calls **Claude API** with a prompt like "Write a 400-word article about the best
   times to schedule a meeting between Copenhagen and Tokyo, include timezone facts"
3. Worker calls **GitHub API** (`PUT /repos/{owner}/{repo}/contents/src/content/articles/{slug}.md`)
   to commit the new markdown file directly to the repo
4. GitHub commit triggers **Cloudflare Pages auto-deploy** (already connected to the repo)
5. New article page is live within ~60 seconds

This requires: a GitHub personal access token stored as a Cloudflare Worker secret, and the
Worker having write access to the repo's `src/content/articles/` path.

Alternative (simpler, no deploy): articles stored in **Cloudflare D1** (SQLite), fetched
dynamically on `/articles/[slug]` edge SSR routes. No GitHub API needed, no deploy cycle.
**Chosen approach: D1.** Avoids deploy coupling, simpler Worker, articles live immediately.

Article routes use edge SSR (`/articles/[slug].astro`, no `prerender = true`). D1 is queried
at request time. Article index page (`/articles/`) is also edge SSR.

---

## Widget System

### Embed snippet (what users copy)
```html
<script src="https://whatisthetime.now/widget.js"></script>
<wtit-clock city="copenhagen" weight="800" color="#ffffff" size="medium"></wtit-clock>
```

User settings are data attributes on the custom element, **not** query params on the script URL.
This allows `widget.js` to be a static file served with long-lived cache headers (`max-age=86400`),
while each `<wtit-clock>` element carries its own config.

### Widget behavior
- Self-contained Web Component (`<wtit-clock>`)
- Reads config from element attributes: `city`, `weight`, `opsz`, `color`, `size`
- Ticks every second client-side
- No cookies, no tracking, GDPR-clean
- ~8kb gzipped

### Why this matters
Every embed is:
1. A permanent backlink to `whatisthetime.now`
2. A traffic source (viewers click through to configure their own)
3. A demonstration of the product in the wild

---

## SEO Strategy

### On-page
- `<title>`: `What time is it in Copenhagen? | whatisthetime.now`
- `<h1>`: City name + current time (SSR-rendered for crawlers with a static fallback time)
- Structured data: `schema.org/WebPage` with `name` and `description`
- Canonical URLs on all `/when/` pages
- `sitemap.xml` for top 500 city pages (static); `/when/` and `/articles/` routes excluded

### URL design
- City slugs: lowercase, hyphenated (`new-york`, `sao-paulo`)
- No trailing slashes
- User state (comparison cities) in URL params only when explicitly shared; not in canonical URLs

### Content
- Each city page: 2–3 sentences of static copy (timezone facts, DST dates)
- Weekly auto-generated article via D1 pipeline (see Article Generation)

---

## Revenue Model

### Phase 1 (launch)
- **Google AdSense** — works immediately, no approval wait, ~$1–3 CPM
- Apply to **Carbon Ads** in parallel; migrate once approved (developer-focused, higher CPM ~$2–5)
- Target: 50k pageviews/month → ~$50–150/month baseline

### Phase 2 (scale)
- **Carbon Ads** once approved and traffic established
- **Direct sponsorships** — travel agencies, VPN providers, remote work tools
- **Widget Pro** — remove "powered by" branding, custom domain, analytics ($5–10/month)
- Target: 500k+ pageviews/month via URL multiplication SEO → $1,000–3,000/month

### Phase 3 (optional)
- **Ad impression verification layer** — serve ads through Cloudflare Worker as first-party
  requests. Wrap impressions with verification metadata. Potential white-label SaaS play.

---

## What We're NOT Building (Yet)

- User accounts / saved preferences beyond localStorage
- Mobile apps
- Meeting planner (schedule across timezones)
- Paid tiers at launch
- The ad verification layer (Phase 3 research only)
- Site search (Pagefind or otherwise — not needed at this scale)

---

## Success Criteria

**Launch (Month 1):**
- [ ] Homepage loads in < 1s on Cloudflare edge
- [ ] Top 500 city pages indexed by Google
- [ ] Clock ticks accurately, no digit jumping
- [ ] Dark/light toggle works, persists
- [ ] Widget embed generates valid code
- [ ] Google AdSense displaying; Carbon Ads application submitted

**Growth (Month 3):**
- [ ] `/when/` routes returning correct conversions
- [ ] 10k+ pageviews/month organic
- [ ] 50+ active widget embeds in the wild
- [ ] Weekly article generation running on D1 cron

---

## Open Questions (Resolved)

| Question | Decision |
|----------|----------|
| Domain strategy | `.now` primary, `.in` redirect |
| Font | Bricolage Grotesque variable font |
| Layout | Stacked: clock hero → comparison widget → playground |
| Default theme | Dark, with toggle |
| Clock alignment | Left-aligned + tabular-nums |
| City → timezone mapping | `@vvo/tzdb` |
| Offset + DST calculation | `Intl.DateTimeFormat` (built-in) |
| Hosting | Cloudflare Pages (free tier) |
| Framework | Astro `output: 'hybrid'` + `@astrojs/cloudflare` |
| `/when/` URL parsing | Split on first `-`; token before must match `\d{1,2}(am\|pm)` |
| Canonical hour granularity | Whole hours only (24 values: 12am–11pm) |
| Article generation | Cloudflare Worker cron → Claude API → Cloudflare D1 |
| Ads at launch | Google AdSense (immediate); Carbon Ads pending approval |
| Widget embed format | `<wtit-clock>` attributes, static `widget.js` |
| City list state priority | URL params > localStorage on page load |
| Structured data | `schema.org/WebPage` |
