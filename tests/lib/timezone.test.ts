import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCityBySlug, getCurrentTime, formatUtcOffset } from '../../src/lib/timezone.ts';
import { CITIES_SAMPLE } from '../fixtures/cities-sample.ts';

// vi.mock is hoisted to top of file, so we can't reference CITIES_SAMPLE (a module-level import) here.
// Instead we inline the same data. CITIES_SAMPLE is still imported for use in test assertions.
vi.mock('../../src/data/cities.ts', () => {
  const sample = [
    { slug: 'copenhagen', name: 'Copenhagen', country: 'Denmark',        timezone: 'Europe/Copenhagen' },
    { slug: 'new-york',   name: 'New York',   country: 'United States',  timezone: 'America/New_York' },
    { slug: 'tokyo',      name: 'Tokyo',      country: 'Japan',          timezone: 'Asia/Tokyo' },
    { slug: 'london',     name: 'London',     country: 'United Kingdom', timezone: 'Europe/London' },
    { slug: 'sydney',     name: 'Sydney',     country: 'Australia',      timezone: 'Australia/Sydney' },
  ];
  return { default: sample, cities: sample };
});

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
    vi.setSystemTime(new Date('2026-03-22T17:42:09Z'));
  });

  it('returns correct hours/minutes/seconds for a timezone', () => {
    // UTC+1 (Copenhagen, no DST yet in March 2026)
    const t = getCurrentTime('Europe/Copenhagen');
    expect(t.hours).toBe(18);
    expect(t.minutes).toBe(42);
    expect(t.seconds).toBe(9);
  });

  it('returns correct time for a negative UTC offset', () => {
    // UTC-5 (New York, no DST yet in late March 2026 — DST starts Mar 8)
    // Actually New York DST starts 2nd Sunday in March = Mar 8 2026, so by Mar 22 it's UTC-4
    const t = getCurrentTime('America/New_York');
    // 17:42 UTC - 4h = 13:42 (EDT = UTC-4 after DST kicks in Mar 8)
    expect(t.hours).toBe(13);
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

describe('getCurrentTime midnight edge', () => {
  it('returns 0 hours at midnight, not 24', () => {
    vi.setSystemTime(new Date('2026-03-22T23:00:00Z'));
    const t2 = getCurrentTime('Europe/Copenhagen');
    expect(t2.hours).toBe(0);
    expect(t2.hours).not.toBe(24);
  });
});
