import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 清單
    list: {
      '': cls`
        line-h:1.4;
        {m:0;p:0;counter-reset:item;list-style-type:none}_ol,_ul
        {m:0}_li
        {table;my:0.25em;counter-increment:item}_ol>li,_ul>li
        {table-cell;pr:0.5em;content:counters(item,'.')|'.';white-space:nowrap;word-break:initial}_ol>li::before
        {table-cell;pr:0.5em;content:$(custom,'‧')}_ul>li::before
      `,
      '-nested': cls`
        {content:counters(item,'.')!}_li::before
      `,
      '-bracket': cls`
        {content:'('|counter(item)|')'!}_li::before
      `,
      '-reset': cls`
      {content:counter(item)|'.'!}_li::before
    `,
      '-custom': cls`
        {content:$(custom)!}_li::before
      `,
      '-none': cls`
        .list_{content:unset!}_li::before
      `,
    },
  },
}
