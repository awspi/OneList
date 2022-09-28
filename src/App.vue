<template>
  <!-- 一级路由出口 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <router-view> </router-view>
  </div>
</template>

<script setup>
console.log('import.url', import.meta.env.VITE_BASE_API)
</script>

<style lang="scss" scoped></style>
