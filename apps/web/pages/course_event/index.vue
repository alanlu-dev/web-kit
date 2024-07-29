<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'

definePageMeta({
  title: '課程資訊',
  breadcrumb: {
    label: '課程資訊',
  },
})

useSeoMeta({
  title: '課程資訊',
})

const route = useRoute()

const query = ref(route.query)
watch(
  () => route.query,
  (val) => {
    query.value = val
  },
)

// TODO: 過濾之後的分頁

const { data: courseEvents } = await useFetch<CourseEventSchemaType[]>('/api/course_event', { query })
const { data: length } = await useFetch<number>('/api/news/length', { query })

const page = computed(() => Number(route.query.page || 1))
const total = computed(() => (length.value ? Math.ceil(length.value / 10) : 1))

const courseFilters = useState('courseFilters', () => ({
  category: '',
}))

const filterCourseEvents = computed(() => {
  if (courseFilters.value.category === '') return courseEvents.value
  return courseEvents.value?.filter((event) => event.課程標籤 === courseFilters.value.category) || []
})
</script>

<template>
  <div>
    <Hero title="課程資訊" />
    <Breadcrumb />

    <section>
      <div class="center-content flex@desktop hidden bg:#F2F9FA gap:5x mb:14x mx:auto px:6vw py:5x">
        <div class="rel {aspect:349/225;object:cover;w:full}_img aspect:349/225 overflow:hidden r:2x">
          <img src="/course1.png" alt="課程介紹" class="pointer-events:none user-select:none" />
          <div class="abs bottom left bg:linear-gradient(90deg,#304A55,#677D8633) fg:white p:2x|3x">
            <p class="b1-m">課堂上課</p>
            <p class="b2-r nowrap">教室講解建材特性</p>
          </div>
        </div>
        <img src="/arrow.svg" alt="箭頭" class="pointer-events:none size:40 user-select:none" />
        <div class="rel {aspect:349/225;object:cover;w:full}_img aspect:349/225 overflow:hidden r:2x">
          <img src="/course1.png" alt="課程介紹" class="pointer-events:none user-select:none" />
          <div class="abs bottom left bg:linear-gradient(90deg,#304A55,#677D8633) fg:white p:2x|3x">
            <p class="b1-m">樣品實作</p>
            <p class="b2-r nowrap">前往真實教室清潔練習</p>
          </div>
        </div>
        <img src="/arrow.svg" alt="箭頭" class="pointer-events:none size:40 user-select:none" />
        <div class="rel {aspect:349/225;object:cover;w:full}_img aspect:349/225 overflow:hidden r:2x">
          <img src="/course1.png" alt="課程介紹" class="pointer-events:none user-select:none" />
          <div class="abs bottom left bg:linear-gradient(90deg,#304A55,#677D8633) fg:white p:2x|3x">
            <p class="b1-m">實際演練</p>
            <p class="b2-r nowrap">至客戶案場，老師陪同作業</p>
          </div>
        </div>
      </div>
      <div class="mt:5x mt:6x@tablet px:6x px:10vw@tablet px:22.5x@desktop">
        <div class="max-w:screen-md mx:auto">
          <div class="inline-flex {flex;ai:center;jc:space-between;flex:row}@tablet flex:column gap:5x">
            <FormKit
              v-model="courseFilters.category"
              :classes="{ outer: { 'mb:0!': true } }"
              type="select"
              placeholder="分類"
              name="category"
              :options="[
                { value: '', label: '分類' },
                { value: '初階', label: '初階' },
                { value: '進階', label: '進階' },
              ]"
            />
            <p class="b1-r">共 {{ filterCourseEvents?.length }} 筆課程</p>
          </div>
          <div class="flex flex:column gap:8x mt:7x mt:3x@tablet">
            <nuxt-link
              v-for="event in filterCourseEvents"
              :key="event.ID"
              class="flex bg:base-bg flex:column flex:row@tablet overflow:hidden r:2x scale(1.1):hover_img shadow:md"
              :to="`/course_event/${event.ID}`"
            >
              <div class="rel {max-w:312;aspect:312/260}@tablet {max-w:387;aspect:387/260}@desktop aspect:342/133 flex:1 overflow:hidden">
                <img class="abs full ~300ms|ease inset:0 object-fit:cover" :src="event.課程圖片連結" :alt="event.課程標題" />
              </div>
              <div class="b2-r flex:1 p:3x|6x">
                <div class="flex ai:center gap:2x jc:flex-start">
                  <CourseLevel :level="event.課程標籤" />
                  <p class="b1-b fg:font-title">{{ event.課程標題 }}</p>
                  <p class="h3 block@tablet hidden nowrap fg:accent! ml:auto text:right">NT$ {{ event.最終價格 ? formatThousand(event.最終價格) : '???' }} </p>
                </div>

                <div class="flex ai:flex-start gap:1x jc:flex-start mt:2x">
                  <div class="center-content flex fg:font-title gap:1x">
                    <Iconify class="f:5x" icon="material-symbols-light:date-range-outline-rounded" />
                    <p class="nowrap">上課日期：</p>
                  </div>
                  <div class="flex ai:center flex:wrap jc:flex-start">
                    <span>{{ event.上課日期?.start }}</span>
                    <span>～</span>
                    <span>{{ event.上課日期?.end }}</span>
                  </div>
                </div>

                <div class="flex ai:flex-start gap:1x jc:flex-start mt:2x">
                  <div class="center-content flex fg:font-title gap:1x">
                    <Iconify class="f:5x" icon="material-symbols-light:location-on-outline" />
                    <p class="nowrap">上課地點：</p>
                  </div>
                  <div class="flex ai:center flex:wrap jc:flex-start">
                    <span>{{ event.教室名稱 }}</span>
                  </div>
                </div>

                <div class="flex ai:flex-start gap:1x jc:flex-start mt:2x">
                  <div class="center-content flex fg:font-title gap:1x">
                    <Iconify class="f:5x" icon="ph:user-thin" />
                    <p class="nowrap">報名人數：</p>
                  </div>
                  <div class="flex ai:center flex:wrap jc:flex-start">
                    <span>{{ event.報名人數 }} 名 / {{ event.名額限制 || '∞' }} 名</span>
                  </div>
                </div>

                <div class="flex ai:flex-start gap:1x jc:flex-start mt:2x">
                  <div class="center-content flex fg:font-title gap:1x">
                    <Iconify class="f:5x" icon="material-symbols-light:cleaning-services-outline-rounded" />
                    <p class="nowrap">課程內容：</p>
                  </div>
                  <div class="flex ai:center flex:wrap jc:flex-start">
                    <p class="lines:4">
                      🚧
                      課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容
                      課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容課程內容
                    </p>
                  </div>
                </div>

                <div class="hidden@tablet">
                  <hr class="bg:#DBD9D9 h:1 mt:3x" />
                  <p class="h3 fg:accent! mt:2x text:right">NT$ {{ event.最終價格 ? formatThousand(event.最終價格) : '???' }} </p>
                </div>
              </div>
            </nuxt-link>
          </div>
          <Pagination :page="page" :total="total" :range="1" />
        </div>
      </div>
    </section>
  </div>
</template>
