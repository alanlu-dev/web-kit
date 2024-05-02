<script setup lang="ts">
const show = ref(false)

async function submitHandler() {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000))
  show.value = true
}
</script>

<template>
  <section class="flex flex:column px:7x py:5x py:10x@tablet">
    <h1 class="h1 title">聯絡我們 🚧</h1>
    <div class="b1-r mb:8.5x mt:5x text:center">
      <p>有課程相關的問題嗎？</p>
      <p>留下資訊我們將盡快回覆您</p>
    </div>

    <div class="mx:auto">
      <FormKit type="form" :config="{ classes: { wrapper: 'max-w:unset!', outer: 'mb:0!' } }" :actions="false" @submit="submitHandler">
        <div class="gap:4x|6x grid-cols:2">
          <FormKit type="text" name="name" label="姓名" validation="required" />
          <FormKit type="text" name="mobile" label="連絡電話" validation="required|phone" />
          <FormKit type="email" name="email" label="電子信箱" validation="required|email" />
          <FormKit type="text" name="title" label="主旨" validation="required" />
        </div>
        <FormKit :classes="{ wrapper: 'mt:6x!' }" type="textarea" name="message" validation="required" label="問題描述，寫下您的問題" lines="3" />

        <FormKit :classes="{ wrapper: 'mt:6x! text:right', input: 'mr:0!' }" type="submit" label="送出" />
      </FormKit>
    </div>
    <Modal v-model="show" title="成功送出！" @confirm="() => (show = false)">
      <p>已收到您的留言，</p>
      <p>我們將盡快與您聯絡。</p>
    </Modal>
  </section>
</template>
