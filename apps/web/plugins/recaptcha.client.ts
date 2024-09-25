export default defineNuxtPlugin({
  name: 'recaptcha',
  parallel: true,
  setup() {
    const loadRecaptcha = () => {
      return new Promise<void>((resolve) => {
        if (typeof window !== 'undefined' && (window as any).grecaptcha) {
          resolve()
          return
        }

        const existingScript = document.querySelector('script[src^="https://www.google.com/recaptcha/api.js?render=explicit"]')
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve())
        }
        else {
          const script = document.createElement('script')
          script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
          script.async = true
          script.defer = true
          script.onload = () => resolve()
          document.head.appendChild(script)
        }
      })
    }

    return {
      provide: { loadRecaptcha },
    }
  },
})
