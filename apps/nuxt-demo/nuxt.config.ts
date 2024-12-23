import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

import { createResolver } from '@nuxt/kit'
import appConfig from './config/modules/_appConfig'

// modules's config
import nuxtConfig from './config/modules/_nuxtConfig'

const { resolve } = createResolver(import.meta.url)

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/going-further/layers
  // extends: ['@alanlu-dev/nuxt-base'],

  telemetry: false,

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxtjs/seo',

    /* --- i18n --- */
    '@nuxtjs/i18n',

    /* --- ui --- */
    '@master/css.nuxt',

    /* --- fonts --- */
    ['@nuxtjs/google-fonts', nuxtConfig.googleFonts],
    ['@nuxtjs/fontaine', nuxtConfig.fontaine],

    /* --- utils --- */
    ['@vueuse/nuxt', nuxtConfig.vueuse],
    ['@pinia/nuxt', nuxtConfig.pinia],
    ['pinia-plugin-persistedstate/nuxt', nuxtConfig.piniaPersistedstate],
    // ['@nuxtjs/color-mode', nuxtConfig.colorMode],

    /* --- components --- */
    ['nuxt-splide', { theme: 'default' }],
    'floating-vue/nuxt',
    ['@nuxt/image', nuxtConfig.image],
    ['nuxt-icon', nuxtConfig.nuxtIcon],
    ['@formkit/nuxt', nuxtConfig.formkit],
    '@vue-final-modal/nuxt',
    // 'floating-vue/nuxt',
  ],

  // https://nuxt.com/docs/api/configuration/nuxt-config#devtools
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
      functions: {
        include: [
          // 追蹤 useMouse
          // 'useMouse',

          // 追蹤所有組合式函式名稱開頭為 use
          /^use[A-Z]/,

          // 追蹤所有來自 @vueuse/core 套件的函式
          // (entry) => entry.from === '@vueuse/core',
        ],
        // 排除 useRouter
        exclude: ['useRouter'],
      },
    },
  },

  // https://nuxt.com/docs/api/configuration/nuxt-config#app
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    baseURL: '/',
    // Set default configuration for <head> on every page.
    head: {
      script: [
        {
          // https://github.com/iconify/iconify/issues/283#issuecomment-1947790510
          src: 'https://code.iconify.design/iconify-icon/2.0.0/iconify-icon.min.js',
          key: 'iconify-icon',
        },
      ],
    },
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

  // https://nuxt.com/modules/gtag#module-options
  // gtag: {
  //   // The Google Analytics 4 property ID to use for tracking
  //   id: process.env.NUXT_PUBLIC_GTAG_ID,
  // },

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

  // https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    '@master/normal.css',
    '@formkit/themes/genesis',
    '@formkit/addons/css/floatingLabels',
    // SCSS file in the project
    // '@alanlu-dev/scss', // you should add main.scss somewhere in your app
  ],

  // https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
    },
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_API_SECRET,
    redis: {
      // Default values
      host: '',
      port: 0,
      db: 0,
      /* other redis connector options */
    },
  },

  appConfig: {
    nuxtIcon: appConfig.nuxtIcon,
  },

  // https://nuxt.com/docs/api/configuration/nuxt-config#imports
  // imports: {
  //   dirs: ['public'],
  // },

  // https://github.com/danielroe/nuxt-vercel-isr
  // routeRules: {},

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },

  // https://nuxt.com/docs/api/configuration/nuxt-config#vite
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // https://github.com/sass/dart-sass/issues/2352
          api: 'modern-compiler', // or 'modern'
          // additionalData: '@use "@alanlu-dev/scss/src/abstracts" as *;',
        },
      },
    },
    plugins: [
      // https://vue-i18n.intlify.dev/guide/advanced/optimization.html#unplugin-vue-i18n
      VueI18nVitePlugin({
        // locale messages resource pre-compile option
        include: [resolve(currentDir, './locales/*.json')],
      }),
    ],
  },

  nitro: {
    // https://github.com/nuxt/nuxt/issues/20773
    externals: {
      traceInclude: ['node_modules/@resvg/resvg-js-linux-x64-gnu'],
    },
  },
})
