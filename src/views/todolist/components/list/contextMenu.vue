<template>
  <div
    class="fixed px-2 w-48 py-1 z-20 bg-white text-main-gray border rounded-md"
  >
    <!-- 日期 -->
    <span class="text-sm">日期</span>
    <div class="flex items-center justify-between">
      <span class="text-main-text-blue text-sm flex-shrink-0">{{
        item && item.time
      }}</span>
      <!-- 修改时间 -->
      <div
        class="flex justify-center items-center shrink-0 bg-main-bg-2 rounded-md mx-2 px-0.5 py-0.5 hover:scale-95 duration-150 cursor-pointer"
        @click="() => (isDatePickerVisible = !isDatePickerVisible)"
      >
        <m-svg-icon
          name="date"
          fill-class="fill-main-gray"
          class="w-6 h-6"
        ></m-svg-icon>
        <p class="text-sm text-main-gray">修改时间</p>
      </div>
    </div>
    <!-- 分隔线 -->
    <div class="w-full h-[1px] my-1 bg-main-gray-2"></div>
    <!-- 优先级 -->
    <span class="text-sm">优先级</span>
    <div class="flex justify-evenly">
      <template v-for="item in proArr" :key="item.fillClass">
        <m-svg-icon
          name="flag"
          class="w-7 h-7 p-1 m-1 hover:bg-main-shallow/20 cursor-pointer"
          :fill-class="item.fillClass"
        ></m-svg-icon>
      </template>
    </div>

    <!-- 分隔线 -->
    <div class="w-full h-[1px] my-1 bg-main-gray-2"></div>
    <!-- btn -->
    <div
      v-for="btn in btnArr"
      :key="btn.name"
      class="flex items-center p-1 cursor-pointer rounded hover:bg-main-shallow/20"
      @click="onItemClick(item)"
    >
      <m-svg-icon
        :name="btn.icon"
        class="w-7 h-7 mr-2"
        fill-class="fill-main-gray"
      ></m-svg-icon>
      <span class="text-main-gray w-full text-sm text-left"> 删除任务 </span>
    </div>
    <m-date-picker
      v-show="isDatePickerVisible"
      v-model="newDate"
      class="absolute left-[101%] bottom-[0%] w-60"
      @select="onUpdateDate"
    ></m-date-picker>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from '../../../../libs'
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const proArr = [
  { fillClass: 'fill-pro-1' },
  { fillClass: 'fill-pro-2' },
  { fillClass: 'fill-pro-3' },
  { fillClass: 'fill-pro-4' }
]
const btnArr = [
  { icon: 'delete', name: '删除任务' }
  // { icon: '创建副本', name: '创建副本' },
  // { icon: 'logout', name: '置顶任务' }
]
const isDatePickerVisible = ref(false)
const newDate = ref(props.item.time)
const onUpdateDate = () => {
  message('success', '更新时间成功')
  isDatePickerVisible.value = false
  //todo 改
}
</script>

<style lang="scss" scoped></style>
