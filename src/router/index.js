import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/components/Home'

Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/register.vue')
  },
  // 路由重定向
  {
    path: '*',
    redirect: '/'
  },
]

const router = new Router({
  mode: 'history',
  routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const auth = router.app.$options.store.state.auth

  if (auth && to.path.indexOf('/auth/') !== -1) {
    next('/')
  } else {
    next()
  }
})

export default router
