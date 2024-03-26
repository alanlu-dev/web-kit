import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    checkbox: {
      label: cls`
        box:border outline:0 pointer
        flex ai:center gap:2x
      `,
      checked: {
        '': cls`
          box:border rel
          flex center-content r:1x
          w:1em h:1em
          ~.2s
          :not([disabled]):hover_{z:1}

          {scale(0);fg:W-50;~.2s|cubic-bezier(.12,.4,.29,1.46)|.1s}>zy-icon

          {z:-1;box:border;content:'';abs;full;round;bg:$(chk-theme,$(theme))}::before
          {opacity:.2;scale(0);~.2s|cubic-bezier(.12,.4,.29,1.46)|.1s}::before
          #checkbox:focus-visible+label_{scale(2.5)}::before
        `,
        '-default': cls`
          b:1|G-40
          [disabled]_{background:rgba(0,0,0,.1)}
          :not([disabled]):hover_{border-color:$(chk-theme,$(theme))}
          [checked]_{border-color:$(chk-theme,$(theme));bg:$(chk-theme,$(theme))}
          [checked]_{scale(1)}>zy-icon
        `,
      },
    },
  },
}
