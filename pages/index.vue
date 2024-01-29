<script setup lang="ts">
import dayjs from 'dayjs'
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

const activeIndex = ref(1)
const content = ref()

function handleScroll() {
  /**
   * TODO 【目前存在问题】获取页面 scroll 与类目高度相减的绝对值的下标和哪个菜单栏 index 最近就高亮哪个菜单项
   */
  const scroll = document.getElementById('__nuxt')!.scrollTop || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  const arr = []
  for (let index = 1; index <= store.navigationList.length; index++) {
    const contentItem = document.getElementById(`category_${index}`)
    arr.push(Math.abs(scroll - contentItem!.offsetTop))
  }
  activeIndex.value = arr.indexOf(Math.min(...arr)) + 1
  store.updateActiveCategoryIndexHandler(Number(activeIndex.value))
}

onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', handleScroll)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <main class="w-full sm:pl-4">
    <section
      v-for="category in store.navigationList" :id="`category_${category.id}`" :key="category.id"
      ref="content" class="mb-4 tracking-wide"
    >
      <div class="flex flex-col mb-2 text-center sm:text-justify custom-sm-scroll-to-style-fix">
        <header class="text-xl font-bold text-zinc-900 dark:text-zinc-400">
          {{ category.name }}
        </header>
        <div class="text-base text-zinc-600">
          {{ category.description }}
        </div>
      </div>
      <div
        :class="category.is_sensitive === true ? 'blur-sm hover:blur-none' : ''"
        class="w-full grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
      >
        <template v-for="site in category.site" :key="site.id">
          <section
            class="group flex flex-col h-fit p-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 border-2 border-transparent hover:border-2 hover:border-zinc-100 dark:hover:border-zinc-800 rounded-md hover:cursor-pointer"
            @click="jumpUrlHandler(site)"
          >
            <header class="flex flex-row flex-wrap items-baseline justify-between">
              <div
                :class="site.is_sensitive === true ? 'blur-sm group-hover:blur-none' : ''"
                class="mb-1 text-zinc-400 group-hover:underline group-hover:decoration-wavy group-hover:underline-offset-1 group-hover:text-zinc-800 dark:text-zinc-600 dark:group-hover:text-zinc-300 font-bold custom-line-clamp"
              >
                {{ site.name }}
              </div>
              <!-- 通过 dayjs 引入当前网站添加至数据库的时间与从当前时间至一周前的时间进行比对，若创建时间在一周内则显示徽章 -->
              <div v-if="dayjs(site.created_at).isBetween(dayjs().subtract(7, 'day'), dayjs(), 'day', '(]')">
                <UBadge size="xs" color="gray" variant="solid">
                  New
                </UBadge>
              </div>
            </header>
            <div
              :class="site.is_sensitive === true ? 'blur-sm group-hover:blur-none' : ''"
              class="text-zinc-400 dark:text-zinc-600 text-sm custom-line-clamp" :title="site.description"
            >
              {{ site.description }}
            </div>
            <div class="mt-1 flex items-center text-xs text-zinc-300 dark:text-zinc-700">
              <UIcon class="mr-1" name="i-heroicons-eye" />
              <span>{{ site.visits_count }} 次访问</span>
            </div>
          </section>
        </template>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
// 宽度小于 640px 时（sm:）在每个类目区上方添加 60px 的外边框
@media (max-width: 640px) {
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
