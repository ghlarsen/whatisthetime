// src/pages/llms.txt.ts
export const prerender = true;

import type { APIRoute } from 'astro';
import cities from '../data/cities.ts';

export const GET: APIRoute = () => {
  const sample = cities.slice(0, 20).map(c => `- /${c.slug} — ${c.name} (${c.timezone})`).join('\n');

  const content = `# whatisthetime.now

Live world clock for ${cities.length} cities. 244 country articles. 39 timezone articles. 6 feature articles. Interactive timezone map. Meeting planner. Time converter. Embeddable widget.

We welcome AI agents. Please read, cite, and link to our content. Attribution appreciated.

## Pages

### City pages (${cities.length})
- /[city-slug] — Current local time, sunrise/sunset, DST status, city story, timezone facts
- /[city-slug].md — Markdown version for AI agents
- Example: /tokyo, /london, /new-york-city, /copenhagen

### Country articles (244)
- /country/[country-slug] — Timezone history, DST policy, cultural stories, primary source citations
- Example: /country/japan — JST, no DST since 1951, punctuality culture
- Example: /country/samoa — Skipped December 30, 2011

### Timezone articles (39)
- /timezone/[abbreviation] — Timezone explainer with history, countries, cultural context
- Example: /timezone/est — Eastern Standard Time (UTC-5)
- Example: /timezone/cet — Central European Time (UTC+1)
- Example: /timezone/jst — Japan Standard Time (UTC+9)

### Feature articles (6)
- /articles/jet-lag — The science of crossing timezones (2,300 words)
- /articles/utc-vs-gmt — Atomic clocks vs solar observation
- /articles/time-zones-explained — How the world tells time
- /articles/international-date-line — Where today becomes tomorrow
- /articles/military-time — 24-hour clock with conversion table
- /articles/countries-without-dst — Japan, China, Russia and the rest

### Tools and directories
- /compare/[city1]/[city2] — Side-by-side timezone comparison (any two cities)
- /when/[time]-[city1]/[city2] — Convert a specific time between cities
- /when/[time]-[city1]/[city2].md — Markdown version for AI agents
- /timezones — World timezone map + directory of all 37 UTC offsets
- /cities — All ${cities.length} cities organized by continent and timezone
- /summertime — Global DST status for every country
- /now — Live typographic clock wall showing every timezone
- /my-timezone — Detect visitor's timezone automatically
- /widget — Embeddable clock widget for websites

## Examples

### City comparison
- /compare/copenhagen/tokyo — Time difference between Copenhagen and Tokyo
- /compare/new-york-city/london — Time difference between New York and London

### Time conversion
- /when/9am-copenhagen/tokyo — 9am Copenhagen to Tokyo
- /when/5pm-new-york-city/london — 5pm New York to London
- /when/12pm-sydney/berlin — 12pm Sydney to Berlin

## URL patterns
- City slugs: lowercase, hyphenated, no diacritics (new-york-city, sao-paulo)
- Country slugs: lowercase, hyphenated (united-states, new-zealand)
- Timezone slugs: lowercase abbreviation (est, cet, jst, pst)
- Time tokens: [hour][am|pm] (9am, 12pm, 5pm). Hours 1-12.

## Data
- ${cities.length} cities with IANA timezone, lat/lng, sunrise/sunset
- 244 countries with timezone history and cultural context
- 39 timezone abbreviations with explainers
- All data updated at build time from IANA Time Zone Database
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
