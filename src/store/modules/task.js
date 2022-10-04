import { PRO_1, PRO_2, PRO_3, PRO_4 } from '@/constants'
export default {
  namespaced: true,
  state: () => {
    return {
      listTitle: PRO_1,
      pro_1: {
        title: PRO_1,
        items: [
          { title: '吃早饭重要且紧急', desc: '好吃', time: '2022-10-04' },
          { title: '吃早饭重要且紧急', desc: '好吃', time: '2022-10-03' },
          { title: '吃早饭重要且紧急', desc: '好吃', time: '2022-10-04' },
          { title: '吃早饭重要且紧急', desc: '好吃', time: '2022-10-04' }
        ],
        titleClass: 'text-pro-1'
      },
      pro_2: {
        title: PRO_2,
        items: [
          { title: '吃早饭', time: '2022-10-04' },
          { title: '吃早饭', time: '2022-10-04' },
          { title: '吃早饭', time: '2022-10-04' }
        ],
        titleClass: 'text-pro-2'
      },
      pro_3: {
        title: PRO_3,
        items: [
          { title: '吃早饭', time: '2022-10-04' },
          { title: '吃早饭', time: '2022-10-04' },
          { title: '吃早饭', time: '2022-10-04' }
        ],
        titleClass: 'text-pro-3'
      },
      pro_4: {
        title: PRO_4,
        items: [
          { title: '吃早饭', time: '2022-10-04' },
          { title: '吃早饭', time: '2022-10-04' },
          { title: '吃早饭', time: '2022-10-04' }
        ],
        titleClass: 'text-pro-4'
      }
    }
  },
  mutations: {
    setTask(state, { key, val }) {
      state[key] = val
    }
  },
  actions: {
    async initTaskList({ commit }) {
      //getList
      // commit('setTask', {
      //   key: 'pro_1',
      //   val: [
      //     { title: '吃早饭', time: '2022-10-04' },
      //     { title: '吃早饭', time: '2022-10-04' },
      //     { title: '吃晚饭', time: '2022-10-04' }
      //   ]
      // })
    }
  }
}
