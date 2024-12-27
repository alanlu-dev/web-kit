import type { NuxtModule } from '@nuxt/schema'

// @nuxt/image
// https://image.nuxt.com/
export const nuxtConfig: typeof import('@nuxt/image').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any> = {
  /* https://image.nuxt.com/get-started/configuration */

  // 預設情況下，Nuxt Image v1 採用可組合的方法。
  // 如果您不使用這些元件，則不會將任何其他程式碼新增至您的捆綁包。
  // 但是，如果您希望全域初始化一個在整個應用程式中可用的 $img 幫助器，您可以這樣做。
  // inject: true,

  provider: 'ipx',

  // 生成影像的品質。
  quality: 80,

  // 您可以使用此選項來配置 <NuxtPicture> 使用的影像的預設格式。
  // 可用的格式有 webp 、 avif 、 jpeg 、 jpg 、 png 和 gif 。
  format: ['webp'],

  // 預定義螢幕尺寸的清單，這些大小將用於產生影像的調整大小和最佳化版本（例如，使用 sizes 修飾符）。
  screens: {
    'xs': 320,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    'xxl': 1536,
    '2xl': 1536,
  },

  // 預設是專案預定義配置的集合。預設將幫助您統一整個專案中的影像。
  presets: {
    avatar: {
      modifiers: {
        format: 'jpg',
        width: 50,
        height: 50,
      },
    },
  },

  // 若要在外部網站上啟用圖像優化，請指定允許優化哪些網域。
  // 此選項將用於檢測是否應優化遠端影像。這是為了確保外部 URL 不被濫用所必需的。
  // domains: ['nuxtjs.org'],
  // 此選項可讓您指定 src 的別名。
  // 使用預設的 ipx 提供者時，URL 別名會在伺服器端縮短。這對於優化外部 URL 以及不將其包含在 HTML 中特別有用。
  // 使用其他提供者時，別名會在執行時解析並包含在 HTML 中。 （只是簡化了用法）
  alias: {},
}
