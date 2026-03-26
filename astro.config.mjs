import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  adapter: cloudflare({ imageService: 'compile' }),
  site: 'https://whatisthetime.now',
  vite: {
    ssr: {
      external: ['sharp', 'detect-libc'],
    },
  },
});
