import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

// https://floating-vue.starpad.dev/theme-editor

/** @type {import('@master/css').Config} */
export default {
  styles: {
    'plyr__controls': toLine({
      '': cls`opacity:0`,
      '.plyr:hover>': cls`opacity:1`,
    }),
    'plyr__video-wrapper': cls`bg:transparent!`,
    'plyr__poster': cls`background-size:cover! bg:transparent!`,
  },
}
