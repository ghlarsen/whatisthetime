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
  const absDiff        = Math.abs(diffMinutes);
  const diffH          = Math.floor(absDiff / 60);
  const diffM          = absDiff % 60;
  const diffParts: string[] = [];
  if (diffH > 0) diffParts.push(`${diffH} hour${diffH !== 1 ? 's' : ''}`);
  if (diffM > 0) diffParts.push(`${diffM} minute${diffM !== 1 ? 's' : ''}`);
  const diffLabel      = diffParts.join(' ') || '0 hours';
  const aheadBehind    = diffMinutes >= 0
    ? `${diffLabel} ahead of`
    : `${diffLabel} behind`;

  const dayOffsetNote = converted.dayOffset === 1
    ? ' (the next day)'
    : converted.dayOffset === -1
    ? ' (the previous day)'
    : '';

  const md = `# ${parsed.timeToken} in ${originCity.name} = ${destTimeToken} in ${destCity.name}

When it is ${parsed.timeToken} in ${originCity.name} (${originUtcLabel}), it is ${destTimeToken}${dayOffsetNote} in ${destCity.name} (${destUtcLabel}). ${destCity.name} is ${aheadBehind} ${originCity.name}.

## Time difference: ${originCity.name} and ${destCity.name}

${originCity.name} operates on ${originCity.timezone} (${originUtcLabel}). ${destCity.name} operates on ${destCity.timezone} (${destUtcLabel}). The offset between them is ${diffLabel}.

## Frequently Asked Questions

### What time is it in ${destCity.name} when it's ${parsed.timeToken} in ${originCity.name}?
When it is ${parsed.timeToken} in ${originCity.name} (${originUtcLabel}), it is ${destTimeToken}${dayOffsetNote} in ${destCity.name} (${destUtcLabel}).

### How many hours ahead is ${destCity.name} from ${originCity.name}?
${destCity.name} is ${aheadBehind} ${originCity.name} (${diffLabel} difference).
`;

  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
