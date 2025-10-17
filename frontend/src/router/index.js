import Vue from 'vue'
import VueRouter from 'vue-router'
// Import the new LandingPage view
import LandingPage from '../views/auth/LandingPage.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginPage from '../views/auth/Login.vue'
import RegisterPage from '../views/auth/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login', // Relative path
        name: 'Login',
        component: LoginPage,
      },
      {
        path: 'register', // Relative path
        name: 'Register',
        component: RegisterPage,
      }
    ]
  },
  // Fallback for direct access to /login and /register
  {
    path: '/login',
    redirect: '/auth/login'
  },
  {
    path: '/register',
    redirect: '/auth/register'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

