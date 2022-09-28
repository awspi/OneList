import { createRouter, createWebHistory } from 'vue-router'
import pcRoutes from './modules/pc-routes'
//创建vueRouter实例
const router = createRouter({
  history: createWebHistory(),
  routes: pcRoutes
})

export default router
