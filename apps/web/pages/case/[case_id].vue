<script setup lang="ts">
import type { NotionBlockType } from '@alanlu-dev/notion-api-zod-schema'
import type { CaseSchemaType } from '~/schema/case'

const route = useRoute()
const case_id = route.params.case_id

const { data: item } = await useFetch<{ page: CaseSchemaType; contents: NotionBlockType[] }>(`/api/case/${case_id}`)

useSeoMeta({
  title: () => item.value?.page?.標題 || '實績案例',
})

const main = ref()
const thumbs = ref()

onMounted(() => {
  const thumbsSplide = thumbs.value?.splide

  if (thumbsSplide) {
    main.value?.sync(thumbsSplide)
  }
})
</script>

<template>
  <section class="flex flex:column p:10x|6x">
    <Breadcrumb :title="item?.page?.標題" />
    <div class="max-w:screen-md mx:auto w:full">
      <CaseTag :tag="item?.page?.分類" />
      <h1 class="h1 title-left fg:font-content! mt:3x">{{ item?.page?.標題 }}</h1>
      <Splide
        ref="main"
        aria-labelledby="封面"
        :options="{
          arrows: false,
          perPage: 1,
          gap: '1rem',
          pagination: false,
        }"
        class="mt:5x"
      >
        <SplideSlide v-for="圖片 in item?.page?.封面" :key="圖片" class="{aspect:inherit;object:cover;w:full}_img aspect:280/140 overflow:hidden r:2x">
          <img :src="圖片" />
        </SplideSlide>
      </Splide>

      <div class="rel">
        <Splide
          ref="thumbs"
          :has-track="false"
          :options="{
            rewind: true,
            pagination: false,
            perPage: 2.5,
            gap: '1rem',
            cover: true,
            focus: 'center',
            isNavigation: true,
            updateOnMove: true,
          }"
          class="mt:5x"
        >
          <div class="splide__arrows splide__arrows--ltr">
            <Button intent="secondary" class="splide__arrow splide__arrow--prev rounded! {size:11.5x!}@2xs p:0! size:9x">
              <Iconfiy icon="material-symbols-light:chevron-left" />
            </Button>
            <Button intent="secondary" class="splide__arrow splide__arrow--next rounded! {size:11.5x!}@2xs p:0! size:9x">
              <Iconfiy icon="material-symbols-light:chevron-right" />
            </Button>
          </div>
          <SplideTrack>
            <SplideSlide v-for="圖片 in item?.page?.封面" :key="圖片" class="{aspect:inherit;object:cover;w:full}_img aspect:280/140 overflow:hidden r:2x">
              <img :src="圖片" />
            </SplideSlide>
          </SplideTrack>
        </Splide>
        <div class="abs bg:linear-gradient(to|left,base-bg/0,base-bg) bottom:0 left:-1 pointer-events:none top:0 w:1rem z:1"> </div>
        <div class="abs bg:linear-gradient(to|right,base-bg/0,base-bg) bottom:0 pointer-events:none right:-1 top:0 w:1rem z:1"> </div>
      </div>

      <NotionRender class="mt:10x" :blocks="item?.contents" />

      <div class="aspect:16/9 mt:20x w:full">
        <iframe
          class="full"
          :src="item?.page?.影音連結"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <div class="mt:20x text:center">
      <nuxt-link to="/case">
        <Iconfiy icon="material-symbols-light:arrow-right-alt">返回列表</Iconfiy>
      </nuxt-link>
    </div>
  </section>
</template>
