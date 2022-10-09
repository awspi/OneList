export default {
  namespaced: true,
  state: () => {
    return {
      currentFilter: '',
      detailTaskId: '',
      themecolor: ''
    }
  },
  mutations: {
    setCurrentFilter(state, newVal) {
      state.currentFilter = newVal
    },
    setDetailTaskId(state, newVal) {
      state.detailTaskId = newVal
    },
    setThemecolor(state, newVal) {
      state.themecolor = newVal
      console.log(state.themecolor)
    }
  },
  actions: {}
}
