import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/'
import Page from './page'
import Common from './common'
import Article from './article'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    ...Page,
    ...Common,
    ...Article
  ]
})
