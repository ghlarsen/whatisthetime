// scripts/generate-cities.ts
import { rawTimeZones } from '@vvo/tzdb';
import { writeFileSync } from 'fs';

// @ts-ignore — no types for world-cities-json
import worldCitiesModule from 'world-cities-json';
const worldCities: { city: string; city_ascii: string; lat: string; lng: string; country: string; capital: string }[] =
  (worldCitiesModule as any).cities ?? worldCitiesModule;

function toSlug(name: string): string {
  return name
    .normalize('NFD')                          // decompose accented chars (é → e + combining accent)
    .replace(/[\u0300-\u036f]/g, '')           // strip combining diacritical marks
    .replace(/[^\x00-\x7F]/g, '-')             // replace any remaining non-ASCII with hyphen
    .toLowerCase()
    .replace(/[\s,.'()'\/]/g, '-')              // spaces, punctuation, slashes → hyphen
    .replace(/-+/g, '-')                       // collapse multiple hyphens
    .replace(/^-|-$/g, '');                    // trim leading/trailing hyphens
}

// Common name aliases: @vvo/tzdb name → world-cities-json name
const aliases: Record<string, string> = {
  'bengaluru': 'bangalore', 'antwerpen': 'antwerp', 'arhus': 'aarhus',
  'kobenhavn': 'copenhagen', 'koln': 'cologne', 'munchen': 'munich',
  'moskva': 'moscow', 'roma': 'rome', 'wien': 'vienna', 'torino': 'turin',
  'den-haag': 'the-hague', 'firenze': 'florence', 'genova': 'genoa',
  'napoli': 'naples', 'venezia': 'venice', 'goteborg': 'gothenburg',
  'malmo': 'malmo', 'bruxelles': 'brussels', 'new-york-city': 'new-york',
  'sao-paulo': 'sao-paulo', 'al-kuwayt': 'kuwait-city',
  'al-manamah': 'manama', 'ar-rifa': 'riffa',
};

// Hardcoded coords for places not in world-cities-json
const hardcoded: Record<string, { lat: number; lng: number }> = {
  'adak': { lat: 51.88, lng: -176.66 },
  'atikokan': { lat: 48.75, lng: -91.62 },
  'casey': { lat: -66.28, lng: 110.53 },
  'chagos': { lat: -7.31, lng: 72.42 },
  'chuuk': { lat: 7.45, lng: 151.85 },
  'ciudad-juarez': { lat: 31.69, lng: -106.42 },
  'danmarkshavn': { lat: 76.77, lng: -18.67 },
  'dededo-village': { lat: 13.52, lng: 144.84 },
  'dumontdurville': { lat: -66.66, lng: 140.0 },
  'easter': { lat: -27.12, lng: -109.35 },
  'eucla': { lat: -31.68, lng: 128.88 },
  'fakaofo': { lat: -9.37, lng: -171.22 },
  'galapagos': { lat: -0.74, lng: -90.31 },
  'gambier': { lat: -23.13, lng: -134.97 },
  'kanton': { lat: -2.82, lng: -171.72 },
  'kiritimati': { lat: 1.87, lng: -157.47 },
  'lord-howe': { lat: -31.56, lng: 159.08 },
  'marquesas': { lat: -9.77, lng: -139.01 },
  'mawson': { lat: -67.60, lng: 62.87 },
  'mcmurdo': { lat: -77.85, lng: 166.67 },
  'noronha': { lat: -3.85, lng: -32.42 },
  'nuku-alofa': { lat: -21.21, lng: -175.15 },
  'port-aux-francais': { lat: -49.35, lng: 70.22 },
  'saint-peter-port': { lat: 49.45, lng: -2.54 },
  'saipan': { lat: 15.19, lng: 145.75 },
  'syowa': { lat: -69.0, lng: 39.58 },
  'thule': { lat: 76.53, lng: -68.70 },
  'troll': { lat: -72.01, lng: 2.53 },
  'vostok': { lat: -78.46, lng: 106.84 },
  'west-island': { lat: -12.16, lng: 96.82 },
  'baie-mahault': { lat: 16.27, lng: -61.59 },
  'blanc-sablon': { lat: 51.42, lng: -57.18 },
  'cockburn-town': { lat: 21.46, lng: -71.14 },
  'le-gosier': { lat: 16.21, lng: -61.49 },
  'les-abymes': { lat: 16.27, lng: -61.50 },
  'petit-bourg': { lat: 16.20, lng: -61.59 },
  'providenciales': { lat: 21.77, lng: -72.27 },
  'tamuning': { lat: 13.49, lng: 144.78 },
  'tamuning-tumon-harmon-village': { lat: 13.49, lng: 144.78 },
  'yigo-village': { lat: 13.54, lng: 144.89 },
};

