# whatisthetime.now — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a working world time site with city pages, a live ticking clock, dark/light toggle, timezone comparison widget, `/when/` time conversion routes, basic SEO, and Google AdSense.

**Architecture:** Astro `output: 'static'` (Astro 6 unified mode) with `@astrojs/cloudflare` adapter. Default is static — SSR routes opt out with `export const prerender = false`. Top-500 city pages prerender at build time (default). The `/when/[timecity]/[dest]` routes and homepage use `export const prerender = false` for edge-SSR. Client-side JS handles the ticking clock, comparison widget state, and theme toggle. No React/Vue — vanilla JS only for client behavior.

**Tech Stack:** Astro 6, `@astrojs/cloudflare`, TypeScript, Vitest, `@vvo/tzdb` (city→IANA mapping), `Intl.DateTimeFormat` (offset/DST, built-in), Bricolage Grotesque variable font (Google Fonts), Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-03-22-whatisthetime-design.md`

---

## File Map

```
whatisthetime/
├── astro.config.mjs              # Astro config: hybrid output, cloudflare adapter
├── package.json
├── tsconfig.json
├── vitest.config.ts              # Test config
├── wrangler.toml                 # Cloudflare Pages config
├── scripts/
│   └── generate-cities.ts        # One-time: generates src/data/cities.ts from @vvo/tzdb
├── src/
│   ├── data/
│   │   └── cities.ts             # Generated: 500 cities with slug, name, country, timezone
│   ├── lib/
│   │   ├── timezone.ts           # City slug lookup, current time, UTC offset
│   │   └── when.ts               # Parse /when/ URL segment, convert times
│   ├── components/
│   │   ├── ClockHero.astro       # SSR-rendered city + date; client JS ticks seconds
│   │   ├── ComparisonWidget.astro # Worldtimebuddy-style rows (client-side state)
│   │   └── Nav.astro             # Wordmark + theme toggle button
│   ├── layouts/
│   │   └── Base.astro            # HTML shell, <head>, fonts, inline theme script
│   └── pages/
│       ├── index.astro           # Homepage: auto-detect city from CF-IPCountry header
│       ├── [city].astro          # City pages (export const prerender = true)
│       ├── sitemap.xml.ts        # Dynamic sitemap for 500 city pages
│       └── when/
│           └── [timecity]/
│               └── [dest].astro  # Time conversion (edge SSR, no prerender)
└── tests/
    ├── lib/
    │   ├── timezone.test.ts
    │   └── when.test.ts
    └── fixtures/
        └── cities-sample.ts      # 5-city subset for tests (no need to load all 500)
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `wrangler.toml`

- [ ] **Step 1: Create the project**

```bash
cd /Users/sebastianlarsen/Developer/whatisthetime
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```

Expected: Astro project files created (astro.config.mjs, tsconfig.json, src/pages/index.astro, etc.)

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install @astrojs/cloudflare @vvo/tzdb
npm install --save-dev vitest @vitest/coverage-v8
```

- [ ] **Step 3: Replace astro.config.mjs**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',  // Astro 6: default static, SSR pages opt out with prerender = false
  adapter: cloudflare(),
  site: 'https://whatisthetime.now',
});
```

- [ ] **Step 4: Add vitest.config.ts**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 5: Add wrangler.toml**

```toml
# wrangler.toml
name = "whatisthetime"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = "./dist"
```

- [ ] **Step 6: Add npm test script to package.json**

Add to the `scripts` section:
```json
"test": "vitest run",
"test:watch": "vitest",
"generate:cities": "npx tsx scripts/generate-cities.ts"
```

- [ ] **Step 7: Verify Astro starts**

```bash
npm run dev
```

Expected: `http://localhost:4321` responds with the default Astro index page. No errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Cloudflare adapter"
```

---

## Task 2: City Data Layer

**Files:**
- Create: `scripts/generate-cities.ts`
- Create: `src/data/cities.ts` (generated)
- Create: `src/lib/timezone.ts`
- Create: `tests/lib/timezone.test.ts`
- Create: `tests/fixtures/cities-sample.ts`

The city data is generated once from `@vvo/tzdb` and committed as a static TypeScript file. No runtime dependency on `@vvo/tzdb`.

- [ ] **Step 1: Create the generator script**

```ts
// scripts/generate-cities.ts
import { rawTimeZones } from '@vvo/tzdb';
import { writeFileSync } from 'fs';

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\s,.'()]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

interface CityEntry {
  slug: string;
  name: string;
  country: string;
  timezone: string;
}

const seen = new Set<string>();
const cities: CityEntry[] = [];

for (const tz of rawTimeZones) {
  for (const cityName of tz.mainCities) {
    const slug = toSlug(cityName);
    if (seen.has(slug)) continue;
    seen.add(slug);
    cities.push({
      slug,
      name: cityName,
      country: tz.countryName ?? '',
      timezone: tz.name,
    });
  }
}

// Sort alphabetically by slug
cities.sort((a, b) => a.slug.localeCompare(b.slug));

const output = `// AUTO-GENERATED by scripts/generate-cities.ts — do not edit manually
// Source: @vvo/tzdb
export interface CityEntry {
  slug: string;
  name: string;
  country: string;
  timezone: string; // IANA zone name
}

export const cities: CityEntry[] = ${JSON.stringify(cities, null, 2)};

export default cities;
`;

writeFileSync('src/data/cities.ts', output, 'utf-8');
console.log(`Generated ${cities.length} cities → src/data/cities.ts`);
```

- [ ] **Step 2: Run the generator**

```bash
npm run generate:cities
```

Expected output: `Generated NNN cities → src/data/cities.ts` (should be 400-600 cities)

- [ ] **Step 3: Write the failing tests for timezone.ts**

```ts
// tests/fixtures/cities-sample.ts
import type { CityEntry } from '../../src/data/cities.ts';

export const CITIES_SAMPLE: CityEntry[] = [
  { slug: 'copenhagen',  name: 'Copenhagen',  country: 'Denmark',       timezone: 'Europe/Copenhagen' },
  { slug: 'new-york',    name: 'New York',    country: 'United States', timezone: 'America/New_York' },
  { slug: 'tokyo',       name: 'Tokyo',       country: 'Japan',         timezone: 'Asia/Tokyo' },
  { slug: 'london',      name: 'London',      country: 'United Kingdom',timezone: 'Europe/London' },
  { slug: 'sydney',      name: 'Sydney',      country: 'Australia',     timezone: 'Australia/Sydney' },
];
```

```ts
// tests/lib/timezone.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCityBySlug, getCurrentTime, formatUtcOffset } from '../../src/lib/timezone.ts';
import { CITIES_SAMPLE } from '../fixtures/cities-sample.ts';

