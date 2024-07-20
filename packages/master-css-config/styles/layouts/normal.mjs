import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    normal: cls`
      font:sans.normal font:mono_:where(code,pre)
      fg:font-content line-h:1.5 ls:0.05em
    `,
    h1: cls`font:medium f:7x f:8x@tablet`,
    h2: cls`font:medium f:6x f:7x@tablet`,
    h3: cls`font:medium f:5x f:6x@tablet`,
    b1: {
      b: cls`font:bold f:4x f:4.5x@tablet`,
      m: cls`font:medium f:4x f:4.5x@tablet`,
      r: cls`font:regular f:4x f:4.5x@tablet`,
    },
    b2: {
      m: cls`font:medium f:3.5x f:4x@tablet`,
      r: cls`font:regular f:3.5x f:4x@tablet`,
    },
    title: {
      '': cls`
        text:center
        ls:0.05em ml:0.025em mr:-0.025em
        {ls:0.15em;ml:0.075em;mr:-0.075em}@tablet
      `,
      'left': cls`
        text:left
        ls:0.05em ls:0.15em@tablet
      `,
    },
  },
}
