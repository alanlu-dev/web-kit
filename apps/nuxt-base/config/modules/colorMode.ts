import type { NuxtModule } from '@nuxt/schema'

// @nuxtjs/color-mode
// https://color-mode.nuxtjs.org/
export const nuxtConfig: typeof import('@nuxtjs/color-mode').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  classSuffix: '',
}
