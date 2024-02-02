<script setup lang="ts">
import { useNavigationStore } from '~/stores'

const store = useNavigationStore()
const inputValue = ref('')

watch(() => inputValue.value, async () => {
  if (inputValue.value !== '') {
    // inputValue 值不为空则将 keyword 通过 get 方法传至 searchKeyword 接口
    const categoryList = await $fetch('/api/category/searchKeyword', {
      method: 'get',
      query: { keyword: inputValue.value },
    })
    store.updateNavigationList(categoryList)
  }
  else {
    // inputValue 值为空时，恢复调用 allNavigationListData 接口
    const categoryList = await $fetch('/api/category/allNavigationListData')
    store.updateNavigationList(categoryList)
  }
})
</script>

<template>
  <div class="mb-4">
    <UInput
      id="searchInput"
      v-model="inputValue"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      :trailing="false"
      placeholder="输入你想要搜索的内容"
    />
  </div>
</template>

<style scoped lang="scss">
.highlight {
  background-color: yellow;
}
</style>
