import Vue from 'vue'
import Router from 'vue-router'
import Common from './common'
import Systemlayout from './system'
import blogLayout from './blog'
import NoFound from '@/views/404'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '*',
        component: NoFound
      },
      {
        path: '/',
        redirect: '/webblog/home'
      },
      ...Systemlayout,
      ...Common,
      ...blogLayout
    ]
  })
}
