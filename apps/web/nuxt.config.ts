import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

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

    /* --- mail --- */
    'nuxt-nodemailer',

    /* --- icon / image --- */
    'nuxt-icon',
    '@nuxt/image',

    /* --- aos + gsap --- */
    'nuxt-aos',
    // '@hypernym/nuxt-gsap',
  ],

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
      'Noto+Sans+TC': { wght: [400, 700] },
      'Inter': true,
    },
  },

  ogImage: {
    enabled: false,
  },

  site: {
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    description: 'Welcome to my awesome site!',
    defaultLocale: 'zh-TW', // not needed if you have @nuxtjs/i18n installed
  },

  nodemailer: {
    from: `"${process.env.NUXT_PUBLIC_SITE_NAME}" <${process.env.NUXT_NODEMAILER_AUTH_USER}>`,
    service: 'gmail',
    auth: {
      user: process.env.NUXT_NODEMAILER_AUTH_USER,
      pass: process.env.NUXT_NODEMAILER_AUTH_PASS,
    },
  },

  aos: {
    // once: true,
  },

  // gsap: {
  //   extraPlugins: {
  //     scrollTrigger: true,
  //   },
  // },

  nitro: {
    rollupConfig: {
      plugins: [vue()],
    },
  },
})
