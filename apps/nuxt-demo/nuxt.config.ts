import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// modules's config
import nuxtConfig from '@alanlu-dev/nuxt-base/config/modules/_nuxtConfig'

import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/going-further/layers
  extends: ['@alanlu-dev/nuxt-base'],

  modules: [
    '@nuxt/test-utils/module',
    '@nuxtjs/seo',

    /* --- i18n --- */
    '@nuxtjs/i18n',

    /* --- components --- */
    ['@nuxt/content', nuxtConfig.content],
    ['nuxt-splide', { theme: 'default' }],
    'floating-vue/nuxt',
  ],

  i18n: {
    locales: ['zh', 'en'], // used in URL path prefix
    defaultLocale: 'zh', // default locale of your project for Nuxt pages and routings
  },

  // https://nuxtseo.com/link-checker/getting-started/installation
  linkChecker: {
    enabled: false,
    showLiveInspections: false,
    // skipInspections: ['missing-hash', 'no-error-response', 'no-baseless', 'no-javascript', 'trailing-slash', 'absolute-site-urls', 'redirects'],
  },

  // https://nuxtseo.com/og-image/api/config
  ogImage: {
    enabled: false,
    fonts: ['Noto+Sans+TC:400', 'Noto+Sans+TC:700', 'Inter:400', 'Inter:700'],
    defaults: {
      // https://nuxtseo.com/og-image/guides/cache#purging-the-cache
      cacheMaxAgeSeconds: 60 * 60 * 24 * 1, // 1 days
      // https://nuxtseo.com/og-image/guides/jpegs
      extension: 'jpeg',
    },
    compatibility: {
      // disable chromium dependency for prerendering (skips the chromium install in CIs)
      prerender: {
        chromium: false,
      },
    },
  },

  css: ['@formkit/addons/css/floatingLabels'],

  // https://nuxt.com/docs/api/configuration/nuxt-config#app
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
  },

  // https://nuxtseo.com/nuxt-seo/guides/configuring-modules#quick-setup
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: 'Nuxt Demo',
    description: 'demo',
    defaultLocale: 'zh-Hant',
    trailingSlash: false,
    indexable: true,
    debug: process.env.NODE_ENV === 'development',
  },

  // https://nuxt.com/docs/api/configuration/nuxt-config#vite
  vite: {
    plugins: [
      // https://vue-i18n.intlify.dev/guide/advanced/optimization.html#unplugin-vue-i18n
      VueI18nVitePlugin({
        // locale messages resource pre-compile option
        include: [resolve(currentDir, './locales/*.json')],
      }),
    ],
  },
})
