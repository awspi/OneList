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
          <p>{{ item.title }}</p>
          <p class="text-xs">{{ item.time }}</p>
        </div>
      </div>
    </template>
    <div
      v-show="visiable"
      class="absolute left-0 top-0 w-screen h-screen"
      @click="() => (visiable = !visiable)"
    ></div>
    <context-menu-vue
      v-if="visiable"
      :item="selectedItem"
      :style="menuStyle"
    ></context-menu-vue>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import contextMenuVue from './contextMenu.vue'
const instance = getCurrentInstance()
const proxy = instance.appContext.config.globalProperties
const props = defineProps({
  items: {
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
const selectedItem = ref(props.items && props.items[0])
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
    name: item.title,
    desc: item.desc,
    time: ``
  })
}
</script>

<style lang="scss" scoped></style>
