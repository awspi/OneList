<template>
  <transition name="slide">
    <div
      v-if="isVisible"
      class="bg-main-bg rounded-md shadow-sm shadow-white/70 duration-150"
    >
      <!-- topbar -->
      <div class="flex items-center border-b border-main-gray-2 py-3">
        <m-svg-icon
          name="expand-right"
          class="w-8 h-8 p-0.5 ml-3 text-yellow-500 cursor-pointer hover:scale-105 duration-150 active:scale-95"
          fill-class="fill-yellow-500"
          color="#FECE00"
          @click="onCollapseHandler"
        ></m-svg-icon>
        <div class="h-8 mx-6 w-[1px] bg-main-gray-2"></div>
        <m-svg-icon
          name="alarm"
          class="w-8 h-8 p-0.5 mr-4 cursor-pointer"
          fill-class="fill-main-text-blue"
        ></m-svg-icon>
        <!-- time -->
        <div class="text-lg text-main-text-blue tracking-wide">
          {{ alarmTime }}
        </div>
      </div>
      <!-- 描述 -->
      <div class="p-9">
        <!-- title -->
        <div
          class="text-2xl pb-1 text-main-text font-bold border-b whitespace-nowrap overflow-x-hidden overflow-ellipsis"
        >
          {{ taskName }}
        </div>
        <!-- desc -->
        <div
          class="text-main-gray py-3 tracking-wide overflow-x-hidden overflow-ellipsis overflow-y-hidden h"
        >
          {{ taskDesc }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
const taskName = ref('')
const taskDesc = ref('')
const alarmTime = ref('')
const isVisible = ref(false)
/**
 * 关闭detail
 */
const onCollapseHandler = () => {
  isVisible.value = !isVisible.value
}

/**
 * ? on
 * * 控制detail显示

 */
const instance = getCurrentInstance()
const proxy = instance.appContext.config.globalProperties
onMounted(() => {
  proxy.$mitt.on('detail', ({ name, desc, time }) => {
    isVisible.value = false
    setTimeout(() => {
      isVisible.value = true
      taskName.value = name
      taskDesc.value = desc
      alarmTime.value = time
    }, 100)
  })
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

//pop-down-up
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
