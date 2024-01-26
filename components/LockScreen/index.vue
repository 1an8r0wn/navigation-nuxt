<script setup lang="ts">
import { useDayjs } from '#dayjs'

const dayjs = useDayjs()
dayjs.locale('zh-cn')
dayjs.tz.guess()
dayjs.updateLocale('zh-cn', {
  weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
})

const dayInfo = reactive({
  date: '',
  week: '',
  time: '',
  timeInterval: null as NodeJS.Timer | null,
})

onMounted(() => {
  nextTick(() => {
    dayInfo.timeInterval = setInterval(() => {
      dayInfo.date = dayjs().format('YYYY[年]MM[月]DD[日]')
      dayInfo.week = dayjs().format('dddd')
      dayInfo.time = dayjs().format('HH:mm:ss')
    }, 10)
  })
})

onUnmounted(() => {
  clearInterval(Number(dayInfo.timeInterval))
})
</script>

<template>
  <main class="h-dvh flex flex-col items-center justify-center select-none">
    <div class="mb-2 flex items-center text-2xl md:text-4xl font-bold text-zinc-600">
      <div class="mr-4">
        {{ dayInfo.date }}
      </div>
      <div>{{ dayInfo.week }}</div>
    </div>
    <div class="text-6xl md:text-9xl font-black font-mono">
      {{ dayInfo.time }}
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>
