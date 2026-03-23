// scripts/generate-tz-map.ts
// Generate SVG world timezone map from simplified-timezone-boundaries GeoJSON
import { readFileSync, writeFileSync } from 'fs';

const W = 960;
const H = 500;

// Robinson projection lookup table (latitude → X scale factor, Y offset)
const ROBINSON: [number, number][] = [
  [1.0000, 0.0000], // 0°
  [0.9986, 0.0620], // 5°
  [0.9954, 0.1240], // 10°
  [0.9900, 0.1860], // 15°
  [0.9822, 0.2480], // 20°
  [0.9730, 0.3100], // 25°
  [0.9600, 0.3720], // 30°
  [0.9427, 0.4340], // 35°
  [0.9216, 0.4958], // 40°
  [0.8962, 0.5571], // 45°
  [0.8679, 0.6176], // 50°
  [0.8350, 0.6769], // 55°
  [0.7986, 0.7346], // 60°
  [0.7597, 0.7903], // 65°
  [0.7186, 0.8435], // 70°
  [0.6732, 0.8936], // 75°
  [0.6213, 0.9394], // 80°
  [0.5722, 0.9761], // 85°
  [0.5322, 1.0000], // 90°
];

function robinsonInterp(absLat: number): { x: number; y: number } {
  const idx = Math.min(absLat / 5, 17);
  const i = Math.floor(idx);
  const f = idx - i;
  const x = ROBINSON[i][0] * (1 - f) + ROBINSON[i + 1][0] * f;
  const y = ROBINSON[i][1] * (1 - f) + ROBINSON[i + 1][1] * f;
  return { x, y };
}

function projX(lon: number, lat: number): number {
  const r = robinsonInterp(Math.abs(lat));
  return W / 2 + (lon / 180) * (W / 2) * r.x;
}

function projY(lat: number): number {
  const r = robinsonInterp(Math.abs(lat));
  return H / 2 - (lat < 0 ? -1 : 1) * r.y * (H / 2);
}

// Convert a ring of [lon, lat] to SVG path
function ringToPath(ring: number[][]): string {
  // Subsample if too many points
  const step = ring.length > 200 ? Math.ceil(ring.length / 200) : 1;
  const pts: string[] = [];
  for (let i = 0; i < ring.length; i += step) {
    const [lon, lat] = ring[i];
    const x = projX(lon, lat).toFixed(1);
    const y = projY(lat).toFixed(1);
    pts.push(`${i === 0 ? 'M' : 'L'}${x},${y}`);
  }
  return pts.join('') + 'Z';
}

function geomToPath(geom: any): string {
  if (geom.type === 'Polygon') {
    return geom.coordinates.map(ringToPath).join('');
  } else if (geom.type === 'MultiPolygon') {
    return geom.coordinates.map((poly: number[][][]) => poly.map(ringToPath).join('')).join('');
  }
  return '';
}

// Map IANA timezone to UTC offset for coloring
function tzToOffset(tzid: string): number {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tzid,
      timeZoneName: 'shortOffset',
    }).formatToParts(now);
    const tzPart = parts.find(p => p.type === 'timeZoneName')?.value ?? '';
    // Parse "GMT+5:30" or "GMT-8" or "GMT"
    const match = tzPart.match(/GMT([+-]?\d+)?(?::(\d+))?/);
    if (!match) return 0;
    const h = parseInt(match[1] || '0', 10);
    const m = parseInt(match[2] || '0', 10);
    return h + (h < 0 ? -m : m) / 60;
  } catch {
    return 0;
  }
}

function offsetToColor(offset: number): string {
  const min = -12, max = 14;
  const t = (offset - min) / (max - min);
  const hue = 240 - t * 280;
  return `hsl(${hue < 0 ? hue + 360 : hue}, 45%, 40%)`;
}

// Merge IANA tzids to UTC offset groups for simpler interactivity
function offsetToSlug(offset: number): string {
  const sign = offset >= 0 ? '+' : '-';
  const abs = Math.abs(offset);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return m > 0 ? `utc${sign}${h}-${m}` : `utc${sign}${h}`;
}

// Read GeoJSON
const geojson = JSON.parse(readFileSync('/tmp/timezones.geojson', 'utf-8'));

// Group features by UTC offset for hover grouping
const offsetGroups = new Map<string, { offset: number; paths: string[]; tzids: string[] }>();

for (const feature of geojson.features) {
  const tzid = feature.properties.tzid;
  const d = geomToPath(feature.geometry);
  if (!d) continue;

  const offset = tzToOffset(tzid);
  const slug = offsetToSlug(offset);

  if (!offsetGroups.has(slug)) {
    offsetGroups.set(slug, { offset, paths: [], tzids: [] });
  }
  const group = offsetGroups.get(slug)!;
  group.paths.push(`<path d="${d}" />`);
  if (!group.tzids.includes(tzid)) group.tzids.push(tzid);
}

// Sort groups by offset
const sorted = [...offsetGroups.entries()].sort((a, b) => a[1].offset - b[1].offset);

// Build SVG
const groups = sorted.map(([slug, group]) => {
  const fill = offsetToColor(group.offset);
  const sign = group.offset >= 0 ? '+' : '';
  const label = `UTC${sign}${group.offset}`;
  return `  <g class="tz-zone" data-offset="${label}" data-slug="${slug}" fill="${fill}" opacity="0.85">
${group.paths.map(p => '    ' + p).join('\n')}
  </g>`;
}).join('\n');

// Grid lines every 15 degrees longitude
const gridLines: string[] = [];
for (let lon = -180; lon <= 180; lon += 15) {
  const pts: string[] = [];
  for (let lat = -85; lat <= 85; lat += 5) {
    const x = projX(lon, lat).toFixed(1);
    const y = projY(lat).toFixed(1);
    pts.push(`${lat === -85 ? 'M' : 'L'}${x},${y}`);
  }
  gridLines.push(`    <path d="${pts.join('')}" />`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="tz-world-map" role="img" aria-label="World timezone map">
  <rect width="${W}" height="${H}" fill="var(--map-ocean)" rx="4" />
  <g class="tz-grid" stroke="var(--map-grid)" stroke-width="0.3" fill="none" opacity="0.15">
${gridLines.join('\n')}
  </g>
  <g class="tz-zones" stroke="var(--map-stroke)" stroke-width="0.2">
${groups}
  </g>
  <text class="tz-hover-label" x="${W / 2}" y="${H - 12}" text-anchor="middle" fill="var(--map-label)" font-size="13" font-family="ui-monospace, 'SF Mono', monospace" opacity="0"></text>
</svg>`;

writeFileSync('src/components/TimezoneMap.svg', svg, 'utf-8');
console.log(`Generated timezone map: ${sorted.length} offset groups, ${geojson.features.length} regions, ${Math.round(svg.length / 1024)}KB`);
