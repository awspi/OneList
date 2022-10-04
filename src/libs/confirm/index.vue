<!-- eslint-disable vue/require-default-prop -->
<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen bg-zinc-900/80 fixed top-0 left-0 z-40"
        @click="close"
      ></div>
    </transition>
    <transition name="up">
      <div
        v-if="isVisible"
        class="w-[80px] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:boarder-zinc-600 cursor-pointer bg-white xl:w-[25%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base font-bold text-zinc-900 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
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
import { onMounted, ref } from 'vue'
import mButton from '../button/index.vue'
//控制显示
const isVisible = ref(false)
const show = () => {
  isVisible.value = true
}
/**
 * 处理动画( render函数的渲染,会直接执行)
 */
onMounted(() => {
  show()
})
//关闭动画 执行时间
const duration = '0.5s'
//
const props = defineProps({
  //标题
  title: {
    type: String,
    default: '提示:'
  },
  //内容
  content: {
    type: String,
    required: true
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
  // eslint-disable-next-line vue/require-default-prop
  cancelHandler: {
    type: Function
  },
  //确定事件
  // eslint-disable-next-line vue/require-default-prop
  confirmHandler: {
    type: Function
  },
  //关闭回调
  // eslint-disable-next-line vue/require-default-prop
  close: {
    type: Function
  }
})
/**
 * 关闭事件
 */
const close = () => {
  isVisible.value = false
  //延迟一段时间关闭,等待动画完全关闭之后再去触发
  setTimeout(() => {
    props.close && props.close()
  }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
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
  transition: all v-bind(duration);
}

//准备进入,离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

//
.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

//准备进入,离开完成
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
