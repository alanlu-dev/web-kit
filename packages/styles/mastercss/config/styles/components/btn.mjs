import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    btn: {
      '': toLine({
        '': cls`
          box:border rel overflow:hidden
          inline-flex center-content gap:2x
          p:3x|4x r:2x
          f:inherit line-h:1
          t:center vertical-align:middle
          text-transform:inherit text:none white-space:nowrap
          fg:$(btn-fg,inherit) bg:$(btn-bg,inherit) b:1|solid|$(btn-border,$(G-30))
          ~.2s|ease transition-property:color,background,border-color,box-shadow
          pointer outline:none
          pointer-events:all

          /*{z:1;fg:$(theme,inherit);border-color:$(theme,$(G-40))}:is(:not([disabled]):hover,:focus-within)*/
        `,
        // 焦點
        ':is(:not([disabled]):hover,:focus-within)': cls`z:1 fg:$(btn-focus,$(theme)) border-color:$(btn-focus,$(G-40))`,
        // 禁用
        ':is([disabled],[readonly],[loading])': cls`opacity:.6 cursor:not-allowed`,
        // 預設禁用
        ':not([class*="btn-type--"])[disabled]': cls`bg:B-50/.1`,
        // 背景
        '::before': toLine({
          '': cls`content:'' untouchable abs full middle center bg:$(btn-focus,$(G-40)) opacity:0 ~opacity|.2s`,
          ':not([disabled]):active_$': cls`opacity:.05`,
          /* ':is(:not([disabled]):hover,:focus-within)_$': $`opacity:.01`, */
        }),
        '>*': cls`untouchable`,
      }),
      '-noborder': cls`
        b:0.btn p:calc(0.75rem+1)|calc(1rem+1).btn
      `,
      '-ripple': cls`
        {content:'';untouchable;abs;full;top:$(y,50%);left:$(x,50%);bg:no-repeat;bg:center}::after
        {bg:theme;bg:radial-gradient(circle,base-bg|10%,transparent|10.01%)}::after
        {transform:translate(-50%,-50%)|scale(10);opacity:0;~transform|.2s,opacity|.8s}::after
        {transform:translate(-50%,-50%)|scale(0);opacity:.3;~none}:not([disabled]):active::after
      `,
      'type': {
        '-dashed': cls`border-style:dashed`,
        '-outline': toLine({
          '': cls`fg:$(btn-theme,$(theme))! border-color:$(btn-theme,$(theme))`,
          // 焦點
          ':is(:not([disabled]):hover,:focus-within)': cls`border-color:$(btn-theme,$(theme))!`,
          // 背景
          '::before': cls`bg:$(btn-theme,$(theme))!`,
        }),
        '-font': cls`
          btn--noborder
          {content:unset!}::before
        `,
        '-flat': cls`
          btn--noborder
          {opacity:.1}:is(:not([disabled]):hover,:focus-within)::before
          {opacity:.2!}:not([disabled]):active::before
        `,
        '-theme': cls`
          btn-type--flat
          fg:$(btn-theme-fg,$(theme-fg))! bg:$(btn-theme,$(theme))!
          {bg:$(btn-theme-fg,$(theme-fg))!}::before
          {bg:theme;bg:radial-gradient(circle,base-bg|10%,transparent|10.01%)}.btn--ripple::after
        `,
      },
      'shape': {
        '-circle': cls`round`,
      },
    },

    btn2: toLine({
      '': cls`
        p:2x|4x bg:success rounded
        ~2s|ease
      `,
      '>div': cls`
        bg:gray-20
        fg:red
        opacity:.5
        {fg:white}:hover
      `,
      // ':hover': $`
      //   {fg:yellow-60}>div
      //   `,
      ':hover>div': cls`
          fg:yellow-60
        `,
    }),

    btn3: {
      '': cls`
        p:2x|4x bg:blue@<xs
        {bg:gray-20;fg:red;opacity:.5}>div
        {fg:white}>div:hover
        {fg:yellow-60}:hover>div
        ~2s|ease
        bg:success:hover@hover
      `,
    },
  },
}
