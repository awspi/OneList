import axios from 'axios'
import store from '@/store'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
/**
 * ? 请求拦截器
 */
service.interceptors.request.use((config) => {
  //* 携带token
  // if (store.getters.token) {
  //   config.headers.Authorization = `Bearer ${store.getters.token}`
  // }
  return config // 必须返回配置
})
/**
 *? 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const { data, success, message } = response.data
    if (success) {
      return data
    }
    // 业务请求错误
    return Promise.reject(new Error(message))
  },
  (err) => {
    //* 处理token超时
    // if (err.response?.data?.code === 401) {
    //   store.dispatch('user/logout')
    // }
  }
)
export default service
