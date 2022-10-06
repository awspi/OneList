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
        <div class="h-8 mx-3 w-[1px] bg-main-gray-2"></div>
        <m-svg-icon
          :name="editable ? 'save' : 'edit'"
          class="w-8 h-8 p-0.5 mr-4 hover:scale-105 cursor-pointer duration-150"
          fill-class="fill-main-text-blue"
          @click="onEdit"
        ></m-svg-icon>
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
          class="h-full text-2xl pb-1 text-main-text font-bold border-b whitespace-nowrap overflow-x-hidden overflow-ellipsis"
        >
          <input
            v-model="taskName"
            :readonly="editable ? false : 'readonly'"
            type=" text"
            class="w-full outline-0 py-0.5 px-2 rounded-md"
            :class="[editable ? 'bg-main-shallow/20' : 'bg-transparent']"
          />
        </div>
        <!-- desc -->
        <div
          class="text-main-gray py-3 tracking-wide overflow-x-hidden overflow-ellipsis overflow-y-hidden h"
        >
          <textarea
            v-model="taskDesc"
            rows="20"
            :readonly="editable ? false : 'readonly'"
            class="duration-100 outline-0 py-0.5 px-2 pt-2 text-lg rounded-sm w-full h-full resize-none"
            :class="[editable ? 'bg-main-shallow/20' : 'bg-transparent']"
          ></textarea>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import moment from 'moment'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { message } from '../../../../libs'
const editable = ref(false)
// 里面的字符可以根据自己的需要进行调整
moment.locale('zh-cn', {
  months:
    '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split(
      '_'
    ),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MM月DD日',
    LLL: 'YYYY年MM月DD日Ah点mm分',
    LLLL: 'YYYY年MM月DD日ddddAh点mm分',
    l: 'YYYY-M-D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0
    }
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return hour
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12
    }
  },
  meridiem: function (hour, minute, isLower) {
    const hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1130) {
      return '上午'
    } else if (hm < 1230) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    } else {
      return '晚上'
    }
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: '[下]ddddLT',
    lastDay: '[昨天]LT',
    lastWeek: '[上]ddddLT',
    sameElse: 'L'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日'
      case 'M':
        return number + '月'
      case 'w':
      case 'W':
        return number + '周'
      default:
        return number
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年'
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
})
const taskId = ref(0)
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
  proxy.$mitt.on('detail', ({ name, desc, time, id }) => {
    isVisible.value = false
    setTimeout(() => {
      isVisible.value = true
      taskId.value = id
      taskName.value = name
      taskDesc.value = desc
      alarmTime.value = time
    }, 100)
  })
})
const store = useStore()
const onEdit = () => {
  if (editable.value) {
    store.dispatch('task/updateTaskInfo', {
      id: taskId.value,
      name: taskName.value,
      description: taskDesc.value
    })
    editable.value = false
  } else {
    message('success', '可以修改任务内容了~')
    editable.value = true
  }
}
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
