<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
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
  <div class="mb-6">
    <el-input
      v-model="inputValue"
      size="large"
      placeholder="请输入要搜索的关键字"
      :prefix-icon="Search"
    />
  </div>
</template>

<style scoped lang="scss">
.highlight {
  background-color: yellow;
}
</style>
