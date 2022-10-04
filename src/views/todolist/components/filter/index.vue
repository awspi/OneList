<template>
  <transition name="slide">
    <div
      class="h-screen flex flex-col items-stretch border-r border-main-border"
    >
      <!-- time-list  -->
      <div
        v-for="item in timeList"
        :key="item.name"
        class="flex items-center hover:bg-main/20 mx-3 rounded-md py-2 pl-3 mt-3 cursor-pointer duration-150"
        :class="{
          'bg-main/20': item.type === $store.getters.currentFilter
        }"
        @click="onFilterCLickHandler(item)"
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
        :class="{
          'bg-main/20': item.type === $store.getters.currentFilter
        }"
        @click="onFilterCLickHandler(item)"
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
import {
  FILTER_ALL,
  FILTER_TODAY,
  FILTER_WEEK,
  FILTER_MONTH,
  FILTER_DONE,
  FILTER_TRASH,
  FILTER_LOG
} from '@/constants'
import moment from 'moment'
import { getCurrentInstance, onBeforeMount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const instance = getCurrentInstance()
const proxy = instance.appContext.config.globalProperties
const timeList = [
  { icon: 'filter', title: '所有', type: FILTER_ALL },
  { icon: 'filter', title: '今天', type: FILTER_TODAY },
  { icon: 'filter', title: '最近7天', type: FILTER_WEEK },
  { icon: 'filter', title: '最近一个月', type: FILTER_MONTH }
]
const condList = [
  { icon: 'done', title: '已完成', type: FILTER_DONE },
  { icon: 'recycle', title: '垃圾桶', type: FILTER_TRASH },
  { icon: 'data-screen', title: '摘要', type: FILTER_LOG }
]
//-----------------------
// const list1 = {
//   title: '重要且紧急',
//   items: [
//     { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
//     { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
//     { title: '吃晚饭', time: moment(new Date()).format('YYYY-MM-DD') }
//   ],
//   titleClass: 'text-pro-1'
// }
//-----------------------
// store.commit('task/setTask', {
//   key: 'pro_1',
//   val: {
//     title: '重要且紧急',
//     items: [
//       { title: '吃早饭', time: '2022-10-041' },
//       { title: '吃早饭', time: '2022-10-04' },
//       { title: '吃早饭', time: '2022-10-04' }
//     ],
//     titleClass: 'text-pro-1'
//   }
// })
/**
 * 点击筛选条件
 * @param {*} item
 */
const onFilterCLickHandler = (item) => {
  console.log(item)
  //保存当前条件 用于高亮
  store.commit('app/setCurrentFilter', item.type)
  //修改store
}
/**
 * ? 默认显示所有任务
 */

const findTitle = () => {
  const list = [...timeList, ...condList]
  const target = list.find((item) => {
    return item.type === store.getters.currentFilter
  })
  console.log(target)
  return target.title
}
/**
 * 根据条件筛选
 */
const filterByTime = () => {}
const filterByState = () => {}
console.log(moment().startOf('day').format('YYYY-MM-DD HH:MM:SS'))
</script>

<style lang="scss" scoped></style>
