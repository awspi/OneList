<template>
  <div class="h-screen bg-main-shallow flex flex-col items-center">
    <!-- avatar -->

    <m-avatar
      src="https://img9.vilipix.com/picture/logo/2022/05/01/19/30/22652455_da3716e7a44e66b9c49b17f3fec20438_170.jpg"
      class="w-[72px] mt-6"
    ></m-avatar>
    <!-- route-list  -->
    <template v-for="item in list" :key="item.name">
      <router-link :to="item.route">
        <m-svg-icon
          :name="item.name"
          class="mt-6 w-12 h-12 p-1 rounded-md hover:scale-95 duration-150 cursor-pointer hover:bg-main/20"
          fill-class="text-white"
          :class="{ 'bg-main/20': $route.path == item.route }"
        ></m-svg-icon>
      </router-link>
    </template>

    <!-- setting -->
    <router-link to="/setting" class="mt-auto mb-10">
      <m-svg-icon
        name="setting"
        class="mt-6 w-12 h-12 p-1 rounded-full hover:scale-95 hover:bg-main/20 duration-150 cursor-pointer"
        fill-class="text-white"
      ></m-svg-icon
    ></router-link>
    {{ $route.path }}
  </div>
</template>

<script setup>
const list = [
  { name: 'todolist', route: '/' },
  { name: 'calendar', route: '/calendar' },
  { name: 'clock', route: '/clock' },
  { name: 'statistic', route: '/statistic' }
]
</script>

<style lang="scss" scoped></style>
