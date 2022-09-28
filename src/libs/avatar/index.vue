<template>
  <div class="relative cursor-pointer">
    <img :src="src" class="rounded-full " :class="sizeClass">
    <div v-show="status!=='none'" class="absolute left-0.5 top-1 rounded-full border-2 border-zinc-100 block"
      :class="[statusIconSizeClass,{'bg-green-500':status==='online',' bg-gray-500':status==='offline'}]">
    </div>
  </div>
</template>

<script>
const statusEnum = ['online', 'offline', 'none']
</script>

<script setup>
const props = defineProps({
  src: {
    required: true
  },
  size: {
    type: String,
    default: '10'
  },
  status: {
    type: String,
    default: 'none',
    validator(val) {
      return statusEnum.includes(val)
    }
  },
  statusIconSize: {
    type: String,
    default: '2'
  }
})
const sizeClass = `w-${props.size} h-${props.size}`
const statusIconSizeClass = `w-${props.statusIconSize} h-${props.statusIconSize}`
</script>

<style lang="scss" scoped>

</style>
