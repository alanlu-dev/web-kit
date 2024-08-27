<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { createZodPlugin } from '@formkit/zod'
import type { FormKitContext } from '@formkit/core'
import { formatThousand } from '@alanlu-dev/utils'
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

const showOffline = ref(false)
const paymentMethod = ref<OrderPaymentMethodEnumType>(OrderPaymentMethodEnum.enum.綠界)
const formRef = ref<{ node: FormKitContext } | null>(null)

const orderFormData = ref<MemberSchemaType>()
const isLoading = ref(false)
const isLoading_offline = ref(false)
const [zodPlugin, submitHandler] = createZodPlugin(MemberSchema, async (formData) => {
  if (isLoading.value) return
  isLoading.value = true

  if (paymentMethod.value === OrderPaymentMethodEnum.enum.現金) {
    showOffline.value = true
    return
  }

  const { data, error } = await useApiFetch<IEcPayPaymentRequest>('/api/payment', {
    method: 'POST',
    body: JSON.stringify({
      courseEventId: id,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      paymentMethod: paymentMethod.value,
    }),
  })

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
  if (isLoading_offline.value) return
  isLoading_offline.value = true

  const { data, error } = await useApiFetch<IEcPayPaymentRequest>('/api/payment', {
    method: 'POST',
    body: JSON.stringify({
      courseEventId: id,
      name: orderFormData.value!.name,
      email: orderFormData.value!.email,
      mobile: orderFormData.value!.mobile,
      paymentMethod: paymentMethod.value,
    }),
  })

  if (error.value) {
    isLoading_offline.value = false
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
            <h3 class="h3 fg:font-title"
              >購買明細 <span class="b2-m fg:divider">({{ courseEvent?.課程資訊_型態 }})</span></h3
            >
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
            <template v-if="courseEvent?.課程資訊_型態 === '付費課程'">
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
              <div>
                <h2 class="b1-r fg:font-title mt:4x">免費報名辦法說明 </h2>
                <p
                  >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas ullam consectetur eaque consequuntur, nulla facere, nesciunt minus tempore hic nisi assumenda natus laborum
                  suscipit? Nulla quo eligendi nisi ipsa incidunt.</p
                >
                <h2 class="b1-r fg:font-title mt:4x"> 步驟 </h2>
                <div class="list">
                  <ol>
                    <li>按下立即報名</li>
                    <li>檢查表單資訊</li>
                    <li>成立免費訂單</li>
                    <li>發送通知信</li>
                    <li>導轉至完成頁</li>
                  </ol>
                </div>
              </div>
            </template>
          </div>
          <div class="bg:base-bg p:5x|10x r:2x shadow:all">
            <h3 class="h3 fg:font-title">學員資料</h3>
            <hr class="bg:divider h:1 my:5x w:full" />
            <div class="b1-r {fg:font-title}_.formkit-label">
              <FormKit ref="formRef" v-model="orderFormData" type="form" :actions="false" :plugins="[zodPlugin]" @submit="submitHandler">
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

        <div class="{flex;center-content;gap:10x} mt:15x@tablet my:10x opacity:.5[loading=true]" :loading="isLoading">
          <Button intent="secondary" :disabled="isLoading" @click="navigateTo(`/course/${courseEvent?.課程ID}`)">取消</Button>
          <template v-if="courseEvent?.課程資訊_型態 === '付費課程'">
            <Button intent="primary" :disabled="isLoading" @click="online()">前往付款</Button>
            <Button intent="primary" :disabled="isLoading" @click="offline()">現金付款</Button>
          </template>
          <template v-else-if="courseEvent?.課程資訊_型態 === '免費課程'">
            <Button intent="primary" :disabled="isLoading" @click="free()">立即報名</Button>
          </template>
        </div>
      </div>
    </div>

    <Modal v-model="showOffline" class="hidden_.close-btn max-w:screen-main>.vfm__content" title="現金付款說明" :click-to-close="false" :esc-to-close="false" @closed="isLoading = false">
      <div class="text:left">
        <h3 class="h3">繳費方式與期限</h3>
        <p
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur architecto velit quod quidem qui necessitatibus animi praesentium tempora modi soluta consequatur assumenda possimus,
          explicabo incidunt, tempore excepturi nisi eius iusto?</p
        >
        <h3 class="h3 mt:5x">請先加入官方LINE帳號</h3>
        <p
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus dolorum explicabo illo sapiente aliquid incidunt est. Sequi dicta obcaecati recusandae, ipsam laborum voluptatum
          reprehenderit. Sint nisi eum reprehenderit veniam hic?</p
        >
        <div class="my:5x text:center">
          <div class="bg:red mx:auto size:50x"> QRCODE </div>
        </div>
      </div>
      <div class="{inline-flex;gap:5x} mx:auto opacity:.5[loading=true]" :loading="isLoading_offline">
        <Button intent="secondary" :disabled="isLoading_offline" @click="showOffline = false">取消</Button>
        <Button intent="primary" :disabled="isLoading_offline" @click="offlinePayment()">確認報名</Button>
      </div>
    </Modal>
  </section>
</template>
