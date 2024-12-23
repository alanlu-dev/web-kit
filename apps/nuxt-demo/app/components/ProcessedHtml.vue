<script setup lang="ts">
export interface IProps {
  html?: string
  removeInlineStyle?: boolean
}
const props = defineProps<IProps>()

function handleImageError(imageElement: HTMLImageElement) {
  imageElement.src = '/NotFound.svg'
  imageElement.removeAttribute('width')
  imageElement.removeAttribute('height')
}

function errorHandler(event: Event) {
  const node = event.target as HTMLElement
  if (node.tagName === 'IMG') {
    handleImageError(node as HTMLImageElement)
  }
}

const htmlContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  watch(
    () => props.html,
    () => {
      nextTick(() => {
        if (htmlContainer.value) {
          // 移除第一個是 <p>&nbsp;</p> 裡面如果有其他元素 不要刪除
          const firstChild = htmlContainer.value.firstChild as HTMLElement
          if (firstChild && firstChild.nodeName === 'P' && firstChild.innerHTML === '&nbsp;') {
            htmlContainer.value.removeChild(firstChild)
          }

          if (props.removeInlineStyle) {
            const elements = htmlContainer.value.querySelectorAll('*')
            elements.forEach((element) => {
              element.removeAttribute('style')
            })
          }

          // 因為內容是後端設定的，可能會 複製/設定 有一些不必要的 class 造成跑版，所以這邊進行移除
          const media = htmlContainer.value.querySelectorAll('.media-block,.media-block__inner,.content-grid,.title-block,.title-block img')
          media.forEach((element) => {
            element.removeAttribute('style')
          })

          const links = htmlContainer.value.querySelectorAll('a')
          links.forEach((link) => {
            link.classList.add('link')
            // link.addEventListener('click', (e) => {
            //   e.preventDefault() // 阻止默認行為
            //   router.push(link.getAttribute('href')!)
            // })
          })

          htmlContainer.value.addEventListener('error', errorHandler, true)
        }
      })
    },
    { immediate: true },
  )
})
onUnmounted(() => {
  if (htmlContainer.value) {
    htmlContainer.value.removeEventListener('error', errorHandler, true)
  }
})
</script>

<template>
  <div class="{my:4x;full!;aspect:16/9}_iframe {mx:auto;height:auto!}_img max-w:full">
    <DevOnly>
      <div class="dev bg:G-20/.5">
        <h6 class="fg:error text:center">[DEV] 開發測試</h6>
        <code>{{ html }}</code>
      </div>
    </DevOnly>
    <template v-if="!html">
      <slot name="empty"></slot>
    </template>
    <div v-else ref="htmlContainer" class="scrollbar mx:auto overflow-x:auto overflow-y:hidden" v-html="html"></div>
  </div>
</template>
