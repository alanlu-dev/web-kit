import type { toast } from 'vue3-toastify'

declare module '#app' {
  interface NuxtApp {
    $toast: typeof toast
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $toast: typeof toast
  }
}
