import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Dashboard from '@/components/Dashboard'
import { auth } from '../firebase'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
     {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("----- Switching Route");
  // console.log(to, from, next);
  let currentUser = auth.currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
