import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin({
  name: 'gtm',
  parallel: true,
  setup(nuxtApp) {
    const config = useRuntimeConfig()
    nuxtApp.vueApp.use(
      createGtm({
        id: config.public.gtmId,
        defer: true,
        compatibility: false,
        enabled: true,
        debug: config.public.isDev,
        loadScript: true,
        vueRouter: useRouter(),
        trackOnNextTick: false,
      }),
    )
  },
})
