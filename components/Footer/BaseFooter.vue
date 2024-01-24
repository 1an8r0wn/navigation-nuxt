<script setup lang="ts">
import * as config from '../../package.json'

// 获取版权信息年份
const nowYear = new Date().getFullYear()

// 获取 package.json 当前版本号
const version = config.version

/**
 * ==================================================
 * 提供并展示当前颜色主题
 * ==================================================
 */

const colorMode = useColorMode()
const colorModeIcon = reactive({
  index: 0,
  value: '',
  icon: '',
})
const colorModeList = [{
  value: 'system',
  icon: 'i-heroicons-tv',
}, {
  value: 'light',
  icon: 'i-heroicons-sun',
}, {
  value: 'dark',
  icon: 'i-heroicons-moon',
}]

/**
 * 切换颜色模式
 * 通过对 colorMode 内的 index 进行累加切换当前颜色模式
 * 当累加超过颜色模式列表长度时重置为 0 即为 “system（自动）”
 */
function switchColorModeHandler() {
  colorModeIcon.index++
  // 判断 index 是否大于颜色模式列表长度，若大于则将 index 重置为 0 并根据 index 覆盖颜色模式名称及图标
  if (colorModeIcon.index >= colorModeList.length) {
    colorModeIcon.index = 0
    colorModeIcon.value = colorModeList[colorModeIcon.index].value
    colorModeIcon.icon = colorModeList[colorModeIcon.index].icon
  }
  colorModeIcon.value = colorModeList[colorModeIcon.index].value
  colorModeIcon.icon = colorModeList[colorModeIcon.index].icon
  colorMode.preference = colorModeList[colorModeIcon.index].value
}

onMounted(() => {
  /**
   * 页面初始化时通过 colorMode 模块获取当前系统缓存的颜色模式值
   * 通过循环颜色模式列表 colorModeList 获取当前值所包含的名称及图标信息保存到 colorModeIcon 中
   */
  colorModeIcon.value = colorMode.preference
  for (let i = 0; i < colorModeList.length; i++) {
    if (colorModeIcon.value === colorModeList[i].value) {
      colorModeIcon.index = i
      colorModeIcon.value = colorModeList[colorModeIcon.index].value
      colorModeIcon.icon = colorModeList[colorModeIcon.index].icon
    }
  }
})
</script>

<template>
  <footer
    class="flex flex-col h-full p-4 sm:p-9 border-t-2 border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950 select-none"
  >
    <div class="flex items-baseline sm:items-center justify-between flex-col sm:flex-row">
      <UButton :icon="colorModeIcon.icon" size="sm" color="black" square variant="link" @click="switchColorModeHandler()" />
    </div>
    <div class="flex flex-col mt-4 text-xs text-zinc-300 dark:text-zinc-600">
      <div>VERSION: {{ version }}</div>
      <div>Copyright © {{ nowYear }} booop All rights reserved.</div>
    </div>
  </footer>
</template>

<style scoped lang="scss">

</style>
