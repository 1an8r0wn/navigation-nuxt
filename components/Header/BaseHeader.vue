<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <header
    class="h-full px-4 sm:px-9 select-none"
  >
    <div class="flex items-center justify-between">
      <img class="h-9" src="assets/image/booop_navigation_logo_w500_h150_black.png" alt="booop navigation logo">
      <UButton
        icon="i-mdi-github" size="lg" color="black" variant="link" :label="appConfig.github.title" :trailing="false"
        :to="appConfig.github.url" target="_blank"
      />
    </div>
  </header>
</template>

<style scoped lang="scss">

</style>
