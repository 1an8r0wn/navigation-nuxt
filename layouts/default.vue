<script lang="ts" setup>
import BaseHeader from '~/components/Header/BaseHeader.vue'
import BaseFooter from '~/components/Footer/BaseFooter.vue'
</script>

<template>
  <BaseHeader />
  <slot />
  <BaseFooter />
</template>

<style scoped lang="scss">

</style>
