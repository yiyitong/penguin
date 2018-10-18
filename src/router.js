import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [{
        path: '/display',
        name: 'display',
        component: () => import('./views/DisplayList.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('./views/OrderList.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('./views/AdminList.vue')
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
