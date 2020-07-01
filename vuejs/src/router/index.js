import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/register.vue')
    }
  ]
})
