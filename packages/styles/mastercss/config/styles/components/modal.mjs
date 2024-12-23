import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    modal: {
      '': cls`
        z:modal
        flex fixed middle center
        p:2x
        overflow-x:hidden overflow-y:auto outline:none
        bg:B-50/.3
        opacity:0 invisible
        ~.2s|ease-out transition-property:opacity,visibility
        {opacity:1;visible}[open]
      `,
      'dialog': cls`
        flex m:auto p:4x r:1x
        min-w:screen-4xs@3xs
        w:full@<3xs
        bg:base-bg-box
        shadow:xl
        transition-property:opacity,transform
        ~.2s|cubic-bezier(.645,.045,.355,1)
        opacity:0 scale(.5)
        [open]_{opacity:1;scale(1)}
        [open].modal--static>{scale(1.02)}
      `,
      'close': cls`
        abs top:0 right:0 flex
        avatar-xs f:xl font-family:none
      `,
    },
    dialog: {
      type: cls`
        hidden f:3xl {block;mr:2x}[icon]
      `,
      content: cls`
        rel w:full
      `,
      title: cls`
        mb:2x f:xl f:bolder line-h:1.2 user-select:none
      `,
      body: cls`
        min-h:50 overflow:auto
      `,
      footer: cls`
        mt:2x t:right user-select:none
      `,
    },
  },
}
