<template>
  <div
    class="fixed px-2 w-56 py-1 bg-white text-main-gray border rounded-md z-50"
  >
    <!-- 日期 -->
    <span class="text-sm">日期</span>
    <div class="flex items-center justify-between">
      <span class="text-main-text-blue text-sm flex-shrink-0">{{
        moment(item?.alarmTime).format('YY-MM-DD HH:MM')
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
          :class="{ 'bg-main-shallow/20': selectedPro === item.value }"
          @click="onUpdatePriority(item)"
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
      @click="onItemClick(btn)"
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
import moment from 'moment'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['updated'])

const proArr = ref([
  { value: '1', fillClass: 'fill-pro-1' },
  { value: '2', fillClass: 'fill-pro-2' },
  { value: '3', fillClass: 'fill-pro-3' },
  { value: '4', fillClass: 'fill-pro-4' }
])
const selectedPro = ref(props.item?.priority.toString())
const btnArr = [
  { icon: 'delete', name: '删除任务' }
  // { icon: '创建副本', name: '创建副本' },
  // { icon: 'logout', name: '置顶任务' }
]
const isDatePickerVisible = ref(false)
const newDate = ref(moment().format('YYYY-MM-DD HH:MM:SS'))
/**
 * 修改alarmTime
 */
const onUpdateDate = () => {
  isDatePickerVisible.value = false
  console.log(newDate.value)
  store.dispatch('task/updateDate', {
    id: props.item.id,
    alarmTime: newDate.value
  })
  emits('updated')
}
/**
 * 修改优先级
 * @param {*} item
 */
const onUpdatePriority = (item) => {
  isDatePickerVisible.value = false
  selectedPro.value = item.value
  store.dispatch('task/updatePriority', {
    id: props.item.id,
    priority: item.value
  })
  emits('updated')
}
/**
 * 删除
 */
const onItemClick = (item) => {
  if (item.icon === 'delete') {
    store.dispatch('task/deleteDate', { id: props.item.id })
    emits('updated')
  }
}
</script>

<style lang="scss" scoped></style>
