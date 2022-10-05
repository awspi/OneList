import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import task from './modules/task'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {},
  getters,
  modules: { app, user, task },
  plugins: [
    createPersistedState({
      //指定保存到localstorage的key
      key: 'OneList',
      //需要保存的模块
      paths: ['app', 'user', 'task'] //
    })
  ]
})

export default store
