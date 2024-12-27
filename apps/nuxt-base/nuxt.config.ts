import { createResolver } from '@nuxt/kit'

import appConfig from './config/modules/_appConfig'
// modules's config
import nuxtConfig from './config/modules/_nuxtConfig'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/guide/going-further/layers
  // extends: ['@alanlu-dev/nuxt-base'],

  telemetry: false,

  future: {
    compatibilityVersion: 4,
  },

  // https://github.com/nuxt/nuxt/pull/28939
  // https://github.com/nuxt/nuxt/issues/29002
  // https://github.com/nuxt/devtools/issues/722
  // devtools: {
  //   enabled: true,
  //   componentInspector: false,
  // },

  // https://nuxt.com/docs/api/configuration/nuxt-config#typescript
  typescript: {
    // typeCheck: true,
  },

  experimental: {
    defaults: {
      useAsyncData: {
        deep: false,
      },
      // https://github.com/unjs/ofetch?tab=readme-ov-file#%EF%B8%8F-auto-retry
      useFetch: {
        retry: false, // default 1
        timeout: 5000, // default is disabled
      },
    },
  },

  alias: { '~base': resolve('./') },

  // https://nuxt.com/docs/api/configuration/nuxt-config#modules
  modules: [
    /* --- ui --- */
    '@master/css.nuxt',
    // '@nuxt/ui',

    /* --- fonts --- */
    ['@nuxtjs/google-fonts', nuxtConfig.googleFonts],
    ['@nuxtjs/fontaine', nuxtConfig.fontaine],

    /* --- utils --- */
    ['@vueuse/nuxt', nuxtConfig.vueuse],
    ['@pinia/nuxt', nuxtConfig.pinia],
    ['pinia-plugin-persistedstate/nuxt', nuxtConfig.piniaPersistedstate],
    // ['@nuxtjs/color-mode', nuxtConfig.colorMode],

    /* --- components --- */
    ['@nuxt/image', nuxtConfig.image],
    ['nuxt-icon', nuxtConfig.nuxtIcon],
    ['@formkit/nuxt', nuxtConfig.formkit],

    '@vue-final-modal/nuxt',
    // 'floating-vue/nuxt',
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

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },

  // https://nuxt.com/docs/api/configuration/nuxt-config#app
  app: {
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

  // https://nuxt.com/docs/api/configuration/nuxt-config#imports
  // imports: {
  //   dirs: ['public'],
  // },

  // https://github.com/danielroe/nuxt-vercel-isr
  // routeRules: {},

  // https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    '@master/normal.css',
    '@formkit/themes/genesis',
    // SCSS file in the project
    // '@alanlu-dev/scss', // you should add main.scss somewhere in your app
  ],

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
  },

  nitro: {
    // https://github.com/nuxt/nuxt/issues/20773
    externals: {
      traceInclude: ['node_modules/@resvg/resvg-js-linux-x64-gnu'],
    },
  },

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

  compatibilityDate: '2024-12-27',
})
