<script setup lang="ts">
import type { TransitionProps } from 'vue'
import { toLine } from '@alanlu-dev/mastercss-helpers'
import { normalizeOptions } from '@alanlu-dev/utils/obj'
import cv from 'class-variant'
import { nanoid } from 'nanoid'
import { z } from 'zod'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<IProps>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: PropertyKey): void
}>()

export interface IProps {
  tabs: OptionsProp
  modelValue?: PropertyKey
  cv?: Partial<{
    type: string
    label?: Partial<{
      intent: string
    }>
    glider?: Partial<{
      intent: string
      width: string
      bg: string
    }>
  }>
}

type OptionsProp = Simplify<Parameters<typeof normalizeOptions>[0]>

const inputProps = computed(() => {
  return {
    modelValue: unref(props.modelValue),
    tabs: normalizeOptions(props.tabs),
  }
})
const tabWidth = computed(() => `${100 / inputProps.value.tabs.length}%`)
const idx = ref(inputProps.value.tabs.findIndex((t) => t.value === inputProps.value.modelValue?.toString()) || 0)
const name = ref(nanoid(10))

function onInput(newIdx: number) {
  idx.value = newIdx
  const value = inputProps.value.tabs[newIdx]?.value as string
  emit('update:modelValue', value)
}

onMounted(() => {
  if (!props.modelValue) {
    onInput(0)
  }
})

/** 方向 */
const directionEnum = z.enum(['<', '>'])
const direction = ref<z.infer<typeof directionEnum>>(directionEnum.Enum['>'])
watch(
  () => idx.value,
  (newVal, oldVal) => {
    direction.value = newVal > oldVal ? '>' : '<'
  },
)

const transitionBind = computed((): TransitionProps => {
  return {
    mode: 'out-in',
    enterActiveClass: '~all|.1s|ease-out',
    leaveActiveClass: '~all|.1s|ease-in',
    enterFromClass: `opacity:0 translateX(${direction.value === '>' ? -50 : 50})`,
    leaveToClass: `opacity:0 translateX(${direction.value === '>' ? 50 : -50})`,
  }
})

const gliderCV = cv(
  toLine({
    '': 'abs pointer-events:none',
    '>div': 'rel h:full ~transform|.2s|ease-out',
    '>div::before': `content:'' block m:auto min-w:70 h:full bg:theme`,
  }),
  {
    intent: {
      line: toLine({
        '': 'left:0 bottom:0 h:2 w:full bg:G-20',
        '>div::before': 'rounded',
      }),
      block: toLine({
        '': 'middle center bg:theme-fg',
      }),
    },
  },
  ({ intent }) => intent && `{w:${tabWidth.value};translateX(${idx.value * 100}%)}>div`,
  ({ width }) => width && `{w:${width}}>div::before`,
  // ({ bg }) => bg && ` bg:base-bg`,
)

const labelCV = cv(
  toLine({
    '': `center-content flex flex:1 t:center cursor:pointer z:1`,
    '>input': 'hidden',
    // '>input:checked+span': '',
    '>span': `ellipsis ~color|.1s|ease-in`,
  }),
  {
    intent: {
      line: toLine({
        '>input:checked+span': 'f:bold fg:B-50',
        '>span': `fg:G-50`,
      }),
      block: toLine({
        '>input:checked+span': 'fg:theme-fg',
        '>span': `fg:theme`,
      }),
    },
  },
  ({ intent }) => intent && `w:${tabWidth.value}`,
)
</script>

<template>
  <div class="center-content flex rel user-select:none" v-bind="$attrs">
    <div class="tab__glider" :class="[gliderCV({ intent: props.cv?.type || 'line', width: '100%', ...props.cv?.glider })]"><div></div></div>
    <div class="flex full">
      <template v-for="({ value, label }, tabIdx) in inputProps.tabs" :key="value">
        <label class="tab__label" :class="[labelCV({ intent: props.cv?.type || 'line', ...props.cv?.label })]">
          <input :name="name" type="radio" :value="value" :checked="inputProps.modelValue?.toString() === value" @input="onInput(tabIdx)" />
          <span>{{ label }}</span>
        </label>
      </template>
    </div>
  </div>
  <slot :transition-bind="transitionBind"></slot>
</template>
