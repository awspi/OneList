import axios from 'axios'
import store from '@/store'
import qs from 'qs'
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})
/**
 * ? 请求拦截器
 */
service.interceptors.request.use((config) => {
  config.data
  //* 携带token
  if (store.getters.token) {
    config.headers.token = store.getters.token
  }
  return config // 必须返回配置
})
/**
 *? 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    console.log(response)
    return response.data
  },
  (err) => {
    // 处理token超时
    // if (err.response?.data?.message === 'jwt expired') {
    //   store.dispatch('user/logout')
    // }
  }
)
export default service