// Override city lookup to use sample data
vi.mock('../../src/data/cities.ts', () => ({
  default: CITIES_SAMPLE,
  cities: CITIES_SAMPLE,
}));

describe('getCityBySlug', () => {
  it('returns a city for a valid slug', () => {
    const city = getCityBySlug('copenhagen');
    expect(city).toBeDefined();
    expect(city?.timezone).toBe('Europe/Copenhagen');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getCityBySlug('atlantis')).toBeUndefined();
  });

  it('handles hyphenated slugs', () => {
    const city = getCityBySlug('new-york');
    expect(city?.timezone).toBe('America/New_York');
  });
});

describe('getCurrentTime', () => {
  beforeEach(() => {
    // Fix time to 2026-03-22T17:42:09Z for deterministic tests
    vi.setSystemTime(new Date('2026-03-22T17:42:09Z'));
  });

  it('returns correct hours/minutes/seconds for a timezone', () => {
    // UTC+1 (Copenhagen, no DST yet in March)
    const t = getCurrentTime('Europe/Copenhagen');
    expect(t.hours).toBe(18);
    expect(t.minutes).toBe(42);
    expect(t.seconds).toBe(9);
  });

  it('returns correct time for a negative UTC offset', () => {
    // UTC-5 (New York, no DST yet in March)
    const t = getCurrentTime('America/New_York');
    expect(t.hours).toBe(12);
    expect(t.minutes).toBe(42);
  });

  it('returns a formatted date string', () => {
    const t = getCurrentTime('Europe/Copenhagen');
    expect(t.dateString).toContain('Sunday');
    expect(t.dateString).toContain('March');
    expect(t.dateString).toContain('22');
  });
});

describe('formatUtcOffset', () => {
  it('formats positive offset', () => {
    expect(formatUtcOffset(60)).toBe('UTC+1');
  });

  it('formats negative offset', () => {
    expect(formatUtcOffset(-300)).toBe('UTC-5');
  });

  it('formats zero offset', () => {
    expect(formatUtcOffset(0)).toBe('UTC+0');
  });

  it('formats half-hour offset (India UTC+5:30)', () => {
    expect(formatUtcOffset(330)).toBe('UTC+5:30');
  });

  it('formats 45-minute offset (Nepal UTC+5:45)', () => {
    expect(formatUtcOffset(345)).toBe('UTC+5:45');
  });
});

// Extra getCurrentTime edge case
describe('getCurrentTime midnight edge', () => {
  it('returns 0 hours at midnight, not 24', () => {
    vi.setSystemTime(new Date('2026-03-22T23:00:00Z')); // midnight UTC = Copenhagen UTC+1 at 00:00
    const t = getCurrentTime('UTC');
    expect(t.hours).toBe(23); // UTC itself, not affected
    // But for a UTC+1 zone at 2026-03-22T23:00:00Z local = 00:00:
    const t2 = getCurrentTime('Europe/Copenhagen');
    expect(t2.hours).toBe(0);
    expect(t2.hours).not.toBe(24);
  });
});
```

- [ ] **Step 4: Run tests — confirm FAIL**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../../src/lib/timezone.ts'`

- [ ] **Step 5: Implement timezone.ts**

```ts
// src/lib/timezone.ts
import cities, { type CityEntry } from '../data/cities.ts';

export type { CityEntry };

export function getCityBySlug(slug: string): CityEntry | undefined {
  return cities.find(c => c.slug === slug);
}

export interface TimeResult {
  hours: number;
  minutes: number;
  seconds: number;
  dateString: string;     // e.g. "Sunday, March 22, 2026"
  utcOffsetMinutes: number;
}

export function getCurrentTime(timezone: string): TimeResult {
  const now = new Date();

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    parseInt(parts.find(p => p.type === type)?.value ?? '0', 10);

  const dateString = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);

  // Calculate UTC offset by comparing local time to UTC
  const utcOffsetMinutes = getUtcOffsetMinutes(timezone, now);

  return {
    // % 24 handles Intl returning '24' at midnight instead of '0' (known quirk)
    hours: get('hour') % 24,
    minutes: get('minute'),
    seconds: get('second'),
    dateString,
    utcOffsetMinutes,
  };
}

export function getUtcOffsetMinutes(timezone: string, date: Date = new Date()): number {
  // Use formatToParts + Date.UTC to avoid unreliable date-string round-trip parsing.
  // Intl returns '24' for midnight hour when hour12:false — normalise with % 24.
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
  const p = Object.fromEntries(fmt.formatToParts(date).map(x => [x.type, x.value]));
  const localMs = Date.UTC(
    +p.year, +p.month - 1, +p.day,
    +p.hour % 24, +p.minute, +p.second,
  );
  return (localMs - date.getTime()) / 60000;
}

export function formatUtcOffset(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absMinutes / 60);
  const mins = absMinutes % 60;
  return mins === 0 ? `UTC${sign}${hours}` : `UTC${sign}${hours}:${String(mins).padStart(2, '0')}`;
}
```

- [ ] **Step 6: Run tests — confirm PASS**

```bash
npm test
```

Expected: All tests in `timezone.test.ts` pass.

- [ ] **Step 7: Commit**

```bash
git add src/data/cities.ts src/lib/timezone.ts tests/ scripts/
git commit -m "feat: city data layer with timezone lookup utilities"
```

---

## Task 3: `/when/` URL Parser

