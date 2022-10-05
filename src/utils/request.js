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
    return response.data
  },
  (err) => {
    // 处理token超时
    if (err.response?.data?.code === 401) {
      store.dispatch('user/logout')
    }
  }
)
export default service
