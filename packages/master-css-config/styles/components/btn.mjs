import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    btn: {
      '': toLine({
        '': cls`
          p:3x|6x r:1.5x
          f:4x font:bold
          line-h:1.375 ls:0.02em
          ~300ms|ease
          {transition:none!}_.icon
        `,
      }),
      '-primary': toLine({
        '': cls`fg:white! bg:primary!`,
        ':hover': cls`bg:primary-hover!`,
      }),
      '-secondary': toLine({
        '': cls`fg:primary! bg:#D0E6F1!`,
        ':hover': cls`fg:white! bg:#7BBFE0!`,
      }),
    },
  },
}
