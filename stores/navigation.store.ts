export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    navigationList: {},
  }),
  actions: {
    updateNavigationList(navigationList: NonNullable<unknown>) {
      this.navigationList = navigationList
    },
  },
})
