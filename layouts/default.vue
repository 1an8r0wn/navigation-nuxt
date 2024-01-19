<script lang="ts" setup>
import BaseHeader from '~/components/Header/BaseHeader.vue'
import BaseFooter from '~/components/Footer/BaseFooter.vue'
</script>

<template>
  <BaseHeader />
  <div class="h-full flex flex-col sm:flex-row my-9 px-4 sm:px-9 select-none">
    <Category class="min-w-52" />
    <slot />
  </div>
  <BaseFooter />
</template>

<style scoped lang="scss">

</style>
