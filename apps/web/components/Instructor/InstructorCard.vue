<script setup lang="ts">
import type { InstructorSchemaType } from '~/schema/instructor'

interface IProps {
  instructor: InstructorSchemaType
}
defineProps<IProps>()

// https://www.ripple-ui.com/docs/components/accordion
// Accordion on click will collapse the other open accordions
const focusable = ref(false)
</script>

<template>
  <div class="{block;content:'';h:1;bg:divider;w:full;my:5x}::after {my:10x}::after@tablet {hidden}:last::after my:5x">
    <div class="{flex;flex:col} {flex:row;gap:10x}@tablet">
      <div class="flex:1">
        <div class="rel aspect:4/3">
          <VideoPlayerCover aspect="4/3" class="{abs;inset:0;full} ~300ms|ease_img r:2x" :img="instructor.照片?.[0]" :alt="instructor.名稱" />
        </div>
        <!-- <div class="{aspect:inherit;object:cover}_img aspect:4/3 overflow:hidden r:2x">
          <Image :src="instructor.照片[0]" :alt="instructor.名稱" class="~300ms|ease pointer-events:none user-select:none" />
        </div> -->
        <h2 class="h2 fg:primary mt:3x">{{ instructor.名稱 }} {{ instructor.英文名 }}</h2>
        <h3 class="h3 mt:1x">{{ instructor.頭銜 }}</h3>
        <div class="list b1-r mt:4x">
          <ul>
            <li>{{ instructor.工作經驗 }} 年收納工作經驗</li>
            <li>{{ instructor.教學經驗 }} 年教學經驗</li>
          </ul>
        </div>
      </div>
      <div class="flex:2">
        <input :id="`i-${instructor.ID}`" name="i" :type="focusable ? `radio` : `checkbox`" class="hidden" />
        <div class="accordion-content {accordion-content--open}@tablet">
          <div>
            <div class="b1-m bg:home fg:primary mt:4x mt:0@tablet p:5x|6x r:5x">
              {{ instructor.標語 }}
            </div>

            <div v-if="instructor.專業認證?.length" class="mt:4x mt:7x@tablet">
              <p class="b1-m flex rel {abs;middle;left:0;content:'';w:1.5x;bg:font-title/.2}::before fg:font-title pl:3.5x"> 專業認證</p>
              <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                <ul>
                  <li v-for="(item, idx) in instructor.專業認證" :key="`${instructor.ID}-專業認證-${idx}`">{{ item }}</li>
                </ul>
              </div>
            </div>

            <div v-if="instructor?.服務經驗" class="mt:4x mt:7x@tablet">
              <p class="b1-m flex rel {abs;middle;left:0;content:'';w:1.5x;bg:font-title/.2}::before fg:font-title pl:3.5x"> 服務經驗</p>
              <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                {{ instructor?.服務經驗 }}
              </div>
            </div>

            <div v-if="instructor.受邀講座?.length" class="mt:4x mt:7x@tablet">
              <p class="b1-m flex rel {abs;middle;left:0;content:'';w:1.5x;bg:font-title/.2}::before fg:font-title pl:3.5x"> 受邀講座</p>
              <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                <ul>
                  <li v-for="(item, idx) in instructor.受邀講座" :key="`${instructor.ID}-受邀講座-${idx}`">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <label :for="`i-${instructor.ID}`" class="block hidden@tablet :checked~{block!}>.close :checked~{hidden}>.open mt:2x text:center">
          <Iconify class="open" icon="material-symbols-light:keyboard-arrow-down">展開詳細介紹</Iconify>
          <Iconify class="close hidden!" icon="material-symbols-light:keyboard-arrow-up">收合詳細介紹</Iconify>
        </label>
      </div>
    </div>
  </div>
</template>
