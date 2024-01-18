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
</script>

<template>
  <footer
    class="flex flex-col h-full p-4 sm:p-9 border-t-2 border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950 select-none"
  >
    <div class="flex items-baseline sm:items-center justify-between flex-col sm:flex-row">
      <USelect v-model="$colorMode.preference" :options="colorModeList" />
    </div>
    <div class="flex flex-col mt-4 text-xs text-zinc-300 dark:text-zinc-600">
      <div>VERSION: {{ version }}</div>
      <div>Copyright © {{ nowYear }} booop All rights reserved.</div>
    </div>
  </footer>
</template>

<style scoped lang="scss">

</style>
