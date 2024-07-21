<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { NotionBlockType } from '@alanlu-dev/notion-api-zod-schema'
import type { CourseEventSchemaType } from '~/schema/course_event'

const route = useRoute()
const course_event_id = route.query.course_event_id

const { data: courseEvent } = await useFetch<{ page: CourseEventSchemaType; contents: NotionBlockType[] }>(`/api/course_event/${course_event_id}`, { query: route.query })

useSeoMeta({
  title: () => courseEvent.value?.page?.課程標題 || '結帳成功',
})
</script>

<template>
  <section class="flex flex:column">
    <div class="pt:5x pt:10x@tablet px:6x">
      <div class="max-w:screen-md mt:5x mx:auto text:center">
        <div class="bg:#F2F9FA px:7.5x py:10x r:2x">
          <div class="fg:primary">
            <Iconify icon="material-symbols-light:check-circle-rounded" class="f:65 f:134@tablet" />
            <h1 class="h1">報名成功！</h1>
          </div>
          <div class="max-w:710 mx:auto">
            <p class="b1-r mt:5x text:left text:center@tablet">您好，您已報名完成，以下為報名詳細資訊</p>
            <div class="b2-r flex bg:base-bg flex:column gap:5x mt:5x p:5x px:11x@tablet r:2x">
              <div class="flex ai:flex-start gap:1x jc:flex-start">
                <p class="nowrap fg:font-title">訂單編號：</p>
                <div class="flex ai:center flex:wrap jc:flex-start">
                  <span>{{ `TODO` }}</span>
                </div>
              </div>

              <div class="flex ai:flex-start gap:1x jc:flex-start">
                <p class="nowrap fg:font-title">課程名稱：</p>
                <div class="flex ai:center flex:wrap jc:flex-start">
                  <span>{{ courseEvent?.page.課程標題 }}</span>
                </div>
              </div>

              <div class="flex ai:flex-start gap:1x jc:flex-start">
                <p class="nowrap fg:font-title">上課日期：</p>
                <div class="flex ai:center flex:wrap jc:flex-start">
                  <span>{{ courseEvent?.page.上課日期?.start }}</span>
                  <span>～</span>
                  <span>{{ courseEvent?.page.上課日期?.end }}</span>
                </div>
              </div>

              <div class="flex ai:flex-start gap:1x jc:flex-start">
                <p class="nowrap fg:font-title">上課地點：</p>
                <div class="flex ai:center flex:wrap jc:flex-start">
                  <span>{{ courseEvent?.page.教室名稱 }}</span>
                </div>
              </div>

              <div class="flex ai:flex-start gap:1x jc:flex-start">
                <p class="nowrap fg:font-title">付款方式：</p>
                <div class="flex ai:center flex:wrap jc:flex-start">
                  <span>{{ `信用卡一次付清` }}</span>
                </div>
              </div>

              <div class="flex ai:flex-start gap:1x jc:flex-start">
                <p class="nowrap fg:font-title">付款金額：</p>
                <div class="flex ai:center flex:wrap jc:flex-start">
                  <span>NT$ {{ courseEvent?.page?.最終價格 ? formatThousand(courseEvent?.page?.最終價格) : '???' }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w:710 mb:20x mt:5x mx:auto text:left">
          <p class="b1-r px:5x px:11x@tablet">*若有課程相關疑問，請透過客服電話與我們聯繫</p>
        </div>
      </div>
    </div>
  </section>
</template>
b
