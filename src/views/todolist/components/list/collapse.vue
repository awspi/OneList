<template>
  <div class="bg-white py-2 rounded-md shadow-sm shadow-white/70 duration-150">
    <!-- title -->
    <div
      :class="titleClass"
      class="flex items-center font-semibold tracking-wide cursor-pointer"
      @click="isCollapse = !isCollapse"
    >
      <m-svg-icon
        name="down"
        fill-class="text-main-text"
        class="w-8 h-8 p-1.5 duration-150 mr-1"
        :class="{ '-rotate-90': isCollapse }"
        @click="isCollapse = !isCollapse"
      ></m-svg-icon>
      <p>{{ title }}</p>
    </div>
    <!-- items -->
    <template v-for="item in items" :key="item.title">
      <div
        v-show="!isCollapse"
        class="flex items-center cursor-pointer"
        @click="onTaskClick(item)"
      >
        <m-svg-icon
          name="circle"
          :fill-class="titleClass"
          class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
        ></m-svg-icon>
        <div
          class="w-full text-main-text border-b border-main-border mr-6 flex items-center justify-between pr-2"
        >
          <p>{{ item.title }}</p>
          <p class="text-xs">{{ item.time }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
const instance = getCurrentInstance()
const proxy = instance.appContext.config.globalProperties
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  title: {
    type: String
  },
  titleClass: {
    type: String,
    default: 'text-pro-4'
  }
})
/**
 * 是否折叠
 */

const isCollapse = ref(false)

/**
 * 任务被点击 打开detail
 */
const onTaskClick = () => {
  //控制detail显示
  proxy.$mitt.emit('detail', {
    name: `Leetcode${Math.random()}`,
    desc: '这里发生的是远程接收到更新，并且git-flow要求在合并功能之前将develop和origin/develop 设置为相同的提交。这是为了防止发布分支时出现不良冲突',
    time: '今天,9月28日'
  })
}
</script>

<style lang="scss" scoped></style>
