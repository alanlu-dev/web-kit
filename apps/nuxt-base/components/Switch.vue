<script setup lang="ts">
interface IProps {
  checked?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  checked: false,
})

const emit = defineEmits<{
  (event: 'update:checked', checked: boolean): void
}>()

const checked = computed({
  get() {
    return props.checked
  },
  set(value) {
    emit('update:checked', value)
  },
})

function toggleSwitch() {
  checked.value = !checked.value
}
</script>

<template>
  <label class="inline-flex ai:center ml:2x">
    <input
      class="hide bg:theme:checked+svg cursor:no-drop[disabled]+svg filter:none[disabled]+svg>rect opacity:.7[disabled]+svg translateX(16):checked+svg>rect translateX(12):checked:active:not([disabled])+svg>rect width:20:active:not([disabled])+svg>rect"
      type="checkbox"
      :checked="checked"
      @change="toggleSwitch"
    />
    <svg class="rounded ~background-color|.3s bg:G-20 cursor:pointer height:20 width:36">
      <rect class="~transform|.1s|ease-out,width|.1s|ease-out drop-shadow(0|2|2|theme/.2) fill:theme-fg" x="2" y="2" rx="8" width="16" height="16" />
    </svg>
  </label>
</template>
