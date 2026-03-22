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
    ? ` During summer, the offset shifts to ${formatUtcOffset(dst.summerOffset)}.`
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
