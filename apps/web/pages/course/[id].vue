<script setup lang="ts">
import { formatThousand } from '@alanlu-dev/utils'
import type { CourseSchemaType } from '~/schema/course'
import type { MetaSchemaType } from '~/schema/meta'

const route = useRoute()
const id = route.params.id

const { data: course } = await useApiFetch<CourseSchemaType>(`/api/course/${id}`, { query: route.query })

const { data: meta } = await useApiFetch<MetaSchemaType>(`/api/meta${route.fullPath === '/' ? '/index' : route.fullPath}`)

useHead({
  titleTemplate: !meta.value || meta.value?.後墜 ? '%s %separator %siteName' : '%s',
})

useSeoMeta({
  title: () => meta.value?.標題 || course.value?.名稱 || (route.name as string),
  description: () => meta.value?.描述 || course.value?.課程基礎資訊?.課程特色.join('、'),
  ogImage: () => meta.value?.圖片 || course.value?.課程照片[0] || '/meta2.png',
})
</script>

<template>
  <div>
    <Breadcrumb :title="course?.名稱" />

    <section class="{max-w:screen-max;mx:auto}" data-aos="fade-up ">
      <div class="{flex;ai:flex-start;jc:space-between;flex:wrap} {gap:7.5x}@desktop mt:5x text:center">
        <div class="{flex;flex:col;gap:5x} {pr:0;pl:10x}@md flex:1 overflow:hidden px:6x">
          <div>
            <VideoPlayerCover aspect="16/9" :video="course?.影音連結" class="r:2x" :img="course?.課程照片?.[0]" />
          </div>

          <div class="bg:#FAFAFA p:6x|10x r:2x text:left">
            <h3 class="h3 rel {abs;middle;left:0;content:'';w:1.5x;bg:primary}::before fg:primary jc:stretch pl:3.5x"> 關於課程</h3>
            <div class="b1-r {flex;flex:col;gap:5x;flex:wrap} {flex:row}@tablet flex:1>div mt:3x">
              <div>
                <p>課程大綱：</p>
                <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                  <ul v-if="course?.課程基礎資訊?.課程大綱?.length">
                    <li v-for="(item, idx) in course?.課程基礎資訊?.課程大綱" :key="`課程大綱-${idx}`">{{ item }}</li>
                  </ul>
                </div>
              </div>
              <div>
                <p>結業獲得：</p>
                <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                  <ul v-if="course?.課程基礎資訊?.結業獲得?.length">
                    <li v-for="(item, idx) in course?.課程基礎資訊?.結業獲得" :key="`結業獲得-${idx}`">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="{flex;center-content;gap:10x;flex:wrap} mt:10x text:center">
              <div>
                <p>課程時長</p>
                <div class="round {flex;flex:col;center-content} bg:white mt:1x size:40x">
                  <p class="h1 title fg:primary"> {{ course?.課程基礎資訊?.課程時長 || 0 }} </p>
                  <p>小時</p>
                </div>
              </div>
              <div>
                <p>單元數</p>
                <div class="round {flex;flex:col;center-content} bg:white mt:1x size:40x">
                  <p class="h1 title fg:primary"> {{ course?.課程基礎資訊?.單元數 || 0 }} </p>
                  <p>單元</p>
                </div>
              </div>
              <div>
                <p>結業人數</p>
                <div class="round {flex;flex:col;center-content} bg:white mt:1x size:40x">
                  <p class="h1 title fg:primary"> {{ course?.課程基礎資訊?.結業人數 || 0 }} </p>
                  <p>人</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg:#FAFAFA p:6x|10x r:2x text:left">
            <h3 class="h3 rel {abs;middle;left:0;content:'';w:1.5x;bg:primary}::before fg:primary jc:stretch pl:3.5x"> 在這堂課，你可以學到</h3>
            <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
              <ul v-if="course?.課程基礎資訊?.可以學到?.length">
                <li v-for="(item, idx) in course?.課程基礎資訊?.可以學到" :key="`可以學到-${idx}`">{{ item }}</li>
              </ul>
            </div>
          </div>

          <div class="bg:#FAFAFA p:6x|10x r:2x text:left">
            <h3 class="h3 rel {abs;middle;left:0;content:'';w:1.5x;bg:primary}::before fg:primary jc:stretch pl:3.5x"> 上課前的準備</h3>
            <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
              <ul v-if="course?.課程基礎資訊?.課前準備?.length">
                <li v-for="(item, idx) in course?.課程基礎資訊?.課前準備" :key="`課前準備-${idx}`">{{ item }}</li>
              </ul>
            </div>
          </div>

          <div class="bg:#FAFAFA p:6x|10x r:2x text:left">
            <h3 class="h3 rel {abs;middle;left:0;content:'';w:1.5x;bg:primary}::before fg:primary jc:stretch pl:3.5x"> 關於講師</h3>
            <!-- <InstructorCard v-for="instructor in course?.講師資訊" :key="instructor?.ID" :instructor="instructor!" /> -->

            <div v-for="instructor in course?.可授課講師資訊" :key="instructor?.ID" class="{flex;flex:col;ai:flex-start;jc:flex-start;gap:5x;flex:wrap} {flex:row}@desktop mt:5x mt:10x@tablet">
              <div class="flex:1 min-w:100% min-w:40%@desktop order:2@desktop overflow:hidden r:2x">
                <div class="rel aspect:4/3">
                  <VideoPlayerCover aspect="4/3" class="{abs;inset:0;full} r:2x" :img="instructor?.照片?.[0]" :alt="instructor?.名稱" />
                </div>
                <!-- <div class="{aspect:inherit;object:cover}_img aspect:4/3 overflow:hidden r:2x">
                  <Image :src="instructor?.照片[0]" :alt="instructor?.名稱" />
                </div> -->
              </div>
              <div class="flex:2">
                <h3 class="h3">{{ instructor?.名稱 }} {{ instructor?.英文名 }}</h3>
                <p class="b1-m mt:1x">{{ instructor?.頭銜 }}</p>
                <div class="list b1-r mt:2x mt:3x@tablet pl:0.5x@tablet">
                  <ul class="fg:font-title mt:4x">
                    <li>{{ instructor?.工作經驗 }} 年收納工作經驗</li>
                    <li>{{ instructor?.教學經驗 }} 年教學經驗</li>
                    <li>{{ instructor?.標語 }}</li>
                    <li>
                      <p>專業認證：</p>
                      <ul class="list-style-type:circle!">
                        <li v-for="(item, idx) in instructor?.專業認證" :key="`專業認證-${idx}`">{{ item }}</li>
                      </ul>
                    </li>
                    <li>
                      <p>服務經驗：</p>
                      <ul class="list-style-type:circle!">
                        <li>{{ instructor?.服務經驗 }}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <nuxt-link to="/course" class="inline-block mb:5x mx:auto text:center">
            <Iconify icon="material-symbols-light:arrow-right-alt">返回列表</Iconify>
          </nuxt-link>
        </div>

        <div class="{sticky;bottom;left} {top:calc(74+2x);left:unset;bottom:unset;max-w:screen-tablet;mb:4x;mr:10x;r:2x}@desktop bg:base-bg p:5x|6x shadow:all text:left w:full z:nav">
          <input id="Registration" name="Registration" type="checkbox" class="hidden {accordion-content--open}:checked~div_.accordion-content" />

          <div class="accordion-content {accordion-content--open}@desktop">
            <div>
              <div class="{flex;flex:col;ai:flex-start;jc:flex-start}">
                <h2 class="h3">{{ course?.名稱 }}</h2>
                <hr class="hidden@tablet&<desktop bg:#C9C9C9 h:1 my:2x w:full" />
                <ul class="b1-r {flex;flex:col;gap:2x} {gap:3x}@desktop my:6x">
                  <li v-for="(item, idx) in course?.課程基礎資訊?.課程特色" :key="`課程特色-${idx}`" class="{flex;gap:2x}">
                    <span class="fg:#3C8922">
                      <Icon name="octicon:check-16" />
                    </span>
                    <span> {{ item }}</span>
                  </li>
                </ul>
              </div>

              <div class="{flex;ai:flex-end;jc:space-between;gap:5x;flex:wrap}">
                <template v-if="course?.課程場次資訊?.[0]">
                  <div class="b1-r {flex;flex:col;gap:2x} {gap:3x}@desktop">
                    <p>
                      <span class="fg:font-title">上課日期：</span>
                      <span>{{ course?.課程場次資訊?.[0]?.上課日期?.[0] }}</span>
                    </p>
                    <p>
                      <span class="fg:font-title">上課時間：</span>
                      <span>{{ course?.課程場次資訊?.[0]?.上課日期?.[1] }}</span>
                    </p>
                    <p>
                      <span class="fg:font-title">上課地點：</span>
                      <span>{{ course?.課程場次資訊?.[0]?.教室資訊?.地址 }}</span>
                    </p>
                  </div>

                  <div class="{mt:0}@desktop {w:30%}@tablet&<desktop w:full">
                    <p v-if="course?.課程場次資訊?.[0]?.指定價格" class="h2 nowrap {flex;ai:flex-end;gap:2x;flex:wrap} text:right@tablet&<desktop">
                      <span class="b1-r fg:divider text:line-through">NT$ {{ formatThousand(course?.價格) }}</span>
                      <span class="fg:accent">NT$ {{ formatThousand(course?.課程場次資訊?.[0]?.指定價格) }}</span>
                    </p>
                    <p v-else class="h2 nowrap fg:accent text:right@tablet&<desktop">NT$ {{ formatThousand(course?.價格) }}</p>
                    <NuxtLink :to="`/checkout/${course?.課程場次資訊?.[0].ID}`" class="btn btn--primary mt:5x mt:4x@tablet&<desktop w:full">立即報名 </NuxtLink>
                  </div>
                </template>
                <template v-else>
                  <div class="fg:divider mx:auto">尚無課程場次</div>
                </template>
              </div>
            </div>
          </div>
          <label for="Registration" class="hidden@desktop :checked~{opacity:0.5;mb:-4x} {flex;center-content}">
            <Iconify class="hidden@desktop :checked~label_{hidden}" icon="material-symbols-light:keyboard-arrow-up"> 展開課程資訊 </Iconify>
            <Iconify class="hidden! hidden!@desktop :checked~label_{block!} fg:divider!" icon="material-symbols-light:keyboard-arrow-down">收合課程資訊</Iconify>
          </label>
        </div>
      </div>
    </section>
  </div>
</template>
