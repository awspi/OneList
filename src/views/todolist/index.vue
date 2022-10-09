<template>
  <div class="bg-main-bg flex" @click="() => (isVisible = !isVisible)">
    <!-- filter -->
    <filter-vue class="w-1/6 min-w-[180px]"></filter-vue>
    <!-- list -->
    <list-vue class="w-5/12 min-w-[420px]"></list-vue>
    <!-- detail -->
    <detail-vue class="w-5/12 min-w-[420px]"></detail-vue>
  </div>
</template>

<script setup>
import filterVue from './components/filter/index.vue'
import listVue from './components/list/index.vue'
import detailVue from './components/detail/index.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
onMounted(() => {
  // store.dispatch('task/initTaskList')
})
</script>

<style lang="scss" scoped></style>
