import type { H3Error } from 'h3'

export default defineNuxtPlugin((nuxtApp) => {
  // 參考 https://ithelp.ithome.com.tw/m/articles/10338164

  nuxtApp.vueApp.config.errorHandler = (error) => {
    console.error('[由 vueErrorHandle 插件所捕獲的錯誤]', error)
    if (process.client) {
      const toast = useNuxtApp().$toast
      toast.error((error as H3Error)?.message, { toastId: 'vueErrorHandle', autoClose: false })
    }
  }
})