**Files:**
- Create: `src/lib/when.ts`
- Create: `tests/lib/when.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
// tests/lib/when.test.ts
import { describe, it, expect } from 'vitest';
import { parseTimecitySegment, convertHour } from '../../src/lib/when.ts';

describe('parseTimecitySegment', () => {
  it('parses simple city slug', () => {
    expect(parseTimecitySegment('9am-copenhagen')).toEqual({
      timeToken: '9am',
      citySlug: 'copenhagen',
    });
  });

  it('parses hyphenated city slug', () => {
    expect(parseTimecitySegment('9am-new-york')).toEqual({
      timeToken: '9am',
      citySlug: 'new-york',
    });
  });

  it('parses multi-hyphen city slug', () => {
    expect(parseTimecitySegment('11pm-sao-paulo')).toEqual({
      timeToken: '11pm',
      citySlug: 'sao-paulo',
    });
  });

  it('handles 12-hour format', () => {
    expect(parseTimecitySegment('12am-london')).toEqual({
      timeToken: '12am',
      citySlug: 'london',
    });
  });

  it('returns null for missing time prefix', () => {
    expect(parseTimecitySegment('copenhagen')).toBeNull();
  });

  it('returns null for invalid time token', () => {
    expect(parseTimecitySegment('25am-london')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseTimecitySegment('')).toBeNull();
  });
});

describe('convertHour', () => {
  it('converts 9am Copenhagen to Tokyo (UTC+9)', () => {
    // Copenhagen UTC+1, Tokyo UTC+9 → difference +8h
    const result = convertHour({
      hour: 9,
      fromOffsetMinutes: 60,   // UTC+1
      toOffsetMinutes: 540,    // UTC+9
    });
    expect(result.hour).toBe(17);
    expect(result.minutes).toBe(0);
    expect(result.dayOffset).toBe(0);
  });

  it('handles day rollover forward', () => {
    // 11pm Copenhagen (UTC+1) → 7am +1 day Tokyo (UTC+9)
    const result = convertHour({
      hour: 23,
      fromOffsetMinutes: 60,
      toOffsetMinutes: 540,
    });
    expect(result.hour).toBe(7);
    expect(result.minutes).toBe(0);
    expect(result.dayOffset).toBe(1);
  });

  it('handles day rollback', () => {
    // 2am Tokyo (UTC+9) → 6pm -1 day New York (UTC-5)
    const result = convertHour({
      hour: 2,
      fromOffsetMinutes: 540,
      toOffsetMinutes: -300,
    });
    expect(result.hour).toBe(18);
    expect(result.minutes).toBe(0);
    expect(result.dayOffset).toBe(-1);
  });

  it('preserves half-hour offset for India (UTC+5:30)', () => {
    // 9am Copenhagen (UTC+1) → 1:30pm India (UTC+5:30)
    const result = convertHour({
      hour: 9,
      fromOffsetMinutes: 60,
      toOffsetMinutes: 330,
    });
    expect(result.hour).toBe(13);
    expect(result.minutes).toBe(30);
    expect(result.dayOffset).toBe(0);
  });
});
```

- [ ] **Step 2: Run tests — confirm FAIL**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../../src/lib/when.ts'`

- [ ] **Step 3: Implement when.ts**

```ts
// src/lib/when.ts

export interface ParsedTimecity {
  timeToken: string;  // e.g. "9am"
  citySlug: string;   // e.g. "new-york"
}

// Valid time tokens: 1am–12am, 1pm–12pm
const TIME_TOKEN_RE = /^(1[0-2]|[1-9])(am|pm)$/i;

export function parseTimecitySegment(segment: string): ParsedTimecity | null {
  const dashIndex = segment.indexOf('-');
  if (dashIndex === -1) return null;

  const timeToken = segment.slice(0, dashIndex);
  const citySlug = segment.slice(dashIndex + 1);

  if (!TIME_TOKEN_RE.test(timeToken)) return null;
  if (!citySlug) return null;

  return { timeToken: timeToken.toLowerCase(), citySlug };
}

export function timeTokenToHour(token: string): number {
  const match = token.match(/^(\d{1,2})(am|pm)$/i);
  if (!match) throw new Error(`Invalid time token: ${token}`);
  let hour = parseInt(match[1], 10);
  const period = match[2].toLowerCase();
  if (period === 'am' && hour === 12) hour = 0;
  if (period === 'pm' && hour !== 12) hour += 12;
  return hour;
}

export interface ConvertHourInput {
  hour: number;           // 0–23, in fromTimezone
  fromOffsetMinutes: number;
  toOffsetMinutes: number;
}

export interface ConvertHourResult {
  hour: number;      // 0–23, in toTimezone
  minutes: number;   // 0–59 (non-zero for timezones like India UTC+5:30)
  dayOffset: number; // -1, 0, or +1
}

export function convertHour(input: ConvertHourInput): ConvertHourResult {
  const { hour, fromOffsetMinutes, toOffsetMinutes } = input;
  // Work in total minutes to preserve half-hour offsets (India, Nepal, etc.)
  const originTotalMinutes = hour * 60;
  const destTotalMinutes = originTotalMinutes + (toOffsetMinutes - fromOffsetMinutes);

  let dayOffset = 0;
  let normalised = destTotalMinutes;

  if (normalised >= 1440) {
    normalised -= 1440;
    dayOffset = 1;
  } else if (normalised < 0) {
    normalised += 1440;
    dayOffset = -1;
  }

  return {
    hour: Math.floor(normalised / 60),
    minutes: normalised % 60,
    dayOffset,
  };
}

export function formatConvertedTime(result: ConvertHourResult): string {
  const h = result.hour;
  const m = result.minutes;
  const period = h < 12 ? 'am' : 'pm';
  const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return m === 0
    ? `${displayHour}${period}`
    : `${displayHour}:${String(m).padStart(2, '0')}${period}`;
}

export function hourToTimeToken(hour: number): string {
  if (hour === 0) return '12am';
  if (hour === 12) return '12pm';
  return hour < 12 ? `${hour}am` : `${hour - 12}pm`;
}
```

- [ ] **Step 4: Run tests — confirm PASS**

```bash
npm test
```

Expected: All tests in `when.test.ts` pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/when.ts tests/lib/when.test.ts
git commit -m "feat: /when/ URL parser and hour conversion utility"
```

---

## Task 4: Base Layout + Theme System

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/components/Nav.astro`

Theme is set before first paint via an inline `<script>` in `<head>` that reads `localStorage`. This prevents flash of wrong theme. The toggle button is in the Nav.

- [ ] **Step 1: Create Base.astro**

```astro
---
// src/layouts/Base.astro
export interface Props {
  title: string;
  description?: string;
  canonical?: string;
}
const { title, description = 'World clock. What time is it anywhere.', canonical } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  {description && <meta name="description" content={description} />}
  {canonical && <link rel="canonical" href={canonical} />}

  <!-- Prevent theme flash: read localStorage before paint -->
  <script is:inline>
    (function() {
      const stored = localStorage.getItem('theme');
      const prefer = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', stored || prefer);
    })();
  </script>

  <!-- Bricolage Grotesque variable font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />

  <style is:global>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root[data-theme="dark"] {
      --bg: #0a0a0a;
      --bg-subtle: #0f0f0f;
      --text: #ffffff;
      --text-muted: #444444;
      --text-dim: #333333;
      --border: #1a1a1a;
      --bar-empty: #1a1a1a;
      --bar-work: #1e3a2f;
    }
    :root[data-theme="light"] {
      --bg: #ffffff;
      --bg-subtle: #fafafa;
      --text: #111111;
      --text-muted: #bbbbbb;
      --text-dim: #cccccc;
      --border: #f0f0f0;
      --bar-empty: #f0f0f0;
      --bar-work: #d4edda;
    }

    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      transition: background 0.3s, color 0.3s;
    }
  </style>
</head>
<body>
  <slot />
</body>
</html>
```

