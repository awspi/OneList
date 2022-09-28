import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
  state: {},
  getters,
  modules: { app },
  plugins: [
    createPersistedState({
      //指定保存到localstorage的key
      key: 'OneList',
      //需要保存的模块
      paths: ['app']
    })
  ]
})

export default store
