import { describe, it, expect } from 'vitest';
import { parseTimecitySegment, convertHour, formatConvertedTime, timeTokenToHour } from '../../src/lib/when.ts';

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
    const result = convertHour({
      hour: 2,
      fromOffsetMinutes: 540,   // UTC+9
      toOffsetMinutes: -300,    // UTC-5
    });
    // 2am UTC+9 = 5pm prev day UTC = 12pm prev day UTC-5
    expect(result.hour).toBe(12);
    expect(result.minutes).toBe(0);
    expect(result.dayOffset).toBe(-1);
  });

  it('preserves half-hour offset for India (UTC+5:30)', () => {
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

describe('formatConvertedTime', () => {
  it('formats whole hour (9am)', () => {
    expect(formatConvertedTime({ hour: 9, minutes: 0, dayOffset: 0 })).toBe('9am');
  });

  it('formats noon', () => {
    expect(formatConvertedTime({ hour: 12, minutes: 0, dayOffset: 0 })).toBe('12pm');
  });

  it('formats midnight', () => {
    expect(formatConvertedTime({ hour: 0, minutes: 0, dayOffset: 0 })).toBe('12am');
  });

  it('formats half-hour (India result)', () => {
    expect(formatConvertedTime({ hour: 13, minutes: 30, dayOffset: 0 })).toBe('1:30pm');
  });

  it('formats 11pm', () => {
    expect(formatConvertedTime({ hour: 23, minutes: 0, dayOffset: 0 })).toBe('11pm');
  });
});

describe('timeTokenToHour', () => {
  it('converts 9am to 9', () => {
    expect(timeTokenToHour('9am')).toBe(9);
  });

  it('converts 12am to 0', () => {
    expect(timeTokenToHour('12am')).toBe(0);
  });

  it('converts 12pm to 12', () => {
    expect(timeTokenToHour('12pm')).toBe(12);
  });

  it('converts 11pm to 23', () => {
    expect(timeTokenToHour('11pm')).toBe(23);
  });

  it('throws on invalid token', () => {
    expect(() => timeTokenToHour('25am')).toThrow();
  });
});
