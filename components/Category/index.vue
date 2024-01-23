<script setup lang="ts">
import { useNavigationStore } from '~/stores'

const { data: categoryList } = await useFetch('/api/category')
const store = useNavigationStore()
store.updateNavigationList(categoryList)

/**
 * 获取点击选择的类目索引值
 * @param index
 */
function getCategoryClickIndex(index: number) {
  store.updateCategoryClickIndexHandler(index)
}

const activeIndex = ref(0)
watch(() => store.activeCategoryScrollToIndex, (index: number) => {
  activeIndex.value = index
})
</script>

<template>
  <nav class="h-auto sm:h-dvh sticky top-0 z-50 pr-0 sm:pr-4 mb-4 sm:mb-0 flex flex-row sm:flex-col overflow-x-auto">
    <div
      v-for="category in store.navigationList" :id="`category_nav_${category.id}`" :key="category.id"
      class="flex flex-row sm:flex-col flex-nowrap" @click="getCategoryClickIndex(category.id)"
    >
      <!-- 横向菜单栏，屏幕尺寸小于 xs 时显示 -->
      <div class="max-sm:h-12 flex items-center flex-nowrap bg-white dark:bg-[#121212]">
        <span
          :class="{ 'bg-zinc-100 text-zinc-800 font-bold dark:text-zinc-300 dark:bg-zinc-900': category.id === activeIndex }"
          class="visible sm:hidden w-max mx-4 py-2 px-4 text-zinc-400 hover:text-zinc-800 hover:font-bold dark:text-zinc-600 dark:hover:text-zinc-300 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full cursor-pointer"
        >
          {{ category.name }}
        </span>
      </div>
      <!-- 竖向菜单栏，屏幕尺寸大于 xs 时显示 -->
      <div
        :class="{ 'bg-zinc-100 text-zinc-900 font-bold dark:text-zinc-300 dark:bg-zinc-900': category.id === activeIndex }"
        class="hidden sm:inline p-4 pl-8 my-2 text-zinc-400 hover:text-zinc-600 hover:font-bold dark:text-zinc-600 dark:hover:text-zinc-400 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full cursor-pointer"
      >
        {{ category.name }}
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">

</style>
