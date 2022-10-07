export default {
  namespaced: true,
  state: () => {
    return {
      currentFilter: '',
      detailTaskId: ''
    }
  },
  mutations: {
    setCurrentFilter(state, newVal) {
      state.currentFilter = newVal
    },
    setDetailTaskId(state, newVal) {
      state.detailTaskId = newVal
    }
  },
  actions: {}
}
