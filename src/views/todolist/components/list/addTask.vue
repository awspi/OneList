<template>
  <div class="bg-white rounded-md">
    <!-- 展示 -->
    <div
      v-if="!isCollapse"
      class="flex items-center py-3 px-2"
      @click="isCollapse = !isCollapse"
    >
      <m-svg-icon
        class="w-5 h-5 mr-2"
        name="plus"
        fill-class="text-main"
      ></m-svg-icon>
      <p class="text-main-gray-2">添加任务</p>
    </div>
    <!-- 输入 -->
    <template v-else>
      <textarea
        v-model="taskForm.description"
        rows="4"
        class="duration-100 outline-0 py-0.5 px-3 pt-2 text-md rounded-sm w-full resize-none"
      ></textarea>
      <!-- bottom -->
      <div class="flex items-center py-1 px-2">
        <!-- left -->
        <div
          v-for="option in options"
          :key="option.name"
          class="flex justify-center items-center shrink-0 bg-main-bg-2 rounded-md mx-1.5 px-2 py-0.5 hover:scale-95 duration-150 cursor-pointer"
          :class="{
            'border border-main-gray scale-95': selectedOption === option.name
          }"
          @click="onOptionsHandler(option)"
        >
          <m-svg-icon
            name="date"
            :fill-class="option.fillClass"
            class="w-6 h-6"
          ></m-svg-icon>
          <p class="text-sm text-main-gray">{{ option.name }}</p>
        </div>
        <!-- right -->
        <button
          class="ml-auto text-sm text-center rounded bg-white text-main-text shrink-0 px-4 py-0.5 mr-3 border border-main-gray-2 hover:bg-main-bg/90 duration-150"
          @click.stop="() => (isCollapse = !isCollapse)"
        >
          取消
        </button>
        <button
          class="text-sm text-center shrink-0 rounded text-white bg-main px-4 py-0.5 border border-main-gray-2 hover:bg-main/90 duration-150"
          @click.stop="onAddTaskClick"
        >
          确定
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 表单
const taskForm = ref({
  name: '',
  description: '',
  alarmTime: ''
})
// 是否折叠
let isCollapse = ref(false)
// 时间选项
const options = [
  { name: '今天', fillClass: 'fill-main' },
  { name: '明天', fillClass: 'fill-green-700' },
  { name: '其他时间', fillClass: 'fill-main-gray' }
]
/**
 * 选中的option
 */
const selectedOption = ref('今天')
/**
 *  设置alarmTime
 * @param {*} option
 */
const onOptionsHandler = (option) => {
  selectedOption.value = option.name
  switch (option.name) {
    case '今天':
      // taskForm.value.alarmTime=''
      console.log(option)
      break
    case '明天':
      // taskForm.value.alarmTime=''
      console.log(option)
      break
    case '其他时间':
      //打开 datepicker
      console.log(option)
      break

    default:
      break
  }
}
const onAddTaskClick = () => {
  //todo  addTask
}
</script>

<style lang="scss" scoped></style>
