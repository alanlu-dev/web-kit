<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod'
import { ContactSchema } from '~/schema/contact'
import type { ContactSchemaType } from '~/schema/contact'

const show = ref(false)

const data = ref<ContactSchemaType>()
const [zodPlugin, submitHandler] = createZodPlugin(ContactSchema, async (formData) => {
  // await new Promise((r) => setTimeout(r, 2000))
  await $fetch('/api/contact', { method: 'post', body: formData })
  show.value = true
})
</script>

<template>
  <section class="{flex;flex:col} {max-w:screen-2xs;mx:auto}">
    <h1 class="h3 title fg:font-title">聯絡我們</h1>
    <div class="b1-r {flex;flex:wrap;jc:center} mt:3x mt:4x@tablet text:center">
      <span>有課程相關的問題嗎？</span>
      <span>留下資訊我們將盡快回覆您</span>
    </div>

    <div class="{mt:4x;text:right}_.formkit-actions mt:5x">
      <FormKit v-model="data" type="form" :actions="true" submit-label="送出" :plugins="[zodPlugin]" @submit="submitHandler">
        <div class="{grid-cols:1;gap:4x|6x} {grid-cols:2}@tablet">
          <FormKit type="text" name="name" label="姓名" validation="required" />
          <FormKit type="text" name="mobile" label="聯絡電話" validation="required|phone" />
          <FormKit type="email" name="email" label="電子信箱" validation="required|email" />
          <FormKit type="text" name="title" label="主旨" validation="required" />
        </div>
        <FormKit :classes="{ wrapper: 'mt:4x!' }" type="textarea" name="message" validation="required" label="問題描述，寫下您的問題" lines="3" />
      </FormKit>
    </div>

    <Modal v-model="show" title="成功送出！" @confirm="() => (show = false)">
      <p>已收到您的留言，</p>
      <p>我們將盡快與您聯絡。</p>
    </Modal>
  </section>
</template>
