import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    icon: {
      '': toLine({
        '': cls`
          p:2x|4x r:1x
          inline-flex center-content
          lh:1.5 ls:0.05em
          fg:primary
          ~300ms|ease
        `,
        ':hover': cls`fg:#126085 cursor:pointer`,
      }),
    },
  },
}
