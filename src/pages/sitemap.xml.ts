// src/pages/sitemap.xml.ts
export const prerender = true;

import type { APIRoute } from 'astro';
import cities from '../data/cities.ts';

export const GET: APIRoute = () => {
  const baseUrl = 'https://whatisthetime.now';
  const cityUrls = cities.map(c =>
    `  <url><loc>${baseUrl}/${c.slug}</loc><changefreq>monthly</changefreq></url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq></url>
${cityUrls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