- [ ] **Step 2: Create Nav.astro**

```astro
---
// src/components/Nav.astro
---
<nav>
  <a href="/" class="logo">whatisthetime<span class="logo-tld">.now</span></a>
  <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
    <span class="toggle-label-dark">☀️ light</span>
    <span class="toggle-label-light">🌙 dark</span>
  </button>
</nav>

<style>
  nav {
    padding: 12px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border);
  }

  .logo {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.5px;
    color: var(--text);
    text-decoration: none;
  }
  .logo-tld { opacity: 0.4; }

  .theme-toggle {
    background: none;
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 11px;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .theme-toggle:hover { border-color: var(--text-muted); }

  /* Show the right label based on current theme */
  :root[data-theme="dark"]  .toggle-label-light { display: none; }
  :root[data-theme="light"] .toggle-label-dark  { display: none; }
</style>

<script>
  const btn = document.getElementById('theme-toggle')!;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
</script>
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:4321`. Check: no flash of wrong theme on reload. Toggle button switches dark ↔ light. Preference persists on refresh.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro src/components/Nav.astro
git commit -m "feat: base layout with flash-free dark/light theme toggle"
```

---

## Task 5: Clock Hero Component

**Files:**
- Create: `src/components/ClockHero.astro`

The server renders the initial time. Client JS ticks it every second. No hydration framework needed — plain `<script>`.

- [ ] **Step 1: Create ClockHero.astro**

```astro
---
// src/components/ClockHero.astro
import { getCurrentTime, formatUtcOffset } from '../lib/timezone.ts';
import type { CityEntry } from '../data/cities.ts';

export interface Props {
  city: CityEntry;
}

const { city } = Astro.props;
const time = getCurrentTime(city.timezone);
const pad = (n: number) => String(n).padStart(2, '0');
const initialTime = `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
const utcLabel = formatUtcOffset(time.utcOffsetMinutes);
---

<section class="clock-section">
  <div class="city-label">{city.name}, {city.country} · {utcLabel}</div>
  <div
    id="clock"
    data-timezone={city.timezone}
  >{initialTime}</div>
  <div class="date-line" id="date-line">{time.dateString}</div>
</section>

<style>
  .clock-section {
    padding: 48px 28px 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .city-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  #clock {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(60px, 18vw, 260px);
    line-height: 0.9;
    letter-spacing: -0.02em;
    color: var(--text);
    font-variation-settings: 'wght' 800, 'opsz' 50;
    font-variant-numeric: tabular-nums;
    text-align: left;
    width: 100%;
  }

  .date-line {
    font-size: 11px;
    color: var(--text-dim);
    margin-top: 16px;
    letter-spacing: 1px;
  }
</style>

<script>
  function pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  const clockEl = document.getElementById('clock')!;
  const dateEl = document.getElementById('date-line')!;
  const timezone = clockEl.dataset.timezone!;

  function tick() {
    const now = new Date();
    const timeParts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(now);

    const get = (type: string) =>
      timeParts.find(p => p.type === type)?.value ?? '00';

    // Intl returns '24' at midnight with hour12:false — normalise to '00'
    const hour = get('hour') === '24' ? '00' : get('hour');
    clockEl.textContent = `${hour}:${get('minute')}:${get('second')}`;

    dateEl.textContent = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now);
  }

  tick();
  setInterval(tick, 1000);
</script>
```

- [ ] **Step 2: Wire it into a test page**

Temporarily update `src/pages/index.astro` to use the component:

```astro
---
// src/pages/index.astro
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import ClockHero from '../components/ClockHero.astro';
import { getCityBySlug } from '../lib/timezone.ts';

const city = getCityBySlug('copenhagen')!;
---
<Base title={`What time is it in ${city.name}?`}>
  <Nav />
  <ClockHero city={city} />
</Base>
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Check: clock ticks every second, no digit jumping (tabular-nums working), dark/light toggle works with clock visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/ClockHero.astro src/pages/index.astro
git commit -m "feat: ticking clock hero component with Bricolage Grotesque"
```

---

## Task 6: Comparison Widget

**Files:**
- Create: `src/components/ComparisonWidget.astro`

The widget renders server-side with default cities (Copenhagen, Tokyo, New York, London). Client JS ticks every minute to update times. **Deferred to Plan 2:** localStorage city persistence and URL params (`?cities=`) for sharing user-added cities. The "Add city" button renders in Plan 1 but has no handler — it is a stub.

- [ ] **Step 1: Create ComparisonWidget.astro**

