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

    'font-size': {
      '2xs': 10,
      'xs': 12,
      'sm': 14,
      'base': 16,
      'md': 18,
      'lg': 20,
      'xl': 24,
      '2xl': 28,
      '3xl': 32,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      '7xl': 72,
    },

    'box-shadow': {
      xs: '0|1|2|0|theme/.05',
      sm: '0|1|3|0|theme/.1,0|1|2|-1|theme/.1',
      md: '0|4|6|-1|theme/.1,0|2|4|-2|theme/.1',
      lg: '0|10|15|-3|theme/.1,0|4|6|-4|theme/.1',
      xl: '0|20|25|-5|theme/.1,0 8|10|-6|theme/.1',
      inner: 'inset|0|2|4|0|theme/.05',
      none: '0|0|#0000',
    },

    'z-index': {
      header: 999,
      footer: 999,
      nav: 999,
      modal: 1000,
      message: 1100,
      devPanel: 999999,
    },
  },
}
