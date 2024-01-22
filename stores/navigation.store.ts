export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    navigationList: {},
    // 点击选择的类目索引值
    categoryClickScrollToIndex: 0,
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
  },
})
