import type { CustomAppConfig, NuxtModule } from '@nuxt/schema'

// nuxt-icon
// https://nuxt.com/modules/icon
export const nuxtConfig: typeof import('nuxt-icon').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {}

export const appConfig: CustomAppConfig['nuxtIcon'] = {
  size: '24px', // default <Icon> size applied
  class: 'icon', // default <Icon> class applied
  aliases: {
    nuxt: 'logos:nuxt-icon',
    line: 'LineIcon',
  },
}
