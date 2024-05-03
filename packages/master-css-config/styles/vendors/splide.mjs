import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

// https://splidejs.com/guides/options/#classes
/** @type {import('@master/css').Config} */
export default {
  styles: {
    text: 'bg:red-50',
    splide__pagination: toLine(
      {
        '': 'bottom:2x',
        '@tablet': 'bottom:5x',
      },
      {
        scope: '#mcss',
      },
    ),
    splide__pagination__page: toLine(
      {
        '': cls`
          size:6x|2x
          r:2.5x
          my:0
          mx:1x
          bg:white
          opacity:1
          transition-property:background
          {transform:none;bg:secondary}.is-active
        `,
        '@tablet': cls`
          size:10x|3x
          mx:2x
        `,
      },
      {
        scope: '#mcss',
      },
    ),
  },
}
