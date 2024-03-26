import type { NuxtModule } from '@nuxt/schema'

// @nuxtjs/fontaine
// https://github.com/nuxt-modules/fontaine
export const nuxtConfig: typeof import('@nuxtjs/fontaine').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  fonts: ['Inter', 'Noto Sans TC'],
}
