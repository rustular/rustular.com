import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import prefetch from '@astrojs/prefetch';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), prefetch()],
  output: 'hybrid',
  experimental: {
    hybridOutput: true,
    assets: true,
  },
  adapter: cloudflare(),
});
