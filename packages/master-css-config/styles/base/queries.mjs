import breakpoints from './breakpoints.mjs'

/** @type {import('@master/css').Config} */
export default {
  queries: {
    // '4xs': 360,
    // '3xs': 480,
    // '2xs': 600,
    // 'xs': 768,
    // 'sm': 834,
    // 'md': 1024,
    // 'lg': 1280,
    // 'xl': 1440,
    // '2xl': 1600,
    // '3xl': 1920,
    // '4xl': 2560,

    // 'landscape': 'media (orientation:landscape)',
    // 'portrait': 'media (orientation:portrait)',
    // 'motion': 'media (prefers-reduced-motion:no-preference)',
    // 'reduced-motion': 'media (prefers-reduced-motion:reduce)',

    ...breakpoints,

    hover: 'media (any-hover:hover)',
  },
}
