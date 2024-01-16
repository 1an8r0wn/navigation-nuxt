<script setup lang="ts">
interface TextColorChange {
  pause_text: string
  colors: string[]
  currentColorIndex: number
  textChangeInterval: NodeJS.Timeout | null
}

const textColorChange: TextColorChange = reactive({
  pause_text: 'PAUSE SERVICE 暂停服务',
  colors: ['text-red-500', 'text-white'],
  currentColorIndex: 0,
  textChangeInterval: null,
})

const pauseTextClass = computed(() => {
  return textColorChange.colors[1 - textColorChange.currentColorIndex]
})

onMounted(() => {
  // 注册 interval，每隔 500 毫秒切换文字颜色
  textColorChange.textChangeInterval = setInterval(() => {
    textColorChange.currentColorIndex = 1 - textColorChange.currentColorIndex
  }, 500)
})

onUnmounted(() => {
  // 清除 interval
  if (textColorChange.textChangeInterval !== null) {
    clearInterval(textColorChange.textChangeInterval)
    textColorChange.textChangeInterval = null
  }
})
</script>

<template>
  <main class="h-svh flex items-center justify-center bg-red-500 select-none">
    <div
      class="w-full flex items-center md:items-start justify-center flex-nowrap flex-col md:flex-row bg-yellow-300 text-nowrap overflow-hidden py-4 text-4xl"
      :class="pauseTextClass"
    >
      <UIcon class="md:mr-2" name="i-heroicons-shield-exclamation" />
      <div class="font-bold text-center">
        {{ textColorChange.pause_text }}
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>
