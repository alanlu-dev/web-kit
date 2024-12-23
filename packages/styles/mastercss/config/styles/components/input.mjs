import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 輸入框
    input: {
      '': toLine({
        '': cls`
          box:border rel r:1x overflow:hidden
          flex ai:center jc:space-between h:8x
          fg:base-fg bg:base-bg-box b:1|base-fg/.5
          ~.2s
        `,
        '[invalid]': cls`border-color:error {fg:error}_.input-icon`,
        '[valid]': cls`border-color:success {fg:success}_.input-icon`,
        '_.input-icon': cls`fg:base-fg/.5`,
        '>input': toLine({
          '': cls`box:border p:1x|2x full f:inherit fg:inherit bg:none b:none outline:none appearance:none`,
          '::placeholder': cls`fg:base-fg/.5;~.2s`,
          ':focus::placeholder': cls`opacity:0`,
          ':not(:empty)::placeholder': cls`translateY(-100%)`,
        }),
      }),
      // 圖示
      'icon': cls`
        block abs-center-y left:2x
        f:xs
        .input_{pl:8x}~input
      `,
      //
      'title': cls`
        mb:2x {content:'*';fg:error}[required]::before
      `,
      // 提示訊息
      'msg': cls`
        f:xs fg:base-fg/.7 overflow:hidden
        ~.2s max-h:0 opacity:0 invisible
        {mt:1x;max-h:8x;opacity:1;visible}[show]
      `,
      // TODO: Placeholder
      'label': cls`
        abs top:4x left:2x
        f:base fg:base-fg/.5
        f:bold
        transform-origin:0|0
        transform:translate3d(0,0,0)
        ~.2s
        untouchable
      `,
      // TODO:
      'focusBg': cls`
        z:-1 abs-full bg:base-fg/.05
        transform-origin:left
        transform:scaleX(0)
      `,
    },
    // 欄位
    field: {
      '': cls`{flex;ai:center}>p {flex:0|0|$(w,30%);f:bold}>p>span:nth(1)`,
    },
  },
}
