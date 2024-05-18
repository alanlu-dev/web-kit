<script setup lang="ts">
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

// https://www.ripple-ui.com/docs/components/accordion
// Accordion on click will collapse the other open accordions
const focusable = ref(true)

const list = [
  {
    sort: 1,
    title: `沒有清潔課程基礎的人適合報名嗎？`,
    desc: `
      <div class="mt:2x_p+p">
        <p>協會提供多樣的課程主題及師資陣容，大多數基礎清潔課程適合無清潔課程經驗的人報名，但一些高級課程可能需要學員有基本的清潔經驗或曾學習過相關課程。</p>
        <p>協會提供多樣的課程主題及師資陣容，大多數基礎清潔課程適合無清潔課程經驗的人報名，但一些高級課程可能需要學員有基本的清潔經驗或曾學習過相關課程。</p>
      </div>
    `,
  },
  {
    sort: 2,
    title: `沒有清潔課程基礎的人適合報名嗎？`,
    desc: `
      <div class="mt:2x_p+p">
        <p>協會提供多樣的課程主題及師資陣容，大多數基礎清潔課程適合無清潔課程經驗的人報名，但一些高級課程可能需要學員有基本的清潔經驗或曾學習過相關課程。</p>
        <p>協會提供多樣的課程主題及師資陣容，大多數基礎清潔課程適合無清潔課程經驗的人報名，但一些高級課程可能需要學員有基本的清潔經驗或曾學習過相關課程。</p>
      </div>
    `,
  },
]

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
  <div>
    <Hero title="常見問答" />
    <section class="px:6x px:10vw@tablet px:22.5x@desktop">
      <Breadcrumb />
      <div ref="htmlEl" class="max-w:screen-md my:5x my:10x@tablet mx:auto flex flex:column gap:5x gap:10x@tablet">
        <div v-for="item in list" :key="item.sort" class="bg:#F2F9FA p:0!">
          <label class="flex pointer gap:2x p:5x|6x b1-r fg:primary flex ai:flex-start jc:space-between" :for="`faq-${item.sort}`">
            <div>{{ item.sort }}. {{ item.title }}</div>
            <div class="size:24">
              <Icon name="material-symbols-light:add" />
            </div>
          </label>
          <input :id="`faq-${item.sort}`" name="faq" :type="focusable ? `radio` : `checkbox`" class="hidden" />
          <div class="accordion-content :checked~{pb:5x}">
            <div class="px:5x">
              <hr class="bt:1|dashed|divider mb:5x" />
              <div class="flex gap:2x">
                <div v-html="item.desc"></div>
              </div>
            </div>
          </div>
          <SchemaOrgQuestion>
            <template #name>{{ item.title }}</template>
            <template #acceptedAnswer>{{ item.desc }}</template>
          </SchemaOrgQuestion>
        </div>
      </div>
    </section>
  </div>
</template>
