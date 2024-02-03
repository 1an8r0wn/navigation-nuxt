export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    navigationList: {},
    // 点击选择的类目索引值
    categoryClickScrollToIndex: -1,
    // 通过滚动事件侦听当前页面所处类目索引值
    activeCategoryScrollToIndex: 0,
    // 锁屏显示标志，为 true 时显示锁屏界面
    lockScreenFlag: false,
  }),
  actions: {
    /**
     * 更新导航内部数据列表
     * { category: ... ,site: { ... } }
     * @param navigationList
     */
    updateNavigationList(navigationList: NonNullable<unknown>) {
      this.navigationList = navigationList
    },

    /**
     * 更新点击选择的类目索引值
     * @param index
     */
    updateCategoryClickIndexHandler(index: number) {
      this.categoryClickScrollToIndex = index
    },

    /**
     * 更新通过 window 事件侦听当前页面滚动所处类目的索引值
     * @param index
     */
    updateActiveCategoryIndexHandler(index: number) {
      this.activeCategoryScrollToIndex = index
    },
  },
})
