import { createAutoAnimatePlugin, createAutoHeightTextareaPlugin, createFloatingLabelsPlugin, createMultiStepPlugin } from '@formkit/addons'
import { zhTW } from '@formkit/i18n'
import { genesisIcons } from '@formkit/icons'

import { generateClasses } from '@formkit/themes'
import { defineFormKitConfig } from '@formkit/vue'

// import { createProPlugin, inputs } from '@formkit/pro'

// --- Styles ---
// import '@formkit/themes/genesis'
// import '@formkit/addons/css/floatingLabels'
// import '@formkit/addons/css/multistep'

import inputs from './inputs'
import { babushkaPlugin } from './plugins'
import { messages, rules } from './rules'

export default defineFormKitConfig(() => {
  // here we can access `useRuntimeConfig` because
  // our function will be called by Nuxt.
  // const config = useRuntimeConfig()

  // and we can use the variables to import secrets
  // const pro = createProPlugin(config.FORMKIT_PRO_KEY, inputs)

  return {
    // plugins: [pro],
    locales: { zh: zhTW },
    locale: 'zh',

    // 圖示
    icons: { ...genesisIcons },

    plugins: [
      // https://formkit.com/plugins/auto-animate#installation
      createAutoAnimatePlugin(),
      // https://formkit.com/plugins/auto-height-textarea#installation
      createAutoHeightTextareaPlugin(),
      // https://formkit.com/plugins/multi-step#installation
      createMultiStepPlugin(),
      // https://formkit.com/plugins/floating-labels#installation
      createFloatingLabelsPlugin({
        useAsDefault: true, // defaults to false
      }),
      babushkaPlugin,
    ],

    rules,
    messages,

    // https://formkit.com/guides/create-a-custom-input
    inputs,

    // https://formkit.com/essentials/styling#using-generateclasses-from-formkitthemes
    config: {
      // classes: generateClasses(mcssTheme),
      classes: generateClasses({
        global: {
          inner: 'user-select:none',
        },
        submit: {
          input: '$reset btn btn-type--theme',
        },
        button: {
          input: '$reset btn',
        },
      }),
    },
  }
})
