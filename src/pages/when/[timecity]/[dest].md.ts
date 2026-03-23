// src/pages/when/[timecity]/[dest].md.ts
export const prerender = false;

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
  const aheadBehind    = diffHours >= 0
    ? `${Math.abs(diffHours)} hours ahead of`
    : `${Math.abs(diffHours)} hours behind`;

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
