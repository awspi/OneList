<template>
  <transition name="slide">
    <div
      class="h-screen flex flex-col items-stretch border-r border-main-border"
    >
      <!-- time-list  -->
      <div
        v-for="item in timeList"
        :key="item.name"
        class="flex items-center hover:bg-main/20 mx-3 rounded-md py-2 pl-3 mt-3 cursor-pointer"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-7 h-7 p-1 rounded-md hover:scale-95 duration-150 cursor-pointer"
          fill-class="text-main-gray"
        ></m-svg-icon>
        <p class="text-md font-semibold text-main-gray">{{ item.title }}</p>
      </div>
      <!-- br -->
      <div class="w-full h-[1px] bg-main-border mt-3"></div>
      <!-- cond-list -->
      <div
        v-for="item in condList"
        :key="item.name"
        class="flex items-center hover:bg-main/20 mx-3 rounded-md py-2 pl-3 mt-3 cursor-pointer"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-7 h-7 p-1 mr-2 rounded-md hover:scale-95 duration-150 cursor-pointer"
          fill-class="text-main-gray"
        ></m-svg-icon>
        <p class="text-md font-semibold text-main-gray">{{ item.title }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const timeList = [
  { icon: 'filter', title: '所有' },
  { icon: 'filter', title: '今天' },
  { icon: 'filter', title: '最近7天' },
  { icon: 'filter', title: '最近一个月' }
]
const condList = [
  { icon: 'done', title: '已完成' },
  { icon: 'recycle', title: '垃圾桶' },
  { icon: 'data-screen', title: '摘要' }
]
const isDialogVisible = ref(true)
</script>

<style lang="scss" scoped></style>
