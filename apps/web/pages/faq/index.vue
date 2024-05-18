<script setup lang="ts">
import type { FaqSchemaType } from '~/schema/faq'
definePageMeta({
  title: '常見問答',
  breadcrumb: {
    label: '常見問答',
  },
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      // item is the url and will be resolved to the absolute url
      { name: '首頁', item: '/' },
      // item is not required for the last list element
      { name: '常見問答' },
    ],
  }),
])

const { data: list } = await useFetch<FaqSchemaType[]>('/api/faq')

// https://www.ripple-ui.com/docs/components/accordion
// Accordion on click will collapse the other open accordions
const focusable = ref(true)

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

  const firstInput = htmlEl.value!.querySelector('input')
  if (firstInput) {
    ;(firstInput as HTMLInputElement).checked = true
  }
})
</script>

<template>
  <div>
    <Hero title="常見問答" />
    <section class="px:6x px:10vw@tablet px:22.5x@desktop">
      <Breadcrumb />
      <div ref="htmlEl" class="flex flex:column gap:5x gap:10x@tablet max-w:screen-md mx:auto my:5x my:10x@tablet">
        <div v-for="item in list" :key="item.排序!" class="bg:#F2F9FA p:0!">
          <label class="pointer b1-r flex ai:flex-start fg:primary gap:2x jc:space-between p:5x|6x" :for="`faq-${item.排序}`">
            <div>{{ item.排序 }}. {{ item.問題 }}</div>
            <div class="size:24">
              <Icon name="material-symbols-light:add" />
            </div>
          </label>
          <input :id="`faq-${item.排序}`" name="faq" :type="focusable ? `radio` : `checkbox`" class="hidden" />
          <div class="accordion-content :checked~{pb:5x}">
            <div class="px:5x">
              <hr class="bt:1|dashed|divider mb:5x" />
              <div class="flex gap:2x">
                <div v-html="item.答案"></div>
              </div>
            </div>
          </div>
          <SchemaOrgQuestion>
            <template #name>{{ item.問題 }}</template>
            <template #acceptedAnswer>{{ item.答案 }}</template>
          </SchemaOrgQuestion>
        </div>
      </div>
    </section>
  </div>
</template>
