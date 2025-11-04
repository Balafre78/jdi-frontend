import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/views/MainLayout.vue'
import AuthLayout from '@/views/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/main/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/main/AboutView.vue'),
        },
        {
          path: 'lists',
          name: 'lists',
          component: () => import('@/views/main/ListsView.vue'),
        }
      ]
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
      ]
    },
    {
      path: '/register',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
      ]
    }
  ],
})

export default router
