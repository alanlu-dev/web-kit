<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { NotionBlockType } from '@alanlu-dev/notion-api-zod-schema'
import type { CourseEventSchemaType } from '~/schema/course_event'

const route = useRoute()
const course_event_id = route.query.course_event_id

const { data: courseEvent } = await useFetch<{ page: CourseEventSchemaType; contents: NotionBlockType[] }>(`/api/course_event/${course_event_id}`, { query: route.query })

useSeoMeta({
  title: () => courseEvent.value?.page?.課程標題 || '結帳',
})

const show = ref(false)

// async function submitHandler() {
//   // Let's pretend this is an ajax request:
//   await new Promise((r) => setTimeout(r, 1000))
//   show.value = true
// }
</script>

<template>
  <section class="flex flex:column">
    <div class="pt:5x pt:10x@tablet px:6x">
      <div class="max-w:screen-md mt:5x mx:auto">
        <div class="flex flex:column gap:10x">
          <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <h3 class="h3 fg:font-title">購買明細</h3>
            <hr class="bg:divider h:1 my:5x w:full" />
            <div class="b1-r flex ai:center jc:space-between">
              <NuxtLink class="~color|300ms|ease fg:primary-hover:hover" :to="`/course_event/${course_event_id}`">{{ courseEvent?.page?.課程標題 }}</NuxtLink>
              <p>NT$ {{ courseEvent?.page?.最終價格 ? formatThousand(courseEvent?.page?.最終價格) : '???' }} </p>
            </div>
            <div class="b2-r flex flex:column gap:2x mt:4x">
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
            </div>
          </div>
          <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <h3 class="h3 fg:font-title">學員資料</h3>
            <hr class="bg:divider h:1 my:5x w:full" />
            <div class="b1-r {fg:font-title}_.formkit-label">
              <FormKit type="form" :actions="false">
                <div class="gap:4x|6x grid-cols:1 grid-cols:2@tablet">
                  <FormKit type="text" name="name" label="姓名" placeholder="王小明" validation="required" :floating-label="false" />
                  <FormKit type="email" name="email" label="聯絡用電子信箱" placeholder="wang@example.com" validation="email" :floating-label="false" />
                  <FormKit type="text" name="mobile" label="手機" placeholder="09xxxxxxxxxx" validation="required|phone" :floating-label="false" />
                  <FormKit type="select" name="invoice" label="發票類型" :options="[{ value: '', label: '電子發票' }]" />
                </div>
              </FormKit>
            </div>
          </div>
          <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <h3 class="h3 fg:font-title">付款方式</h3>
            <hr class="bg:divider h:1 my:5x w:full" />
            <div class="flex ai:center bg:#F2F9FA fg:primary flex:column flex:row@tablet gap:2x@tablet jc:flex-start p:3x|5x r:2x">
              <Iconify icon="material-symbols-light:security" />
              <p class="b1-r">你所有的交易資訊皆獲得安全保護</p>
            </div>
            <div class="my:5x">
              <FormKit type="radio" name="payType" value="" :options="[{ value: '', label: '信用卡一次付清' }]">
                <template #label>
                  <div class="flex ai:center jc:space-between w:full">
                    <p>信用卡一次付清</p>
                    <NuxtImg src="/credit-card.png" class="ml:auto w:74" />
                  </div>
                </template>
              </FormKit>
            </div>
            <div class="bg:#FAFAFA p:4x r:2x">
              <div class="b1-r {bg:base-bg}_.formkit-inner {fg:font-title;bg:#FAFAFA}_.formkit-label max-w:715 mx:auto">
                <FormKit type="form" :actions="false">
                  <div class="gap:4x|6x grid-cols:1 grid-cols:2@tablet">
                    <FormKit
                      type="text"
                      name="cardNo"
                      :classes="{ outer: 'grid-col-span:2@tablet' }"
                      label="信用卡卡號"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      validation="required"
                      :floating-label="false"
                    />
                    <FormKit type="text" name="expiry" label="到期日(MM/YY)" placeholder="XX/XX" validation="required" :floating-label="false" />
                    <FormKit type="text" name="cvc" label="信用卡安全碼" placeholder="XXX" validation="required" :floating-label="false" />
                  </div>
                </FormKit>
              </div>
            </div>
          </div>
        </div>

        <div class="center-content flex gap:10x mt:15x@tablet my:10x">
          <Button intent="secondary" @click="navigateTo(`/course_event/${course_event_id}`)">取消</Button>
          <Button intent="primary" @click="navigateTo(`/checkout/success?course_event_id=${course_event_id}`)">確認付款</Button>
        </div>
      </div>
    </div>

    <Modal v-model="show" title="成功送出！" @confirm="() => (show = false)">
      <p>已收到您的留言，</p>
      <p>我們將盡快與您聯絡。</p>
    </Modal>
  </section>
</template>
b
