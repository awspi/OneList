<template>
  <div class="h-screen bg-main-shallow flex flex-col items-center">
    <!-- avatar -->
    <m-popover placement="bottom-right">
      <!-- 触发层 -->
      <template #reference>
        <m-avatar
          :src="
            $store.getters.userInfo.img ||
            'http://img9.vilipix.com/picture/logo/2021/01/16/19/39/19610301_3f750ac7559f829ee2fdab2a25637e07_170.jpg'
          "
          class="w-[72px] mt-6"
        ></m-avatar>
      </template>
      <!-- 弹出层 -->
      <div class="w-32 overflow-hidden">
        <div
          v-for="item in btnArr"
          :key="item.name"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/80"
          @click="onItemClick(item)"
        >
          <m-svg-icon
            :name="item.icon"
            class="w-7 h-7 m-2 -1 text-main-gray"
            fill-class="fill-main-gray"
          ></m-svg-icon>
          <span class="text-main-gray w-full text-lg text-center">{{
            item.name
          }}</span>
        </div>
      </div>
    </m-popover>

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
    <router-link to="/setting/setupCenter" class="mt-auto mb-10">
      <m-svg-icon
        name="setting"
        class="mt-6 w-12 h-12 p-1 rounded-full hover:scale-95 hover:bg-main/20 duration-150 cursor-pointer text-white"
      ></m-svg-icon
    ></router-link>
    <!-- 头像 -->
    <input
      v-show="false"
      ref="inputFileTarget"
      type="file"
      accept=".png, .jpeg, .jpg, .gif"
      @change="onSelectImgHandler"
    />
    <m-dialog v-model="isDialogVisible">
      <change-avatar-vue
        :blob="currentBlob"
        @close="isDialogVisible = false"
      ></change-avatar-vue>
    </m-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import changeAvatarVue from './change-avatar.vue'
const store = useStore()
const router = useRouter()
/**
 * 更新头像
 */
const isDialogVisible = ref(false)
const inputFileTarget = ref(null)
const currentBlob = ref('')

/**
 * onSelectImgHandler
 * !当两次选择文件是同一个的时候,change的回调不会再次被触发->每次选择图片不再被使用时,清空掉inputFileTarget.value
 */
const onSelectImgHandler = () => {
  const imgFile = inputFileTarget.value.files[0]
  // 生成 blob 对象
  const blob = URL.createObjectURL(imgFile)
  currentBlob.value = blob
  isDialogVisible.value = true
  console.log(currentBlob)
}
watch(isDialogVisible, (val) => {
  if (!val) {
    inputFileTarget.value.value = null
  }
})
//list

const list = [
  { name: 'todolist', route: '/' }
  // { name: 'calendar', route: '/calendar' }
  // { name: 'clock', route: '/clock' },
  // { name: 'statistic', route: '/statistic' }
]
const btnArr = [
  { icon: 'todolist', name: '同步' },
  { icon: 'avatar', name: '更换头像' },
  { icon: 'setting', name: '设置' },
  { icon: 'logout', name: '退出' }
]

const onItemClick = (btn) => {
  switch (btn.name) {
    case '同步':
      store.dispatch('task/initTaskList')
      break
    case '设置':
      //跳转到setting
      router.push('/setting')
      break
    case '更换头像':
      inputFileTarget.value.click()
      break
    case '退出':
      //todo 更新vuex->清除token
      //跳转到login
      store.dispatch('user/logout')
      router.push('/login')
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped></style>
