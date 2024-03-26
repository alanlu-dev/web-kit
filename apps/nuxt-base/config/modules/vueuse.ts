import type { NuxtModule } from '@nuxt/schema'

// @vueuse/nuxt
// https://vueuse.org/
export const nuxtConfig: typeof import('@vueuse/nuxt').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  ssrHandlers: true,
}
