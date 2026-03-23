// scripts/generate-world-map.ts
// Generates a simple SVG world map colored by timezone offset
import { writeFileSync } from 'fs';
// @ts-ignore
import world from 'world-atlas/countries-110m.json';
// @ts-ignore
import * as topojson from 'topojson-client';

const W = 960;
const H = 480;

// Equirectangular projection: lon/lat → x/y
function projX(lon: number): number { return (lon + 180) * (W / 360); }
function projY(lat: number): number { return (90 - lat) * (H / 180); }

// Convert a ring of [lon, lat] coords to SVG path data
function ringToPath(ring: number[][]): string {
  return ring.map((p, i) => `${i === 0 ? 'M' : 'L'}${projX(p[0]).toFixed(1)},${projY(p[1]).toFixed(1)}`).join('') + 'Z';
}

// Convert a GeoJSON geometry to SVG path d
function geomToPath(geom: any): string {
  if (geom.type === 'Polygon') {
    return geom.coordinates.map(ringToPath).join('');
  } else if (geom.type === 'MultiPolygon') {
    return geom.coordinates.map((poly: number[][][]) => poly.map(ringToPath).join('')).join('');
  }
  return '';
}

// ISO 3166 numeric → primary UTC offset (simplified mapping)
// This maps the numeric country ID from Natural Earth to a UTC offset in hours
const countryOffsets: Record<string, number> = {
  // Americas
  '840': -5, // US (Eastern as primary)
  '124': -5, // Canada (Eastern as primary)
  '484': -6, // Mexico
  '076': -3, // Brazil
  '032': -3, // Argentina
  '152': -4, // Chile
  '170': -5, // Colombia
  '604': -5, // Peru
  '862': -4, // Venezuela
  '192': -5, // Cuba
  '214': -4, // Dominican Republic
  '332': -5, // Haiti
  '388': -5, // Jamaica
  '591': -5, // Panama
  '188': -6, // Costa Rica
  '340': -6, // Honduras
  '320': -6, // Guatemala
  '222': -6, // El Salvador
  '558': -6, // Nicaragua
  '068': -4, // Bolivia
  '600': -4, // Paraguay
  '858': -3, // Uruguay
  '328': -4, // Guyana
  '740': -3, // Suriname
  '218': -5, // Ecuador
  '780': -4, // Trinidad
  // Europe
  '826': 0, // UK
  '372': 0, // Ireland
  '352': 0, // Iceland
  '620': 0, // Portugal
  '250': 1, // France
  '724': 1, // Spain
  '276': 1, // Germany
  '380': 1, // Italy
  '756': 1, // Switzerland
  '040': 1, // Austria
  '056': 1, // Belgium
  '528': 1, // Netherlands
  '208': 1, // Denmark
  '578': 1, // Norway
  '752': 1, // Sweden
  '246': 2, // Finland
  '616': 1, // Poland
  '203': 1, // Czechia
  '703': 1, // Slovakia
  '348': 1, // Hungary
  '642': 2, // Romania
  '100': 2, // Bulgaria
  '300': 2, // Greece
  '792': 3, // Turkey
  '804': 2, // Ukraine
  '112': 3, // Belarus
  '643': 3, // Russia
  '233': 2, // Estonia
  '428': 2, // Latvia
  '440': 2, // Lithuania
  '191': 1, // Croatia
  '688': 1, // Serbia
  '070': 1, // Bosnia
  '008': 1, // Albania
  '807': 1, // N Macedonia
  '499': 1, // Montenegro
  '498': 2, // Moldova
  // Africa
  '818': 2, // Egypt
  '504': 0, // Morocco
  '788': 1, // Tunisia
  '012': 1, // Algeria
  '434': 2, // Libya
  '566': 1, // Nigeria
  '288': 0, // Ghana
  '384': 0, // Ivory Coast
  '710': 2, // South Africa
  '404': 3, // Kenya
  '834': 3, // Tanzania
  '800': 3, // Uganda
  '231': 3, // Ethiopia
  '180': 1, // DR Congo (west)
  '024': 1, // Angola
  '508': 2, // Mozambique
  '454': 2, // Malawi
  '716': 2, // Zimbabwe
  '894': 2, // Zambia
  '072': 2, // Botswana
  '516': 2, // Namibia
  '450': 3, // Madagascar
  '686': 0, // Senegal
  '466': 0, // Mali
  '562': 1, // Niger
  '148': 1, // Chad
  '120': 1, // Cameroon
  '140': 1, // CAR
  '178': 1, // Congo
  '266': 1, // Gabon
  '226': 1, // Equatorial Guinea
  '646': 2, // Rwanda
  '108': 2, // Burundi
  '706': 3, // Somalia
  '232': 3, // Eritrea
  '262': 3, // Djibouti
  '736': 2, // Sudan
  '728': 2, // South Sudan
  '270': 0, // Gambia
  '324': 0, // Guinea
  '854': 0, // Burkina Faso
  '694': 0, // Sierra Leone
  '768': 0, // Togo
  '204': 1, // Benin
  '430': 0, // Liberia
  '732': 0, // Western Sahara
  '624': 0, // Guinea-Bissau
  // Middle East
  '682': 3, // Saudi Arabia
  '364': 3.5, // Iran
  '368': 3, // Iraq
  '400': 2, // Jordan
  '376': 2, // Israel
  '760': 3, // Syria
  '422': 2, // Lebanon
  '414': 3, // Kuwait
  '784': 4, // UAE
  '512': 4, // Oman
  '887': 3, // Yemen
  '634': 3, // Qatar
  '048': 3, // Bahrain
  // Asia
  '156': 8, // China
  '392': 9, // Japan
  '410': 9, // South Korea
  '408': 9, // North Korea
  '496': 8, // Mongolia
  '356': 5.5, // India
  '586': 5, // Pakistan
  '050': 6, // Bangladesh
  '144': 5.5, // Sri Lanka
  '524': 5.75, // Nepal
  '104': 6.5, // Myanmar
  '764': 7, // Thailand
  '704': 7, // Vietnam
  '116': 7, // Cambodia
  '418': 7, // Laos
  '458': 8, // Malaysia
  '702': 8, // Singapore
  '360': 7, // Indonesia (west)
  '608': 8, // Philippines
  '158': 8, // Taiwan
  '398': 6, // Kazakhstan
  '860': 5, // Uzbekistan
  '795': 5, // Turkmenistan
  '762': 5, // Tajikistan
  '417': 6, // Kyrgyzstan
  '004': 4.5, // Afghanistan
  '268': 4, // Georgia
  '031': 4, // Azerbaijan
  '051': 4, // Armenia
  '626': 9, // Timor-Leste
  '096': 8, // Brunei
  // Oceania
  '036': 10, // Australia
  '554': 12, // New Zealand
  '598': 10, // Papua New Guinea
  '242': 12, // Fiji
  '090': 12, // Solomon Islands
  '548': 11, // Vanuatu
  '540': 11, // New Caledonia
  // Greenland
  '304': -3, // Greenland
};

