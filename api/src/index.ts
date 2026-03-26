/**
 * whatisthetime.now Timezone API
 * Cloudflare Worker -Phase 1
 *
 * Security model: API key required for all requests.
 * Keys stored as SHA-256 hashes in KV.
 * Rate limiting per key via fixed-window KV counters.
 */

// ── Types ──────────────────────────────────────────────────────────

interface Env {
  KEYS: KVNamespace;
  RATE: KVNamespace;
  ADMIN_SECRET: string;
}

interface CityEntry {
  slug: string;
  name: string;
  country: string;
  timezone: string;
  lat: number;
  lng: number;
}

interface KeyMeta {
  plan: 'free' | 'pro' | 'enterprise';
  email: string;
  created: string;
  lastUsed: string;
}

interface ApiResponse {
  ok: boolean;
  data?: unknown;
  error?: { code: string; message: string; suggestion?: string };
  meta: { requestId: string; timestamp: string; cached?: boolean };
}

// ── Constants ──────────────────────────────────────────────────────

const RATE_LIMITS: Record<string, { perMinute: number; perDay: number }> = {
  free: { perMinute: 30, perDay: 1000 },
  pro: { perMinute: 300, perDay: 100000 },
  enterprise: { perMinute: 1000, perDay: 1000000 },
};

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,58}[a-z0-9])?$/;
const TIME_TOKEN_RE = /^(1[0-2]|[1-9])(am|pm)$/i;
const TIME_24H_RE = /^([01]?\d|2[0-3]):([0-5]\d)$/;
const YEAR_MIN = 1970;
const YEAR_MAX = 2100;

// ── City Data (embedded at build time) ─────────────────────────────

import citiesData from './cities-data.json';
const cities: CityEntry[] = citiesData as CityEntry[];

// Build lookup maps once at isolate init
const cityBySlug = new Map<string, CityEntry>();
const citiesByTimezone = new Map<string, CityEntry[]>();
for (const c of cities) {
  cityBySlug.set(c.slug, c);
  const existing = citiesByTimezone.get(c.timezone) || [];
  existing.push(c);
  citiesByTimezone.set(c.timezone, existing);
}

// Valid timezones from the runtime
const VALID_TIMEZONES = new Set(Intl.supportedValuesOf('timeZone'));

// ── Helpers ────────────────────────────────────────────────────────

function requestId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return 'req_' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

function respond(status: number, body: ApiResponse): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
}

function success(data: unknown, rid: string, cached = false): Response {
  return respond(200, {
    ok: true,
    data,
    meta: { requestId: rid, timestamp: new Date().toISOString(), cached },
  });
}

function error(status: number, code: string, message: string, rid: string, suggestion?: string): Response {
  return respond(status, {
    ok: false,
    error: { code, message, ...(suggestion ? { suggestion } : {}) },
    meta: { requestId: rid, timestamp: new Date().toISOString() },
  });
}

function findSuggestion(slug: string): string | undefined {
  // Levenshtein-based suggestion with prefix filter for performance
  const prefix = slug.slice(0, 3);
  let candidates = cities.filter(c => c.slug.startsWith(prefix));
  // Fall back to first-char match if prefix yields nothing
  if (candidates.length === 0) {
    candidates = cities.filter(c => c.slug[0] === slug[0]);
  }
  // Cap candidates to prevent excessive computation
  candidates = candidates.slice(0, 50);

  let best = '';
  let bestDist = 4;
  for (const c of candidates) {
    const d = levenshtein(slug, c.slug);
    if (d < bestDist) {
      bestDist = d;
      best = c.slug;
    }
  }
  return best || undefined;
}

function levenshtein(a: string, b: string): number {
  if (a.length > 30 || b.length > 30) return 99; // Skip long strings
  const m = a.length, n = b.length;
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = a[i - 1] === b[j - 1]
        ? d[i - 1][j - 1]
        : 1 + Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]);
    }
  }
  return d[m][n];
}

