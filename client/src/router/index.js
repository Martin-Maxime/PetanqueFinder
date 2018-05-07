import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/Users'
import Signup from '@/components/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'App',
    component: App
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
  }]
})
