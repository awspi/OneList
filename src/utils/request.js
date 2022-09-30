import axios from 'axios'
import store from '@/store'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
  //* 后端请求类型为x-www-form-urlencoded,axios默认是JSON
  // headers: { 'content-type': 'application/x-www-form-urlencoded' }
})
/**
 * ? 请求拦截器
 */
service.interceptors.request.use((config) => {
  console.log(config)
  //* json->x-www-form-urlencoded
  // config.data = qs.stringify(data)
  //* 携带token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
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
