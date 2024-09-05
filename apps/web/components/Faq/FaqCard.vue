<script setup lang="ts">
import type { FaqSchemaType } from '~/schema/faq'

interface IProps {
  faq: FaqSchemaType
  focusable?: boolean
  checked?: boolean
}
withDefaults(defineProps<IProps>(), {
  // https://www.ripple-ui.com/docs/components/accordion
  // Accordion on click will collapse the other open accordions
  focusable: true,
  checked: false,
})

const router = useRouter()
const htmlEl = ref<HTMLDivElement | null>(null)
onMounted(() => {
  const links = htmlEl.value!.querySelectorAll('a')
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault() // 阻止默認行為
      router.push(link.getAttribute('href')!)
    })
  })
})
</script>

<template>
  <div ref="htmlEl" class="bg:home r:2x text:left">
    <input :id="`faq-${faq.排序}`" name="faq" :type="focusable ? `radio` : `checkbox`" :checked="checked" class="hidden" />
    <label class="b1-r :not(:checked)~{cursor:pointer} {flex;ai:flex-start;jc:space-between;gap:2x} fg:primary p:5x|6x" :for="`faq-${faq.排序}`">
      <div>{{ faq.排序 }}. {{ faq.問題 }}</div>
      <Iconify class="size:6x" icon="material-symbols-light:add" />
    </label>
    <div class="accordion-content :checked~{pb:5x}">
      <div class="px:5x">
        <hr class="bt:1|dashed|divider mb:5x" />
        <div class="{flex;gap:2x}">
          <div v-html="faq.答案"></div>
        </div>
      </div>
    </div>
    <SchemaOrgQuestion>
      <template #name>{{ faq.問題 }}</template>
      <template #acceptedAnswer>{{ faq.答案 }}</template>
    </SchemaOrgQuestion>
  </div>
</template>
