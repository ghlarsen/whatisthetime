// src/pages/sitemap.xml.ts
export const prerender = true;

import type { APIRoute } from 'astro';
import cities from '../data/cities.ts';
import { getCollection } from 'astro:content';

// Top city pairs for /compare/ sitemap (major hubs x major hubs)
const majorCities = [
  'new-york-city', 'london', 'tokyo', 'paris', 'sydney', 'dubai',
  'singapore', 'hong-kong', 'los-angeles', 'chicago', 'toronto',
  'berlin', 'mumbai', 'shanghai', 'seoul', 'sao-paulo', 'mexico-city',
  'cairo', 'istanbul', 'bangkok', 'delhi', 'jakarta', 'moscow',
  'beijing', 'copenhagen', 'amsterdam', 'zurich', 'melbourne',
];

export const GET: APIRoute = async () => {
  const baseUrl = 'https://whatisthetime.now';

  // Static pages
  const staticPages = [
    `  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `  <url><loc>${baseUrl}/now</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`,
    `  <url><loc>${baseUrl}/timezones</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
    `  <url><loc>${baseUrl}/cities</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `  <url><loc>${baseUrl}/summertime</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    `  <url><loc>${baseUrl}/my-timezone</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
    `  <url><loc>${baseUrl}/widget</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`,
  ].join('\n');

  // City pages
  const cityUrls = cities.map(c =>
    `  <url><loc>${baseUrl}/${c.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
  ).join('\n');

  // Country articles
  let countryUrls = '';
  try {
    const countries = await getCollection('countries');
    countryUrls = countries.map(c =>
      `  <url><loc>${baseUrl}/country/${c.data.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    ).join('\n');
  } catch { /* collection may be empty */ }

  // Timezone articles
  let timezoneUrls = '';
  try {
    const timezones = await getCollection('timezones');
    timezoneUrls = timezones.map(t =>
      `  <url><loc>${baseUrl}/timezone/${t.data.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    ).join('\n');
  } catch { /* collection may be empty */ }

  // Feature articles
  let articleUrls = '';
  try {
    const articles = await getCollection('articles');
    articleUrls = articles.map(a =>
      `  <url><loc>${baseUrl}/articles/${a.data.slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ).join('\n');
  } catch { /* collection may be empty */ }

  // Top /compare/ pairs (major city combos, ~380 URLs)
  const comparePairs: string[] = [];
  for (let i = 0; i < majorCities.length; i++) {
    for (let j = i + 1; j < majorCities.length; j++) {
      comparePairs.push(
        `  <url><loc>${baseUrl}/compare/${majorCities[i]}/${majorCities[j]}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`
      );
    }
  }
  const compareUrls = comparePairs.join('\n');

  // Top /when/ conversions (9am from major cities to major cities)
  const whenPairs: string[] = [];
  for (const from of majorCities.slice(0, 15)) {
    for (const to of majorCities.slice(0, 15)) {
      if (from !== to) {
        whenPairs.push(
          `  <url><loc>${baseUrl}/when/9am-${from}/${to}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`
        );
      }
    }
  }
  const whenUrls = whenPairs.join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages}
${cityUrls}
${countryUrls}
${timezoneUrls}
${articleUrls}
${compareUrls}
${whenUrls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
