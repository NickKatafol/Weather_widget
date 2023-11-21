import { createRouter, createWebHistory } from 'vue-router'
import Weather from '../domains/Weather/Weather.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather',
      component: Weather
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../domains/AboutPage/AboutView.vue')
    }
  ]
})

export default router
