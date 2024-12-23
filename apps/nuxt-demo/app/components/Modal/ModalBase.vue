<script setup lang="ts">
import type { CSSProperties, RendererElement } from 'vue'
import { getDefaultFromProps } from '@alanlu-dev/utils/obj'

import { VueFinalModal, vueFinalModalProps } from 'vue-final-modal'

const props = withDefaults(
  defineProps<IProps>(),
  getDefaultFromProps(vueFinalModalProps, {
    contentTransition: 'vfm-fade',
    overlayTransition: 'vfm-fade',
    preventNavigationGestures: true,
  }),
)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  // Emits while modal is still invisible, but before transition starting.
  (e: 'beforeOpen'): void
  // Emits after modal became visible and transition ended.
  (e: 'opened'): void
  // Emits before modal is going to be closed.
  (e: 'beforeClose'): void
  // Emits right before modal is destroyed.
  (e: 'closed'): void
  // 取消
  (e: 'cancel'): void
  // 確認
  (e: 'confirm', data: any): void
}>()

// declare type ModalProps = ExtractPropTypes<typeof vueFinalModalProps>

export interface IProps {
  header?: null | string | Component
  content?: null | string | Component
  footer?: null | string | Component
  contentAttrs?: Record<string, any>
  cancelText?: string
  confirmText?: string
  needCancel?: boolean
  onCancel?: () => void
  onConfirm?: (data: any) => void

  /*
   * vue-final-modal
   * https://vue-final-modal.org/api/components/vue-final-modal
   */
  teleportTo?: string | false | RendererElement | null
  modalId?: number | string | symbol
  modelValue?: boolean
  displayDirective?: 'if' | 'show' | 'visible'
  hideOverlay?: boolean
  overlayBehavior?: 'auto' | 'persist'
  overlayTransition?: (string | 'vfm-fade' | 'vfm-slide-down' | 'vfm-slide-up' | 'vfm-slide-right' | 'vfm-slide-left') | import('vue').TransitionProps
  contentTransition?: (string | 'vfm-fade' | 'vfm-slide-down' | 'vfm-slide-up' | 'vfm-slide-right' | 'vfm-slide-left') | import('vue').TransitionProps
  overlayClass?: any
  contentClass?: any
  overlayStyle?: string | CSSProperties | (string | CSSProperties)[]
  contentStyle?: string | CSSProperties | (string | CSSProperties)[]
  clickToClose?: boolean
  escToClose?: boolean
  background?: 'interactive' | 'non-interactive'
  focusTrap?: false | import('focus-trap').Options
  lockScroll?: boolean
  reserveScrollBarGap?: boolean
  zIndexFn?: (context: { index: number }) => number | undefined
  swipeToClose?: 'none' | 'up' | 'right' | 'down' | 'left'
  threshold?: number
  showSwipeBanner?: boolean
  preventNavigationGestures?: boolean
}

const localProps = computed(() => {
  const { header, content, footer, cancelText, confirmText, needCancel, modelValue, ...modalProps } = props
  return {
    modelValue: unref(modelValue),
    ...modalProps,
  }
})

function handleBeforeOpen() {
  emit('beforeOpen')
}

function handleOpened() {
  emit('opened')
}

function handleBeforeClose() {
  emit('beforeClose')
}

function handleClosed() {
  emit('closed')
  emit('update:modelValue', false)
}

function handleCancel() {
  emit('cancel')
}

const contentRef = ref<any>()

function handleConfirm() {
  const submit: () => Promise<any> = contentRef.value?.submit || (() => Promise.resolve(true))
  submit().then((data) => emit('confirm', data))
}
</script>

<template>
  <VueFinalModal
    v-bind="localProps"
    class="center-content flex"
    :content-class="[
      'flex {t:left}_:where(.vfm__content__content) bg:base-bg-box max-h:calc(100%-30) max-w:360 overflow:hidden pb:6x r:2x shadow:xl t:center w:calc(100%-30)',
      localProps.contentClass,
    ]"
    @before-open="handleBeforeOpen"
    @opened="handleOpened"
    @before-close="handleBeforeClose"
    @closed="handleClosed"
  >
    <div class="vfm__content__root mt:6x overflow:auto px:6x w:full">
      <header class="vfm__content__header {hidden;mb:0}:empty f:bolder f:lg line-h:1.2 mb:6x user-select:none">
        <slot name="header">
          <template v-if="typeof header === 'string'">
            {{ header }}
          </template>
          <template v-else>
            <component :is="header"></component>
          </template>
        </slot>
      </header>
      <div class="vfm__content__content">
        <slot>
          <template v-if="typeof content === 'string'">
            <div v-html="content"></div>
          </template>
          <template v-else>
            <component :is="content" ref="contentRef" v-bind="contentAttrs" @confirm="handleConfirm" @cancel="handleCancel"></component>
          </template>
        </slot>
      </div>
      <footer v-if="footer !== null" class="vfm__content__footer mt:6x">
        <slot name="footer">
          <template v-if="footer === undefined">
            <div class="center-content inline-flex gap:4x w:100% w:full_.btn">
              <button v-if="needCancel" class="btn" @click="handleCancel">{{ cancelText || '取消' }}</button>
              <button class="btn btn-type--theme" @click="handleConfirm">{{ confirmText || '確認' }}</button>
            </div>
          </template>
          <template v-else-if="typeof footer === 'string'">
            {{ footer }}
          </template>
          <template v-else>
            <component :is="footer" @confirm="handleConfirm" @cancel="handleCancel"></component>
          </template>
        </slot>
      </footer>
    </div>
  </VueFinalModal>
</template>
