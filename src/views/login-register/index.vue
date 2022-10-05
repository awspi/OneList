<template>
  <div
    class="h-screen bg-gradient-to-tr from-blue-300 to-white flex justify-center items-center"
  >
    <!-- intro -->
    <div class="min-w-[400px]">
      <div class="flex items-center">
        <m-svg-icon name="todo" class="w-16 h-16"></m-svg-icon>
        <p class="text-3xl text-zinc-900">一个清单</p>
      </div>
      <p class="text-7xl">新一代简洁清单软件</p>
      <p class="mt-5 text-zinc-500">简洁，清爽，高效是我们一直追求的目标</p>
    </div>
    <!-- 登录/注册 -->
    <div
      class="w-[500px] h-[600px] flex-shrink-0 ml-24 bg-white rounded-md shadow-xl relative"
    >
      <!-- title -->
      <div class="flex justify-center border-b border-bg-gray-800 px-10">
        <router-link
          to="/login"
          class="text-3xl inline-block pb-5 pt-12 pl-12 pr-12 duration-150"
          :class="{ ' border-b border-blue-700': $route.path === '/login' }"
          >登录</router-link
        >
        <router-link
          to="/register"
          class="text-3xl inline-block pl-12 pr-12 pb-5 pt-12 duration-150"
          :class="{ ' border-b border-blue-700': $route.path === '/register' }"
          >注册</router-link
        >
      </div>
      <!-- login/register cpn -->
      <div class="mt-16">
        <login-vue v-if="$route.path === '/login'"></login-vue>
        <register-vue v-else></register-vue>
      </div>
      <p
        class="absolute bottom-1 right-2 text-sm text-zinc-400 w-80 text-right p-4 mt-4"
      >
        小而美 team
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import loginVue from './components/login.vue'
import registerVue from './components/register.vue'
</script>

<style lang="scss" scoped></style>
