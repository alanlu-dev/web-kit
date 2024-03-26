import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 一般初始
    normal: {
      '': toLine({
        '': cls`m:0 p:0 f:base lh:1.4 font:sans.normal font:mono_:where(code,pre)`,
        '_:where(p),_headings': cls`m:0`,
        '_:where(kbd)': cls`mx:1x p:1x r:1x f:xs fg:base-fg bg:W-50 b:1|base-fg/.5 shadow:sm`,
        '_::selection': cls`bg:base-fg/.2`,
      }),
    },
    // 滾動軸
    scrollbar: {
      '': cls`
        {size:2x}::scrollbar
        {rounded}::scrollbar,::scrollbar-thumb
        bg:theme/.2::scrollbar
        bg:theme/.6::scrollbar-thumb
        bg:theme/.8::scrollbar-thumb:hover@hover
        bg:theme::scrollbar-thumb:active
        bg:transparent::scrollbar-corner
      `,
    },
  },
}
