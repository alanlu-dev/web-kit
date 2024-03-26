import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    ratio: {
      label: cls`
        box:border outline:0 pointer
        flex ai:center gap:2x
      `,
      checked: {
        '': cls`
          box:border rel
          flex center-content round
          w:1em h:1em
          ~.2s
          :not([disabled]):hover_{z:1}
          {z:-1;box:border;content:'';abs;full;round;bg:$(chk-theme,$(theme))}::before
          {opacity:.2;scale(0);~.2s|cubic-bezier(.12,.4,.29,1.46)|.1s}::before
          #radio:focus-visible+label_{scale(2.5)}::before

          {box:border;content:'';abs;center;middle;size:2x;round;bg:$(chk-theme,$(theme))}::after
          {~.2s|cubic-bezier(.12,.4,.29,1.46)|.1s}::after
        `,
        '-default': cls`
          b:1|G-40
          [disabled]_{background:rgba(0,0,0,.1)}
          :not([disabled]):hover_{border-color:$(chk-theme,$(theme))}
          {bg:$(chk-theme,$(theme));scale(0)}::after

          [checked]_{border-color:$(chk-theme,$(theme))}
          [checked]_{scale(1)}::after
        `,
        '-theme': cls`
          bg:$(chk-theme,$(theme))
          {b:2|white;scale(0)}::after

          [checked]_{scale(1)}::after
        `,
      },
    },
  },
}
