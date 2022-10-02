<template>
  <div>
    <!-- teleport -->
    <teleport to=".todolist">
      <!-- 1内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isVisible"
          v-bind="$attrs"
          class="h-screen w-full bg-white dark:bg-zinc-800 z-50 fixed right-0"
        >
          123123
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
const emits = defineEmits(['update:modelValue'])
//* 当isVisible的值改变时,触发emit修改modelValue (watch+emit)
const isVisible = ref(props.modelValue)
watch(
  isVisible,
  () => {
    emits('update:modelValue', isVisible.value)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
//fade
.fade-enter-active,
.fade-leave-active {
  transition: all 1.3s;
}

//pop-down-up
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateX(100%);
}
</style>
