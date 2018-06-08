import Vue from 'vue'
import VueHead from 'vue-head'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/Users'
import Signup from '@/components/Signup'
import Account from '@/components/user/Account'

Vue.use(Router)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/user/account',
    name: 'My-account',
    component: Account,
    meta: {requiresAuth: true}    
  }]
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user-infos')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      next({ name: 'HelloWorld', query: { redirect: to.fullPath } })
    }
  } else {
    if (user && to.name !== 'public') {
      next({ name: HelloWorld })
    } else {
      next()
    }
  }
})

export default router