<script setup lang="ts">
import type { FaqSchemaType } from '~/schema/faq'

const focusable = ref(true)

const route = useRoute()
const { data: list } = await useFetch<FaqSchemaType[]>('/api/faq', {
  query: {
    ...route.query,
    page_size: 3,
  },
})
</script>

<template>
  <section class="rel">
    <div class="max-w:screen-max mx:auto px:6x px:10x@desktop py:10x text:center">
      <h1 class="h1 title fg:font-title">常見問答</h1>

      <div class="flex flex:column gap:5x max-w:screen-main mt:5x mx:auto px:10x@desktop text:left">
        <div v-for="item in list" :key="item.排序!" class="bg:home p:0!">
          <label class="pointer b1-r flex ai:flex-start fg:primary gap:2x jc:space-between p:5x|6x" :for="`faq-${item.排序}`">
            <div>{{ item.排序 }}. {{ item.問題 }}</div>
            <div class="size:24">
              <Iconify icon="material-symbols-light:add" />
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

      <nuxt-link to="/faq" class="block mt:5x text:center">
        <Iconify icon="material-symbols-light:arrow-right-alt">更多問答</Iconify>
      </nuxt-link>
    </div>
  </section>
</template>
