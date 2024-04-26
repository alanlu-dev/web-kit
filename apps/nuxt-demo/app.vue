<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import i18next from 'i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import type { DefaultConfigOptions } from '@formkit/vue'

// import translation from 'zod-i18n-map/locales/zh-TW/zod.json'
import translation from '@alanlu-dev/nuxt-base/config/zod/locales/zh-TW.json'

useHead({
  htmlAttrs: {
    id: 'mcss',
    lang: 'zh-Hant',
  },
  bodyAttrs: {
    class: 'normal fg:base-fg bg:base-bg',
  },
})

// i18n
const { locale } = useI18n()
// const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const config: DefaultConfigOptions = inject(Symbol.for('FormKitConfig'))!
watch(locale, (newVal) => {
  config.locale = newVal
  switchLocalePath(newVal)
})

// lng and resources key depend on your locale.
i18next.init({
  lng: 'zh-TW',
  resources: {
    'zh-TW': { zod: translation },
  },
})
z.setErrorMap(zodI18nMap)

const CSSRuntimeProvider = defineAsyncComponent(async () => (await import('@master/css.vue')).CSSRuntimeProvider)
</script>

<template>
  <CSSRuntimeProvider :config="import('./master.css.mjs')">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <ModalsContainer />
      <NuxtPage />
      <div class="bg:nuxt-demo"></div>
    </NuxtLayout>
  </CSSRuntimeProvider>
</template>

<style lang="scss">
/* https://learn.microsoft.com/en-us/microsoft-edge/web-platform/password-reveal#remove-the-password-reveal-control */
::-ms-reveal {
  display: none;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition:
    background-color 600000s 0s,
    color 600000s 0s;
}

input[data-autocompleted] {
  background-color: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;

  // filter: blur(1rem);
}
</style>