```astro
---
// src/components/ComparisonWidget.astro
import { getCityBySlug, getCurrentTime, formatUtcOffset } from '../lib/timezone.ts';

export interface Props {
  defaultCities: string[]; // slugs
}

const { defaultCities } = Astro.props;

// Compute default city data server-side for initial render
const defaultData = defaultCities.map(slug => {
  const city = getCityBySlug(slug);
  if (!city) return null;
  const t = getCurrentTime(city.timezone);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    slug: city.slug,
    name: city.name,
    timezone: city.timezone,
    displayTime: `${pad(t.hours)}:${pad(t.minutes)}`,
    utcOffsetMinutes: t.utcOffsetMinutes,
  };
}).filter(Boolean);
---

<section class="compare-section" id="compare-section">
  <div class="compare-label">Compare timezones</div>

  <div id="city-rows">
    {defaultData.map(d => (
      <div class="city-row" data-timezone={d!.timezone} data-slug={d!.slug}>
        <div class="city-name">{d!.name}</div>
        <div class="time-val">{d!.displayTime}</div>
        <div class="bar-wrap">
          <div class="bar-track" data-utc-offset={d!.utcOffsetMinutes}></div>
        </div>
      </div>
    ))}
  </div>

  <div class="footer-row">
    <button class="add-city-btn" id="add-city-btn">+ Add city</button>
    <span class="legend">🟩 business hours &nbsp;·&nbsp; 🔴 now</span>
  </div>
</section>

<style>
  .compare-section {
    padding: 24px 28px 20px;
    background: var(--bg-subtle);
    border-top: 1px solid var(--border);
  }

  .compare-label {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 14px;
  }

  .city-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .city-name {
    font-size: 12px;
    color: var(--text);
    width: 110px;
    flex-shrink: 0;
  }

  .time-val {
    font-size: 10px;
    color: var(--text-muted);
    width: 36px;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }

  .bar-wrap {
    flex: 1;
    height: 14px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
  }

  .bar-track {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .bar-seg { height: 100%; }
  .bar-seg.off  { background: var(--bar-empty); }
  .bar-seg.work { background: var(--bar-work); }
  .now-line {
    position: absolute;
    top: 0;
    width: 2px;
    height: 100%;
    background: #e94560;
    border-radius: 1px;
  }

  .footer-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 6px;
  }

  .add-city-btn {
    background: none;
    border: none;
    color: #0066cc;
    font-size: 11px;
    cursor: pointer;
    padding: 0;
  }

  .legend { font-size: 9px; color: var(--text-muted); }
</style>

<script>
  function drawBars() {
    const rows = document.querySelectorAll<HTMLElement>('.city-row');
    const nowUtcMinutes = new Date().getUTCHours() * 60 + new Date().getUTCMinutes();

    rows.forEach(row => {
      const utcOffset = parseInt(row.querySelector<HTMLElement>('.bar-track')!.dataset.utcOffset ?? '0', 10);
      const timezone = row.dataset.timezone!;

      // Current local hour in this timezone
      const localMinutes = (nowUtcMinutes + utcOffset + 1440) % 1440;
      const localHour = localMinutes / 60;

      // Business hours: 9-17
      const workStart = 9;
      const workEnd = 17;

      const track = row.querySelector<HTMLElement>('.bar-track')!;
      track.innerHTML = '';

      // Build 24 hour segments
      for (let h = 0; h < 24; h++) {
        const seg = document.createElement('div');
        seg.className = `bar-seg ${h >= workStart && h < workEnd ? 'work' : 'off'}`;
        seg.style.flex = '1';
        track.appendChild(seg);
      }

      // Now line
      const nowLine = document.createElement('div');
      nowLine.className = 'now-line';
      nowLine.style.left = `${(localHour / 24) * 100}%`;
      row.querySelector('.bar-wrap')!.appendChild(nowLine);

      // Update time display
      const timeParts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).formatToParts(new Date());

      const get = (type: string) => timeParts.find(p => p.type === type)?.value ?? '00';
      row.querySelector<HTMLElement>('.time-val')!.textContent = `${get('hour')}:${get('minute')}`;
    });
  }

  drawBars();
  setInterval(drawBars, 60_000); // update every minute
</script>
```

- [ ] **Step 2: Add to index.astro**

```astro
---
// src/pages/index.astro
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import ClockHero from '../components/ClockHero.astro';
import ComparisonWidget from '../components/ComparisonWidget.astro';
import { getCityBySlug } from '../lib/timezone.ts';

const city = getCityBySlug('copenhagen')!;
---
<Base title={`What time is it in ${city.name}?`}>
  <Nav />
  <ClockHero city={city} />
  <ComparisonWidget defaultCities={['copenhagen', 'tokyo', 'new-york', 'london']} />
</Base>
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Check: 4 city rows with bars, business hours highlighted in green, red "now" line positioned correctly, times update on the minute. Looks correct in both dark and light mode.

- [ ] **Step 4: Commit**

```bash
git add src/components/ComparisonWidget.astro src/pages/index.astro
git commit -m "feat: worldtimebuddy-style comparison widget"
```

---

## Content Rules for AI Agents (.md Routes)

Every city page and `/when/` page exposes a `.md` version for AI crawlers. These follow these rules:

**Universal:**
- Every sentence must contain a specific fact (UTC offset, IANA name, DST date, city name, hour difference). No filler.
- First sentence directly answers the page title question.
- UTC offset written as both label and season-qualified: `UTC+1 (CET in winter, CEST in summer)`.
- DST: if observed, specific dates for current year. If not: "does not observe daylight saving time."
- IANA timezone name always present (e.g. `Europe/Copenhagen`, not just "European timezone").
- Entity consistency: city name and IANA name identical throughout the document.

**City `.md` structure:**
1. Opening sentence: city + IANA zone + UTC label + DST status
2. DST section: current-year dates (computed from Intl probe, not hardcoded)
3. Shared timezone cities: list of other cities in the same IANA zone (derived from cities.ts)
4. FAQ: 3 questions — "What timezone is X in?", "What is the UTC offset for X?", "What time is it in X right now?"

**`/when/` `.md` structure:**
1. Opening sentence: direct answer "When it's Xam in OriginCity (UTC+N), it's Y in DestCity (UTC+M)."
2. Time difference section: UTC offsets for both, hour difference, DST note if one observes and other doesn't
3. FAQ: 2 questions — exact search query phrasing, plus "How many hours ahead is X from Y?"

---

## Task 7: City Pages (Static, 500 Cities)

**Files:**
- Modify: `src/pages/index.astro` (auto-detect city via CF header)
- Create: `src/pages/[city].astro`
- Modify: `src/lib/timezone.ts` (add `getDSTTransitions`)
- Create: `src/pages/[city].md.ts`

- [ ] **Step 0a: Add `getDSTTransitions` to src/lib/timezone.ts**

This function probes the Intl API to find DST transition dates for a given timezone and year. Add it to `src/lib/timezone.ts`:

```ts
export interface DSTTransitions {
  hasDST: boolean;
  start: Date | null; // date clocks spring forward
  end: Date | null;   // date clocks fall back
}

export function getDSTTransitions(timezone: string, year: number): DSTTransitions {
  const janOffset = getUtcOffsetMinutes(timezone, new Date(year, 0, 15));
  const julOffset = getUtcOffsetMinutes(timezone, new Date(year, 6, 15));

  if (janOffset === julOffset) return { hasDST: false, start: null, end: null };

  // Northern hemisphere: offset higher in July (summer forward)
  // Southern hemisphere: offset higher in January
  const isNorthern = julOffset > janOffset;

  // Probe month ranges for the transition
  const springMonths = isNorthern ? [2, 3] : [8, 9, 10]; // Mar-Apr or Sep-Nov
  const fallMonths   = isNorthern ? [9, 10] : [3, 4];    // Oct-Nov or Mar-Apr

  function findTransition(months: number[]): Date | null {
    for (const month of months) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day < daysInMonth; day++) {
        const before = getUtcOffsetMinutes(timezone, new Date(year, month, day,  1, 0));
        const after  = getUtcOffsetMinutes(timezone, new Date(year, month, day + 1, 1, 0));
        if (before !== after) return new Date(year, month, day + 1);
      }
    }
    return null;
  }

  return {
    hasDST: true,
    start: findTransition(springMonths),
    end:   findTransition(fallMonths),
  };
}
```

Run `npm run build` to confirm no TS errors before continuing.

- [ ] **Step 0b: Create src/pages/[city].md.ts — AI agent markdown endpoint**

```ts
// src/pages/[city].md.ts
export const prerender = true;

