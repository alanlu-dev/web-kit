<script setup lang="ts">
import type { FormKitOptionsProp } from '@formkit/inputs'
import type { Splide, Options as SplideOptions } from '@splidejs/splide'
import { formatThousand } from '@alanlu-dev/utils'
import { addDay } from '@formkit/tempo'
import type { CourseSchemaType } from '~/schema/course'

const route = useRoute()
const id = route.params.id

const { data: course } = await useApiFetch<CourseSchemaType>(`/api/course/${id}`, { query: route.query })

const metaStore = useMetaStore()
metaStore.updateMeta(route.fullPath, {
  標題: course.value?.名稱,
  描述: course.value?.課程基礎資訊?.課程特色.join('、'),
  圖片: course.value?.課程照片[0],
})

const eventFormDate = ref<{ event: number }>({
  event: course.value?.課程型態 === '免費課程' ? course.value?.課程場次資訊?.[0]?.ID || 0 : 0,
})

const eventOptions = computed<FormKitOptionsProp>(() =>
  !course.value?.課程場次資訊?.length
    ? [{ label: '尚無課程場次', value: 0, attrs: { disabled: true } }]
    : [
        { label: '請選擇場次', value: 0 },
        ...course.value.課程場次資訊!.map((event) => {
          const limit = event?.指定名額限制 ? event?.指定名額限制 : event?.教室資訊?.名額限制 || 0
          const currentCount = event?.報名人數 || 0

          // 過期七天
          const expirationDate = event && event.上課日期 && event.上課日期[2] ? addDay(event.上課日期[2], -7) : new Date(-8640000000000000)

          const disabled = event?.已完課 || currentCount >= limit || new Date() >= expirationDate
          const label = `${disabled ? '【完售】' : ''} ${event?.教室資訊?.所屬場地} ${event?.上課日期?.[0]} ${event?.上課日期?.[1]}`
          return { label, value: event?.ID, attrs: { disabled } }
        }),
      ],
)

const targetEvent = computed(() => course.value?.課程場次資訊?.find((event) => event?.ID === eventFormDate.value.event))

const splideOptions: SplideOptions = {
  arrows: false,
  autoplay: false,
  interval: 4000,
  type: 'loop',
}

function onSplideMounted(splide: Splide) {
  // 修復 type=loop 會造成的 圖片位移錯誤
  nextTick(() => {
    splide.Components.Pagination.items[0].button.click()
  })
}
</script>

