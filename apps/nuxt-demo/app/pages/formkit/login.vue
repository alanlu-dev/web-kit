<script setup lang="ts">
import type { FormKitNode } from '@formkit/core'

// 驗證碼
const verifyCodeRef = useFormKitRefs()

// 密碼顯示圖示
function handleIconClick(node: FormKitNode, _e: Event) {
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
  node.props.suffixIcon = node.props.suffixIcon === 'eyeClosed' ? 'eye' : 'eyeClosed'
  // node.props.
}

const checkRef = {
  terms: useFormKitRefs(),
}

const checked = useState(() => ({
  terms: true,
}))

function checkout() {
  if (!checked.value.terms) {
    const elId = checkRef.terms.context.value?.id || null
    if (elId) {
      document.getElementById(elId)?.focus()
    }
  }
}
</script>

<template>
  <div class="max-w:screen-3xs mx:auto">
    <FormKit type="form" :config="{ validationVisibility: 'submit' }" :actions="false">
      <FormKit :classes="{ outer: 'pb:4x! pb:10x![data-invalid]', messages: 'abs' }" type="email" name="email" label="電子信箱" validation="required|length:0,100" autocomplete="email" />

      <div class="rel">
        <FormKit
          :classes="{ outer: 'pb:10x!', messages: 'abs' }"
          type="password"
          name="password"
          label="密碼"
          validation="required|length:8,16"
          autocomplete="current-password"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
        />
        <NuxtLink tabindex="-1" class="abs bottom:14 fg:info right:0"> 忘記密碼？ </NuxtLink>
      </div>

      <div class="flex {w:full}>div">
        <FormKit
          :ref="verifyCodeRef.form"
          v-maska
          :classes="{ outer: 'pb:4x! pb:10x![data-invalid]', messages: 'abs' }"
          type="text"
          name="verify_code"
          label="驗證碼"
          data-maska="######"
          validation="required|length:6"
          inputmode="numeric"
          autocomplete="off"
        />
        <!-- 點擊圖片更新驗證碼 -->
        <div class="center-content flex nowrap h:42 pl:4x w:150!">
          <img class="cover pointer aspect:82/25 pointer-events:initial" src="https://fakeimg.pl/150x42/" />
        </div>
      </div>

      <div class="subject nowrap fg:G-40">快速登入/註冊</div>
      <div class="flex {avatar-lg}_svg gap:8x jc:center mt:4x">
        <Icon tabindex="0" name="akar-icons:facebook-fill" class="pointer fg:#1877F2" />
        <Icon tabindex="0" name="line" class="pointer" />
        <Icon name="MailIcon" />
      </div>

      <div class="mt:4x">
        <FormKit :ref="checkRef.terms.form" v-model="checked.terms" type="checkbox">
          <template #label="context">
            <span :class="context.classes.label">我同意<NuxtLink class="link">會員條款</NuxtLink></span>
          </template>
        </FormKit>
      </div>
      <div class="flex gap:4x mt:6x w:full_.btn,_.formkit-outer">
        <FormKit type="button" label="關閉" />
        <FormKit type="submit" label="登入" @click="checkout" />
      </div>
    </FormKit>
  </div>
</template>
