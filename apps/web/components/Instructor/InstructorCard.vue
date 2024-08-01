<script setup lang="ts">
import type { InstructorSchemaType } from '~/schema/instructor'

interface IProps {
  instructor: InstructorSchemaType
}
defineProps<IProps>()
</script>

<template>
  <nuxt-link class=".is-active>{pointer-events:unset} pointer-events:none scale(1.05):hover_img" to="/instructor">
    <div class="flex rel {content:'';bg:white;abs;top:10x;left:30x;bottom;right;z:-1;r:2x}::before@xs flex:column flex:row@xs pb:5x@xs">
      <div class="flex:1">
        <div class="{aspect:357/254;object:cover;w:full}_img aspect:357/254 overflow:hidden r:2x">
          <nuxt-img :src="instructor.照片[0]" alt="講師" class="~300ms|ease pointer-events:none user-select:none" />
        </div>
      </div>
      <div class="{pt:15x;pl:9x}@xs bg:none@xs bg:white flex:1 p:4x|5x r:2x text:left w:full">
        <h3 class="h3 fg:primary">{{ instructor.名稱 }} {{ instructor.英文名 }}</h3>
        <p class="b1-m mt:1x">{{ instructor.頭銜 }}</p>
        <div class="list b2-r mt:5x mt:10x@xs">
          <ul>
            <li>{{ instructor.工作經驗 }} 年收納工作經驗</li>
            <li>{{ instructor.工作經驗 }} 年教學經驗</li>
            <li>{{ instructor.標語 }}</li>
          </ul>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
