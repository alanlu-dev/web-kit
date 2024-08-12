declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    isDev: boolean
    siteName: string
    version: string
    gtmId: string
    fbUrl: string
    region: string
  }
}

export {}
