<script setup lang="ts">
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
const router = useRouter()

const common = useCommonStore()
const activeBreakpoint = common.breakpoints.active()

const page_size = computed(() => (activeBreakpoint.value === 'mobile' ? 5 : activeBreakpoint.value === 'tablet' ? 6 : 9))

interface QueryType {
  page?: number
  page_size: number
}
const query = ref<QueryType>({ ...route.query, page_size: page_size.value })
watch(
  () => route.query,
  (val) => {
    query.value = { ...val, page_size: page_size.value }
  },
)

// TODO: 過濾之後的分頁

const { data: courseEvents } = await useFetch<CourseEventSchemaType[]>('/api/course_event', { query })
const { data: length } = await useFetch<number>('/api/course_event/length', { query })

const total = computed(() => (length.value ? Math.ceil(length.value / page_size.value) : 1))
const page = computed(() => {
  const currentPage = Number(route.query.page || 1)
  return currentPage > total.value ? total.value : currentPage
})

// const courseFilters = useState('courseFilters', () => ({
//   category: '',
// }))

// const filterCourseEvents = computed(() => {
//   if (courseFilters.value.category === '') return courseEvents.value
//   return courseEvents.value?.filter((event) => event.課程標籤 === courseFilters.value.category) || []
// })

watch(
  () => page.value,
  (newPage) => {
    router.push({ query: { ...route.query, page: newPage } })
  },
)
</script>

<template>
  <div>
    <Hero title="課程資訊 🚧" />
    <Breadcrumb />

    <section class="max-w:screen-max mx:auto px:6x px:10x@tablet" data-aos="fade-up">
      <div class="center-content flex flex:column flex:row@desktop gap:15x py:8x">
        <div>
          <h2 class="h2 title flex fg:font-title flex:column">
            <span>不限入行門檻,</span>
            <span>滿足不同階段學習需求🚧</span>
          </h2>
        </div>
        <div>
          <div class="{f:16x}_svg {bg:#FAFAFA;p:6x|3x;flex;center-content;gap:3x}>div gap:5x grid-cols:2">
            <div>
              <div>
                <Icon name="hugeicons:money-bag-02" />
              </div>
              <p class="b2-r flex flex:column">
                <span>想開啟斜槓人生,</span>
                <span>創造自己的多元收入之路!</span>
              </p>
            </div>

            <div>
              <div>
                <Icon name="fluent:prompt-16-regular" />
              </div>
              <p class="b2-r flex flex:column">
                <span>想精進自己的專業技能,</span>
                <span>晉升家事職人!</span>
              </p>
            </div>
            <div>
              <div>
                <Icon name="material-symbols-light:mop-outline" />
              </div>
              <p class="b2-r flex flex:column">
                <span>想學習高效技巧,</span>
                <span>為自己愛家維持居家整潔!</span>
              </p>
            </div>
            <div>
              <div>
                <Icon name="clarity:tools-line" />
              </div>
              <p class="b2-r flex flex:column">
                <span>想轉換跑道、二度就業,</span>
                <span>尋找新的職涯方向</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg:home mb:14x mx:auto p:15x">
      <div data-aos="fade-up" data-aos-delay="200">
        <h2 class="h2 title fg:font-title">獨家課程安排三步驟,不藏私教學助你快速出班 🚧</h2>
        <div class="center-content flex@desktop hidden gap:5x mt:10x">
          <div class="rel {aspect:349/225;object:cover;w:full}_img aspect:349/225 overflow:hidden r:2x">
            <nuxt-img src="/course_event/course1.png" alt="課程介紹" class="pointer-events:none user-select:none" />
            <div class="abs bottom left bg:linear-gradient(90deg,#304A55,#677D8633) fg:white p:2x|3x">
              <p class="b1-m">課堂上課</p>
              <p class="b2-r nowrap">教室講解建材特性</p>
            </div>
          </div>
          <nuxt-img src="/course_event/arrow.svg" alt="箭頭" class="pointer-events:none size:40 user-select:none" />
          <div class="rel {aspect:349/225;object:cover;w:full}_img aspect:349/225 overflow:hidden r:2x">
            <nuxt-img src="/course_event/course1.png" alt="課程介紹" class="pointer-events:none user-select:none" />
            <div class="abs bottom left bg:linear-gradient(90deg,#304A55,#677D8633) fg:white p:2x|3x">
              <p class="b1-m">樣品實作</p>
              <p class="b2-r nowrap">前往真實教室清潔練習</p>
            </div>
          </div>
          <nuxt-img src="/course_event/arrow.svg" alt="箭頭" class="pointer-events:none size:40 user-select:none" />
          <div class="rel {aspect:349/225;object:cover;w:full}_img aspect:349/225 overflow:hidden r:2x">
            <nuxt-img src="/course_event/course1.png" alt="課程介紹" class="pointer-events:none user-select:none" />
            <div class="abs bottom left bg:linear-gradient(90deg,#304A55,#677D8633) fg:white p:2x|3x">
              <p class="b1-m">實際演練</p>
              <p class="b2-r nowrap">至客戶案場，老師陪同作業</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt:5x mt:6x@tablet px:6x px:10vw@tablet px:22.5x@desktop" data-aos="fade-up">
        <div class="max-w:screen-md mx:auto">
          <h1 class="h1 title fg:font-title">所有課程</h1>
          <!-- <div class="inline-flex {flex;ai:center;jc:space-between;flex:row}@tablet flex:column gap:5x my:5x">
            <div></div>
            <FormKit v-model="courseFilters.category" :classes="{ outer: { 'mb:0!': true } }" type="select"
              placeholder="分類" name="category" :options="[
                { value: '', label: '分類' },
                { value: '初階', label: '初階' },
                { value: '進階', label: '進階' },
              ]" />
            <p class="b1-r">共 {{ courseEvents?.length }} 堂課程</p>
          </div> -->
          <p class="b1-r my:5x text:right">共 {{ courseEvents?.length }} 堂課程</p>
          <div class="{grid-cols:1;gap:5x} {grid-cols:2;gap:10x|5x}@tablet {grid-cols:3;gap:10x|15x}@desktop">
            <CourseCard v-for="event in courseEvents" :key="event.ID" :event="event" />
          </div>
          <Pagination :page="page" :total="total" :range="1" />
        </div>
      </div>
    </section>
  </div>
</template>
