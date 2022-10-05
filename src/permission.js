import router from '@/router'
import store from '@/store'
import { message } from '@/libs'
/**
 * 处理需要登录页面的访问权限
 */
router.beforeEach((to, from) => {
  //无需登录的页面访问
  if (!to.meta.user) {
    return true
  }
  if (store.getters.token) {
    return true
  }
  if (to.meta.user && !store.getters.token) {
    // 未登录，警告然后返回登录页
    message('warn', '登录失效，请重新登录!')
    return '/login'
  }
})
