export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      }
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login-register/index.vue')
  }
]