async function hashKey(key: string): Promise<string> {
  const data = new TextEncoder().encode(key);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
}

// ── Timezone Functions (ported from timezone.ts) ───────────────────

function getCurrentTime(tz: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  const hours = parseInt(get('hour'), 10) % 24;
  const minutes = parseInt(get('minute'), 10);
  const seconds = parseInt(get('second'), 10);

  return {
    hours, minutes, seconds,
    formatted24: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
    formatted12: new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
    }).format(now),
    date: `${get('weekday')}, ${get('month')} ${get('day')}, ${get('year')}`,
    unix: Math.floor(now.getTime() / 1000),
  };
}

function getUtcOffsetMinutes(tz: string, date?: Date): number {
  const d = date || new Date();
  const tzParts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, timeZoneName: 'shortOffset',
  }).formatToParts(d);
  const tzName = tzParts.find(p => p.type === 'timeZoneName')?.value ?? 'GMT';
  const match = tzName.match(/GMT([+-]?\d+)?(?::(\d+))?/);
  if (!match) return 0;
  const h = parseInt(match[1] || '0', 10);
  const m = parseInt(match[2] || '0', 10);
  return h * 60 + (h < 0 ? -m : m);
}

function formatUtcOffset(minutes: number): string {
  const sign = minutes >= 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m > 0 ? `${sign}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    : `${sign}${String(h).padStart(2, '0')}:00`;
}

function getDSTInfo(tz: string, year: number) {
  // Binary search for DST transitions instead of brute-force day-by-day
  const jan = new Date(year, 0, 15);
  const jul = new Date(year, 6, 15);
  const janOffset = getUtcOffsetMinutes(tz, jan);
  const julOffset = getUtcOffsetMinutes(tz, jul);

  if (janOffset === julOffset) {
    return {
      hasDST: false,
      standardOffset: formatUtcOffset(janOffset),
      standardOffsetMinutes: janOffset,
      currentlyDST: false,
      currentOffset: formatUtcOffset(getUtcOffsetMinutes(tz)),
    };
  }

  const standardOffset = Math.min(janOffset, julOffset);
  const dstOffset = Math.max(janOffset, julOffset);
  const currentOffset = getUtcOffsetMinutes(tz);
  const isDST = currentOffset === dstOffset;

  // Find transitions via binary search (much faster than day-by-day)
  function findTransition(startDate: Date, endDate: Date): Date | null {
    const startOffset = getUtcOffsetMinutes(tz, startDate);
    const endOffset = getUtcOffsetMinutes(tz, endDate);
    if (startOffset === endOffset) return null;

    let lo = startDate.getTime();
    let hi = endDate.getTime();
    while (hi - lo > 3600000) { // Stop at hour precision
      const mid = Math.floor((lo + hi) / 2);
      const midDate = new Date(mid);
      if (getUtcOffsetMinutes(tz, midDate) === startOffset) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return new Date(hi);
  }

  const springForward = findTransition(new Date(year, 0, 1), new Date(year, 6, 1));
  const fallBack = findTransition(new Date(year, 6, 1), new Date(year, 11, 31));

  return {
    hasDST: true,
    standardOffset: formatUtcOffset(standardOffset),
    standardOffsetMinutes: standardOffset,
    dstOffset: formatUtcOffset(dstOffset),
    dstOffsetMinutes: dstOffset,
    currentlyDST: isDST,
    currentOffset: formatUtcOffset(currentOffset),
    transitions: {
      springForward: springForward?.toISOString() ?? null,
      fallBack: fallBack?.toISOString() ?? null,
    },
  };
}

// ── Sunrise/Sunset (NOAA algorithm, no external dependency) ────────

function getSunTimes(lat: number, lng: number, date: Date, tz: string) {
  const rad = Math.PI / 180;
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const B = (2 * Math.PI / 365) * (dayOfYear - 81);
  const EoT = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // minutes
  const decl = 23.45 * Math.sin(B) * rad;
  const latRad = lat * rad;

  const cosHA = (Math.sin(-0.833 * rad) - Math.sin(latRad) * Math.sin(decl)) /
    (Math.cos(latRad) * Math.cos(decl));

  if (cosHA > 1) return { sunrise: null, sunset: null, dayLength: '0h 0m', polarNight: true, midnightSun: false };
  if (cosHA < -1) return { sunrise: null, sunset: null, dayLength: '24h 0m', polarNight: false, midnightSun: true };

  const HA = Math.acos(cosHA) / rad; // degrees
  const solarNoon = 720 - 4 * lng - EoT; // minutes UTC
  const offset = getUtcOffsetMinutes(tz, date);

  const sunriseUTC = solarNoon - HA * 4;
  const sunsetUTC = solarNoon + HA * 4;
  const sunriseLocal = sunriseUTC + offset;
  const sunsetLocal = sunsetUTC + offset;
  const dayLengthMin = (sunsetUTC - sunriseUTC);

  const fmt = (mins: number) => {
    const h = Math.floor(((mins % 1440) + 1440) % 1440 / 60);
    const m = Math.floor(((mins % 1440) + 1440) % 1440 % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const dlH = Math.floor(dayLengthMin / 60);
  const dlM = Math.round(dayLengthMin % 60);

  return {
    sunrise: fmt(sunriseLocal),
    sunset: fmt(sunsetLocal),
    solarNoon: fmt(solarNoon + offset),
    dayLength: `${dlH}h ${dlM}m`,
    dayLengthSeconds: Math.round(dayLengthMin * 60),
    polarNight: false,
    midnightSun: false,
  };
}

// ── Auth + Rate Limiting Middleware ─────────────────────────────────

async function authenticate(request: Request, env: Env): Promise<{ key: string; meta: KeyMeta } | Response> {
  const rid = requestId();
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return error(401, 'UNAUTHORIZED', 'API key required. Pass as Authorization: Bearer witt_...', rid);
  }

  const key = auth.slice(7).trim();
  if (!key.startsWith('witt_') || key.length < 20) {
    return error(401, 'UNAUTHORIZED', 'Invalid API key format. Keys start with witt_', rid);
  }

  const hash = await hashKey(key);
  const metaStr = await env.KEYS.get(`apikey:${hash}`);
  if (!metaStr) {
    return error(401, 'UNAUTHORIZED', 'Invalid API key', rid);
  }

  let meta: KeyMeta;
  try {
    meta = JSON.parse(metaStr);
  } catch {
    return error(500, 'INTERNAL_ERROR', 'Corrupted key metadata', rid);
  }
  return { key: hash, meta };
}

interface RateLimitResult {
  limited: boolean;
  response?: Response;
  minuteCount: number;
  dayCount: number;
  limits: { perMinute: number; perDay: number };
  resetSeconds: number;
}

async function checkRateLimit(keyHash: string, plan: string, env: Env, ctx: ExecutionContext): Promise<RateLimitResult> {
  const rid = requestId();
  const limits = RATE_LIMITS[plan] || RATE_LIMITS.free;
  const now = new Date();
  const minuteBucket = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}-${now.getUTCMinutes()}`;
  const dayBucket = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;

  const minuteKey = `rate:min:${keyHash}:${minuteBucket}`;
  const dayKey = `rate:day:${keyHash}:${dayBucket}`;

  const [minuteCount, dayCount] = await Promise.all([
    env.RATE.get(minuteKey).then(v => parseInt(v || '0', 10)),
    env.RATE.get(dayKey).then(v => parseInt(v || '0', 10)),
  ]);

  const resetSeconds = 60 - now.getUTCSeconds();

  if (minuteCount >= limits.perMinute) {
    return {
      limited: true,
      response: error(429, 'RATE_LIMIT_EXCEEDED', `Rate limit exceeded: ${limits.perMinute} requests per minute`, rid),
      minuteCount, dayCount, limits, resetSeconds,
    };
  }
  if (dayCount >= limits.perDay) {
    return {
      limited: true,
      response: error(429, 'RATE_LIMIT_EXCEEDED', `Daily limit exceeded: ${limits.perDay} requests per day`, rid),
      minuteCount, dayCount, limits, resetSeconds,
    };
  }

  // Increment counters -- fire-and-forget via ctx.waitUntil (no await)
  ctx.waitUntil(Promise.all([
    env.RATE.put(minuteKey, String(minuteCount + 1), { expirationTtl: 120 }),
    env.RATE.put(dayKey, String(dayCount + 1), { expirationTtl: 90000 }),
  ]));

  return { limited: false, minuteCount, dayCount, limits, resetSeconds };
}

