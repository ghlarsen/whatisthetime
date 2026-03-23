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
