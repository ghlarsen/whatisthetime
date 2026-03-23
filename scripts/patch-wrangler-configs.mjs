// Post-build patch: remove the `assets` binding from generated wrangler configs.
// Cloudflare Pages provides env.ASSETS automatically — manually defining it
// with binding name "ASSETS" is reserved and causes wrangler 4.x to error.
import { readFileSync, writeFileSync, existsSync } from 'fs';

const configs = [
  'dist/server/wrangler.json',
  'dist/server/.prerender/wrangler.json',
];

for (const configPath of configs) {
  if (!existsSync(configPath)) continue;
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  if (config.assets) {
    delete config.assets;
    writeFileSync(configPath, JSON.stringify(config));
    console.log(`Patched: removed assets binding from ${configPath}`);
  }
}
