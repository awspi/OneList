import axios from 'axios'
import store from '@/store'
import { EXPIRE_TIME } from '@/constants'
import { handleLogout } from '@/hooks/handleLogout'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
//前端缓存
let cache = {}
//取消重复请求
let pending = []

// 利用axios的cancelToken来取消请求
const CancelToken = axios.CancelToken
let cancel = null

/**
 * ? 请求拦截器
 */
service.interceptors.request.use((config) => {
  const requestStr = config.url + '&' + config.method
  console.log('cache', cache)
  console.log('pending', pending)
  //* 携带token
  if (store.getters.token) {
    config.headers.token = store.getters.token
  }
  //? 取消请求
  //* 判断是否存在未完成的相同请求 如果存在就取消之前的
  pending = pending.filter((item) => {
    if (item.request === requestStr) {
      console.log('service:取消前一次未完成请求请求')
      item.cancel()
    }
    return item.request !== requestStr
  })

  //* 携带 CancelToken ,加入pending
  config.cancelToken = new CancelToken(function executor(c) {
    cancel = c
    pending.push({ request: requestStr, cancel: c })
  })

  //* 判断数据是否存在以及过期
  // 在缓存池获取缓存数据
  let data = cache[config.url]
  // 获取当前时间戳
  let expire_time = getExpireTime()
  // 判断缓存池中是否存在已有数据 存在的话 再判断是否过期
  // 未过期 cancel取消当前的请求 并将内容返回到拦截器的err中
  if (data && expire_time - data.expire < EXPIRE_TIME) {
    console.log('service:从缓存池中获取数据')
    //从pending移出此次请求
    removePending(config)
    cancel(data)
  }

  return config // 必须返回配置
})
/**
 *? 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    //* 已经完成的请求从pending中移除
    removePending(response.config)
    //*缓存data
    // 只缓存get请求
    if (response.config.method === 'get') {
      // 缓存数据
      let data = {
        expire: getExpireTime(), //当前时间戳
        data: response.data //数据
      }
      cache[`${response.config.url}`] = data
    }
    return response.data
  },
  (err) => {
    // 请求拦截器中的cancel会将内容发送到error中
    // CanceledError {message: {…}, name: 'CanceledError', code: 'ERR_CANCELED'}
    // 通过axios.isCancel()来判断是否返回有数据
    if (axios.isCancel(err)) {
      return Promise.resolve({ ...err.message.data })
    }
    // 处理token超时
    handleLogout(err)
    return Promise.reject(err)
  }
)

//已经完成的请求从pending中移除
const removePending = (config) => {
  pending = pending.filter((item) => {
    return item.request !== config.url + '&' + config.method
  })
}
// 获取当前时间
function getExpireTime() {
  return new Date().getTime()
}
export default service
