import {
  PRIORITY_FIRST,
  PRIORITY_SECOND,
  PRIORITY_THIRD,
  PRIORITY_FOURTH,
  TASK_GROUP_RELATIONS
} from '@/constants'
import { deleteTask, getAllTaskList, newTask, updateTask } from '@/api/task'
import { message, confirm } from '@/libs'
export default {
  namespaced: true,
  state: () => {
    return {
      listTitle: '所有',
      task_group_first: {
        title: PRIORITY_FIRST,
        list: [],
        titleClass: 'text-pro-1'
      },
      task_group_second: {
        title: PRIORITY_SECOND,
        list: [],
        titleClass: 'text-pro-2'
      },
      task_group_third: {
        title: PRIORITY_THIRD,
        list: [],
        titleClass: 'text-pro-3'
      },
      task_group_fourth: {
        title: PRIORITY_FOURTH,
        list: [],
        titleClass: 'text-pro-4'
      }
    }
  },
  mutations: {
    addTask(state, { priority, taskItem }) {
      for (const [key, val] of Object.entries(TASK_GROUP_RELATIONS)) {
        if (priority == val) {
          state[key].list.unshift(taskItem)
        }
      }
    },
    delTask(state, payload) {
      for (const [key, val] of Object.entries(TASK_GROUP_RELATIONS)) {
        state[key].list = state[key].list.filter((taskItem) => {
          // console.log(taskItem.id !== payload.id)
          return taskItem.id !== payload.id
        })
      }
    },
    //fix 每次更新内容页面空白,部分业务取代initTaskList
    /**
     * 更新 时间 标题 内容 完成状态
     * @param {*} state
     * @param {*} payload 必传id
     */
    refreshTask(state, payload) {
      for (const [key, val] of Object.entries(TASK_GROUP_RELATIONS)) {
        state[key].list.filter((taskItem) => {
          if (taskItem.id === payload.id) {
            Object.keys(payload).forEach((targetKey) => {
              if (taskItem[targetKey] !== payload[targetKey]) {
                taskItem[targetKey] = payload[targetKey]
              }
            })
          }
        })
      }
    },
    clearTaskList(state) {
      state.task_group_first.list = []
      state.task_group_second.list = []
      state.task_group_third.list = []
      state.task_group_fourth.list = []
    },
    setListTitle(state, val) {
      state.listTitle = val
    }
  },
  actions: {
    //初始化列表 获取全部
    async initTaskList({ commit }) {
      commit('clearTaskList')
      //getList
      const res = await getAllTaskList()
      const list = res.lists
      console.log(list)
      list.forEach((item) => {
        commit('addTask', { priority: item.priority, taskItem: item })
      })
    },
    //新建任务
    async createTask({ commit }, payload) {
      console.log(payload)
      const res = await newTask(payload)
      if (res.state) {
        commit('addTask', {
          priority: payload.priority,
          taskItem: payload
        })
        // dispatch('initTaskList')
        message('success', '新建成功')
      }
    },
    //更新任务内容
    async updateTaskInfo({ commit }, payload) {
      const res = await updateTask(payload)
      if (res.state) {
        message('success', '修改任务成功')
        //dispatch('initTaskList')
        commit('refreshTask', payload)
      } else {
        message('error', '修改失败')
      }
    },
    //更新优先级
    async updatePriority({ commit }, payload) {
      console.log(payload)
      const { id, afterPriority } = payload
      const res = await updateTask({ id, priority: afterPriority })
      payload.priority = payload.afterPriority
      delete payload.afterPriority
      if (res.state) {
        // dispatch('initTaskList')
        commit('delTask', payload)
        commit('addTask', { priority: payload.priority, taskItem: payload })
        message('success', '修改优先级成功')
      }
    },
    //更新时间
    async updateDate({ commit }, payload) {
      const res = await updateTask(payload)
      if (res.state) {
        // dispatch('initTaskList')
        commit('refreshTask', payload)
        message('success', '修改时间成功')
      }
    },
    //删除任务
    async deleteTaskItem({ commit }, payload) {
      confirm('提示', '确定要删除吗').then(async () => {
        console.log(payload)
        await deleteTask(payload)
        commit('delTask', payload)
        message('success', '删除成功')
      })
    },
    //更新完成状态
    async changeState({ commit }, payload) {
      const res = await updateTask(payload)
      console.log(payload)
      console.log(res)
      commit('refreshTask', payload)
      if (res.state) {
        message('success', '修改任务状态成功')
      }
    }
  }
}
