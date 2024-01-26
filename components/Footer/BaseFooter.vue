<script setup lang="ts">
import * as config from '../../package.json'

// 获取版权信息年份
const nowYear = new Date().getFullYear()

// 获取 package.json 当前版本号
const version = config.version
</script>

<template>
  <footer
    class="flex flex-col h-full p-4 sm:p-9 border-t-2 border-zinc-100 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950 select-none"
  >
    <div class="flex flex-col mt-4 text-xs text-zinc-300 dark:text-zinc-600">
      <div>VERSION: {{ version }}</div>
      <div>Copyright © {{ nowYear }} booop All rights reserved.</div>
    </div>
  </footer>
</template>

<style scoped lang="scss">

</style>
