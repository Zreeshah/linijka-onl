// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://linijka.onl',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pl',
        locales: {
          pl: 'pl-PL',
        },
      },
    }),
  ],
  redirects: {
    '/blog/miarka-w-telefonie/': { status: 301, destination: '/blog/linijka-w-telefonie/' },
    '/blog/telefon-jako-miarka/': { status: 301, destination: '/blog/linijka-w-telefonie/' },
    '/blog/centymetr-online/': { status: 301, destination: '/blog/linijka-w-telefonie/' },
    '/blog/miarka-online-cm/': { status: 301, destination: '/blog/linijka-w-telefonie/' },
    '/blog/cm-na-mm/': { status: 301, destination: '/blog/cm-na-cale/' },
    '/blog/mm-na-cm/': { status: 301, destination: '/blog/cm-na-cale/' },
    '/blog/rozmiar-karty-bankowej/': { status: 301, destination: '/blog/kalibracja-linijki-online/' },
    '/blog/linijka-online-20-cm/': { status: 301, destination: '/blog/10-cm/' },
    '/blog/linijka-pionowa-online/': { status: 301, destination: '/blog/10-cm/' },
    '/blog/linijka-do-druku/': { status: 301, destination: '/linijka-do-druku/' },
    '/blog/linijka-online/': { status: 301, destination: '/' },
  },
  build: {
    format: 'directory',
  },
});
