import { variables } from '@master/css'
import colors from './colors.mjs'

/** @type {import('@master/css').Config} */
export default {
  variables: {
    ...colors,

    // https://beta.css.master.co/docs/spacing-and-sizing
    'spacing': {},

    'font-family': {
      sans: ['Noto Sans TC', 'Noto Sans TC fallback', 'Inter', 'Inter fallback', ...variables['font-family'].sans],
      mono: ['Fira Code', 'Fira Code fallback', ...variables['font-family'].mono],
    },

    'screen': { max: 1920 },

    'box-shadow': {
      all: '0|0|10|0|gray/.25',
      xs: '0|1|2|0|gray/.05',
      sm: '0|1|3|0|gray/.25,0|1|2|-1|gray/.25',
      md: '0|4|6|-1|gray/.25,0|2|4|-2|gray/.25',
      lg: '0|10|15|-3|gray/.25,0|4|6|-4|gray/.25',
      xl: '0|20|25|-5|gray/.25,0 8|10|-6|gray/.25',
      inner: 'inset|0|2|4|0|gray/.05',
      none: '0|0|#0000',
    },

    'z-index': {
      header: 999,
      footer: 998,
      nav: 999,
      modal: 1000,
      message: 1100,
      devPanel: 999999,
    },
  },
}
