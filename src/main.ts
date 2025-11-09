import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import './styles/main.scss'

const app = createApp(App)

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

// Middleware для защиты маршрутов
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token

  // Если пользователь не авторизован и пытается зайти на главную страницу
  if (to.path === '/' && !isAuthenticated) {
    next('/login')
    return
  }

  // Если пользователь авторизован и пытается зайти на страницу логина
  if (to.path === '/login' && isAuthenticated) {
    next('/')
    return
  }

  next()
})

app.use(router)
app.mount('#app')
