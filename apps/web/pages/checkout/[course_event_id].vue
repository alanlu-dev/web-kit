<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { createZodPlugin } from '@formkit/zod'
import type { FormKitContext } from '@formkit/core'
import { formatThousand } from '@alanlu-dev/utils'
import { addDay, format } from '@formkit/tempo'
import type { CourseEventSchemaType } from '~/schema/course_event'
import type { MemberSchemaType } from '~/schema/member'
import { MemberSchema } from '~/schema/member'
import { OrderPaymentMethodEnum, type OrderPaymentMethodEnumType } from '~/schema/payment'

const route = useRoute()
const id = route.params.course_event_id

const { data: courseEvent } = await useApiFetch<CourseEventSchemaType>(`/api/course_event/${id}`, { query: route.query })

useSeoMeta({
  title: '確認報名',
})

//   一般課程報名流程：點擊「立即報名」
// 選擇「線上付款」→ 綠界流程 ，付款後→ 寄成功通知信
// 選擇「現金付款」→ 轉至 付款說明頁 ，送出後→ 寄感謝通知信

// 免費課程報名流程：點擊「立即報名」
// 轉至 報名辦法說明頁 ，送出後→ 寄成功通知信

const recaptchaV2 = ref<string | number | null>(null)

const showOffline = ref(false)
const paymentMethod = ref<OrderPaymentMethodEnumType>(OrderPaymentMethodEnum.enum.綠界)
const formRef = ref<{ node: FormKitContext } | null>(null)

