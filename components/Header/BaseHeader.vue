<script setup lang="ts">
import { useNavigationStore } from '~/stores'

const appConfig = useAppConfig()

const store = useNavigationStore()

/**
 * ==================================================
 * 切换锁屏页面
 * 根据 store 内的 lockScreenFlag 标记进行判断
 * ==================================================
 */

function switchLockScreenHandler() {
  store.lockScreenFlag = true
}

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

/**
 * ==================================================
 * 侦听 colorMode 内 preference 值动态改变 logo 样式
 * ==================================================
 */

const logoImage = ref('')

function getLogoImageUrl(name: string) {
  const assets = import.meta.glob('~/assets/image/*', { eager: true, import: 'default' })
  return assets[`/assets/image/${name}.png`]
}

/**
 * 使用侦听器判断当前页面 colorMode 缓存值是否为 dark 或通过 preference 值为 system 且设备是否为深色模式进行判断以此切换 logo 图片
 */
watch(() => colorMode.preference, () => {
  if (colorMode.preference === 'dark' || (colorMode.preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches))
    logoImage.value = 'booop_navigation_logo_w500_h150_white'
  else
    logoImage.value = 'booop_navigation_logo_w500_h150_black'
})

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

  /**
   * 初始化时判断当前页面 colorMode 缓存值是否为 dark 或通过 preference 值为 system 且设备是否为深色模式进行判断以此切换 logo 图片
   */
  if (colorMode.preference === 'dark' || (colorMode.preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches))
    logoImage.value = 'booop_navigation_logo_w500_h150_white'
  else
    logoImage.value = 'booop_navigation_logo_w500_h150_black'
})
</script>

<template>
  <div
    class="h-full px-4 sm:px-6 flex items-center justify-center select-none"
  >
    <div class="w-full flex items-center justify-between">
      <img class="h-9" :src="getLogoImageUrl(logoImage)" alt="">
      <div>
        <UTooltip text="Lock Screen" :shortcuts="['Ctrl', '/']">
          <UButton
            icon="i-heroicons-clock" size="sm" color="black" square variant="link"
            @click="switchLockScreenHandler()"
          />
        </UTooltip>
        <UButton
          :icon="colorModeIcon.icon" size="sm" color="black" square variant="link"
          @click="switchColorModeHandler()"
        />
        <UButton
          icon="i-mdi-github" size="lg" color="black" variant="link" :label="appConfig.github.title" :trailing="false"
          :to="appConfig.github.url" target="_blank"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
