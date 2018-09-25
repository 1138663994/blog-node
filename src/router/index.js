import Vue from 'vue'
import Router from 'vue-router'
import Common from './common'
import Systemlayout from './system'
import blogLayout from './blog'
import NoFound from '@/views/404'
Vue.use(Router)

console.log('Systemlayout', Systemlayout)
export default new Router({
  routes: [
    {
      path: '*',
      component: NoFound
    },
    {
      path: '/',
      redirect: '/blog/home'
    },
    ...Systemlayout,
    ...Common,
    ...blogLayout
  ]
})
