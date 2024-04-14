import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    normal: `
      font:sans.normal font:mono_:where(code,pre)
      fg:font-content lh:1.5 ls:0.05em
    `,
    h1: `font:medium f:7x f:8x@tablet`,
    h2: `font:medium f:6x f:7x@tablet`,
    h3: `font:medium f:5x f:6x@tablet`,
    b1: {
      b: `font:bold f:4x f:4.5x@tablet`,
      m: `font:medium f:4x f:4.5x@tablet`,
      r: `font:regular f:4x f:4.5x@tablet`,
    },
    b2: {
      m: `font:medium f:3.5x f:4x@tablet`,
      r: `font:regular f:3.5x f:4x@tablet`,
    },
    title: toLine({
      '': cls`
        fg:font-title text:center
        ls:0.05em ml:0.0025em mr:-0.0025em
      `,
      '@tablet': 'ls:0.15em ml:0.0725em mr:-0.0725em',
    }),
  },
}