// ── Route Handlers ─────────────────────────────────────────────────

function handleTime(slug: string, rid: string): Response {
  if (!SLUG_RE.test(slug)) return error(400, 'INVALID_PARAMETER', 'Invalid city slug format', rid);

  const city = cityBySlug.get(slug);
  if (!city) {
    const suggestion = findSuggestion(slug);
    return error(404, 'CITY_NOT_FOUND', `No city found for '${slug}'`, rid, suggestion);
  }

  const time = getCurrentTime(city.timezone);
  const offset = getUtcOffsetMinutes(city.timezone);
  const dst = getDSTInfo(city.timezone, new Date().getFullYear());

  return success({
    city: { slug: city.slug, name: city.name, country: city.country },
    time,
    timezone: {
      iana: city.timezone,
      utcOffset: formatUtcOffset(offset),
      utcOffsetMinutes: offset,
      isDST: dst.currentlyDST,
      hasDST: dst.hasDST,
    },
  }, rid);
}

function handleCompare(slug1: string, slug2: string, rid: string): Response {
  if (!SLUG_RE.test(slug1)) return error(400, 'INVALID_PARAMETER', 'Invalid first city slug', rid);
  if (!SLUG_RE.test(slug2)) return error(400, 'INVALID_PARAMETER', 'Invalid second city slug', rid);

  const city1 = cityBySlug.get(slug1);
  const city2 = cityBySlug.get(slug2);
  if (!city1) return error(404, 'CITY_NOT_FOUND', `City '${slug1}' not found`, rid, findSuggestion(slug1));
  if (!city2) return error(404, 'CITY_NOT_FOUND', `City '${slug2}' not found`, rid, findSuggestion(slug2));

  const time1 = getCurrentTime(city1.timezone);
  const time2 = getCurrentTime(city2.timezone);
  const offset1 = getUtcOffsetMinutes(city1.timezone);
  const offset2 = getUtcOffsetMinutes(city2.timezone);
  const diffMinutes = offset2 - offset1;
  const absDiff = Math.abs(diffMinutes);
  const diffH = Math.floor(absDiff / 60);
  const diffM = absDiff % 60;
  const parts: string[] = [];
  if (diffH > 0) parts.push(`${diffH} hour${diffH !== 1 ? 's' : ''}`);
  if (diffM > 0) parts.push(`${diffM} minute${diffM !== 1 ? 's' : ''}`);
  const direction = diffMinutes > 0 ? 'ahead' : diffMinutes < 0 ? 'behind' : 'same';

  // N3: Check if both cities are on the same calendar day
  const sameDay = time1.date === time2.date;

  // N4: Compute basic best overlap (9:00-17:00 business hours)
  const bStart1 = 9 * 60; // 9:00 in city1's local minutes
  const bEnd1 = 17 * 60;  // 17:00
  const bStart2inCity1 = bStart1 - diffMinutes; // city2's 9:00 in city1's time
  const bEnd2inCity1 = bEnd1 - diffMinutes;     // city2's 17:00 in city1's time
  const overlapStart = Math.max(bStart1, bStart2inCity1);
  const overlapEnd = Math.min(bEnd1, bEnd2inCity1);
  const overlapMinutes = Math.max(0, overlapEnd - overlapStart);
  const fmtHM = (m: number) => `${String(Math.floor(((m % 1440) + 1440) % 1440 / 60)).padStart(2, '0')}:${String(((m % 60) + 60) % 60).padStart(2, '0')}`;
  const bestOverlap = overlapMinutes > 0
    ? { start: fmtHM(overlapStart), end: fmtHM(overlapEnd), overlapMinutes }
    : null;

  return success({
    city1: {
      slug: city1.slug, name: city1.name, country: city1.country,
      currentTime: time1.formatted24, date: time1.date,
      timezone: city1.timezone, utcOffset: formatUtcOffset(offset1),
    },
    city2: {
      slug: city2.slug, name: city2.name, country: city2.country,
      currentTime: time2.formatted24, date: time2.date,
      timezone: city2.timezone, utcOffset: formatUtcOffset(offset2),
    },
    difference: {
      hours: diffH, minutes: diffM, totalMinutes: absDiff,
      direction,
      sameDay,
      description: diffMinutes === 0
        ? `${city1.name} and ${city2.name} are in the same timezone`
        : `${city2.name} is ${parts.join(' ')} ${direction} of ${city1.name}`,
    },
    businessHoursOverlap: bestOverlap,
  }, rid);
}

