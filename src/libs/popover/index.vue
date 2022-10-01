<template>
  <!-- !防抖解决慢速移动鼠标,弹出层消失的问题onMouseenter -->
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽:触发弹层的视图 -->
      <slot name="reference" />
    </div>
    <transition name="slide">
      <div
        v-show="isVisiable"
        ref="contentTarget"
        :style="contentStyle"
        class="absolute p-1 z-20 bg-white borderrounded-md rounded-sm"
      >
        <!-- 匿名插槽:弹出层视图中展示的内容 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
//延迟关闭的时长
const DELAY_TIME = 100
//左上
const PROP_TOP_LEFT = 'top-left'
//右上
const PROP_TOP_RIGHT = 'top-right'
//左下
const PROP_BOTTOM_LEFT = 'bottom-left'
//右下
const PROP_BOTTOM_RIGHT = 'bottom-right'
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'
const isVisiable = ref(false)

/**
 * 1.指定所有可选位置的常量,并生成enum
 * 2.通过prop控制指定位置
 * 3.获取元素的DOM,创建读取元素尺寸的方法
 * 4.生成气泡的样式对象,用来控制每个位置对应的样式
 * 5.根据prop,计算样式对象
 */

const props = defineProps({
  // 控制气泡控制位置
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(`传入的palcement不在${placementEnum}当中`)
      }
      return result
    }
  }
})

/**
 * 计算元素的尺寸
 */
const referenceTarget = ref()
const contentTarget = ref()
const getElementSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
/**
 * 气泡样式
 */
const contentStyle = ref({
  top: 0,
  left: 0
})
//计算:期望气泡展示的时候再计算
watch(isVisiable, (val) => {
  if (!val) return
  //等待元素渲染
  //! vue在数据更新后,需要等待一段时间DOM才会变化
  //如果watch到数据变化后直接拿DOM到ref 可能为null(dom还没有生成)
  //*通过nextTick函数的参数,来监听DOM变化之后的回调
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          -getElementSize(contentTarget.value).width + 'px'
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          getElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left =
          getElementSize(referenceTarget.value).width + 'px'
        break
    }
  })
})
//防抖 timer
let timer = null
/**
 * 鼠标移入触发 类似防抖
 */
const onMouseenter = () => {
  isVisiable.value = true
  timer && clearTimeout(timer)
}
/**
 * 鼠标移出触发
 */
const onMouseleave = () => {
  timer = setTimeout(() => {
    isVisiable.value = false
    timer = null
  }, DELAY_TIME)
}
</script>

<style lang="scss" scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
</style>
