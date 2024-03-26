import type { NuxtModule } from '@nuxt/schema'

// @element-plus/nuxt
// https://element-plus.org/zh-CN/
export const nuxtConfig: typeof import('@element-plus/nuxt').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  importStyle: 'scss',
}
