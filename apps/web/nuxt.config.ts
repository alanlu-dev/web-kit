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
  ],

  googleFonts: {
    families: {
      'Noto+Sans+TC': { wght: [400, 700] },
      'Inter': true,
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://code.iconify.design/iconify-icon/2.0.0/iconify-icon.min.js',
          key: 'iconify-icon',
        },
      ],
    },
  },
  // https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: ['@master/normal.css'],
})
