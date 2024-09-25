import config from '@jiehousekeeper/master-css-config'
import plyr from '@jiehousekeeper/master-css-config/vendors/plyr'
import splide from '@jiehousekeeper/master-css-config/vendors/splide'

/** @type {import('@master/css').Config} */
export default {
  extends: [config, splide, plyr],
  styles: {
    formkit: {
      outer: `
        $fk-bg-submit-hover:$(primary)
        $fk-bg-submit:$(primary)
        $fk-border-box-shadow-focus:0|0|0|$(fk-border-width-focus)|$(fk-color-border-focus)
        $fk-border-radius:6px
        $fk-border-width-focus:1px
        $fk-color-border-focus:$(primary)
      `,
    },
  },
}
