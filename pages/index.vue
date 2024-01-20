<script setup lang="ts">
import { useNavigationStore } from '~/stores'

const store = useNavigationStore()
</script>

<template>
  <main class="w-full sm:pl-4">
    <div v-for="category in store.navigationList" :key="category.id" class="mb-4 tracking-wide">
      <div class="flex flex-col mb-2 text-center sm:text-justify">
        <div class="text-xl font-bold text-zinc-900 dark:text-zinc-400">
          {{ category.name }}
        </div>
        <div class="text-base text-zinc-600">
          {{ category.description }}
        </div>
      </div>
      <div class="w-full grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 custom-grid-layout">
        <template v-for="site in category.site" :key="site.id">
          <div
            class="group flex flex-col p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-2 border-transparent hover:border-2 hover:border-zinc-100 dark:hover:border-zinc-800 rounded-md hover:cursor-pointer"
          >
            <div class="mb-1 text-zinc-400 group-hover:text-zinc-800 dark:text-zinc-600 dark:group-hover:text-zinc-300 font-bold custom-line-clamp">
              {{ site.name }}
            </div>
            <div class="text-zinc-400 dark:text-zinc-600 text-sm custom-line-clamp">
              {{ site.description }}
            </div>
            <div class="mt-1 flex items-center text-xs text-zinc-300 dark:text-zinc-700">
              <UIcon class="mr-1" name="i-heroicons-eye" />
              <span>{{ site.visits_count }} 次访问</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.custom-grid-layout {
  margin: 0 auto;
}

.custom-line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