function handleConvert(url: URL, rid: string): Response {
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const timeParam = url.searchParams.get('time');

  if (!from || !to || !timeParam) {
    return error(400, 'INVALID_PARAMETER', 'Required: from, to, time query parameters', rid);
  }
  if (!SLUG_RE.test(from)) return error(400, 'INVALID_PARAMETER', 'Invalid from city slug', rid);
  if (!SLUG_RE.test(to)) return error(400, 'INVALID_PARAMETER', 'Invalid to city slug', rid);

  const city1 = cityBySlug.get(from);
  const city2 = cityBySlug.get(to);
  if (!city1) return error(404, 'CITY_NOT_FOUND', `City '${from}' not found`, rid, findSuggestion(from));
  if (!city2) return error(404, 'CITY_NOT_FOUND', `City '${to}' not found`, rid, findSuggestion(to));

  // Parse time token
  let hour: number;
  let minute = 0;
  const tokenMatch = timeParam.match(TIME_TOKEN_RE);
  const h24Match = timeParam.match(TIME_24H_RE);
  if (tokenMatch) {
    const h = parseInt(tokenMatch[1], 10);
    const isPM = tokenMatch[2].toLowerCase() === 'pm';
    hour = isPM ? (h === 12 ? 12 : h + 12) : (h === 12 ? 0 : h);
  } else if (h24Match) {
    hour = parseInt(h24Match[1], 10);
    minute = parseInt(h24Match[2], 10);
  } else {
    return error(400, 'INVALID_PARAMETER', 'Time must be format: 9am, 3pm, or 14:30', rid);
  }

  const offset1 = getUtcOffsetMinutes(city1.timezone);
  const offset2 = getUtcOffsetMinutes(city2.timezone);
  const diffMinutes = offset2 - offset1;
  const convertedMinutes = hour * 60 + minute + diffMinutes;
  const convertedHour = ((Math.floor(convertedMinutes / 60) % 24) + 24) % 24;
  const convertedMin = ((convertedMinutes % 60) + 60) % 60;
  // I6: Simple day offset calculation
  const dayOffset = convertedMinutes < 0
    ? Math.ceil(convertedMinutes / 1440) - (convertedMinutes % 1440 === 0 ? 0 : 1)
    : Math.floor(convertedMinutes / 1440);

  const fmt12 = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return m > 0 ? `${h12}:${String(m).padStart(2, '0')} ${period}` : `${h12}:00 ${period}`;
  };

  return success({
    from: {
      city: city1.slug, name: city1.name,
      time: timeParam, timezone: city1.timezone, utcOffset: formatUtcOffset(offset1),
    },
    to: {
      city: city2.slug, name: city2.name,
      time: fmt12(convertedHour, convertedMin),
      time24: `${String(convertedHour).padStart(2, '0')}:${String(convertedMin).padStart(2, '0')}`,
      timezone: city2.timezone, utcOffset: formatUtcOffset(offset2),
      dayOffset,
    },
    difference: {
      totalMinutes: Math.abs(diffMinutes),
      direction: diffMinutes >= 0 ? 'ahead' : 'behind',
    },
  }, rid);
}

