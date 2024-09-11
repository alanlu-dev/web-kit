<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits<{
  (e: 'verified', response: string): void
  (e: 'expired'): void
}>()
const { $loadRecaptcha } = useNuxtApp()
const config = useRuntimeConfig()
const sitekey = config.public.recaptcha.siteKey
const isExpired = ref(false)

function renderRecaptcha() {
  if ((window as any).grecaptcha && (window as any).grecaptcha.render) {
    try {
      ;(window as any).grecaptcha.render('recaptcha', {
        'sitekey': sitekey,
        'callback': onVerify,
        'expired-callback': onExpired,
      })
    }
    catch (e) {
      console.log(e)
    }
  }
  else {
    setTimeout(renderRecaptcha, 100)
  }
}

function onVerify(response: string) {
  console.log('Verified:', response)
  isExpired.value = false
  emit('verified', response)
}

function onExpired() {
  console.log('reCAPTCHA expired')
  isExpired.value = true
  emit('expired')
}

onMounted(async () => {
  await $loadRecaptcha()
  renderRecaptcha()
})
</script>

<template>
  <div>
    <div id="recaptcha" class="g-recaptcha" :data-sitekey="sitekey" />
  </div>
</template>
