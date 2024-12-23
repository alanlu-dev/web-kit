<script setup lang="ts">
import { NuxtImg } from '#components'

type ImgProps = InstanceType<typeof NuxtImg>['$props']

export interface IProps {
  src?: ImgProps['src']
  alt?: ImgProps['alt']
  placeholder?: ImgProps['placeholder']
  title?: string
  fallback?: string
}
const props = withDefaults(defineProps<IProps>(), {
  fallback: '/NotFound.svg',
})

const emit = defineEmits(['load', 'error', 'animationend'])

const src = ref(props.src || props.fallback)
const placeholder = ref(props.placeholder)
const title = ref(props.title || props.alt)
const img = ref()
const hasError = ref(false)

// const resizeObserver = ref<ResizeObserver>()

// function handleResize(wrapEl: Element) {
//   if (!img.value?.$el) return

//   const imgEl = img.value.$el as HTMLImageElement
//   const targetRadio = imgEl.height / imgEl.width
//   const parentRadio = wrapEl.clientHeight / wrapEl.clientWidth

//   wrapEl.classList.toggle('portrait', targetRadio < parentRadio)
// }
// const handleResizeDebounced = useDebounceFn(handleResize, 200)

function handleLoad() {
  if (!img.value?.$el) return

  // const imgEl = img.value.$el as HTMLImageElement

  emit('load')

  // if (!resizeObserver.value) {
  //   // 監聽 wrap 比例改變
  //   const wrapEl = imgEl.parentElement as HTMLDivElement

  //   handleResize(wrapEl)
  //   resizeObserver.value = new ResizeObserver((entries) => handleResizeDebounced(entries[0].target))
  //   resizeObserver.value.observe(wrapEl)
  // }
}

function handleError(_event: Event | string) {
  if (hasError.value) return

  hasError.value = true
  if (props.fallback) {
    placeholder.value = props.fallback
  }

  emit('error')
}

function handleAnimationend(event: Event) {
  emit('animationend', event)
}

onMounted(() => {
  const element = img.value.$el as HTMLImageElement

  if (element) {
    element.onload = handleLoad
    element.onerror = handleError
    element.onanimationend = handleAnimationend
  }

  nextTick(() => {
    if (!element || !element.complete) return

    handleLoad()

    if (element.naturalWidth === 0) {
      handleError('')
    }
  })
})
// onUnmounted(() => {
//   if (resizeObserver.value) {
//     resizeObserver.value.disconnect()
//   }
// })

// TODO:
// https://github.com/nuxt/image/issues/412
// https://github.com/nuxt/image/issues/682
</script>

<template>
  <NuxtImg ref="img" v-bind="$attrs" :src="src" :alt="alt" :title="title" :placeholder="placeholder" />
</template>
