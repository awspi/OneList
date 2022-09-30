<template>
  <vee-form class="flex flex-col items-center" @submit="onLogin">
    <vee-field
      v-model="loginForm.username"
      type="text"
      class="outline-none rounded px-2 w-80 h-14 focus:bg-white focus:border-blue-500/70 bg-gray-200 border text-lg active: text-gray-800 placeholder-gray-400 focus:outline-none"
      name="username"
      placeholder="请输入账号"
      autocomplete="on"
      :rules="validateUsername"
    />
    <vee-error-message
      class="text-sm text-red-600 block mt-0.5 text-left"
      name="username"
    />
    <vee-field
      v-model="loginForm.password"
      type="password"
      class="outline-none rounded px-2 mt-8 w-80 h-14 focus:bg-white focus:border-blue-500/70 bg-gray-200 border text-lg active: text-gray-800 placeholder-gray-400 focus:outline-none duration-300"
      name="password"
      placeholder="请输入密码"
      autocomplete="on"
      :rules="validatePassword"
    />
    <vee-error-message
      class="text-sm text-red-600 block mt-0.5 text-left"
      name="password"
    />
    <m-button
      class="w-80 h-14 mt-8 rounded"
      :loading="loading"
      :is-active-anim="true"
      type="main"
      >登录</m-button
    >
  </vee-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
const router = useRouter()
const store = useStore()

/**
 * login表单
 */
const loginForm = ref({
  username: 'admin',
  password: '123456'
})
// 按钮loading状态
const loading = ref(false)
/**
 * 登录
 */
const onLogin = async () => {
  loading.value = true
  console.log(loginForm)
  //执行登录操作
  try {
    await store.dispatch('user/login', {
      ...loginForm.value
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
