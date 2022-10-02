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
import { ref } from 'vue'

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
 * drawer是否可见
 */
const isVisible = ref(false)
/**
 * 任务被点击
 */
const onTaskClick = () => {
  console.log(123)
  isVisible.value = !isVisible.value
}
</script>

<style lang="scss" scoped></style>
