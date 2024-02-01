<script lang="ts" setup>
import BaseHeader from '~/components/Header/BaseHeader.vue'
import BaseFooter from '~/components/Footer/BaseFooter.vue'

// 锁屏显示标志，为 true 时显示锁屏界面
const lockScreenFlag = ref(false)

/**
 * 判断按下的按键是否为 l 或 L ，如果是则切换锁屏显示标志值
 * @param event
 */
function handleKeyDown(event: { key: string }) {
  if (event.key === 'l' || event.key === 'L')
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
    <BaseHeader />
    <div class="h-full flex flex-col sm:flex-row sm:my-9 px-4 sm:px-9 select-none">
      <Category />
      <div class="flex flex-col w-full sm:pl-4">
        <Search />
        <slot />
      </div>
    </div>
    <BaseFooter />
  </template>
</template>

<style scoped lang="scss">

</style>
