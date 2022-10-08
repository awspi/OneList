<template>
  <div
    class="h-screen mt-4 px-7 text-main-text border-r border-main-border overflow-y-auto"
  >
    <div class="sticky top-0 bg-main-bg pb-3 border-b border-main-gray-2">
      <!-- filter-name -->
      <div class="text-4xl mb-2">{{ store.getters.listTitle }}</div>
      <!-- addtask -->
      <add-task-vue></add-task-vue>
    </div>

    <!-- collapse -->
    <collapse-vue v-bind="store.getters.task_group_first" class="my-5">
    </collapse-vue>
    <collapse-vue v-bind="store.getters.task_group_second" class="my-5">
    </collapse-vue>
    <collapse-vue v-bind="store.getters.task_group_third" class="my-5">
    </collapse-vue>
    <collapse-vue v-bind="store.getters.task_group_fourth" class="my-5">
    </collapse-vue>
  </div>
</template>

<script setup>
import collapseVue from './collapse.vue'
import addTaskVue from './addTask.vue'
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="scss" scoped></style>
