import { cls, toLine } from '@alanlu-dev/mastercss-helpers'

/** @type {import('@master/css').Config} */
export default {
  styles: {
    // 手風琴
    accordion: {
      '': toLine({
        '': cls`flex flex:wrap`,
        '>*': cls`w:full`,
        // Toggle (hide)
        '>input': toLine({
          '': cls`z:-1 hidden abs size:0 opacity:0`,
          ':checked~label_zy-icon[type=arrow]': cls`rotate(-180deg)`,
        }),
        // Arrow Icon
        '>label_zy-icon[type=arrow]': cls`~transform|.2s`,
      }),
      // 標題
      'title': toLine({
        '': cls`rel cursor:pointer`,
        '::after': toLine({
          '': `content:'+' abs right:2x`,
          ':checked~': `content:'-'`,
        }),
      }),
      // 內容
      'content': toLine({
        '': cls`grid grid-template-rows:0fr opacity:0 overflow:hidden`,
        '>div': cls`min-h:0`,
        'transition': cls`~.2s|ease transition-property:grid-template-rows,opacity,padding`,
        ':checked~': cls`grid-template-rows:1fr opacity:1`,
      }),
      'content--open': cls`grid-template-rows:1fr opacity:1`,
    },
  },
}
