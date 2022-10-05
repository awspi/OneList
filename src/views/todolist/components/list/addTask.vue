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
      <input
        v-model="taskForm.name"
        placeholder="请输入标题"
        type="text"
        class="border-b w-full outline-0 py-0.5 px-2"
      />
      <textarea
        v-model="taskForm.description"
        placeholder="请输入任务详情"
        rows="4"
        class="duration-100 outline-0 py-0.5 px-2 pt-2 text-md rounded-sm w-full resize-none"
      ></textarea>
      <!-- bottom -->
      <div class="flex items-center py-1 px-2">
        <!-- left -->
        <!-- 时间 -->
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
        <!-- 优先级 -->
        <template v-for="item in proArr" :key="item.fillClass">
          <m-svg-icon
            name="flag"
            class="w-7 h-7 p-1 m-1 hover:bg-main-shallow/20 cursor-pointer"
            :fill-class="item.fillClass"
            :class="{ 'bg-main-shallow/20': item.value === selectedPro }"
            @click="selectedPro = item.value"
          ></m-svg-icon>
        </template>
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
    <!-- 遮罩 -->
    <div
      v-show="isVisible"
      class="absolute left-0 top-0 w-screen h-screen"
      @click="() => (isVisible = !isVisible)"
    ></div>
    <!-- 其他时间 -->
    <m-date-picker
      v-show="isVisible"
      v-model="taskForm.alarmTime"
      class="absolute w-60"
      @select="isVisible = !isVisible"
    ></m-date-picker>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from '@/libs'
import moment from 'moment'
import { useStore } from 'vuex'
const store = useStore()
// 表单
const taskForm = ref({
  name: '',
  description: '',
  alarmTime: '',
  startTime: '',
  endTime: '',
  priority: '',
  state: '0'
})
const isVisible = ref(false)
// 是否折叠
const isCollapse = ref(false)
// 时间选项
const options = [
  { name: '今天', fillClass: 'fill-main' },
  { name: '明天', fillClass: 'fill-green-700' },
  { name: '其他时间', fillClass: 'fill-main-gray' }
]
//优先级
const proArr = ref([
  { value: '1', fillClass: 'fill-pro-1' },
  { value: '2', fillClass: 'fill-pro-2' },
  { value: '3', fillClass: 'fill-pro-3' },
  { value: '4', fillClass: 'fill-pro-4' }
])
const selectedPro = ref('1')
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
      taskForm.value.alarmTime = moment()
        .startOf('day')
        .format('YYYY-MM-DD HH:MM:SS')
      console.log(option)
      break
    case '明天':
      taskForm.value.alarmTime = moment()
        .add(1, 'days')
        .startOf('day')
        .format('YYYY-MM-DD HH:MM:SS')
      console.log(option)
      break
    case '其他时间':
      isVisible.value = true
      break

    default:
      break
  }
}
//添加任务
const onAddTaskClick = () => {
  if (!taskForm.value.name) {
    message('error', '任务名不能为空')
    return
  }
  //默认情况
  if (selectedOption.value === '今天') {
    taskForm.value.alarmTime = moment()
      .startOf('day')
      .format('YYYY-MM-DD HH:MM:SS')
  }
  taskForm.value.startTime = taskForm.value.alarmTime
  taskForm.value.endTime = taskForm.value.alarmTime
  taskForm.value.priority = selectedPro.value //优先级
  isCollapse.value = !isCollapse.value
  //todo api
  store.dispatch('task/createTask', taskForm.value)
  //复原
  selectedOption.value = '今天'
  taskForm.value = {
    name: '',
    description: '',
    alarmTime: '',
    startTime: '',
    endTime: '',
    priority: '',
    state: '0'
  }
}
</script>

<style lang="scss" scoped></style>
