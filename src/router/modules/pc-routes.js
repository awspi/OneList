export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'todolist',
        component: () => import('@/views/todolist/index.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      },
      {
        path: '/calendar',
        name: ' calendar',
        component: () => import('@/views/calendar/index.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      },
      {
        path: '/clock',
        name: 'home',
        component: () => import('@/views/clock/index.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      },
      {
        path: '/statistic',
        name: 'statistic',
        component: () => import('@/views/statistic/index.vue'),
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
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/setting/main/index.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/setting/setupCenter/setupCenter.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      },
      {
        path: 'setupCenter',
        name: 'setupCenter',
        component: () => import('@/views/setting/setupCenter/setupCenter.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      },
      {
        path: 'privacyAgreement',
        name: 'privacyAgreement',
        component: () =>
          import('@/views/setting/privacyAgreement/privacyAgreement.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      },
      {
        path: 'topics',
        name: 'topics',
        component: () => import('@/views/setting/topics/topics.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/setting/about/about.vue'),
        //标记当前的页面只有登录之后才能进入
        meta: {
          user: true
        }
      }
    ]
  }
]
