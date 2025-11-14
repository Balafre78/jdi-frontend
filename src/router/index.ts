import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/views/MainLayout.vue'
import AuthLayout from '@/views/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth.ts'

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
          meta: { requiresAuth: true }
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
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    // Redirect unauthenticated users to login page (with redirect back in query)
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if ((to.name === 'login' || to.name === 'register') && auth.isLoggedIn) {
    // Redirect logged-in users away from login/register pages
    next('/');
  } else {
    // Proceed as normal
    next();
  }
});

export default router;
