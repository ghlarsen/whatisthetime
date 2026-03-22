import type { CityEntry } from '../../src/data/cities.ts';

export const CITIES_SAMPLE: CityEntry[] = [
  { slug: 'copenhagen',  name: 'Copenhagen',  country: 'Denmark',       timezone: 'Europe/Copenhagen' },
  { slug: 'new-york',    name: 'New York',    country: 'United States', timezone: 'America/New_York' },
  { slug: 'tokyo',       name: 'Tokyo',       country: 'Japan',         timezone: 'Asia/Tokyo' },
  { slug: 'london',      name: 'London',      country: 'United Kingdom',timezone: 'Europe/London' },
  { slug: 'sydney',      name: 'Sydney',      country: 'Australia',     timezone: 'Australia/Sydney' },
];
