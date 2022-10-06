import {
  getProfile,
  loginUser,
  registerUser,
  cancellationProfile
} from '../../api/user'
import { message } from '@/libs'
import router from '../../router/index'
export default {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {
    //保存token
    setToken(state, newToken) {
      state.token = newToken
    },
    //保存用户信息
    setUserInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    //注册
    //* 注册完会自动登录
    async register({ commit, dispatch }, payload) {
      const { password } = payload
      // 注册
      const data = await registerUser({
        ...payload,
        password: password // ? md5(password) : ''
      })
      console.log(data)
      dispatch('login', payload)
    },
    //登录
    async login({ commit, dispatch }, payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password // ? md5(password) : ''
      })
      if (data.state) {
        message('success', '登录成功')
        commit('setToken', data.token)
        dispatch('profile')
        router.push('/')
      } else {
        message('error', '登录失败')
      }
    },
    //获取用户信息
    async profile({ commit }) {
      const data = await getProfile()
      console.log(data)
      commit('setUserInfo', data.user)
    },
    //退出用户
    logout({ commit }) {
      //clear token
      commit('setToken', '')
      //clear userInfo
      commit('setUserInfo', '')
      //refresh page
      location.reload()
    },
    // 注销用户
    async cancellation({ dispatch }) {
      const res = await cancellationProfile()
      await dispatch('logout')
    }
  }
}
