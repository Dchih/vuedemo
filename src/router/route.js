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
    {
      path: '/users/1/edit',
      // name: 'Edit',
      component: () => import('@/views/users/edit.vue'),
      children: [
        {
          path: '/user/1/edit',
          name: 'EditProfile',
          component: () => import('@/views/users/profile.vue'),
          meta: {auth: true}
        },
        {
          path: '/user/1/edit_avatar',
          name: 'EditAvatar',
          component: () => import('@/views/users/avatar.vue'),
          meta: {auth: true}
        },
        {
          path: '/user/1/edit_password',
          name: 'EditPassword',
          component: () => import('@/views/users/password.vue'),
          meta:{auth: true}
        },
      ]
    },
    {
      path: '/articles/create',
      name: 'Create',
      component: () => import('@/views/articles/create.vue')
    },
    {
      path: '/articles/:articleId/content',
      name: 'Content',
      component: () => import('@/views/articles/content.vue')
    },
    {
      path: '/articles/:articleId/edit',
      name: 'articleEdit',
      component: () => import('@/views/articles/create.vue')
    },
  ]