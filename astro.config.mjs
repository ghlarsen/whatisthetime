import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  site: 'https://whatisthetime.now',
  vite: {
    ssr: {
      external: ['sharp', 'detect-libc'],
    },
  },
});
