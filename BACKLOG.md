# whatisthetime.now — Backlog

Features and ideas not yet ready for implementation. When ready to build, convert to a GitHub Issue.

---

## Ready

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
- Geolocation: browser `navigator.geolocation` for precise location, or IP-based fallback (Cloudflare provides `CF-IPCountry` + lat/lon headers on Pages — check if available)
- Sunrise/sunset calculation: can be done client-side with a small pure-JS formula (no API needed) — SunCalc is ~4kb or roll a simple formula
- Cookie vs localStorage: cookie so Cloudflare edge can potentially read it server-side for SSR theme (no flash)
- Flash prevention: the existing `is:inline` script in Base.astro needs updating to read cookie first, then fall back to sunrise/sunset calc, then system preference

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
