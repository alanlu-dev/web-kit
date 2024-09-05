<script setup lang="ts">
import type { InstructorSchemaType } from '~/schema/instructor'

interface IProps {
  instructor: InstructorSchemaType
}
defineProps<IProps>()
</script>

<template>
  <div class="{block;content:'';h:1;bg:divider;w:full;my:5x}::after {my:10x}::after@xs {hidden}:last::after my:5x">
    <div class="{flex;flex:col;ai:flex-start;jc:flex-start;gap:5x;flex:wrap} {flex:row}@desktop mt:5x mt:10x@tablet">
      <div class="flex:1 min-w:100% min-w:40%@desktop order:2@desktop overflow:hidden r:2x">
        <div class="rel aspect:4/3">
          <VideoPlayerCover aspect="4/3" class="{abs;inset:0;full} r:2x" :img="instructor.照片[0]" :alt="instructor.名稱" />
        </div>
      </div>
      <div class="flex:2">
        <h3 class="h3">{{ instructor.名稱 }} {{ instructor.英文名 }}</h3>
        <p class="b1-m mt:1x">{{ instructor.頭銜 }}</p>
        <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
          <ul class="fg:font-title mt:4x">
            <li>{{ instructor.工作經驗 }} 年收納工作經驗</li>
            <li>{{ instructor.教學經驗 }} 年教學經驗</li>
            <li>{{ instructor.標語 }}</li>
            <li>
              <p>專業認證：</p>
              <ul class="list-style-type:circle!">
                <li v-for="(item, idx) in instructor.專業認證" :key="`專業認證-${idx}`">{{ item }}</li>
              </ul>
            </li>
            <li>
              <p>服務經驗：</p>
              <ul class="list-style-type:circle!">
                <li>{{ instructor.服務經驗 }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
