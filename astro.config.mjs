// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://phpizza.com',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },

  prefetch: {
    prefetchAll: true
  },

  adapter: netlify(),
  experimental: {
    clientPrerender: true,
    rustCompiler: true,
  },
});