function handleDST(countrySlug: string, url: URL, rid: string): Response {
  if (!SLUG_RE.test(countrySlug)) return error(400, 'INVALID_PARAMETER', 'Invalid country slug', rid);

  const yearParam = url.searchParams.get('year');
  const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();
  if (isNaN(year) || year < YEAR_MIN || year > YEAR_MAX) {
    return error(400, 'INVALID_PARAMETER', `Year must be between ${YEAR_MIN} and ${YEAR_MAX}`, rid);
  }

  // Find all timezones for this country
  const countryCities = cities.filter(c =>
    c.country.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === countrySlug
  );
  if (countryCities.length === 0) {
    return error(404, 'COUNTRY_NOT_FOUND', `No country found for '${countrySlug}'`, rid);
  }

  const seenTimezones = new Set<string>();
  const zones: unknown[] = [];

  for (const c of countryCities) {
    if (seenTimezones.has(c.timezone)) continue;
    seenTimezones.add(c.timezone);
    const info = getDSTInfo(c.timezone, year);
    zones.push({ timezone: c.timezone, ...info });
  }

  return success({
    country: countryCities[0].country,
    countrySlug,
    year,
    zones,
  }, rid);
}

function handleSunrise(slug: string, url: URL, rid: string): Response {
  if (!SLUG_RE.test(slug)) return error(400, 'INVALID_PARAMETER', 'Invalid city slug', rid);

  const city = cityBySlug.get(slug);
  if (!city) return error(404, 'CITY_NOT_FOUND', `City '${slug}' not found`, rid, findSuggestion(slug));

  const dateParam = url.searchParams.get('date');
  let date: Date;
  if (dateParam) {
    date = new Date(dateParam + 'T12:00:00Z');
    if (isNaN(date.getTime())) return error(400, 'INVALID_PARAMETER', 'Date must be YYYY-MM-DD format', rid);
  } else {
    date = new Date();
  }

  const sun = getSunTimes(city.lat, city.lng, date, city.timezone);

  return success({
    city: { slug: city.slug, name: city.name, country: city.country },
    date: date.toISOString().split('T')[0],
    sun,
    timezone: { iana: city.timezone, utcOffset: formatUtcOffset(getUtcOffsetMinutes(city.timezone, date)) },
  }, rid);
}

