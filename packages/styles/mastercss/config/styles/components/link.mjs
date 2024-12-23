import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 連結
    link: {
      '': toLine({
        '': cls`rel inline-flex ai:center gap:5 cursor:pointer fg:link text-decoration:none ~.2s fg:link/.8:hover@hover fg:link/.6:active`,
      }),
      'type': {
        '-underline': toLine({
          '::before': cls`content:'' abs bottom:0.1em w:full bb:1|solid`,
        }),
      },
    },
  },
}
