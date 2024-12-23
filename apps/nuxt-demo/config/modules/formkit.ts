import type { NuxtModule } from '@nuxt/schema'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

// @formkit/nuxt
// https://formkit.com/
export const nuxtConfig: typeof import('@formkit/nuxt').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  autoImport: true,
  configFile: resolve(currentDir, '../formkit/formkit.config.ts'),
}