<template>
  <div>
    <Breadcrumb :title="course?.名稱" />
    <section class="{max-w:screen-max;mx:auto}" data-aos="fade-up ">
      <div class="{flex;ai:flex-start;jc:space-between;flex:wrap} {gap:7.5x}@desktop mt:5x text:center">
        <div class="{flex;flex:col;gap:5x} {pr:0;pl:10x}@md flex:1 overflow:hidden px:6x">
          <div class="mx:auto w:90%@tablet w:80%@desktop">
            <template v-if="course?.畫廊 === null || !course?.畫廊?.length">
              <VideoPlayerCover aspect="16/9" class="r:2x" :img="course?.課程照片[0]" :alt="course?.名稱" />
            </template>
            <template v-else-if="course?.畫廊.length === 1">
              <VideoPlayerCover aspect="16/9" class="r:2x" :img="course?.畫廊?.[0]?.image" :alt="course?.畫廊?.[0]?.alt" />
            </template>
            <template v-else>
              <ClientOnly>
                <template #fallback>
                  <VideoPlayerCover aspect="16/9" class="r:2x" :img="course?.畫廊?.[0]?.image" :alt="course?.畫廊?.[0]?.alt" />
                </template>
                <Splide :options="splideOptions" @splide:mounted="onSplideMounted">
                  <SplideSlide v-for="item in course?.畫廊" :key="item?.image || item?.video">
                    <VideoPlayerCover aspect="16/9" :video="item?.video" class="r:2x" :img="item?.image" :alt="item?.alt" />
                  </SplideSlide>
                </Splide>
              </ClientOnly>
            </template>
          </div>

          <div class="bg:#FAFAFA p:6x|10x r:2x text:left">
            <h3 class="h3 rel {abs;middle;left:0;content:'';w:1.5x;bg:primary}::before fg:primary jc:stretch pl:3.5x"> 關於課程</h3>
            <div class="b1-r {flex;flex:col;gap:5x;flex:wrap} {flex:row}@xs flex:1>div mt:3x">
              <div>
                <p>課程大綱：</p>
                <div class="b1-r mt:2x mt:3x@xs pl:0.5x@xs">
                  <List root-key="課程大綱" :list="course?.課程基礎資訊?.課程大綱" />
                </div>
              </div>
              <div>
                <p>結業獲得：</p>
                <div class="b1-r mt:2x mt:3x@xs pl:0.5x@xs">
                  <List root-key="結業獲得" :list="course?.課程基礎資訊?.結業獲得" />
                </div>
              </div>
            </div>

            <div class="{grid-cols:3;gap:5x} mt:10x text:center">
              <div>
                <p>課程時長</p>
                <div class="round {flex;flex:col;center-content} bg:white max-w:30x mt:1x mx:auto">
                  <p class="h1 title fg:primary"> {{ course?.課程基礎資訊?.課程時長 || 0 }} </p>
                  <p>小時</p>
                </div>
              </div>
              <div>
                <p>單元數</p>
                <div class="round {flex;flex:col;center-content} bg:white max-w:30x mt:1x mx:auto">
                  <p class="h1 title fg:primary"> {{ course?.課程基礎資訊?.單元數 || 0 }} </p>
                  <p>單元</p>
                </div>
              </div>
              <div>
                <p>結業人數</p>
                <div class="round {flex;flex:col;center-content} bg:white max-w:30x mt:1x mx:auto">
                  <p class="h1 title fg:primary"> {{ course?.結業人數 || 0 }} </p>
                  <p>人</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg:#FAFAFA p:6x|10x r:2x text:left">
            <h3 class="h3 rel {abs;middle;left:0;content:'';w:1.5x;bg:primary}::before fg:primary jc:stretch pl:3.5x"> 在這堂課，你可以學到 </h3>
            <div class="b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
              <List root-key="可以學到" :list="course?.課程基礎資訊?.可以學到" />
            </div>
          </div>

          <div class="bg:#FAFAFA p:6x|10x r:2x text:left">
            <h3 class="h3 rel {abs;middle;left:0;content:'';w:1.5x;bg:primary}::before fg:primary jc:stretch pl:3.5x"> 上課前的準備</h3>
            <div class="b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
              <List root-key="課前準備" :list="course?.課程基礎資訊?.課前準備" />
            </div>
          </div>

          <div class="bg:#FAFAFA p:6x|10x r:2x text:left">
            <h3 class="h3 rel {abs;middle;left:0;content:'';w:1.5x;bg:primary}::before fg:primary jc:stretch pl:3.5x"> 關於講師</h3>
            <InstructorCard v-for="instructor in course?.可授課講師資訊" :key="instructor?.ID" :instructor="instructor!" />
            <!-- <CourseInstructorCard v-for="instructor in course?.可授課講師資訊" :key="instructor?.ID" :instructor="instructor!" /> -->
          </div>

          <nuxt-link to="/course" class="inline-block mb:5x mx:auto text:center">
            <Iconify icon="material-symbols-light:arrow-right-alt">返回列表</Iconify>
          </nuxt-link>
        </div>

        <div class="{sticky;bottom;left} {top:calc(74+2x);left:unset;bottom:unset;max-w:screen-tablet;mb:4x;mr:10x;r:2x}@desktop bg:base-bg p:5x|6x shadow:all text:left w:full z:nav">
          <input id="Registration" name="Registration" type="checkbox" class="hidden {accordion-content--open}:checked~div_.accordion-content" />
          <h2 class="h3 fg:font-title">{{ course?.名稱 }}</h2>
          <hr class="bg:#C9C9C9 h:1 mt:2x w:full" />
          <div class="accordion-content {accordion-content--open}@desktop">
            <div>
              <div class="{flex;flex:col;ai:flex-start;jc:flex-start}">
                <ul class="b1-r {flex;flex:col;gap:2x} {gap:3x}@desktop my:9x">
                  <li v-for="(item, idx) in course?.課程基礎資訊?.課程特色" :key="`課程特色-${idx}`" class="{flex;gap:2x}">
                    <span class="fg:#3C8922">
                      <Icon name="octicon:check-16" />
                    </span>
                    <span> {{ item }}</span>
                  </li>
                </ul>
              </div>

              <div class="{flex;ai;flex:col;flex-end;jc:space-between;gap:5x;flex:wrap}">
                <FormKit v-if="course?.課程型態 !== '免費課程'" v-model="eventFormDate" type="form" :actions="false" form-class="{p:1x}>.formkit-outer">
                  <FormKit type="select" name="event" :options="eventOptions" />
                </FormKit>
                <template v-if="targetEvent">
                  <div v-if="course?.課程型態 !== '免費課程'" class="b1-r {flex;flex:col;gap:2x} {gap:3x}@desktop">
                    <p>
                      <span class="fg:font-title">上課日期：</span>
                      <span>{{ targetEvent?.上課日期?.[0] }}</span>
                    </p>
                    <p>
                      <span class="fg:font-title">上課時間：</span>
                      <span>{{ targetEvent?.上課日期?.[1] }}</span>
                    </p>
                    <p>
                      <span class="fg:font-title">上課地點：</span>
                      <span>{{ targetEvent?.教室資訊?.地址 }}</span>
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="h2 my:20">
            <p v-if="targetEvent?.指定價格" class="nowrap">
              <span class="b1-r fg:divider mr:2x text:line-through">NT$ {{ formatThousand(course?.價格) }}</span>
              <span class="fg:accent">NT$ {{ formatThousand(targetEvent?.指定價格) }}</span>
            </p>
            <p v-else class="fg:accent">NT$ {{ formatThousand(course?.價格) }} </p>
          </div>
          <div class="block@desktop hidden :checked~{block!} mt:5x">
            <NuxtLink v-if="targetEvent?.ID" :to="`/checkout/${targetEvent?.ID}`" class="btn btn--primary w:full"> 立即報名 </NuxtLink>
            <button v-else disabled class="btn btn--primary cursor:no-drop opacity:.5 w:full"> 立即報名 </button>
          </div>
          <label for="Registration" class="hidden@desktop {flex;center-content}">
            <Iconify class="btn btn--primary hidden@desktop :checked~label_{hidden} w:full" icon="material-symbols-light:keyboard-arrow-up"> 展開課程資訊 </Iconify>
            <Iconify class="hidden! hidden!@desktop :checked~label_{block!} pb:0!" icon="material-symbols-light:keyboard-arrow-down">收回面板</Iconify>
          </label>
        </div>
      </div>
    </section>
  </div>
</template>
