import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin({
  name: 'vue3-toastify',
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.use(Vue3Toastify, {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
      transition: toast.TRANSITIONS.FLIP,
      clearOnUrlChange: false,
      pauseOnFocusLoss: false,
      dangerouslyHTMLString: true,
      limit: 10,
    })

    return {
      provide: { toast },
    }
  },
})
