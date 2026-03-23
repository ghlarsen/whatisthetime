// src/pages/sitemap.xml.ts
export const prerender = true;

import type { APIRoute } from 'astro';
import cities from '../data/cities.ts';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://whatisthetime.now';

  const cityUrls = cities.map(c =>
    `  <url><loc>${baseUrl}/${c.slug}</loc><changefreq>monthly</changefreq></url>`
  ).join('\n');

  // Country articles from content collection
  let countryUrls = '';
  try {
    const countries = await getCollection('countries');
    countryUrls = countries.map(c =>
      `  <url><loc>${baseUrl}/country/${c.data.slug}</loc><changefreq>monthly</changefreq></url>`
    ).join('\n');
  } catch { /* collection may be empty */ }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq></url>
${cityUrls}
${countryUrls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
