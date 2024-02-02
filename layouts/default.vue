<script lang="ts" setup>
import BaseHeader from '~/components/Header/BaseHeader.vue'
import BaseFooter from '~/components/Footer/BaseFooter.vue'

// 锁屏显示标志，为 true 时显示锁屏界面
const lockScreenFlag = ref(false)

/**
 * 判断按下的按键是否为 CTRL 或 META 和 / ，如果是则切换锁屏显示标志值
 * @param event
 */
function handleKeyDown(event: {
  metaKey: boolean
  ctrlKey: boolean
  key: string
}) {
  if ((event.ctrlKey || event.metaKey) && event.key === '/')
    lockScreenFlag.value = !lockScreenFlag.value
}

onMounted(() => {
  nextTick(() => {
    window.addEventListener('keydown', handleKeyDown)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <template v-if="lockScreenFlag">
    <LockScreen />
  </template>
  <template v-else>
    <div class="common-layout dark:bg-zinc-950">
      <el-container>
        <el-header height="3rem">
          <BaseHeader />
        </el-header>
        <el-container class="h-full flex flex-col sm:flex-row sm:my-6 px-4 sm:px-6 select-none">
          <el-aside class="hidden-xs-only" width="12rem">
            <Category />
          </el-aside>
          <el-main class="flex flex-col w-full sm:ml-6">
            <Search />
            <slot />
          </el-main>
        </el-container>
        <el-footer>
          <BaseFooter />
        </el-footer>
      </el-container>
    </div>
  </template>
</template>

<style scoped lang="scss">
:deep(.el-header) {
  padding: 0;
}

:deep(.el-aside) {
  overflow: visible;
}

:deep(.el-main) {
  padding: 0;
}

:deep(.el-footer) {
  padding: 0;
}
</style>
