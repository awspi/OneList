<template>
  <div class="h-screen bg-main-shallow flex flex-col items-center">
    <!-- avatar -->
    <m-popover placement="bottom-right">
      <!-- 触发层 -->
      <template #reference>
        <m-avatar
          src="https://img9.vilipix.com/picture/logo/2022/05/01/19/30/22652455_da3716e7a44e66b9c49b17f3fec20438_170.jpg"
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
            class="w-7 h-7 m-2 -1"
            fill-class="text-main-gray"
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()

const list = [
  { name: 'todolist', route: '/' },
  { name: 'calendar', route: '/calendar' },
  { name: 'clock', route: '/clock' },
  { name: 'statistic', route: '/statistic' }
]
const btnArr = [
  { icon: 'todolist', name: '同步' },
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
