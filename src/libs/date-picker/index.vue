<template>
  <div
    class="bg-white text-zinc-900 text-sm shadow-md shadow-gray-500 rounded-md"
  >
    <!-- 年份 月份 -->
    <div class="flex justify-evenly items-center p-3">
      <span
        class="hover:bg-zinc-200 rounded-sm duration-150 cursor-pointer"
        @click="onPreMonthHandler"
      >
        <m-svg-icon
          name="left-arrow"
          class="w-5 h-5"
          fill-class=" text-zinc-400"
        ></m-svg-icon>
      </span>
      <span class="font-semibold">{{ date.year }}年{{ date.month }}月</span>
      <span
        class="hover:bg-zinc-200 rounded-sm duration-150 cursor-pointer"
        @click="onNextMonthHandler"
      >
        <m-svg-icon
          name="right-arrow"
          class="w-5 h-5"
          fill-class=" text-zinc-400"
        ></m-svg-icon>
      </span>
    </div>
    <!-- 日历表格 -->
    <div class="text-center mt-2 text-zinc-800">
      <!-- 周 标题 -->
      <div class="flex justify-evenly">
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
      </div>
      <div
        v-for="week in weeks"
        :key="week[0].date"
        class="flex justify-evenly my-2"
      >
        <template v-for="day in week" :key="day.date">
          <p
            class="w-[20px] rounded-sm cursor-pointer"
            :class="{
              'text-gray-300': day.month !== date.month,
              'bg-blue-300 text-white':
                day.date === today && selectedDate !== day.date,
              'bg-blue-600 text-white duration-150 ': selectedDate === day.date
            }"
            @click="onSelectDayHandler(day)"
          >
            {{ padNumber(day.num, 2) }}
          </p>
        </template>
      </div>
    </div>
    <!-- slot -->
    <slot></slot>
  </div>
</template>

<script setup>
import moment from 'moment'
import { onMounted, ref, watch } from 'vue'
import { padNumber } from '@/utils/format'
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})
const emits = defineEmits(['update:modelValue', 'select'])
//相当于vueuse的useVModel
const selectedDate = ref(props.modelValue)
watch(
  selectedDate,
  () => {
    emits('update:modelValue', selectedDate.value)
  },
  { immediate: true }
)

//今天日期 2022-10-1
const today = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
// 根据月份生成日期的信息:年/月/日/上个月/下个月
const date = ref({})
//用来渲染日历的数组
const weeks = ref([])

// const selectedDate = ref(today)

/**
 * 生成日历函数
 * @param {*} month
 */
const initDate = (month) => {
  const weeks = [] //用来渲染日历的数组
  const firstDay = moment(month, 'YYYY-MM') // 25号
  const week = firstDay.format('d') // 当月1号是周几 (比如周六则week = 6)
  const start = firstDay.subtract(week, 'days') // 日历上展示的第一个数(上个月的二十几号之类的，用于补齐日历)
  for (let i = 0; i < 6; i++) {
    // 通常日历为6行7排 42天，因此两个for循环
    const days = []
    for (var j = 0; j < 7; j++) {
      const day = {}
      day.num = start.toObject().date // 当前号数 25
      day.date = start.format('YYYY-MM-DD HH:MM:SS') // 返回值为2022-10-25
      day.month = start.format('MM') // 当前号数对应的月份，比如日历上个月25号则day.month = 9;这个月1号day.month = 10
      start.add(1, 'days') // 每循环一次日期加一天
      days.push(day)
    }
    weeks.push(days)
  }
  //* 根据月份生成日期的信息:年/月/日/上个月/下个月
  date.value = {
    year: moment(month).year(),
    month: moment(month, 'YYYY-MM').add(0, 'month').format('MM'),
    preMonth: moment(month, 'YYYY-MM').add(-1, 'month'),
    nextMonth: moment(month, 'YYYY-MM').add(1, 'month').format('YYYY-MM')
  }
  return weeks
}

onMounted(() => {
  const currDate = new Date()
  weeks.value = initDate(moment(currDate).format('YYYY-MM'))
})

/**
 * 上个月
 */
const onPreMonthHandler = () => {
  const month = date.value.preMonth
  weeks.value = initDate(moment(month).format('YYYY-MM'))
}
/**
 * 下个月
 */
const onNextMonthHandler = () => {
  const month = date.value.nextMonth
  weeks.value = initDate(moment(month).format('YYYY-MM'))
}
/**
 * 选择日期
 */
const onSelectDayHandler = (day) => {
  selectedDate.value = day.date
  emits('select')
}
</script>

<style lang="scss" scoped></style>
