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
    <template v-for="item in list" :key="item.title">
      <div
        v-show="!isCollapse"
        class="flex items-center cursor-pointer"
        @click="onTaskClick(item)"
        @contextmenu.prevent="openMenu($event, item)"
      >
        <m-svg-icon
          name="circle"
          :fill-class="titleClass"
          class="w-8 h-8 p-1.5 duration-150 mr-0.5 ml-3"
        ></m-svg-icon>
        <div
          class="w-full text-main-text border-b border-main-border mr-6 flex items-center justify-between pr-2"
        >
          <p>{{ item.name }}</p>
          <p class="text-xs font-semibold">
            {{ moment(item.startTime).fromNow() }}
          </p>
        </div>
      </div>
    </template>
    <!-- 蒙版 -->
    <div
      v-if="visiable"
      class="w-screen h-screen fixed top-0 left-0 z-40"
      @click="visiable = !visiable"
      @contextmenu.prevent="visiable = !visiable"
    ></div>
    <!-- 右键菜单 -->
    <context-menu-vue
      v-show="visiable"
      :item="selectedItem"
      :style="menuStyle"
      @updated="visiable = !visiable"
    ></context-menu-vue>
  </div>
</template>

<script setup>
import moment from 'moment'
import { computed, getCurrentInstance, ref } from 'vue'
import contextMenuVue from './contextMenu.vue'
const instance = getCurrentInstance()
const proxy = instance.appContext.config.globalProperties
const props = defineProps({
  list: {
    type: Array,
    default: null
  },
  title: {
    type: String
  },
  titleClass: {
    type: String,
    default: 'text-pro-4'
  }
})
const selectedItem = ref(props.list && props.list[0])
//

/**
 * 鼠标右键打开菜单
 */
const menuStyle = ref({
  left: 0,
  top: 0
})
const visiable = ref(false)

const openMenu = (e, item) => {
  console.log(item)
  const { x, y } = e //获取鼠标坐标
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectedItem.value = item
  visiable.value = !visiable.value
  console.log(visiable)
}
/**
 * 是否折叠
 */
const isCollapse = ref(false)

/**
 * 任务被点击 打开detail
 */
const onTaskClick = (item) => {
  console.log(item)
  //控制detail显示

  proxy.$mitt.emit('detail', {
    name: item.name,
    desc: item.description,
    time: item.alarmTime
  })
}
</script>

<style lang="scss" scoped></style>