const orderFormData = ref<MemberSchemaType>()
const isLoading = ref(false)
const isLoading_offline = ref(false)
const [zodPlugin, submitHandler] = createZodPlugin(MemberSchema, async (formData) => {
  if (recaptchaV2.value === null) {
    toast.warn('請完成驗證')
    return
  }
  if (recaptchaV2.value === -1) {
    toast.warn('驗證已過期，請重新驗證')
    return
  }

  if (isLoading.value) return
  isLoading.value = true

  if (paymentMethod.value === OrderPaymentMethodEnum.enum.現金) {
    showOffline.value = true
    return
  }

  const { data, error, rc } = await useApiFetch<IEcPayPaymentRequest>('/api/payment', {
    method: 'POST',
    body: JSON.stringify({
      courseEventId: id,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      paymentMethod: paymentMethod.value,
      recaptchaV2: recaptchaV2.value,
    }),
  })

  if (rc.value === 409) {
    navigateTo(`/checkout/result/${data.value}`)
  }

  if (error.value) {
    isLoading.value = false
    return
  }

  if (paymentMethod.value === OrderPaymentMethodEnum.enum.免費) {
    navigateTo(`/checkout/result/${data.value}`)
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

function online() {
  paymentMethod.value = OrderPaymentMethodEnum.enum.綠界
  formRef.value?.node.context?.node.submit()
}

function offline() {
  paymentMethod.value = OrderPaymentMethodEnum.enum.現金
  formRef.value?.node.context?.node.submit()
}

function free() {
  paymentMethod.value = OrderPaymentMethodEnum.enum.免費
  formRef.value?.node.context?.node.submit()
}

async function offlinePayment() {
  if (recaptchaV2.value === null) {
    toast.warn('請完成驗證')
    showOffline.value = false
    return
  }
  if (recaptchaV2.value === -1) {
    toast.warn('驗證已過期，請重新驗證')
    showOffline.value = false
    return
  }

  if (isLoading_offline.value) return
  isLoading_offline.value = true

  const { data, error, rc } = await useApiFetch<string>('/api/payment', {
    method: 'POST',
    body: JSON.stringify({
      courseEventId: id,
      name: orderFormData.value!.name,
      email: orderFormData.value!.email,
      mobile: orderFormData.value!.mobile,
      paymentMethod: paymentMethod.value,
      recaptchaV2: recaptchaV2.value,
    }),
  })

  if (error.value) {
    isLoading_offline.value = false

    if (rc.value === 409) {
      navigateTo(`/checkout/result/${data.value}`)
    }
    return
  }

  navigateTo(`/checkout/result/${data.value}`)
}
</script>

<template>
  <section class="{flex;flex:col}">
    <div class="p:5x|6x pt:10x@tablet px:10x@desktop">
      <div class="{max-w:screen-main;mx:auto} mt:5x">
        <div class="{flex;flex:col;gap:10x}">
          <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <template v-if="courseEvent?.課程資訊_型態 === '付費課程'">
              <h3 class="h3 fg:font-title">購買明細</h3>
              <hr class="bg:divider h:1 my:5x w:full" />
              <div class="b1-r {flex;ai:center;jc:space-between;flex:wrap}">
                <NuxtLink class="~color|300ms|ease fg:primary-hover:hover" :to="`/course_event/${id}`">{{ courseEvent?.課程資訊_名稱 }}</NuxtLink>
                <!-- <p class="nowrap">NT$ {{ formatThousand(courseEvent?.指定價格 || courseEvent?.課程資訊_價格) }}</p> -->
                <p v-if="courseEvent?.指定價格" class="nowrap {flex;ai:flex-end;gap:2x;flex:wrap}">
                  <span class="b3-r fg:divider text:line-through">NT$ {{ formatThousand(courseEvent?.課程資訊_價格) }}</span>
                  <span class="fg:accent">NT$ {{ formatThousand(courseEvent?.指定價格) }}</span>
                </p>
                <p v-else class="nowrap fg:accent">NT$ {{ formatThousand(courseEvent?.課程資訊_價格) }}</p>
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
            </template>
            <template v-else-if="courseEvent?.課程資訊_型態 === '免費課程'">
              <h3 class="h3 title fg:font-title">免費清潔實作課程報名辦法</h3>
              <hr class="bg:divider h:1 my:5x w:full" />
              <div>
                <p class="b1-m fg:font-title mt:4x">報名流程：</p>
                <div class="list">
                  <ol>
                    <li>填寫報名基本資料，並加入協會官方 LINE 帳號</li>
                    <li>初步評估（兩階段）</li>
                    <li>錄取免費實作課程通知</li>
                  </ol>
                </div>
                <p class="mt:10x">為了確保課程品質，並讓每位參與同學都能獲得最大的學習效益，我們將對所有報名者進行初步評估。評估方式採兩階段，包括：</p>

                <p class="b1-m fg:font-title mt:4x">第一階段，線上評估：</p>
                <p class="mt:2x">協會將會透過官方LINE平台與您進行基本的背景訪談，瞭解您過去是否有從事過清潔相關工作，或是有完成任何清潔認證或研習課程。</p>

                <p class="b1-m fg:font-title mt:4x">第二階段，團體面談：</p>
                <p class="mt:2x">基於上述資訊，協會將邀請部分報名者統一安排一次團體面談，以進一步了解您的學習動機與相關能力。</p>
                <p><span>面談地點：中華民國職業清潔認證協會</span> <span>地址：台中市北屯區遼陽四街 65 號</span></p>
              </div>
            </template>
          </div>
          <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <h3 class="h3 fg:font-title">學員資料</h3>
            <hr class="bg:divider h:1 my:5x w:full" />
            <div class="b1-r {fg:font-title}_.formkit-label">
              <FormKit ref="formRef" v-model="orderFormData" type="form" :actions="false" :plugins="[zodPlugin]" :config="{ validationVisibility: 'submit' }" @submit="submitHandler">
                <div class="{grid-cols:1;gap:4x|6x} {grid-cols:2}@tablet">
                  <FormKit type="text" name="name" label="姓名" placeholder="王小明" validation="required" :floating-label="false" />
                  <FormKit type="email" name="email" label="聯絡用電子信箱" placeholder="wang@example.com" validation="required|email" :floating-label="false" />
                  <FormKit type="text" name="mobile" label="手機" placeholder="09xxxxxxxxxx" validation="required|phone" :floating-label="false" />
                  <!-- <FormKit type="select" name="invoice" label="發票類型" :options="[{ value: '', label: '電子發票' }]" /> -->
                </div>
              </FormKit>
              <Recaptcha class="mt:5x overflow:hidden w:full" @verified="recaptchaV2 = $event" @expired="recaptchaV2 = -1" />
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
                    <Image src="/other/credit-card.png" class="ml:auto w:74" />
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

        <template v-if="courseEvent?.課程資訊_型態 === '付費課程'">
          <div class="{flex;flex:col;gap:1x} p:5x p:10x@tablet">
            <p class="flex"><span>※</span><span>學員資料請務必填寫正確，以利後續安排課程。</span></p>
            <p class="flex"><span>※</span><span>線上付款流程目前僅開放銀行信用卡刷卡付款，如無法使用刷卡功能，請採現金付款方式。</span></p>
            <p class="flex"><span>※</span><span>現金付款流程請於完成報名送出後三日內前往中華民國職業清潔認證協會付款，地址：台中市北屯區遼陽四街 65 號。</span></p>
          </div>

          <div class="{flex;center-content;gap:4x} {mt:15x;gap:10x}@tablet my:10x opacity:.5[loading=true]" :loading="isLoading">
            <Button intent="secondary" class="nowrap" :disabled="isLoading" @click="navigateTo(`/course/${courseEvent?.課程ID}`)">取消</Button>
            <Button intent="primary" class="nowrap" :disabled="isLoading" :loading="isLoading" @click="online()">線上付款</Button>
            <Button intent="primary" class="nowrap" :disabled="isLoading" @click="offline()">現金付款</Button>
          </div>
        </template>
        <template v-else-if="courseEvent?.課程資訊_型態 === '免費課程'">
          <div class="{flex;flex:col;gap:1x} p:5x p:10x@tablet">
            <h3 class="h3 fg:accent">請先加入官方LINE帳號</h3>
            <p class="mt:4x"
              >為便於後續報名確認，課程通知及其他相關事宜，請務必主動加入本協會官方LINE帳號：點擊連結
              <a class="cursor:pointer fg:primary fg:primary-hover:hover" href="https://lin.ee/6bQnil5">https://lin.ee/6bQnil5</a> 或 掃描下方 QR
              Code。加入後，請主動提供您的報名姓名及連絡電話，以便協會工作人員為您進行後續服務
            </p>
            <a href="https://lin.ee/6bQnil5" class="block aspect:1/1 max-w:200 mt:4x mx:auto">
              <Image src="/line.png" class="{aspect:inherit;object:cover} w:full" />
            </a>
          </div>

          <div class="{flex;center-content;gap:4x} {mt:15x;gap:10x}@tablet my:10x opacity:.5[loading=true]" :loading="isLoading">
            <Button intent="secondary" class="nowrap" :disabled="isLoading" @click="navigateTo(`/course/${courseEvent?.課程ID}`)">取消</Button>
            <Button intent="primary" class="nowrap" :disabled="isLoading" :loading="isLoading" @click="free()">確認報名</Button>
          </div>
        </template>
      </div>
    </div>

    <Modal v-model="showOffline" class="hidden_.close-btn {max-w:screen-sm}_.vfm__content" :click-to-close="false" :esc-to-close="false" @closed="isLoading = false">
      <template #header>
        <h2 class="h2 fg:font-title">現金付款說明</h2>
      </template>
      <div class="scrollbar {flex;flex:col;gap:6x} max-h:70vh overflow:auto">
        <div>
          <h3 class="h3">繳費方式與期限</h3>
          <div class="b2-r {flex;flex:col;gap:1x} bg:base-bg mt:4x r:2x text:left">
            <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
              <p class="nowrap fg:font-title">繳費方式：</p>
              <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                <span
                  >請於報名完成後三日內(<span class="fg:primary"
                    >{{
                      format({
                        date: addDay(new Date(), 3),
                        format: 'YYYY/MM/DD',
                        locale: 'zh-TW',
                        tz: 'Asia/Taipei',
                      })
                    }}
                    前</span
                  >)，親至本協會繳納現金，逾期將視同自動放棄報名。</span
                >
              </div>
            </div>

            <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
              <p class="nowrap fg:font-title">繳費地點：</p>
              <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                <span>中華民國職業清潔認證協會</span>
              </div>
            </div>
            <div class="{flex;ai:flex-start;jc:flex-start;gap:1x}">
              <p class="nowrap fg:font-title">繳費地址：</p>
              <div class="{flex;ai:center;jc:flex-start;flex:wrap}">
                <span>台中市北屯區遼陽四街 65 號</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="h3 fg:accent">請先加入官方LINE帳號</h3>
          <p class="mt:4x"
            >為便於後續報名確認，課程通知及其他相關事宜，請務必主動加入本協會官方LINE帳號：點擊連結
            <a class="cursor:pointer fg:primary fg:primary-hover:hover" href="https://lin.ee/6bQnil5">https://lin.ee/6bQnil5</a> 或 掃描下方 QR
            Code。加入後，請主動提供您的報名姓名及連絡電話，以便協會工作人員為您進行後續服務
          </p>
          <a href="https://lin.ee/6bQnil5" class="block aspect:1/1 max-w:200 mt:4x mx:auto">
            <Image src="/line.png" class="{aspect:inherit;object:cover} w:full" />
          </a>
        </div>
      </div>
      <template #footer>
        <div class="{inline-flex;gap:5x} mx:auto opacity:.5[loading=true]" :loading="isLoading_offline">
          <Button intent="secondary" :disabled="isLoading_offline" @click="showOffline = false">取消</Button>
          <Button intent="primary" :disabled="isLoading_offline" :loading="isLoading_offline" @click="offlinePayment()">確認報名</Button>
        </div>
      </template>
    </Modal>
  </section>
</template>
