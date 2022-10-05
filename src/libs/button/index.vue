<template>
  <button
    class="text-sm text-center rounded-md duration-150 flex justify-center items-center m-0.5 border border-main-gray-2"
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
  primary: 'text-main-text  bg-white  hover:bg-main-bg/90',
  main: 'text-white bg-main hover:bg-main/70 '
}
//size 可选项:表示按钮的大小.区分文字按钮和icon按钮
const sizeEnum = {
  //文字按钮
  default: {
    button: 'h-7 w-14 text-base',
    icon: ''
  },
  small: {
    button: 'px-3.5 py-0.5 text-base',
    icon: ''
  },
  //icon按钮
  'icon-default': {
    button: 'w-6 h-6',
    icon: 'w-3 h-3'
  },
  'icon-small': {
    button: 'w-6 h-6',
    icon: 'w-3 h-3'
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
