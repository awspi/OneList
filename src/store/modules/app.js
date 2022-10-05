export default {
  namespaced: true,
  state: () => {
    return {
      currentFilter: ''
    }
  },
  mutations: {
    setCurrentFilter(state, newVal) {
      state.currentFilter = newVal
    }
  },
  actions: {}
}