import type { APIRoute, GetStaticPaths } from 'astro';
import cities from '../data/cities.ts';
import { getCurrentTime, formatUtcOffset, getDSTTransitions } from '../lib/timezone.ts';

export const getStaticPaths: GetStaticPaths = () =>
  cities.map(city => ({ params: { city: city.slug } }));

export const GET: APIRoute = ({ params }) => {
  const city = cities.find(c => c.slug === params.city);
  if (!city) return new Response('Not found', { status: 404 });

  const time = getCurrentTime(city.timezone);
  const utcLabel = formatUtcOffset(time.utcOffsetMinutes);
  const year = new Date().getFullYear();
  const dst = getDSTTransitions(city.timezone, year);

  const dstSentence = dst.hasDST && dst.start && dst.end
    ? `In ${year}, clocks advance on ${dst.start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} and revert on ${dst.end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.`
    : `${city.name} does not observe daylight saving time.`;

  // Co-zone cities (same IANA zone, excluding this city, max 8)
  const coZone = cities
    .filter(c => c.timezone === city.timezone && c.slug !== city.slug)
    .slice(0, 8)
    .map(c => c.name)
    .join(', ');

  const utcSummer = dst.hasDST
    ? ` During summer, the offset shifts to ${formatUtcOffset(time.utcOffsetMinutes + 60)}.`
    : '';

  const md = `# What time is it in ${city.name}?

${city.name} uses the ${city.timezone} timezone (${utcLabel}). ${dstSentence}

## Cities sharing the ${city.timezone} timezone

${coZone || 'No other major cities share this exact IANA timezone zone.'} All cities in this group observe the same timezone rules.

## Frequently Asked Questions

### What timezone is ${city.name} in?
${city.name} is in the ${city.timezone} timezone (${utcLabel}).${utcSummer}

### What is the UTC offset for ${city.name}?
${city.name} is currently ${utcLabel}. The IANA timezone identifier is ${city.timezone}.

### What time is it in ${city.name} right now?
The current local time in ${city.name} is shown live at whatisthetime.now/${city.slug}.
`;

  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

Run `npm run build`. Expected: 990 `.md` static pages generated alongside the HTML pages.

- [ ] **Step 1: Create [city].astro**

```astro
---
// src/pages/[city].astro
export const prerender = true;

import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import ClockHero from '../components/ClockHero.astro';
import ComparisonWidget from '../components/ComparisonWidget.astro';
import cities from '../data/cities.ts';
import { formatUtcOffset, getCurrentTime } from '../lib/timezone.ts';

export async function getStaticPaths() {
  return cities.map(city => ({ params: { city: city.slug } }));
}

const { city: citySlug } = Astro.params;
const city = cities.find(c => c.slug === citySlug);

if (!city) {
  return Astro.redirect('/');
}

const time = getCurrentTime(city.timezone);
const utcLabel = formatUtcOffset(time.utcOffsetMinutes);

const title = `What time is it in ${city.name}? | whatisthetime.now`;
const description = `Current local time in ${city.name}, ${city.country}. Live clock showing ${utcLabel}.`;
const canonical = `https://whatisthetime.now/${city.slug}`;
---

<Base title={title} description={description} canonical={canonical}>
  <Nav />
  <ClockHero city={city} />
  <ComparisonWidget defaultCities={['copenhagen', 'tokyo', 'new-york-city', 'london']} />

  <!-- Static copy for SEO -->
  <section class="city-info">
    <p>{city.name} is in the <strong>{city.timezone}</strong> timezone ({utcLabel}).
    {time.utcOffsetMinutes !== 0 && `It is currently ${Math.abs(time.utcOffsetMinutes / 60)} hour${Math.abs(time.utcOffsetMinutes / 60) !== 1 ? 's' : ''} ${time.utcOffsetMinutes > 0 ? 'ahead of' : 'behind'} UTC.`}
    </p>
  </section>
</Base>

<style>
  .city-info {
    padding: 20px 28px;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.6;
    border-top: 1px solid var(--border);
    max-width: 600px;
  }
  .city-info strong { color: var(--text); }
</style>
```

- [ ] **Step 2: Update index.astro for auto-detect**

```astro
---
// src/pages/index.astro
// No prerender — needs edge SSR to read CF-IPCountry header
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import ClockHero from '../components/ClockHero.astro';
import ComparisonWidget from '../components/ComparisonWidget.astro';
import cities from '../data/cities.ts';
import { getCityBySlug } from '../lib/timezone.ts';

// Cloudflare provides CF-IPCountry header; we pick a default city per country
const countryToCitySlug: Record<string, string> = {
  DK: 'copenhagen', GB: 'london', US: 'new-york', JP: 'tokyo',
  DE: 'berlin', FR: 'paris', AU: 'sydney', CN: 'beijing',
  IN: 'mumbai', BR: 'sao-paulo', CA: 'toronto', SG: 'singapore',
};

const countryCode = Astro.request.headers.get('CF-IPCountry') ?? 'XX';
const defaultSlug = countryToCitySlug[countryCode] ?? 'london';
const city = getCityBySlug(defaultSlug) ?? cities[0]!;
---

<Base
  title={`What time is it in ${city.name}? | whatisthetime.now`}
  description={`Live world clock. Current time in ${city.name} and any city worldwide.`}
>
  <Nav />
  <ClockHero city={city} />
  <ComparisonWidget defaultCities={['copenhagen', 'tokyo', 'new-york-city', 'london']} />
</Base>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: Build completes with 500+ static city pages. No TypeScript errors.

- [ ] **Step 4: Preview the build locally**

```bash
npm run preview
```

Navigate to `http://localhost:4321/tokyo` and `http://localhost:4321/new-york`. Check: correct city name, timezone label, static copy.

- [ ] **Step 5: Commit**

```bash
git add src/pages/[city].astro src/pages/index.astro
git commit -m "feat: static city pages for 500+ cities with auto-detection"
```

---

## Task 8: `/when/` Time Conversion Routes

**Files:**
- Create: `src/pages/when/[timecity]/[dest].astro`

These are edge SSR (no `prerender = true`).

- [ ] **Step 1: Create the route**

```astro
---
// src/pages/when/[timecity]/[dest].astro
// Edge SSR — no prerender directive

import Base from '../../../layouts/Base.astro';
import Nav from '../../../components/Nav.astro';
import ComparisonWidget from '../../../components/ComparisonWidget.astro';
import { getCityBySlug, getCurrentTime, formatUtcOffset, getUtcOffsetMinutes } from '../../../lib/timezone.ts';
import { parseTimecitySegment, timeTokenToHour, convertHour, formatConvertedTime } from '../../../lib/when.ts';

const { timecity, dest } = Astro.params;

// Parse origin segment
const parsed = parseTimecitySegment(timecity ?? '');
if (!parsed) {
  return new Response('Not found', { status: 404 });
}

const originCity = getCityBySlug(parsed.citySlug);
const destCity = getCityBySlug(dest ?? '');

if (!originCity || !destCity) {
  return new Response('City not found', { status: 404 });
}

const originHour = timeTokenToHour(parsed.timeToken);
const originOffset = getUtcOffsetMinutes(originCity.timezone);
const destOffset = getUtcOffsetMinutes(destCity.timezone);

const converted = convertHour({
  hour: originHour,
  fromOffsetMinutes: originOffset,
  toOffsetMinutes: destOffset,
});

const destTimeToken = formatConvertedTime(converted); // handles half-hour offsets (India, Nepal, etc.)
const originUtcLabel = formatUtcOffset(originOffset);
const destUtcLabel = formatUtcOffset(destOffset);

const dayOffsetLabel = converted.dayOffset === 1
  ? ' (+1 day)'
  : converted.dayOffset === -1
  ? ' (-1 day)'
  : '';

const title = `${parsed.timeToken} in ${originCity.name} = ${destTimeToken}${dayOffsetLabel} in ${destCity.name} | whatisthetime.now`;
const description = `When it's ${parsed.timeToken} in ${originCity.name} (${originUtcLabel}), it's ${destTimeToken}${dayOffsetLabel} in ${destCity.name} (${destUtcLabel}).`;
const canonical = `https://whatisthetime.now/when/${timecity}/${dest}`;
---

<Base title={title} description={description} canonical={canonical}>
  <Nav />

  <section class="conversion-hero">
    <div class="from-block">
      <div class="city-label">{originCity.name} · {originUtcLabel}</div>
      <div class="time-display">{parsed.timeToken}</div>
    </div>

    <div class="arrow">→</div>

    <div class="to-block">
      <div class="city-label">{destCity.name} · {destUtcLabel}</div>
      <div class="time-display">{destTimeToken}<span class="day-offset">{dayOffsetLabel}</span></div>
    </div>
  </section>

  <ComparisonWidget defaultCities={[originCity.slug, destCity.slug, 'london', 'singapore']} />

  <!-- Static SEO copy -->
  <section class="when-info">
    <p>{description}</p>
  </section>
</Base>

<style>
  .conversion-hero {
    padding: 48px 28px 32px;
    display: flex;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
  }

  .city-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .time-display {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: clamp(48px, 12vw, 160px);
    font-variation-settings: 'wght' 800, 'opsz' 50;
    font-variant-numeric: tabular-nums;
    line-height: 0.9;
    color: var(--text);
  }

  .day-offset {
    font-size: 0.3em;
    color: var(--text-muted);
    vertical-align: super;
  }

  .arrow {
    font-size: 48px;
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .when-info {
    padding: 20px 28px;
    font-size: 12px;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
  }
</style>
```

- [ ] **Step 2: Test locally**

```bash
npm run dev
```

Navigate to:
- `http://localhost:4321/when/9am-copenhagen/tokyo`
- `http://localhost:4321/when/11pm-new-york/london`
- `http://localhost:4321/when/9am-sao-paulo/sydney`

Check: correct time displayed, day offset shown where applicable, 404 on `http://localhost:4321/when/badslug/tokyo`.

- [ ] **Step 2b: Create src/pages/when/[timecity]/[dest].md.ts — AI agent markdown endpoint**

Edge SSR, no prerender. Uses same libs as the main route.

```ts
// src/pages/when/[timecity]/[dest].md.ts
// Edge SSR — no prerender directive

import type { APIRoute } from 'astro';
import { getCityBySlug, formatUtcOffset, getUtcOffsetMinutes } from '../../../lib/timezone.ts';
import { parseTimecitySegment, timeTokenToHour, convertHour, formatConvertedTime } from '../../../lib/when.ts';

export const GET: APIRoute = ({ params }) => {
  const { timecity, dest } = params;

  const parsed = parseTimecitySegment(timecity ?? '');
  if (!parsed) return new Response('Not found', { status: 404 });

  const originCity = getCityBySlug(parsed.citySlug);
  const destCity   = getCityBySlug(dest ?? '');
  if (!originCity || !destCity) return new Response('City not found', { status: 404 });

  const originOffset = getUtcOffsetMinutes(originCity.timezone);
  const destOffset   = getUtcOffsetMinutes(destCity.timezone);
  const originHour   = timeTokenToHour(parsed.timeToken);
  const converted    = convertHour({ hour: originHour, fromOffsetMinutes: originOffset, toOffsetMinutes: destOffset });
  const destTimeToken = formatConvertedTime(converted);

  const originUtcLabel = formatUtcOffset(originOffset);
  const destUtcLabel   = formatUtcOffset(destOffset);
  const diffMinutes    = destOffset - originOffset;
  const diffHours      = diffMinutes / 60;
  const aheadBehind    = diffHours >= 0 ? `${diffHours} hours ahead of` : `${Math.abs(diffHours)} hours behind`;

  const dayOffsetNote = converted.dayOffset === 1
    ? ' (the next day)'
    : converted.dayOffset === -1
    ? ' (the previous day)'
    : '';

  const md = `# ${parsed.timeToken} in ${originCity.name} = ${destTimeToken} in ${destCity.name}

When it is ${parsed.timeToken} in ${originCity.name} (${originUtcLabel}), it is ${destTimeToken}${dayOffsetNote} in ${destCity.name} (${destUtcLabel}). ${destCity.name} is ${aheadBehind} ${originCity.name}.

## Time difference: ${originCity.name} and ${destCity.name}

${originCity.name} operates on ${originCity.timezone} (${originUtcLabel}). ${destCity.name} operates on ${destCity.timezone} (${destUtcLabel}). The offset between them is ${Math.abs(diffHours)} hours.

## Frequently Asked Questions

### What time is it in ${destCity.name} when it's ${parsed.timeToken} in ${originCity.name}?
When it is ${parsed.timeToken} in ${originCity.name} (${originUtcLabel}), it is ${destTimeToken}${dayOffsetNote} in ${destCity.name} (${destUtcLabel}).

### How many hours ahead is ${destCity.name} from ${originCity.name}?
${destCity.name} is ${aheadBehind} ${originCity.name} (${Math.abs(diffHours)} hours difference).
`;

  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/when/
git commit -m "feat: /when/ time conversion routes with edge SSR"
```

---

## Task 9: Sitemap + SEO Metadata + AI Agent Files

**Files:**
- Create: `src/pages/sitemap.xml.ts`
- Modify: `src/layouts/Base.astro` (add JSON-LD)
- Create: `src/pages/llms.txt.ts`
- Create: `public/robots.txt`

- [ ] **Step 1: Create sitemap endpoint**

```ts
// src/pages/sitemap.xml.ts
export const prerender = true;

import type { APIRoute } from 'astro';
import cities from '../data/cities.ts';

export const GET: APIRoute = () => {
  const baseUrl = 'https://whatisthetime.now';
  const cityUrls = cities.map(c =>
    `  <url><loc>${baseUrl}/${c.slug}</loc><changefreq>monthly</changefreq></url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq></url>
${cityUrls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
```

- [ ] **Step 2: Add JSON-LD to Base.astro**

In `Base.astro`, add inside `<head>`:
```astro
{canonical && (
  <script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonical,
  })} />
)}
```

- [ ] **Step 3: Verify sitemap**

```bash
npm run build && npm run preview
```

Navigate to `http://localhost:4321/sitemap.xml`. Check: valid XML, contains `<url>` entries for city pages.

