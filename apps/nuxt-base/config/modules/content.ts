import type { NuxtModule } from '@nuxt/schema'

// @nuxt/content
// https://content.nuxtjs.org/
export const nuxtConfig: typeof import('@nuxt/content').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  /* https://content.nuxtjs.org/api/configuration */
}
