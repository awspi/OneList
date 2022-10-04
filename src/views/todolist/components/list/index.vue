<template>
  <div
    class="h-screen pt-4 px-7 text-main-text border-r border-main-border overflow-y-auto"
  >
    <!-- filter-name -->
    <div class="text-4xl mb-2">{{ store.getters.listTitle }}</div>
    <!-- addtask -->
    <add-task-vue></add-task-vue>
    <!-- collapse -->
    <collapse-vue v-bind="store.getters.pro_1" class="my-5"> </collapse-vue>
    <collapse-vue v-bind="store.getters.pro_2" class="my-5"> </collapse-vue>
    <collapse-vue v-bind="store.getters.pro_3" class="my-5"> </collapse-vue>
    <collapse-vue v-bind="store.getters.pro_4" class="my-5"> </collapse-vue>
  </div>
</template>

<script setup>
import collapseVue from './collapse.vue'
import addTaskVue from './addTask.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()
</script>

<style lang="scss" scoped></style>
