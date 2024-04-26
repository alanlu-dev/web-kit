import { useVfm } from 'vue-final-modal'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('route:', to.fullPath, from.fullPath)
  if (to.path !== from.path) {
    if (process.client) {
      const vfm = useVfm()
      vfm.close('nav')
    }
  }
})