- [ ] **Step 3b: Create src/pages/llms.txt.ts**

```ts
// src/pages/llms.txt.ts
export const prerender = true;

import type { APIRoute } from 'astro';
import cities from '../data/cities.ts';

export const GET: APIRoute = () => {
  const sample = cities.slice(0, 20).map(c => `- /${c.slug} — ${c.name} (${c.timezone})`).join('\n');

  const content = `# whatisthetime.now

Live world clock for ${cities.length} cities. Shows current local time, timezone comparison, and time conversions between cities.

## What This Site Does

- /[city-slug] — Current local time for that city (live clock, ticks every second)
- /when/[time]-[origin]/[destination] — Converts a time between two cities
- /[city-slug].md — Markdown timezone facts for AI agents
- /when/[time]-[origin]/[destination].md — Markdown time conversion facts for AI agents

## Coverage

${cities.length} cities across all IANA timezone zones. City slugs are lowercase hyphenated (new-york-city, sao-paulo, kuala-lumpur).

## Example City Pages

${sample}

## Time Conversion Examples

- /when/9am-copenhagen/tokyo — 9am Copenhagen → Tokyo
- /when/5pm-new-york-city/london — 5pm New York → London
- /when/12pm-sydney/berlin — 12pm Sydney → Berlin

## URL Rules

