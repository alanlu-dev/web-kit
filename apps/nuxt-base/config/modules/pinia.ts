import type { NuxtModule } from '@nuxt/schema'

// @pinia/nuxt
// https://pinia.vuejs.org/
export const nuxtConfig: typeof import('@pinia/nuxt').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {}