function handleTimezone(iana: string, rid: string): Response {
  if (!VALID_TIMEZONES.has(iana)) {
    return error(404, 'TIMEZONE_NOT_FOUND', 'Invalid or unrecognized IANA timezone', rid);
  }

  const offset = getUtcOffsetMinutes(iana);
  const time = getCurrentTime(iana);
  const dst = getDSTInfo(iana, new Date().getFullYear());
  const tzCities = (citiesByTimezone.get(iana) || []).slice(0, 5).map(c => ({
    slug: c.slug, name: c.name, country: c.country,
  }));

  return success({
    iana,
    utcOffset: formatUtcOffset(offset),
    utcOffsetMinutes: offset,
    currentTime: time.formatted24,
    currentDate: time.date,
    dst,
    cities: tzCities,
  }, rid);
}

function handleSearch(url: URL, rid: string): Response {
  const q = url.searchParams.get('q')?.trim().toLowerCase();
  if (!q || q.length < 2) {
    return error(400, 'INVALID_PARAMETER', 'Search query must be at least 2 characters', rid);
  }

  // Sanitize: only allow alphanumeric, space, hyphen
  const sanitized = q.replace(/[^a-z0-9\s-]/g, '').slice(0, 100);
  if (!sanitized) return error(400, 'INVALID_PARAMETER', 'Invalid search query', rid);

  const limit = Math.min(parseInt(url.searchParams.get('limit') || '10', 10), 10);

  const results = cities
    .filter(c =>
      c.name.toLowerCase().includes(sanitized) ||
      c.slug.includes(sanitized) ||
      c.country.toLowerCase().includes(sanitized)
    )
    .slice(0, limit)
    .map(c => ({ slug: c.slug, name: c.name, country: c.country }));

  return success({ query: sanitized, results, count: results.length }, rid);
}

