// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // https://nuxt.com/docs/api/configuration/nuxt-config#modules
  modules: [
    /* --- ui --- */
    '@master/css.nuxt',
  ],

  // https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: ['@master/normal.css'],
})
