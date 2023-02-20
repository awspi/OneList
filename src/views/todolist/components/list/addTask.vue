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
        <div>
          <div class="text-sm text-main-gray">开始时间</div>
          <flat-pickr
            v-model="taskForm.startTime"
            class="w-32"
            :config="config"
            placeholder="开始时间"
          ></flat-pickr>
        </div>
        <div>
          <div class="text-sm text-main-gray">结束时间</div>
          <flat-pickr
            v-model="taskForm.endTime"
            class="w-32"
            :config="config"
            placeholder="结束时间"
          ></flat-pickr>
        </div>
        <!-- 优先级 -->
        <template v-for="item in proArr" :key="item.fillClass">
          <m-svg-icon
            name="flag"
            class="w-7 h-7 p-1 m-1 hover:bg-main-shallow/20 cursor-pointer flex-shrink-0"
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
          class="text-sm text-center shrink-0 rounded text-white bg-main px-4 py-0.5 border border-main-gray-2 hover:bg-main/90 duration-150 mr-1"
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
import { message } from '@/libs'
import moment from 'moment'
import { useStore } from 'vuex'
import flatPickr from 'vue-flatpickr-component' //引入flatpickr组件
import 'flatpickr/dist/flatpickr.css' //引入他的css样式
import { Mandarin } from 'flatpickr/dist/l10n/zh.js' //引入普通话语言包
//

const config = {
  wrap: true,
  altInput: true,
  altFormat: 'y-n-j H:n', //选择时显示的时间
  enableTime: true, //选择小时分种
  defaultHour: 8, //默认8点
  time_24hr: true, //时间24小时制
  locale: Mandarin, //中文
  altInputClass: ' text-sm w-[100px] mr-2'
}
//
const store = useStore()
// 表单
const taskForm = ref({
  name: '',
  description: '',
  alarmTime: '',
  startTime: moment().format('YYYY-MM-DD HH:MM'),
  endTime: moment().format('YYYY-MM-DD HH:MM'),
  priority: 1,
  state: '0'
})

// 是否折叠
const isCollapse = ref(false)

//优先级
const proArr = ref([
  { value: '1', fillClass: 'fill-pro-1' },
  { value: '2', fillClass: 'fill-pro-2' },
  { value: '3', fillClass: 'fill-pro-3' },
  { value: '4', fillClass: 'fill-pro-4' }
])
const selectedPro = ref('1')

//添加任务
const onAddTaskClick = () => {
  if (!taskForm.value.name) {
    message('error', '任务名不能为空')
    return
  }
  //默认情况

  taskForm.value.priority = selectedPro.value //优先级
  isCollapse.value = !isCollapse.value
  //todo api
  taskForm.value.startTime += ':00'
  taskForm.value.endTime += ':00'
  store.dispatch('task/createTask', taskForm.value)
  //复原
  // selectedOption.value = '今天'
  taskForm.value = {
    name: '',
    description: '',
    alarmTime: '',
    startTime: moment().format('YYYY-MM-DD HH:MM'),
    endTime: moment().format('YYYY-MM-DD HH:MM'),
    priority: 1,
    state: '0'
  }
}
</script>

<style lang="scss" scoped></style>
