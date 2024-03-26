import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    media: toLine({
      '': cls`
        rel block overflow:hidden
        m:0 w:full
      `,
      '::before': cls`content:'' block pt:calc($(h)/$(w)*100%) w:full`,
      'img': {
        '': cls`
          abs-center
          {w:full;h:auto}
          .portrait_{w:auto;h:full}
          untouchable
          ~.2s|ease-out transition-property:opacity,visibility
          .skeleton_{opacity:0;invisible}
          hide[hide]
        `,
      },
    }),
    cover: {
      '': cls`
        min-w:full obj:cover untouchable
      `,
    },
  },
}
