import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin({
  name: 'gtm',
  parallel: true,
  setup(nuxtApp) {
    const runtimeConfig = useRuntimeConfig()
    nuxtApp.vueApp.use(
      createGtm({
        id: runtimeConfig.public.gtmId,
        defer: true,
        compatibility: false,
        enabled: true,
        debug: runtimeConfig.public.isDev,
        loadScript: true,
        vueRouter: useRouter(),
        trackOnNextTick: false,
      }),
    )
  },
})
