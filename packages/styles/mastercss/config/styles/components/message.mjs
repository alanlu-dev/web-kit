import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    message: {
      '': cls`
        inline-flex jc:center ai:center p:2x r:1x
        max-w:screen-xs@md
        f:sm fg:base-fg word-break:break-all
        bg:base-bg-box
        shadow:md
        ~.2s|cubic-bezier(.645,.045,.355,1) transition-property:opacity,transform
        opacity:0 translateY(-100%)
        {opacity:1;translateY(0)}[show]
        {opacity:1;translateY(0)}:hover@hover
        pointer-events:all

        {f:lg;mr:1x}>zy-icon
      `,
    },
  },
}
