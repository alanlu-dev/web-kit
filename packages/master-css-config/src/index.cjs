/** @type {import('@master/css').Config} */
module.exports = {
  queries: {
    desktop: 1440,
    tablet: 1024,
    mobile: 390,
  },
  variables: {
    'font-family': {
      sans: 'Noto Sans TC, Inter',
    },
    'screen': { max: 1920 },
    'primary': '#0384C3',
    'secondary': '#F0C453',
    'accent': '#EB4949',
    'font': {
      title: '#596375',
      content: '#1F2B39',
    },
  },
  styles: {
    normal: `font:sans fg:font-content lh:1.5 ls:0.05em`,
    h1: `font:medium f:8x@mobile f:7x`,
    h2: `font:medium f:7x@mobile f:6x`,
    h3: `font:medium f:6x@mobile f:5x`,
    b1: {
      b: `font:bold f:4.5x@mobile f:4x`,
      m: `font:medium f:4.5x@mobile f:4x`,
      r: `font:regular f:4.5x@mobile f:4x`,
    },
    b2: {
      m: `font:medium f:4x`,
      r: `font:regular f:4x`,
    },
  },
}
