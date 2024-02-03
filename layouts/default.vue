<script lang="ts" setup>
import BaseHeader from '~/components/Header/BaseHeader.vue'
import BaseFooter from '~/components/Footer/BaseFooter.vue'
import { useNavigationStore } from '~/stores'

const store = useNavigationStore()

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
    store.lockScreenFlag = !store.lockScreenFlag
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
  <template v-if="store.lockScreenFlag">
    <LockScreen />
  </template>
  <template v-else>
    <div class="common-layout dark:bg-zinc-950">
      <el-container>
        <!-- 顶栏容器 -->
        <el-header height="3rem">
          <BaseHeader />
        </el-header>
        <!-- 外层容器 -->
        <el-container class="h-full flex flex-col sm:flex-row sm:my-6 px-4 sm:px-6 select-none">
          <!-- 侧边栏容器 -->
          <el-aside class="hidden-xs-only" width="12rem">
            <Category />
          </el-aside>
          <!-- 主要区域容器 -->
          <el-main class="flex flex-col w-full sm:ml-6">
            <Search />
            <slot />
          </el-main>
        </el-container>
        <!-- 底栏容器 -->
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
