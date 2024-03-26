import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 清單
    list: {
      '': cls`
        lh:1.4;
        {m:0;p:0;counter-reset:item;list-style-type:none}_ol
        {m:0;p:0;pl:5x;list-style-type:disc}_ul
        {m:0}_li
        {table;my:0.25em;counter-increment:item}_ol>li
        {my:0.25em}_ul>li
        {table-cell;pr:0.5em;content:counters(item,'.')|'.';white-space:nowrap;word-break:initial}_ol>li::before
      `,
      '-nested': cls`
        {content:counters(item,'.')!}_li::before
      `,
      '-bracket': cls`
        {content:'('|counter(item)|')'!}_li::before
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
