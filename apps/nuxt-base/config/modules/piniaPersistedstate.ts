import type { NuxtModule } from '@nuxt/schema'

// pinia-plugin-persistedstate/nuxt
// https://prazdevs.github.io/pinia-plugin-persistedstate
export const nuxtConfig: typeof import('pinia-plugin-persistedstate/nuxt').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  cookieOptions: {
    sameSite: 'strict',
  },
  // storage: 'localStorage',
}
