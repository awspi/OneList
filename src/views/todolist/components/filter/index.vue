<template>
  <transition name="slide">
    <div
      class="h-screen flex flex-col items-stretch border-r border-main-border"
    >
      <!-- time-list  -->
      <div
        v-for="item in timeList"
        :key="item.name"
        v-track="{
          triggerType: TRIGGER_TYPE_CLICK,
          currentUrl: $route.path,
          behavior: '浏览filter功能',
          actionType: '用户操作'
        }"
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
          'bg-main/20': item.type === $store.getters.currentFilter,
          ' cursor-not-allowed':
            item.type === FILTER_TRASH || item.type === FILTER_LOG
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
import { useStore } from 'vuex'
import { getAllTaskList } from '@/api/task'
import { onMounted } from 'vue'
import { TRIGGER_TYPE_BROWSE, TRIGGER_TYPE_CLICK } from '@/constants'
const store = useStore()
const timeList = [
  { icon: 'filter', title: '所有', type: FILTER_ALL },
  { icon: 'filter', title: '今天', type: FILTER_TODAY },
  { icon: 'filter', title: '最近7天', type: FILTER_WEEK },
  { icon: 'filter', title: '最近一个月', type: FILTER_MONTH }
]
const condList = [
  { icon: 'done', title: '已完成', type: FILTER_DONE }
  // { icon: 'recycle', title: '垃圾桶', type: FILTER_TRASH },
  // { icon: 'data-screen', title: '摘要', type: FILTER_LOG }
]

/**
 * 点击筛选条件
 * @param {*} item
 */
const onFilterCLickHandler = (item) => {
  console.log(item)
  //保存当前条件 用于高亮
  store.commit('app/setCurrentFilter', item.type)
  store.commit('task/setListTitle', item.title)
  //筛选
  switch (item.type) {
    case FILTER_ALL:
      store.commit('task/clearTaskList')
      store.dispatch('task/initTaskList')
      break
    case FILTER_TODAY:
      filterByTime(item.type)
      break
    case FILTER_WEEK:
      filterByTime(item.type)
      break
    case FILTER_MONTH:
      filterByTime(item.type)
      break
    case FILTER_DONE:
      filterByState()
      break

    default:
      break
  }
}

/**
 * 根据条件筛选
 */

const filterByTime = async (type) => {
  const res = await getAllTaskList()
  const list = res.lists
  let afterList = []
  if (type === FILTER_TODAY) {
    //今日任务
    afterList = list.filter((item) => {
      return item.startTime !== item.endTime
        ? moment().isBetween(item.startTime, item.endTime)
        : moment().isSame(item.startTime, 'day')
    })
  }
  if (type === FILTER_WEEK) {
    afterList = list.filter((item) => {
      return (
        moment().weekday(1).isBefore(item.endTime) ||
        moment().weekday(7).isAfter(item.startTime)
      )
    })
  }
  if (type === FILTER_MONTH) {
    afterList = list.filter((item) => {
      return (
        moment().startOf('month').isBefore(item.endTime) ||
        moment().endOf('month').isAfter(item.startTime)
      )
    })
  }
  console.log(afterList)
  store.commit('task/clearTaskList')
  afterList.forEach((item) => {
    store.commit('task/addTask', { priority: item.priority, taskItem: item })
  })
}
const filterByState = async () => {
  const res = await getAllTaskList()
  const list = res.lists
  const afterList = list.filter((item) => item.state?.toString() === '1')
  store.commit('task/clearTaskList')
  afterList.forEach((item) => {
    store.commit('task/addTask', { priority: item.priority, taskItem: item })
  })
}

onMounted(() => {
  store.commit('app/setCurrentFilter', FILTER_ALL)
  store.commit('task/clearTaskList')
  store.dispatch('task/initTaskList')
})
</script>

<style lang="scss" scoped></style>
