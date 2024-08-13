<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { createZodPlugin } from '@formkit/zod'
import type { FormKitContext } from '@formkit/core'
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseEventSchemaType } from '~/schema/course_event'
import type { MemberSchemaType } from '~/schema/member'
import { MemberSchema } from '~/schema/member'

const route = useRoute()
const id = route.params.course_event_id

const { data: courseEvent } = await useApiFetch<CourseEventSchemaType>(`/api/course_event/${id}`, { query: route.query })

useSeoMeta({
  title: () => courseEvent.value?.課程資訊_名稱 || '結帳',
})

const show = ref(false)

const formRef = ref<{ node: FormKitContext } | null>(null)

const data = ref<MemberSchemaType>()
const isLoading = ref(false)
const [zodPlugin, submitHandler] = createZodPlugin(MemberSchema, async (formData) => {
  if (isLoading.value) return
  isLoading.value = true

  const { data, error } = await useApiFetch<IEcPayPaymentRequest>('/api/payment', {
    method: 'POST',
    body: JSON.stringify({
      courseEventId: id,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
    }),
  })

  if (error.value) {
    isLoading.value = false
    return
  }

  toast.loading('導轉至付款頁')

  const paymentRequest = data.value!
  const form = document.createElement('form')
  form.method = 'post'
  form.action = paymentRequest.ApiUrl
  form.id = 'paymentForm'

  Object.keys(paymentRequest.AllParams).forEach((key) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = String(paymentRequest.AllParams[key])
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
})
</script>

<template>
  <section class="{flex;flex:col}">
    <div class="p:5x|6x pt:10x@tablet px:10x@desktop">
      <div class="{max-w:screen-main;mx:auto} mt:5x">
        <div class="{flex;flex:col;gap:10x}">
          <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <h3 class="h3 fg:font-title">購買明細</h3>
            <hr class="bg:divider h:1 my:5x w:full" />
            <div class="b1-r {flex;ai:center;jc:space-between;flex:wrap}">
              <NuxtLink class="~color|300ms|ease fg:primary-hover:hover" :to="`/course_event/${id}`">{{ courseEvent?.課程資訊_名稱 }}</NuxtLink>
              <p class="nowrap">NT$ {{ formatThousand(courseEvent?.指定價格 || courseEvent?.課程資訊_價格 || 99999) }}</p>
            </div>
            <div class="b2-r {flex;flex:col;gap:2x} mt:4x">
              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課日期：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ courseEvent?.上課日期?.[0] }}</span>
                </div>
              </div>
              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課時間：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ courseEvent?.上課日期?.[1] }}</span>
                </div>
              </div>
              <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
                <p class="nowrap fg:font-title">上課地點：</p>
                <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                  <span>{{ courseEvent?.教室資訊?.地址 }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <h3 class="h3 fg:font-title">學員資料</h3>
            <hr class="bg:divider h:1 my:5x w:full" />
            <div class="b1-r {fg:font-title}_.formkit-label">
              <FormKit ref="formRef" v-model="data" type="form" :actions="false" :plugins="[zodPlugin]" @submit="submitHandler">
                <div class="{grid-cols:1;gap:4x|6x} {grid-cols:2}@tablet">
                  <FormKit type="text" name="name" label="姓名" placeholder="王小明" validation="required" :floating-label="false" />
                  <FormKit type="email" name="email" label="聯絡用電子信箱" placeholder="wang@example.com" validation="required|email" :floating-label="false" />
                  <FormKit type="text" name="mobile" label="手機" placeholder="09xxxxxxxxxx" validation="required|phone" :floating-label="false" />
                  <!-- <FormKit type="select" name="invoice" label="發票類型" :options="[{ value: '', label: '電子發票' }]" /> -->
                </div>
              </FormKit>
            </div>
          </div>

          <!-- <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <h3 class="h3 fg:font-title">付款方式</h3>
            <hr class="bg:divider h:1 my:5x w:full" />
            <div class="{flex;flex:col;ai:center;jc:flex-start} {flex:row;gap:2x}@tablet bg:home fg:primary p:3x|5x r:2x">
              <Iconify icon="material-symbols-light:security" />
              <p class="b1-r">你所有的交易資訊皆獲得安全保護</p>
            </div>
            <div class="my:5x">
              <FormKit type="radio" name="payType" value="" :options="[{ value: '', label: '信用卡一次付清' }]">
                <template #label>
                  <div class="{flex;ai:center;jc:space-between} w:full">
                    <p>信用卡一次付清</p>
                    <NuxtImg src="/other/credit-card.png" class="ml:auto w:74" />
                  </div>
                </template>
</FormKit>
</div>
<div class="bg:#FAFAFA p:4x r:2x">
  <div class="b1-r {max-w:715;mx:auto} {bg:base-bg}_.formkit-inner {fg:font-title;bg:#FAFAFA}_.formkit-label">
    <FormKit type="form" :actions="false">
      <div class="{grid-cols:1;gap:4x|6x} {grid-cols:2}@tablet">
        <FormKit type="text" name="cardNo" :classes="{ outer: 'grid-col-span:2@tablet' }" label="信用卡卡號"
          placeholder="XXXX-XXXX-XXXX-XXXX" validation="required" :floating-label="false" />
        <FormKit type="text" name="expiry" label="到期日(MM/YY)" placeholder="XX/XX" validation="required"
          :floating-label="false" />
        <FormKit type="text" name="cvc" label="信用卡安全碼" placeholder="XXX" validation="required"
          :floating-label="false" />
      </div>
    </FormKit>
  </div>
</div>
</div> -->
        </div>

        <div class="{flex;center-content;gap:10x} mt:15x@tablet my:10x opacity:.5[loading=true]" :loading="isLoading">
          <Button intent="secondary" @click="navigateTo(`/course/${courseEvent?.課程ID}`)">取消</Button>
          <Button intent="primary" :disabled="isLoading" @click="formRef?.node.context?.node.submit()">前往付款</Button>
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