// Build a lookup: normalized city name + country → lat/lng
const geoLookup = new Map<string, { lat: number; lng: number }>();
for (const wc of worldCities) {
  const key = toSlug(wc.city_ascii || wc.city) + '|' + wc.country.toLowerCase();
  if (!geoLookup.has(key)) {
    geoLookup.set(key, { lat: parseFloat(wc.lat), lng: parseFloat(wc.lng) });
  }
  // Also store without country for fallback
  const nameOnly = toSlug(wc.city_ascii || wc.city);
  if (!geoLookup.has(nameOnly)) {
    geoLookup.set(nameOnly, { lat: parseFloat(wc.lat), lng: parseFloat(wc.lng) });
  }
}

// Build timezone → first matched city's coords (fallback for obscure places)
const tzFallback = new Map<string, { lat: number; lng: number }>();

interface CityEntry {
  slug: string;
  name: string;
  country: string;
  timezone: string;
  lat: number;
  lng: number;
}

// Pre-populate timezone fallback: first pass finds coords for each timezone's first city
for (const tz of rawTimeZones) {
  if (tzFallback.has(tz.name)) continue;
  for (const cityName of tz.mainCities) {
    const s = toSlug(cityName);
    const g = geoLookup.get(s);
    if (g) { tzFallback.set(tz.name, g); break; }
  }
}

const seen = new Set<string>();
const cities: CityEntry[] = [];
let matched = 0;
let unmatched = 0;

for (const tz of rawTimeZones) {
  for (const cityName of tz.mainCities) {
    const slug = toSlug(cityName);
    if (seen.has(slug)) continue;
    seen.add(slug);

    // Try to find lat/lng: country+name → name-only → alias → first word → tz fallback
    const countryKey = slug + '|' + (tz.countryName ?? '').toLowerCase();
    const aliasSlug = aliases[slug];
    const firstWord = slug.split('-')[0];
    const geo = hardcoded[slug]
      ?? geoLookup.get(countryKey)
      ?? geoLookup.get(slug)
      ?? (aliasSlug ? geoLookup.get(aliasSlug) : undefined)
      ?? (firstWord.length > 3 ? geoLookup.get(firstWord) : undefined)
      ?? tzFallback.get(tz.name);

    if (geo) {
      matched++;
    } else {
      unmatched++;
    }

    cities.push({
      slug,
      name: cityName,
      country: tz.countryName ?? '',
      timezone: tz.name,
      lat: geo?.lat ?? 0,
      lng: geo?.lng ?? 0,
    });
  }
}

cities.sort((a, b) => a.slug.localeCompare(b.slug));

const output = `// AUTO-GENERATED by scripts/generate-cities.ts — do not edit manually
// Source: @vvo/tzdb + world-cities-json (lat/lng)
export interface CityEntry {
  slug: string;
  name: string;
  country: string;
  timezone: string; // IANA zone name
  lat: number;      // latitude (decimal degrees)
  lng: number;      // longitude (decimal degrees)
}

export const cities: CityEntry[] = ${JSON.stringify(cities, null, 2)};

export default cities;
`;

writeFileSync('src/data/cities.ts', output, 'utf-8');
console.log(`Generated ${cities.length} cities → src/data/cities.ts`);
console.log(`  Geocoded: ${matched} matched, ${unmatched} unmatched (lat/lng = 0,0)`);
