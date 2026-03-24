// scripts/generate-og.ts
// Generate a clean JMB-style OG image as SVG, then convert to PNG
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0a0a0a" />
  <text x="80" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="96" font-weight="800" fill="#ffffff" letter-spacing="-2">whatisthetime</text>
  <text x="80" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="96" font-weight="800" fill="#ffffff" letter-spacing="-2" opacity="0.35" dx="690">.now</text>
  <text x="80" y="340" font-family="ui-monospace, monospace" font-size="28" fill="#666666" letter-spacing="1">LIVE CLOCKS FOR 990 CITIES</text>
  <text x="80" y="400" font-family="ui-monospace, monospace" font-size="20" fill="#444444" letter-spacing="1">245 country articles · timezone map · meeting planner</text>
  <line x1="80" y1="450" x2="400" y2="450" stroke="#222222" stroke-width="1" />
  <text x="80" y="500" font-family="ui-monospace, monospace" font-size="18" fill="#333333" letter-spacing="2">EVERY TIMEZONE ON EARTH HAS A STORY</text>
</svg>`;

writeFileSync('/tmp/og.svg', svg);

// Try to convert with resvg or rsvg-convert if available, otherwise just use the SVG
try {
  execSync('which rsvg-convert', { stdio: 'pipe' });
  execSync(`rsvg-convert -w ${W} -h ${H} /tmp/og.svg -o public/og.png`);
  console.log('Generated og.png via rsvg-convert');
} catch {
  try {
    execSync('which convert', { stdio: 'pipe' });
    execSync(`convert -background none -density 150 /tmp/og.svg -resize ${W}x${H} public/og.png`);
    console.log('Generated og.png via ImageMagick');
  } catch {
    // Fallback: just copy SVG as-is and note we need manual conversion
    writeFileSync('public/og.svg', svg);
    console.log('No PNG converter available. Saved og.svg. Convert manually or use Cloudflare Image Resizing.');
  }
}
