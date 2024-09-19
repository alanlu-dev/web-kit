import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { version } from './package.json'

const currentDir = dirname(fileURLToPath(import.meta.url))

const isDev = process.env.VERCEL_ENV === 'preview'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,

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

  // https://nuxt.com/docs/api/configuration/nuxt-config#modules
  modules: [
    /* --- gtag --- */
    'nuxt-gtag',

    /* --- seo --- */
    '@nuxtjs/seo',

    /* --- fonts --- */
    '@nuxtjs/google-fonts',

    /* --- ui --- */
    '@master/css.nuxt',

    /* --- icon / image --- */
    'nuxt-icon',
    '@nuxt/image',

    /* --- components --- */
    '@vue-final-modal/nuxt',
    ['nuxt-splide', { theme: 'default' }],
    ['@formkit/nuxt', { autoImport: true, configFile: resolve(currentDir, './my-config/formkit/formkit.config.ts') }],
    // 'floating-vue/nuxt',

    /* --- utils --- */
    '@vueuse/nuxt',

    /* --- pinia --- */
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',

    /* --- aos + gsap --- */
    'nuxt-aos',
    // '@hypernym/nuxt-gsap',
  ],

  // https://nuxt.com/docs/api/configuration/nuxt-config#imports
  imports: {
    dirs: ['constants'],
  },

  // https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    // master css
    '@master/normal.css',
    // formkit
    '@formkit/themes/genesis',
    '@formkit/addons/css/floatingLabels',
    // plyr
    'plyr-vue/dist/plyr-vue.css',
  ],

  googleFonts: {
    families: {
      'Noto+Sans+TC': { wght: [400, 500, 700] },
      'Inter': true,
    },
  },

  ogImage: {
    enabled: false,
  },

  // https://github.com/johannschopplich/nuxt-gtag
  gtag: {
    enabled: !isDev,
    id: process.env.NUXT_PUBLIC_GTAG_ID,
    // Additional configuration for the Google Analytics 4 property
    config: {
      page_title: process.env.NUXT_PUBLIC_SITE_NAME,
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    description: 'Welcome to my awesome site!',
    defaultLocale: 'zh-TW', // not needed if you have @nuxtjs/i18n installed
    trailingSlash: false,
    indexable: true,
    debug: isDev,
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: process.env.NUXT_PUBLIC_SITE_NAME!,
      url: process.env.NUXT_PUBLIC_SITE_URL, // main website
      logo: `${process.env.NUXT_PUBLIC_SITE_URL}/logo.svg`,
      sameAs: [
        // social/authoritative profiles
        process.env.NUXT_PUBLIC_FB_URL!,
      ],
    },
  },

  sitemap: {
    // manually chunk into multiple sitemaps
    sitemaps: {
      pages: {
        includeAppSources: true,
      },
      courses: {
        sources: ['/api/__sitemap__/urls/courses'],
      },
    },
  },

  // https://nuxtseo.com/link-checker/getting-started/installation
  linkChecker: {
    enabled: isDev,
    showLiveInspections: isDev,
    // skipInspections: ['missing-hash', 'no-error-response', 'no-baseless', 'no-javascript', 'trailing-slash', 'absolute-site-urls', 'redirects'],
    // excludeLinks: ['/course/**'],
  },

  robots: {
    disallow: ['/checkout'],
  },

  // https://github.com/danielroe/nuxt-vercel-isr
  routeRules: {
    // all routes (by default) generated on demand, revalidates in background, cached on CDN for 60 seconds
    '/**': { isr: 3600 },
    '/api/revalidate': { isr: false },
    '/api/contact': { isr: false },
    '/api/contact/**': { isr: false },
    '/api/payment': { isr: false },
    '/api/payment/**': { isr: false },
    '/api/test/**': { isr: false },

    // this page will be generated on demand once until next deployment, cached on CDN
    // '/': { isr: true },
    // '/faq': { isr: true },

    // this page will be always fresh
    '/checkout/**': { isr: false },
  },

  aos: {
    // once: true,
  },

  // gsap: {
  //   extraPlugins: {
  //     scrollTrigger: true,
  //   },
  // },

  // https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      isDev,
      version,
      siteName: '',
      siteUrl: '',
      gtmId: '',
      fbUrl: '',
      recaptcha: {
        siteKey: '',
      },
    },
    vercel: {
      bypassToken: process.env.VERCEL_BYPASS_TOKEN || '',
    },
    redis: {
      host: '',
      port: '',
      password: '',
    },
    storageType: '',
    notion: {
      apiKey: '',
      databaseId: {
        galleries: '',
        news: '',
        instructors: '',
        classrooms: '',
        courses: '',
        courseBases: '',
        courseEvents: '',
        reviews: '',
        faq: '',
        partners: '',
        contacts: '',
        members: '',
        orders: '',
        meta: '',
        months: '',
      },
    },
    ecpay: {
      merchantId: '',
      hashKey: '',
      hashIv: '',
      stage: '',
    },
    recaptcha: {
      key: '',
    },
  },

  nitro: {
    vercel: {
      config: {
        // https://nitro.unjs.io/deploy/providers/vercel#on-demand-incremental-static-regeneration-isr
        // https://github.com/vercel/examples/tree/main/build-output-api/on-demand-isr
        bypassToken: process.env.VERCEL_BYPASS_TOKEN || '',
      },
    },
    rollupConfig: {
      // @ts-expect-error https://github.com/vitejs/vite-plugin-vue/issues/422
      plugins: [vue()],
    },
  },
})
