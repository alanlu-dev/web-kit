<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'

const route = useRoute()
const course_event_id = route.params.course_event_id

const { data: courseEvent } = await useFetch<CourseEventSchemaType>(`/api/course_event/${course_event_id}`, { query: route.query })

useSeoMeta({
  title: () => courseEvent.value?.課程?.課程名稱 || '課程資訊',
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
  <div>
    <Breadcrumb :title="courseEvent?.課程?.課程名稱" />

    <section class="{max-w:screen-max;mx:auto}" data-aos="fade-up ">
      <div class="{flex;ai:flex-start;jc:space-between;flex:wrap} {gap:7.5x}@desktop mt:5x text:center">
        <div class="{pr:0;pl:10x}@md flex:1 overflow:hidden px:6x">
          <div>
            <VideoPlayerCover aspect="622/380" :video="courseEvent?.課程?.影音連結" class="r:2x" :img="courseEvent?.課程?.課程照片?.[0]" />
          </div>

          <div class="mt:5x text:left">
            <p class="b1-m flex {content:'';w:1.5x;bg:font-title/.2;list-item;h:full;mr:2x}::before fg:primary">關於課程</p>
            <div v-if="courseEvent?.課程?.課程大綱資訊?.length" class="mt:4x mt:7x@tablet">
              <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                <ul>
                  <li v-for="item in courseEvent?.課程?.課程大綱資訊" :key="item?.PAGE_ID">{{ item?.課程大綱 }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- <div v-for="item in course?.page?.講師" :key="item" class="bg:home mt:10x p:7x|6x text:left">
            <h3 class="h3 fg:font-title">講師介紹🚧</h3>
            <div class="{flex;center-content;gap:6x}">
              <div class="flex:2 mt:3x">
                <p class="lines:1"
                  ><span>講師姓名：</span><span>{{ item }}</span></p
                >
                <p class="mt:3x">
                  講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹
                </p>
              </div>
              <div class="{aspect:inherit;object:cover}_img aspect:250/271 flex:1">
                <nuxt-img src="/course1.png" alt="課程介紹" class="pointer-events:none user-select:none" />
              </div>
            </div>
          </div> -->

          <nuxt-link to="/course_event" class="inline-block mx:auto my:5x text:center">
            <Iconify icon="material-symbols-light:arrow-right-alt">返回列表</Iconify>
          </nuxt-link>
        </div>

        <div class="{sticky;bottom;left} {top:82;left:unset;bottom:unset;max-w:screen-tablet;mr:10x;r:2x}@desktop bg:base-bg p:5x|6x shadow:all text:left w:full z:nav">
          <div class="{flex;flex:col;ai:flex-start;jc:flex-start;gap:3x} {flex:row!;ai:center!}@tablet&<desktop">
            <h2 class="h2">{{ courseEvent?.課程?.課程名稱 }}</h2>
            <hr class="hidden@tablet&<desktop bg:#C9C9C9 h:1 w:full" />
            <CourseLevel :level="courseEvent?.課程?.標籤" />
          </div>

          <div class="{flex;ai:flex-start;jc:space-between;gap:5x;flex:wrap} mt:2x">
            <div class="{flex;flex:col;gap:2x} {gap:3x}@desktop">
              <p>
                <span>上課日期：</span>
                <span>{{ courseEvent?.上課日期?.start }}</span>
              </p>
              <p>
                <span>結訓日期：</span>
                <span>{{ courseEvent?.上課日期?.end || courseEvent?.上課日期?.start }}</span>
              </p>
              <p>
                <span>課程地點：</span>
                <span>{{ courseEvent?.教室?.名稱 }}</span>
              </p>
            </div>

            <div class="flex-basis:30%@tablet&<desktop w:full">
              <p class="h2 nowrap fg:accent text:right@tablet&<desktop">NT$ {{ formatThousand(courseEvent?.指定價格 || courseEvent?.課程?.價格 || 99999) }} </p>
              <NuxtLink :to="`/checkout?course_event_id=${course_event_id}`" class="btn btn--primary mt:5x mt:4x@tablet&<desktop w:full">立即報名</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
