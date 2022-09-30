<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 显示的 svg 图标名称（剔除 icon-）
  name: {
    type: String,
    required: true
  },
  // 直接指定 svg 图标的颜色
  color: {
    type: String,
    default: null
  },
  // 通过 tailwind 指定 svg 颜色的类名
  fillClass: {
    type: String,
    default: null
  }
})
// 真实显示的 svg 图标名（拼接 #icon-）
const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>

<style lang="scss" scoped></style>
