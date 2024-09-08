<script setup lang="ts">
import type { ParsedItem } from '~/schema/course_base'

interface IProps {
  rootKey: string
  list: ParsedItem[]
}

defineProps<IProps>()
</script>

<template>
  <div class="list">
    <ul>
      <template v-for="(item, idx) in list" :key="`${rootKey}-${idx}`">
        <template v-if="item.type === 'text'">
          <li>{{ item.content }}</li>
        </template>
        <template v-else-if="item.type === 'ul'">
          <ul class="pl:1.5em!" :class="`$custom:'${item.symbol || '-'}'`">
            <li v-for="(subItem, subIdx) in item.items" :key="`${rootKey}-${idx}-${subIdx}`">{{ subItem }}</li>
          </ul>
        </template>
        <template v-else-if="item.type === 'ol'">
          <ol class="list--reset pl:1.5em!">
            <li v-for="(subItem, subIdx) in item.items" :key="`${rootKey}-${idx}-${subIdx}`">{{ subItem }}</li>
          </ol>
        </template>
      </template>
    </ul>
  </div>
</template>
