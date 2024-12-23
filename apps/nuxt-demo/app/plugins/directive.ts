import { vMaska } from 'maska/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted(el) {
      el.focus()
    },
    getSSRProps() {
      // you can provide SSR-specific props here
      return {}
    },
  })

  nuxtApp.vueApp.directive('maska', vMaska)
})
