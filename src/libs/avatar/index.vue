<template>
  <div class="relative cursor-pointer shadow-md shadow-zinc-300/50">
    <img :src="src" class="w-full" :class="shapeClass" />
  </div>
</template>

<script>
const shapeEnum = ['square', 'round']
</script>

<script setup>
const props = defineProps({
  src: {
    required: true
  },

  shape: {
    type: String,
    default: 'square',
    validator(val) {
      return shapeEnum.includes(val)
    }
  }
})
const shapeClass = props.shape === 'square' ? ' rounded-md' : 'rounded-full'
</script>

<style lang="scss" scoped></style>
