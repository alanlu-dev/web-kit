import config from '@jiehousekeeper/master-css-config'
import splide from '@jiehousekeeper/master-css-config/vendors/splide'

/** @type {import('@master/css').Config} */
export default {
  extends: [config, splide],
  styles: {
    formkit: {
      input: '$fk-bg-submit-hover:$(primary) $fk-bg-submit:$(primary) $fk-border-radius:6px',
    },
  },
}
