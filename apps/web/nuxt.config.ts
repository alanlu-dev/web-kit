import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // https://nuxt.com/docs/api/configuration/nuxt-config#modules
  modules: [
    /* --- ui --- */
    '@master/css.nuxt',

    /* --- fonts --- */
    '@nuxtjs/google-fonts',

    /* --- pinia --- */
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',

    /* --- splide --- */
    ['nuxt-splide', { theme: 'default' }],

    /* --- modal --- */
    '@vue-final-modal/nuxt',

    /* --- formkit --- */
    ['@formkit/nuxt', { autoImport: true, configFile: resolve(currentDir, './my-config/formkit/formkit.config.ts') }],

    /* --- seo --- */
    '@nuxtjs/seo',

    /* --- icon / image --- */
    'nuxt-icon',
    '@nuxt/image',
  ],

  // https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    // master css
    '@master/normal.css',
    // formkit
    '@formkit/themes/genesis',
    '@formkit/addons/css/floatingLabels',
  ],

  googleFonts: {
    families: {
      'Noto+Sans+TC': { wght: [400, 700] },
      'Inter': true,
    },
  },

  ogImage: {
    enabled: false,
  },

  site: {
    name: '中華民國職業清潔認證協會',
    description: 'Welcome to my awesome site!',
    defaultLocale: 'zh-TW', // not needed if you have @nuxtjs/i18n installed
  },
})
