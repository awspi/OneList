import store from '@/store'
export const handleLogout = (err) => {
  // 处理token超时
  if (err.response?.data?.code === 401) {
    store.dispatch('user/logout')
  }
}
