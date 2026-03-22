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
        const before = getUtcOffsetMinutes(timezone, new Date(year, month, day,     1, 0));
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