// ── Admin Endpoints ────────────────────────────────────────────────

async function handleCreateKey(request: Request, env: Env, rid: string): Promise<Response> {
  const adminSecret = request.headers.get('X-Admin-Secret');
  if (!adminSecret) {
    return error(401, 'UNAUTHORIZED', 'Invalid admin credentials', rid);
  }
  // Constant-time comparison to prevent timing attacks
  const encoder = new TextEncoder();
  const a = encoder.encode(adminSecret);
  const b = encoder.encode(env.ADMIN_SECRET);
  if (a.byteLength !== b.byteLength || !crypto.subtle.timingSafeEqual(a, b)) {
    return error(401, 'UNAUTHORIZED', 'Invalid admin credentials', rid);
  }

  let body: { email: string; plan?: string };
  try {
    body = await request.json();
  } catch {
    return error(400, 'INVALID_PARAMETER', 'Request body must be JSON with email field', rid);
  }

  if (!body.email) return error(400, 'INVALID_PARAMETER', 'Email is required', rid);

  const plan = body.plan || 'free';
  if (!['free', 'pro', 'enterprise'].includes(plan)) {
    return error(400, 'INVALID_PARAMETER', 'Plan must be: free, pro, or enterprise', rid);
  }

  // Generate key
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const key = 'witt_' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  const hash = await hashKey(key);

  const meta: KeyMeta = {
    plan: plan as 'free' | 'pro' | 'enterprise',
    email: body.email,
    created: new Date().toISOString(),
    lastUsed: '',
  };

  await env.KEYS.put(`apikey:${hash}`, JSON.stringify(meta));

  return success({ key, plan, email: body.email }, rid);
}

// ── Router ─────────────────────────────────────────────────────────

function addRateLimitHeaders(response: Response, rl: RateLimitResult): Response {
  const headers = new Headers(response.headers);
  headers.set('X-RateLimit-Limit', String(rl.limits.perMinute));
  headers.set('X-RateLimit-Remaining', String(Math.max(0, rl.limits.perMinute - rl.minuteCount - 1)));
  headers.set('X-RateLimit-Reset', String(rl.resetSeconds));
  if (rl.limited) {
    headers.set('Retry-After', String(rl.resetSeconds));
  }
  return new Response(response.body, { status: response.status, headers });
}

