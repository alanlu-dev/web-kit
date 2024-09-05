import { vMaska } from 'maska/vue'

export default defineNuxtPlugin({
  name: 'maska',
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.directive('maska', vMaska)
  },
})
