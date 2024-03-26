import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 題目
    subject: {
      '': toLine({
        '': cls`flex center-content gap:4x {flex:1}::before,::after`,
        '::before,::after': cls`content:'' bt:1|solid border-color:G-20`,
      }),
      'block': toLine({
        '': cls`rel mx:auto mb:80 py:18 max-w:424 fg:theme t:center white-space:nowrap`,
        '@<xs': cls`py:3x`,
        '@<3xs': cls`mb:56 max-w:240`,
        '::before,::after': cls`content:'' abs w:116 h:1 bg:theme/.56`,
        '::before': cls`top:0 left:0 {w:100}@<xs`,
        '::after': cls`bottom:0 right:0 {w:100}@<xs`,
        '>h2': toLine({
          '': cls`f:bold f:3xl lh:35px`,
          '@<3xs': cls`f:lg lh:28px`,
        }),
        '>h3': toLine({
          '': cls`pt:10 f:md f:regular lh:25px fg:G-50`,
          '@<3xs': cls`pt:1x f:sm lh:20px`,
        }),
      }),
    },
  },
}
