import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/index'
import Page from './page'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    ...Page
  ]
})
