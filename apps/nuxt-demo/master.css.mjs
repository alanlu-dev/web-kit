import config from '@alanlu-dev/mastercss-config'
import floatingVueConfig from '@alanlu-dev/mastercss-config/vendors/floating-vue'
import formkitConfig from '@alanlu-dev/mastercss-config/vendors/formkit'

// import formkitFloatingLabelConfig from '@alanlu-dev/mastercss-config/vendors/formkit-floating-label'

/** @type {import('@master/css').Config} */
export default {
  extends: [
    config,
    // vendors
    floatingVueConfig,
    formkitConfig,
    // formkitFloatingLabelConfig,
  ],
}
