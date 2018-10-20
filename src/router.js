import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [{
        path: '/display',
        name: 'display',
        meta: {
          title: '演出'
        },
        component: () => import('./views/DisplayList.vue')
      },
      {
        path: '/ddetail/:id',
        name: 'ddetail',
        meta: {
          title: '编辑演出'
        },
        component: () => import('./views/display/DisplayDetail.vue')
      },
      {
        path: '/order',
        name: 'order',
        meta: {
          title: '订单'
        },
        component: () => import('./views/OrderList.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '管理员'
        },
        component: () => import('./views/AdminList.vue')
      }]
    }
  ]
})