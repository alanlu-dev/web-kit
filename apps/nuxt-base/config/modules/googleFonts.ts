import type { NuxtModule } from '@nuxt/schema'

// @nuxtjs/google-fonts
// https://google-fonts.nuxtjs.org/
export const nuxtConfig: typeof import('@nuxtjs/google-fonts').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  families: {
    'Noto+Sans+TC': { wght: [400, 700] },
    'Inter': true,
  },
  display: 'swap',
  useStylesheet: true,
  download: false,
}
