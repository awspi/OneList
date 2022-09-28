<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div v-if="isVisible" class="w-screen h-screen bg-zinc-900/80 fixed top-0 left-0 z-40" @click="close"></div>
    </transition>
    <transition name="up">
      <div v-if="isVisible"
        class="fixed top-[50%]  translate-y-[-50%]  left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:boarder-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 w-[35%]">
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <!-- 按钮 -->
        <div v-if="props.cancelHandler || props.confirmHandler" class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
          cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
          confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
//confrim组件以方法调用的形式展示,需要手动导入组件
import { useVModel } from '@vueuse/core';
import mButton from '../button/index.vue'
//控制显示
const isVisible = useVModel(props)
defineEmits(['update:modelValue'])
const show = () => {
  isVisible.value = true
}

//
const props = defineProps({
  //控制开关
  modelValue: {
    type: Boolean,
    required: true
  },
  //标题
  title: {
    type: String,
    default: '提示:'
  },
  //取消文本
  cancelText: {
    type: String,
    default: '取消'
  },
  //确认文本
  confirmText: {
    type: String,
    default: '确定'
  },
  //取消事件
  cancelHandler: {
    type: Function
  },
  //确定事件
  confirmHandler: {
    type: Function
  },
  //关闭回调
  close: {
    type: Function
  }
})
/**
 * 关闭事件
 */
const close = () => {
  isVisible.value = false
  props.close && props.close()
}
/**
 * confirm
 */
const onConfirmClick = () => {
  props.confirmHandler && props.confirmHandler()
  close()
}
/**
 * cancel
 */
const onCancelClick = () => {
  props.cancelHandler && props.cancelHandler()
  close()
}
</script>

<style lang="scss" scoped>
//fade
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

//准备进入,离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

//
.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}

//准备进入,离开完成
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
