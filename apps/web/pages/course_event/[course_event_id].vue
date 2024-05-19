<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { NotionBlockType } from '@alanlu-dev/notion-api-zod-schema'
import type { CourseEventSchemaType } from '~/schema/course_event'
import type { CourseSchemaType } from '~/schema/course'

const route = useRoute()
const course_event_id = route.params.course_event_id

const { data: courseEvent } = await useFetch<{ page: CourseEventSchemaType; contents: NotionBlockType[] }>(`/api/course_event/${course_event_id}`)
const { data: course } = await useFetch<{ page: CourseSchemaType; contents: NotionBlockType[] }>(`/api/course/${courseEvent.value?.page?.課程}`)
const { data: courseEvents } = await useFetch<CourseEventSchemaType[]>('/api/course_event?page_size=2')

useSeoMeta({
  title: () => courseEvent.value?.page?.課程標題!,
})

const main = ref()
const thumbs = ref()

onMounted(() => {
  const thumbsSplide = thumbs.value?.splide

  if (thumbsSplide) {
    main.value?.sync(thumbsSplide)
  }
})

const show = ref(false)

async function submitHandler() {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000))
  show.value = true
}
</script>

<template>
  <section class="flex flex:column">
    <div class="p:5x p:10x@tablet">
      <Breadcrumb :title="courseEvent?.page?.課程標題" />
      <div class="max-w:screen-md mx:auto flex ai:flex-start jc:space-between gap:7.5x mt:5x">
        <div class="flex:2 overflow:hidden">
          <Splide
            aria-labelledby="封面"
            :options="{
              arrows: false,
              perPage: 1,
              gap: '1rem',
              pagination: false,
            }"
            ref="main"
          >
            <SplideSlide v-for="圖片 in course?.page?.課程照片" :key="圖片" class="{aspect:inherit;object:cover;w:full}_img aspect:280/140 r:2x overflow:hidden">
              <img :src="圖片" />
            </SplideSlide>
          </Splide>

          <div class="rel">
            <Splide
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
              ref="thumbs"
              class="mt:5x"
            >
              <SplideSlide v-for="圖片 in course?.page?.課程照片" :key="圖片" class="{aspect:inherit;object:cover;w:full}_img aspect:280/140 r:2x overflow:hidden">
                <img :src="圖片" />
              </SplideSlide>
            </Splide>
            <div class="abs bg:linear-gradient(to|left,base-bg/0,base-bg) bottom:0 left:-1 pointer-events:none top:0 w:1rem z:1"> </div>
            <div class="abs bg:linear-gradient(to|right,base-bg/0,base-bg) bottom:0 pointer-events:none right:-1 top:0 w:1rem z:1"> </div>
          </div>

          <div class="mt:10x">
            <h3 class="h3 fg:font-title">課程內容🚧</h3>
            <NotionRender class="mt:3x" :blocks="course?.contents" />
          </div>

          <div class="mt:10x bg:#F2F9FA p:7x|6x" v-for="item in course?.page?.講師資訊" :key="item">
            <h3 class="h3 fg:font-title">講師介紹🚧</h3>
            <div class="flex center-content gap:6x">
              <div class="flex:2 mt:3x">
                <p class="lines:1"
                  ><span>講師姓名：</span><span>{{ item }}</span></p
                >
                <p class="mt:3x">
                  講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹講師介紹
                </p>
              </div>
              <div class="flex:1 {aspect:inherit;object:cover;w:full}_img aspect:250/271">
                <img src="/course1.png" alt="課程介紹" class="pointer-events:none user-select:none" />
              </div>
            </div>
          </div>

          <div class="mt:10x">
            <h3 class="h3 fg:font-title">你可能有興趣的課程</h3>
            <div class="rel">
              <Splide
                :options="{
                  arrows: false,
                  pagination: false,
                  autoWidth: true,
                  gap: '0.75rem',
                }"
                class="mt:3x"
              >
                <SplideSlide v-for="event in courseEvents" :key="event.ID" class="pb:0.5x! px:0.5x">
                  <CourseCard :event="event" />
                </SplideSlide>
              </Splide>
              <!-- <div
                class="abs bg:linear-gradient(to|left,base-bg/0,base-bg) bottom:0 left:-1 pointer-events:none top:0 w:1rem z:1">
              </div> -->
              <div class="abs bg:linear-gradient(to|right,base-bg/0,base-bg) bottom:0 pointer-events:none right:-1 top:0 w:1rem z:1"> </div>
            </div>
          </div>

          <div class="mt:10x text:center">
            <nuxt-link to="/course_event">
              <Iconfiy icon="material-symbols-light:arrow-right-alt">返回列表</Iconfiy>
            </nuxt-link>
          </div>
        </div>

        <div class="bg:base-bg p:5x|6x shadow:all w:full flex:1 fixed bottom left {sticky;top:82;left:unset;bottom:unset}@desktop z:nav">
          <div class="flex jc:flex-start flex:column ai:flex-start {flex:row!;ai:center!}@tablet&<desktop gap:3x">
            <h2 class="h2">{{ courseEvent?.page?.課程標題 }}</h2>
            <hr class="h:1 bg:#C9C9C9 w:full hidden@tablet&<desktop" />
            <CourseLevel :level="courseEvent?.page?.課程標籤" />
          </div>
          <div class="mt:2x>p mt:3x>p@desktop">
            <p
              ><span>上課日期：</span><span>{{ courseEvent?.page?.上課日期?.start }}</span></p
            >
            <p
              ><span>結訓日期：</span><span>{{ courseEvent?.page?.上課日期?.end }}</span></p
            >
            <p
              ><span>課程地點：</span><span>{{ courseEvent?.page?.教室名稱 }}</span></p
            >
          </div>

          <div class="{abs;right:5x;bottom:5x}@tablet&<desktop">
            <div class="mt:5x text:right@tablet&<desktop">
              <p class="h2 fg:accent!">NT$ {{ courseEvent?.page?.最終價格 ? formatThousand(courseEvent?.page?.最終價格) : '???' }} </p>
            </div>
            <Button intent="primary" class="mt:5x w:full w:150!@tablet&<desktop" @click="show = true">立即報名</Button>
          </div>

          <Modal v-model="show" title="成功送出！" @confirm="() => (show = false)">
            <p>🚧 TODO 🚧</p>
          </Modal>
        </div>
      </div>
    </div>
  </section>
</template>