function addCacheHeader(response: Response, cacheValue: string): Response {
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', cacheValue);
  return new Response(response.body, { status: response.status, headers });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Admin-Secret',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const rid = requestId();

    // C7: Top-level error handler
    try {

    // I13: Reject oversized URLs
    if (request.url.length > 2048) {
      return error(414, 'URI_TOO_LONG', 'Request URL exceeds maximum length of 2048 characters', rid);
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Strip unknown query params (cache bypass prevention)
    const knownParams = new Set(['format', 'from', 'to', 'time', 'date', 'year', 'q', 'limit']);
    for (const key of [...url.searchParams.keys()]) {
      if (!knownParams.has(key)) url.searchParams.delete(key);
    }

    // I12: Admin routes - enforce POST method
    if (path === '/api/v1/keys') {
      if (request.method !== 'POST') {
        return error(405, 'METHOD_NOT_ALLOWED', 'Only POST requests are supported for key creation', rid);
      }
      return handleCreateKey(request, env, rid);
    }

    // Health check (no auth)
    if (path === '/api/v1/health') {
      return success({ status: 'ok', cities: cities.length, timezones: VALID_TIMEZONES.size }, rid);
    }

    // All other routes require API key
    if (request.method !== 'GET') {
      return error(405, 'METHOD_NOT_ALLOWED', 'Only GET requests are supported', rid);
    }

    const authResult = await authenticate(request, env);
    if (authResult instanceof Response) return authResult;
    const { key: keyHash, meta } = authResult;

    // I11: Update lastUsed timestamp (fire-and-forget)
    ctx.waitUntil((async () => {
      const updatedMeta = { ...meta, lastUsed: new Date().toISOString() };
      await env.KEYS.put(`apikey:${keyHash}`, JSON.stringify(updatedMeta));
    })());

    // Rate limiting
    const rl = await checkRateLimit(keyHash, meta.plan, env, ctx);
    if (rl.limited && rl.response) {
      return addRateLimitHeaders(rl.response, rl);
    }

    // Route matching
    const segments = path.split('/').filter(Boolean); // ['api', 'v1', ...]

    if (segments[0] !== 'api' || segments[1] !== 'v1') {
      return addRateLimitHeaders(error(404, 'NOT_FOUND', 'API routes start with /api/v1/', rid), rl);
    }

    const route = segments[2];
    const param = segments[3];
    const param2 = segments[4];

    let response: Response;
    let cacheControl: string;

    switch (route) {
      case 'time':
        if (!param) return addRateLimitHeaders(error(400, 'INVALID_PARAMETER', 'City slug required: /api/v1/time/:city', rid), rl);
        response = handleTime(param, rid);
        cacheControl = 'no-store';
        break;

      case 'compare':
        if (!param || !param2) return addRateLimitHeaders(error(400, 'INVALID_PARAMETER', 'Two cities required: /api/v1/compare/:city1/:city2', rid), rl);
        response = handleCompare(param, param2, rid);
        cacheControl = 'no-store';
        break;

      case 'convert':
        response = handleConvert(url, rid);
        cacheControl = 'public, max-age=60';
        break;

      case 'dst':
        if (!param) return addRateLimitHeaders(error(400, 'INVALID_PARAMETER', 'Country slug required: /api/v1/dst/:country', rid), rl);
        response = handleDST(param, url, rid);
        cacheControl = 'public, max-age=3600';
        break;

      case 'sunrise':
        if (!param) return addRateLimitHeaders(error(400, 'INVALID_PARAMETER', 'City slug required: /api/v1/sunrise/:city', rid), rl);
        response = handleSunrise(param, url, rid);
        cacheControl = 'public, max-age=60';
        break;

      case 'timezone': {
        // IANA timezones have slashes: Asia/Tokyo, America/New_York
        const iana = segments.slice(3).join('/');
        if (!iana) return addRateLimitHeaders(error(400, 'INVALID_PARAMETER', 'IANA timezone required: /api/v1/timezone/Asia/Tokyo', rid), rl);
        response = handleTimezone(iana, rid);
        cacheControl = 'no-store';
        break;
      }

      case 'search':
        response = handleSearch(url, rid);
        cacheControl = 'public, max-age=3600';
        break;

      default:
        return addRateLimitHeaders(error(404, 'NOT_FOUND', `Unknown endpoint: ${route}`, rid), rl);
    }

    response = addCacheHeader(response, cacheControl);
    return addRateLimitHeaders(response, rl);

    } catch (e) {
      // C7: Catch-all error handler
      return respond(500, {
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
        meta: { requestId: rid, timestamp: new Date().toISOString() },
      });
    }
  },
};
