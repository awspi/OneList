<template>
  <vee-form class="flex flex-col items-center">
    <vee-field
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
      type="password"
      class="outline-none rounded px-2 mt-6 w-80 h-14 focus:bg-white focus:border-blue-500/70 bg-gray-200 border text-lg active: text-gray-800 placeholder-gray-400 focus:outline-none duration-300"
      name="password"
      placeholder="请输入密码"
      autocomplete="on"
      :rules="validatePassword"
    />
    <vee-error-message
      class="text-sm text-red-600 block mt-0.5 text-left"
      name="password"
    />
    <vee-field
      type="password"
      class="outline-none rounded px-2 mt-6 w-80 h-14 focus:bg-white focus:border-blue-500/70 bg-gray-200 border text-lg active: text-gray-800 placeholder-gray-400 focus:outline-none duration-300"
      placeholder="请重复密码"
      name="confirmPassword"
      autocomplete="on"
      rules="validateConfirmPassword:@password"
    />
    <vee-error-message
      class="text-sm text-red-600 block mt-0.5 text-left"
      name="confirmPassword"
    />
    <div>
      <input type="checkbox" value="agree" name="" class="mt-6 mr-1" />
      <span class="text-sm text-zinc-400"
        >我已阅读并同意<span
          class="underline p-1 hover:text-zinc-500 cursor-pointer"
          >服务协议</span
        ></span
      >
    </div>
    <button class="w-80 h-14 mt-6 rounded bg-blue-700 text-white">注册</button>
  </vee-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate'
/**
 * ?插入规则
 */
defineRule('validateConfirmPassword', validateConfirmPassword)

const router = useRouter()
const store = useStore()

/**
 * register表单
 */
const regForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
// 按钮loading状态
const loading = ref(false)

/**
 * 用户注册行为
 */
const onLogin = async () => {
  loading.value = true
  console.log(regForm)
  const payload = {
    username: regForm.value.username,
    password: regForm.value.password
  }
  //执行注册操作
  try {
    await store.dispatch('user/register', {
      ...payload
    })
    // 注册成功，触发登录
    await store.dispatch('user/login', {
      ...payload
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
