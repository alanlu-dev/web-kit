/** @type {import('@master/css').Config} */
export default {
  styles: {
    normal: `
      font:sans.normal font:mono_:where(code,pre)
      fg:font-content lh:1.5 ls:0.05em
    `,
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
