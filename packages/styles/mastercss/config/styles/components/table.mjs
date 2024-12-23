import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 表格
    table: {
      head: cls`
        grid-cols:$(cols,6)
        p:2x
        f:heavy t:center
        fg:theme
        bg:theme/.4
      `,
      body: cls`
        bg:theme/.1
        {max-h:50vh;overflow-y:auto}@xs
        {max-h:75vh;overflow-y:auto}@<xs
      `,
      tr: cls`
        rel ai:center
        {bg:theme/.15}:nth-child(odd)
        {bb:1|theme/.3}:not(:last-of-type)
        {border-bottom-width:2}:not(:last-of-type)@<xs
        {grid-cols:$(cols,6);t:center}@xs
        {grid-rows:$(rows,3);t:left}@<xs
        {z:-1;content:'';abs-full;bg:theme;opacity:0;~opacity|.2s;untouchable}::before
        {opacity:.1;z:0}:hover::before@hover
        {p:2x}>div@xs
        {p:1x}>div@<xs
      `,
    },
  },
}
