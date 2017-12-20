import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/user'
import login from '@/components/login'
import gonggao from '@/pages/gonggao'
import zhxx from '@/pages/zhxx'
import xgmm from '@/pages/xgmm'
import iView from 'iview';
import 'iview/dist/styles/iview.css';


Vue.use(iView);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'user',
      component: user,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'gonggao',
          component: gonggao
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'zhxx',
          component: zhxx
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'xgmm',
          component: xgmm
        },
      ]
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