// Color by offset
function offsetToColor(offsetHours: number): string {
  const min = -12, max = 14;
  const t = (offsetHours - min) / (max - min);
  const hue = 240 - t * 280;
  return `hsl(${hue < 0 ? hue + 360 : hue}, 45%, 40%)`;
}

const features = topojson.feature(world, world.objects.countries).features;

const paths = features.map((f: any) => {
  const d = geomToPath(f.geometry);
  const offset = countryOffsets[f.id] ?? null;
  const fill = offset !== null ? offsetToColor(offset) : 'var(--map-land)';
  return `<path d="${d}" fill="${fill}" />`;
}).join('\n');

// Timezone band lines (every 15 degrees = 1 hour)
const gridLines = [];
for (let lon = -180; lon <= 180; lon += 15) {
  const x = projX(lon).toFixed(1);
  gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" />`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="world-map">
  <rect width="${W}" height="${H}" fill="var(--map-ocean)" />
  <g class="grid" stroke="var(--map-grid)" stroke-width="0.3" opacity="0.3">
    ${gridLines.join('\n    ')}
  </g>
  <g class="countries" stroke="var(--map-stroke)" stroke-width="0.3">
    ${paths}
  </g>
</svg>`;

writeFileSync('src/components/WorldMap.svg', svg, 'utf-8');
console.log(`Generated world map SVG (${features.length} countries, ${Math.round(svg.length / 1024)}KB)`);
