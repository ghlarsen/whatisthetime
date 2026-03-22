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
  dateString: string;
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
  return Math.round((localMs - date.getTime()) / 60000);
}

export function formatUtcOffset(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absMinutes / 60);
  const mins = absMinutes % 60;
  return mins === 0 ? `UTC${sign}${hours}` : `UTC${sign}${hours}:${String(mins).padStart(2, '0')}`;
}
