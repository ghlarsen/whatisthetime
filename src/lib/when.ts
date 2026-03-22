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

  // Validate hour is 1-12
  if (hour < 1 || hour > 12) throw new Error(`Invalid hour: ${hour}`);

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

  // Normalize to 0-1439 minute range, counting day boundaries
  while (normalised >= 1440) {
    normalised -= 1440;
    dayOffset += 1;
  }
  while (normalised < 0) {
    normalised += 1440;
    dayOffset -= 1;
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
