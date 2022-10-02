<template>
  <div
    class="h-screen pt-4 px-7 text-main-text border-r border-main-border overflow-y-auto"
  >
    <!-- filter-name -->
    <div class="text-4xl mb-2">所有</div>
    <!-- addtask -->
    <add-task-vue></add-task-vue>
    <!-- collapse -->
    <collapse-vue v-bind="list1" class="my-5"> </collapse-vue>
    <collapse-vue v-bind="list2" class="my-5"> </collapse-vue>
    <collapse-vue v-bind="list3" class="my-5"> </collapse-vue>
    <collapse-vue v-bind="list4" class="my-5"> </collapse-vue>
    <!-- collapse -->
    <!-- <div class="flex justify-between ">
      <collapse-vue v-bind="list1" class="mr-5 mt-5 flex-grow" />
      <collapse-vue v-bind="list2" class="mr-5 mt-5 flex-grow" />
      <collapse-vue v-bind="list3" class="mr-5 mt-5 flex-grow" />
      <collapse-vue v-bind="list4" class="mt-5 flex-grow" />
    </div> -->
  </div>
</template>

<script setup>
import moment from 'moment'
import collapseVue from './collapse.vue'
import addTaskVue from './addTask.vue'

const list1 = {
  title: '重要且紧急',
  items: [
    { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
    { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
    { title: '吃晚饭', time: moment(new Date()).format('YYYY-MM-DD') }
  ],
  titleClass: 'text-pro-1'
}
const list2 = {
  title: '重要但不紧急',
  items: [
    { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
    { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
    { title: '吃晚饭', time: moment(new Date()).format('YYYY-MM-DD') }
  ],
  titleClass: 'text-pro-2'
}
const list3 = {
  title: '不重要但紧急',
  items: [
    { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
    { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
    { title: '吃晚饭', time: moment(new Date()).format('YYYY-MM-DD') }
  ],
  titleClass: 'text-pro-3'
}
const list4 = {
  title: '不重要且不紧急',
  items: [
    { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
    { title: '吃早饭', time: moment(new Date()).format('YYYY-MM-DD') },
    { title: '吃晚饭', time: moment(new Date()).format('YYYY-MM-DD') }
  ],
  titleClass: 'text-pro-4'
}
</script>

<style lang="scss" scoped></style>
