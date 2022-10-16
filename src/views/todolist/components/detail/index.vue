<template>
  <Transition name="slide">
    <div
      v-if="isVisible"
      v-track="{
        triggerType: TRIGGER_TYPE_BROWSE,
        currentUrl: $route.path,
        behavior: '浏览detail功能',
        actionType: '用户操作'
      }"
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
          v-track="{
            triggerType: TRIGGER_TYPE_CLICK,
            currentUrl: $route.path,
            behavior: '编辑任务功能',
            actionType: '用户操作'
          }"
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
  </Transition>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { message } from '@/libs'
import { TRIGGER_TYPE_BROWSE, TRIGGER_TYPE_CLICK } from '@/constants'
const store = useStore()
const editable = ref(false)
// 里面的字符可以根据自己的需要进行调整
const taskId = ref(0)
const taskName = ref('')
const taskDesc = ref('')
const alarmTime = ref('')
const isVisible = ref(false)
/**
 * 关闭detail
 */
const onCollapseHandler = () => {
  store.commit('app/setDetailTaskId', '')
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
