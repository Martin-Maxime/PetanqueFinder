import Users from '@/components/admin/Users';
import Signin from '@/components/auth/login/signin';
import Home from '@/components/home/Home';
import Signup from '@/components/Signup';
import Account from '@/components/user/Account';
import Vue from 'vue';
import { default as Router, default as VueRouter } from 'vue-router';

Vue.use(Router);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: { requiresAuth: false }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta: { requiresAuth: false }
    },
    {
      path: '/user/account',
      name: 'My-account',
      component: Account,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user-infos');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next({ name: 'Signin', path: '/singin', query: { redirect: to.fullPath } });
    }
  } else {
    if (user && to.matched.some((record) => record.meta.requiresAuth === false)) {
      next({ name: 'HelloWorld', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  }
});

export default router;
