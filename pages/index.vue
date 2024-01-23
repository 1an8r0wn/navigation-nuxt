<script setup lang="ts">
import { useNavigationStore } from '~/stores'

interface Site {
  url: string
  visits_count: number
}

const store = useNavigationStore()

/**
 * 跳转选择的网站并通过 api 对选择的网站访问数进行累加处理
 * @param site
 */
async function jumpUrlHandler(site: Site) {
  useFetch('/api/site', { method: 'post', body: site })
  window.open(site.url, '_self') // 在当前窗口打开网站
  site.visits_count += 1
}

/**
 * 侦听 pinia 中 state 的 categoryClickScrollToIndex 值
 * 将新 index 值传递给 categoryIndexSelectHandler()
 */
watch(() => store.categoryClickScrollToIndex, (index: number) => {
  categoryIndexSelectHandler(index)
})

/**
 * 类目索引选择处理
 * 通过侦听器获取的新索引值跳转到对应的标题处
 * @param index
 */
function categoryIndexSelectHandler(index: number) {
  const contentItem = document.getElementById(`category_${index}`)
  window.scrollTo({
    top: contentItem?.offsetTop,
    left: 0,
    behavior: 'smooth', // smooth：平滑；auto：瞬间
  })
}
</script>

<template>
  <main class="w-full sm:pl-4">
    <div
      v-for="category in store.navigationList" :id="`category_${category.id}`" :key="category.id"
      class="mb-4 tracking-wide"
    >
      <div class="flex flex-col mb-2 text-center sm:text-justify custom-sm-scroll-to-style-fix">
        <div class="text-xl font-bold text-zinc-900 dark:text-zinc-400">
          {{ category.name }}
        </div>
        <div class="text-base text-zinc-600">
          {{ category.description }}
        </div>
      </div>
      <div class="w-full grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        <template v-for="site in category.site" :key="site.id">
          <div
            class="group flex flex-col h-fit p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-2 border-transparent hover:border-2 hover:border-zinc-100 dark:hover:border-zinc-800 rounded-md hover:cursor-pointer"
            @click="jumpUrlHandler(site)"
          >
            <div
              class="mb-1 text-zinc-400 group-hover:underline group-hover:decoration-wavy group-hover:underline-offset-1 group-hover:text-zinc-800 dark:text-zinc-600 dark:group-hover:text-zinc-300 font-bold custom-line-clamp"
            >
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
// 宽度小于 640px 时（sm:）在每个类目区上方添加 60px 的外边框
@media not all and (min-width: 640px) {
  .custom-sm-scroll-to-style-fix::before {
    content: '';
    width: 100%;
    margin-top: 60px;
  }
}

.custom-line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
