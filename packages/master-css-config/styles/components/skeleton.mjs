import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 骨架屏
    skeleton: {
      '': cls`
        rel overflow:hidden user-select:none
        fg:transparent!
        {content:'';abs;full;bg:$(skeleton-bg,grey)}::before
        {content:'_';fg:transparent;h:85%;rounded}:is(.skeleton--text):before
        {content:'';abs;top;left;full;bg:linear-gradient(90deg,base-bg/.1|0%,base-bg/.5|20%,base-bg/.5|60%,base-bg/.1);translateX(-100%);@shimmer|2s|infinite}::after
      `,
    },
  },
}
