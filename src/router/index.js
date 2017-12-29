import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import user from '@/components/user'
import login from '@/components/login'
import admin from '@/components/admin'
// user页面
import gonggao from '@/user_pages/gonggao'
import zhxx from '@/user_pages/zhxx'
import xgmm from '@/user_pages/xgmm'
import zdcx from '@/user_pages/zdcx'
import wsff from '@/user_pages/wsff'
import jfjl from '@/user_pages/jfjl'
import gzcx from '@/user_pages/gzcx'
import ly from '@/user_pages/ly'
import tdjd from '@/user_pages/tdjd'
import ywjd from '@/user_pages/ywjd'
// admin页面
import admin_gonggao from '@/admin_pages/gonggao'
import lygl from '@/admin_pages/lygl'
import gzgl from '@/admin_pages/gzgl'
import fylr from '@/admin_pages/fylr'
import sfgl from '@/admin_pages/sfgl'
// dataadmin页面
import dataadmin from '@/components/dataadmin'
import b_userlogin from '@/dataadmin_pages/login'



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
          path: 'gonggao',
          component: gonggao
        },
        {
          path: 'zhxx',
          component: zhxx
        },
        {
          path: 'xgmm',
          component: xgmm
        },
        {
          path: 'zdcx',
          component: zdcx
        },
        {
          path: 'wsff',
          component: wsff
        },
        {
          path: 'jfjl',
          component: jfjl
        },
        {
          path: 'gzcx',
          component: gzcx
        },
        {
          path: 'ly',
          component: ly
        },
        {
          path: 'sfgl',
          component: sfgl
        },
        {
          path: 'tdjd',
          component: tdjd
        },
        {
          path: 'ywjd',
          component: ywjd
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        {
          path: 'gonggao',
          component: admin_gonggao
        },
        {
          path: 'lygl',
          component: lygl
        },
        {
          path: 'gzgl',
          component: gzgl
        },
        {
          path: 'fylr',
          component: fylr
        },
        {
          path: 'lygl',
          component: lygl
        },
        {
          path: 'sfgl',
          component: sfgl
        },
      ]
    },
    {
      path: '/dataadmin',
      name: 'dataadmin',
      component: dataadmin,
      children: [
        {
          path: 'b_userlogin',
          component: b_userlogin
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
  ]
})
