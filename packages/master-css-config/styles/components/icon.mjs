import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    iconfiy: {
      '': toLine({
        '': cls`
          inline-flex center-content
          ~300ms|ease
        `,
      }),
      'text': toLine({
        '': cls`
          p:2x|4x r:1x
          line-h:1.5 ls:0.05em
          fg:primary /*bg:secondary*/
        `,
        ':hover': cls`fg:primary-hover cursor:pointer`,
      }),
    },
  },
}
