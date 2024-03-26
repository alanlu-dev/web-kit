import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 卡片
    card: {
      '': cls`
        my:4x p:4x
        r:2x overflow:hidden
        bg:base-bg-box
        shadow:sm
      `,
    },
  },
}
