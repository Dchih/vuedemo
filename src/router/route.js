export default [
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
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/login.vue')
    },
  ]