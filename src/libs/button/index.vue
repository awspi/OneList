<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'active:scale-105': isActiveAnim
      }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- loading  -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-4 h-4 animate-spin mr-1"
    ></m-svg-icon>
    <!-- icon 按钮  -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fill-class="iconClass"
    ></m-svg-icon>
    <!-- 文字按钮  -->
    <slot v-else />
  </button>
</template>

<script>
//type 可选项:表示按钮风格
const typeEnum = {
  primary:
    'text-white  bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-blue-700 dark:bg-blue-700 hover:bg-blue-600  dark:hover:bg-blue-600 ',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600  active:bg-zinc-200 dark:active:bg-zinc-700 '
}
//size 可选项:表示按钮的大小.区分文字按钮和icon按钮
const sizeEnum = {
  //文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  //icon按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const EMITS_CLICK = 'click'
</script>

<script setup>
import mSvgIcon from '../svg-icon/index.vue'
/**
 * 1.构建 type风格可选项|size大小可选项
 * 2.通过props让开发者控制按钮
 * 3.区别icon button 和 text button
 * 4.依据当前数据 实现视图
 * 5.处理点击事件
 */

import { computed } from 'vue'
const props = defineProps({
  //icon图标
  icon: {
    type: String,
    default: null
  },
  //icon 颜色
  iconColor: {
    type: String,
    default: null
  },
  //图标类名(tailwind)
  iconClass: {
    type: String,
    default: null
  },
  //按钮风格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      if (!Object.keys(typeEnum).includes(val)) {
        throw new Error(`不存在传入的type预设`)
      }
      return true
    }
  },
  //大小
  size: {
    type: String,
    default: 'default',
    validator(val) {
      if (
        !Object.keys(sizeEnum)
          .filter((key) => !key.includes('icon'))
          .includes(val)
      ) {
        throw new Error(`不存在传入的type预设`)
      }
      return true
    }
  },
  //按钮点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  //加载动画
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits([EMITS_CLICK])
//props.size
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})
//onBtnClick
const onBtnClick = () => {
  if (props.loading) return
  emits(EMITS_CLICK)
}
</script>

<style lang="scss" scoped></style>