Time token format: [hour][am|pm] (e.g. 9am, 11pm, 12pm). Hours 1–12 only.
City slugs: lowercase, hyphenated, no diacritics.
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
```

- [ ] **Step 3c: Create public/robots.txt**

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://whatisthetime.now/sitemap.xml
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/sitemap.xml.ts src/layouts/Base.astro src/pages/llms.txt.ts public/robots.txt
git commit -m "feat: sitemap, JSON-LD, llms.txt, and robots.txt for AI agents"
```

---

## Task 10: Google AdSense Integration

**Files:**
- Modify: `src/layouts/Base.astro`
- Modify: `src/components/ClockHero.astro` (or `[city].astro`)

> **Important:** AdSense requires site verification and approval before ads serve. Add the code now so it's ready; approval happens after the site has live traffic. Replace `ca-pub-XXXXXXXXXX` and `YYYYYYYYYY` with real values from the AdSense dashboard.

- [ ] **Step 1: Add AdSense script to Base.astro head**

In `Base.astro`, add inside `<head>` after the font link:
```astro
<!-- Google AdSense — replace with real publisher ID after approval -->
{import.meta.env.PROD && (
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
    crossorigin="anonymous"
  />
)}
```

The `import.meta.env.PROD` guard prevents AdSense loading in local dev.

- [ ] **Step 2: Add a single ad unit to city pages**

In `src/pages/[city].astro`, after the ClockHero and before ComparisonWidget:
```astro
{import.meta.env.PROD && (
  <div class="ad-unit">
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-XXXXXXXXXX"
      data-ad-slot="YYYYYYYYYY"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>
)}
```

Add the `.ad-unit` style to the page:
```astro
<style>
  .ad-unit {
    padding: 8px 28px;
    min-height: 90px; /* prevent layout shift */
  }
</style>
```

- [ ] **Step 3: Add `ads.txt` to public/**

```
# public/ads.txt
google.com, pub-XXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Replace `pub-XXXXXXXXXX` with your real publisher ID.

- [ ] **Step 4: Verify dev build has no AdSense loading**

```bash
npm run dev
```

Open browser network tab. Confirm: no request to `pagead2.googlesyndication.com` in local dev.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Base.astro src/pages/[city].astro public/ads.txt
git commit -m "feat: Google AdSense integration (prod only, pending approval)"
```

---

## Task 11: Deploy to Cloudflare Pages

**Files:**
- No new files — configure via Cloudflare dashboard

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/ghlarsen/whatisthetime.git
git push -u origin main
```

- [ ] **Step 2: Connect to Cloudflare Pages**

In Cloudflare dashboard:
1. Pages → Create application → Connect to Git → select `whatisthetime` repo
2. Build settings:
   - Framework: Astro
   - Build command: `npm run build`
   - Build output: `dist`
3. Environment variables: none needed yet
4. Deploy

- [ ] **Step 3: Add custom domain**

In Cloudflare Pages → Custom domains:
- Add `whatisthetime.now`
- Add `www.whatisthetime.now` → redirect to apex

For `whatisthetime.in` (on Porkbun): add a CNAME record pointing to the Cloudflare Pages subdomain (e.g. `whatisthetime.pages.dev`).

- [ ] **Step 4: Smoke test production**

Visit:
- `https://whatisthetime.now/` — homepage, clock ticks
- `https://whatisthetime.now/tokyo` — city page correct
- `https://whatisthetime.now/when/9am-copenhagen/tokyo` — conversion correct
- `https://whatisthetime.now/sitemap.xml` — valid XML

- [ ] **Step 5: Submit sitemap to Google Search Console**

1. Add property `https://whatisthetime.now` in Google Search Console
2. Verify ownership via DNS TXT record (add to Cloudflare DNS)
3. Submit `https://whatisthetime.now/sitemap.xml`

---

## Done — What Comes Next

**Plan 2:** Variable font playground + `<wtit-clock>` Web Component widget embed
**Plan 3:** Article generation pipeline (Cloudflare Worker cron + Claude API + D1)
