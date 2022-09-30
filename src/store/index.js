import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {},
  getters,
  modules: { app, user },
  plugins: [
    createPersistedState({
      //指定保存到localstorage的key
      key: 'OneList',
      //需要保存的模块
      paths: ['app', 'user']
    })
  ]
})

export default store
