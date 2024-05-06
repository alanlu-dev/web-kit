<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'

const { data: courseEvents } = await useFetch<CourseEventSchemaType[]>('/api/course_event')
</script>

<template>
  <section class="flex flex:column py:5x py:10x@tablet">
    <h1 class="h1 title">課程資訊</h1>
    <section class="rel {my:10x}@tablet m:5x|15vw">
      <ClientOnly>
        <template #fallback>
          <div class="text:center"> loading </div>
        </template>
        <Splide
          :has-track="false"
          :options="{
            arrows: true,
            type: 'loop',
            perPage: 3,
            gap: '28px',
            snap: true,
            pagination: false,
            breakpoints: {
              1024: { perPage: 2 },
              600: { perPage: 1 },
            },
          }"
        >
          <div class="splide__arrows splide__arrows--ltr">
            <Button intent="secondary" class="splide__arrow splide__arrow--prev rounded! {size:11.5x!;left:-5em!}@2xs left:-2.5em! p:0! size:9x">
              <Icon icon="material-symbols-light:chevron-left" />
            </Button>
            <Button intent="secondary" class="splide__arrow splide__arrow--next rounded! {size:11.5x!;right:-5em!}@2xs p:0! right:-2.5em! size:9x">
              <Icon icon="material-symbols-light:chevron-right" />
            </Button>
          </div>
          <SplideTrack>
            <SplideSlide v-for="event in courseEvents" :key="event.ID" class="pb:0.5x! px:0.5x">
              <div class="text:center">
                <div class="center-content inline-flex flex:wrap gap:12x|11x mx:auto">
                  <nuxt-link class="bg:base-bg overflow:hidden r:2x scale(1.1):hover_img shadow:md" :to="`/course/${event.ID}`">
                    <div class="rel aspect:316/133 overflow:hidden">
                      <img class="abs full ~300ms|ease inset:0 object-fit:cover" :src="event.課程圖片連結" :alt="event.課程標題" />
                    </div>
                    <div class="p:2x|4x">
                      <div class="flex ai:center gap:2x jc:flex-start">
                        <Level :level="event.課程標籤" />
                        <p class="b1-b fg:font-title">{{ event.課程標題 }}</p>
                      </div>
                      <div class="flex ai:center jc:flex-start mt:2x">
                        <p class="nowrap">上課日期：</p>
                        <p>{{ event.上課日期?.start }}～{{ event.上課日期?.end }}</p>
                      </div>
                      <div class="flex ai:center jc:flex-start mt:2x">
                        <p class="nowrap">上課地點：</p>
                        <p>{{ event.教室名稱 }}</p>
                      </div>
                      <hr class="bg:#DBD9D9 h:1 mt:9x" />
                      <p class="h3 fg:accent! mt:2x text:right">NT$ {{ event.最終價格 ? formatThousand(event.最終價格) : '???' }} </p>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </SplideSlide>
          </SplideTrack>
        </Splide>
      </ClientOnly>
    </section>

    <div class="{mt:7.5x}@tablet mb:1.5x mt:6x text:center">
      <nuxt-link to="/course">
        <Icon icon="material-symbols-light:arrow-right-alt">更多課程</Icon>
      </nuxt-link>
    </div>
  </section>
</template>
