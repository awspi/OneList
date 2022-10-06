import { PRO_1, PRO_2, PRO_3, PRO_4 } from '@/constants'
import { deleteTask, getAllTaskList, newTask, updateTask } from '@/api/task'
import { message, confirm } from '@/libs'
export default {
  namespaced: true,
  state: () => {
    return {
      listTitle: '所有',
      pro_1: {
        title: PRO_1,
        list: [],
        titleClass: 'text-pro-1'
      },
      pro_2: {
        title: PRO_2,
        list: [],
        titleClass: 'text-pro-2'
      },
      pro_3: {
        title: PRO_3,
        list: [],
        titleClass: 'text-pro-3'
      },
      pro_4: {
        title: PRO_4,
        list: [],
        titleClass: 'text-pro-4'
      }
    }
  },
  mutations: {
    addTask(state, { key, val }) {
      state[key].list.push(val)
    },
    clearTaskList(state) {
      state.pro_1.list = []
      state.pro_2.list = []
      state.pro_3.list = []
      state.pro_4.list = []
    },
    setListTitle(state, val) {
      state.listTitle = val
    }
  },
  actions: {
    async initTaskList({ commit }) {
      commit('clearTaskList')
      //getList
      const res = await getAllTaskList()
      const list = res.lists
      console.log(list)

      list.forEach((item) => {
        commit('addTask', { key: `pro_${item.priority}`, val: item })
      })
    },
    async createTask({ commit, dispatch }, payload) {
      console.log(payload)
      const res = await newTask(payload)
      if (res.state) {
        message('success', '新建成功')
        dispatch('initTaskList')
      }
    },
    async updateTaskInfo({ commit, dispatch }, payload) {
      const res = await updateTask(payload)
      if (res.state) {
        message('success', '修改任务成功')
        dispatch('initTaskList')
      } else {
        message('error', '修改失败')
      }
    },
    async updatePriority({ commit, dispatch }, payload) {
      console.log(payload)
      const res = await updateTask(payload)
      if (res.state) {
        message('success', '修改优先级成功')
        dispatch('initTaskList')
      }
    },
    async updateDate({ commit, dispatch }, payload) {
      const res = await updateTask(payload)
      if (res.state) {
        dispatch('initTaskList')
        message('success', '修改时间成功')
      }
    },
    async deleteDate({ commit, dispatch }, payload) {
      confirm('提示', '确定要删除吗').then(async () => {
        await deleteTask(payload)
        message('success', '删除成功')
      })
    },
    async changeState({ commit, dispatch }, payload) {
      const res = await updateTask(payload)
      console.log(res)
      dispatch('initTaskList')
      if (res.state) {
        message('success', '修改任务状态成功')
      }
    }
  }
}
