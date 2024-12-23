import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

// https://floating-vue.starpad.dev/theme-editor

/** @type {import('@master/css').Config} */
export default {
  styles: {
    'v-popper': {
      '-theme': {
        tooltip: toLine({
          '_.v-popper__inner': cls`bg:black/.75! p:2x|3x! f:sm`,
          '_.v-popper__arrow-inner': cls`bg:black/.75!`,
          '_.v-popper__arrow-outer': cls`border-color:black/.75!`,
        }),
      },
    },
  },
}
