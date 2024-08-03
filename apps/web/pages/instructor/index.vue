<script setup lang="ts">
import type { InstructorSchemaType } from '~/schema/instructor'

definePageMeta({
  title: '師資陣容',
  breadcrumb: {
    label: '師資陣容',
  },
})

useSeoMeta({
  title: '師資陣容',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      // item is the url and will be resolved to the absolute url
      { name: '首頁', item: '/' },
      // item is not required for the last list element
      { name: '師資陣容' },
    ],
  }),
])

const route = useRoute()
const { data: instructors } = await useFetch<InstructorSchemaType[]>('/api/instructor', { query: { ...route.query, page_size: 99 } })

// https://www.ripple-ui.com/docs/components/accordion
// Accordion on click will collapse the other open accordions
const focusable = ref(false)
</script>

<template>
  <div>
    <Hero title="師資陣容" />
    <Breadcrumb />

    <section class="mb:10x mb:20x@tablet px:6x px:10x@desktop" data-aos="fade-up">
      <div class="{max-w:screen-main;mx:auto}">
        <div v-for="instructor in instructors" :key="instructor.ID" class="{block;content:'';h:1;bg:divider;w:full;my:5x}::after {my:10x}::after@tablet {hidden}:last::after my:5x">
          <div class="{flex;flex:col} {flex:row;gap:10x}@tablet">
            <div class="flex:1">
              <div class="{aspect:inherit;object:cover}_img aspect:382/262 overflow:hidden r:2x">
                <nuxt-img :src="instructor.照片[0]" alt="講師" class="~300ms|ease pointer-events:none user-select:none" />
              </div>
              <h2 class="h2 fg:primary mt:3x">{{ instructor.名稱 }} {{ instructor.英文名 }}</h2>
              <h3 class="h3 mt:1x">{{ instructor.頭銜 }}</h3>
              <div class="list b1-r mt:4x">
                <ul>
                  <li>{{ instructor.工作經驗 }} 年收納工作經驗</li>
                  <li>{{ instructor.工作經驗 }} 年教學經驗</li>
                </ul>
              </div>
            </div>
            <div class="flex:2">
              <input :id="`i-${instructor.ID}`" name="i" :type="focusable ? `radio` : `checkbox`" class="hidden" />
              <div class="accordion-content {accordion-content--open}@tablet">
                <div>
                  <div class="b1-m bg:home fg:primary mt:4x mt:0@tablet p:5x|6x r:5x">
                    {{ instructor.標語 }}
                  </div>

                  <div v-if="instructor.專業認證資訊?.length" class="mt:4x mt:7x@tablet">
                    <p class="b1-m flex {content:'';w:1.5x;bg:font-title/.2;list-item;h:full;mr:2x}::before fg:font-title"> 專業認證</p>
                    <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                      <ul>
                        <li v-for="item in instructor.專業認證資訊" :key="item?.ID">{{ item?.專業認證 }}</li>
                      </ul>
                    </div>
                  </div>

                  <div v-if="instructor?.服務經驗" class="mt:4x mt:7x@tablet">
                    <p class="b1-m flex {content:'';w:1.5x;bg:font-title/.2;list-item;h:full;mr:2x}::before fg:font-title"> 服務經驗</p>
                    <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                      {{ instructor?.服務經驗 }}
                    </div>
                  </div>

                  <div v-if="instructor.受邀講座資訊?.length" class="mt:4x mt:7x@tablet">
                    <p class="b1-m flex {content:'';w:1.5x;bg:font-title/.2;list-item;h:full;mr:2x}::before fg:font-title"> 受邀講座</p>
                    <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                      <ul>
                        <li v-for="item in instructor.受邀講座資訊" :key="item?.ID">{{ item?.受邀講座 }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <label :for="`i-${instructor.ID}`" class="block hidden@tablet :checked~{block!}>.close :checked~{hidden}>.open mt:2x text:center">
                <Iconify class="open" icon="material-symbols-light:keyboard-arrow-down">展開詳細介紹</Iconify>
                <Iconify class="close hidden!" icon="material-symbols-light:keyboard-arrow-up">收合詳細介紹</Iconify>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
