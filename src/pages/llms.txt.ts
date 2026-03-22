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
