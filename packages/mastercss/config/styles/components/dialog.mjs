import { cls } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 卡片
    modal: {
      base: {
        '': cls`
          {p:4x|4x|0|4x!}_.el-dialog__header
          {p:4x!}_.el-dialog__body
          {p:0}_.el-dialog__footer
        `,
      },
    },
  },
}
