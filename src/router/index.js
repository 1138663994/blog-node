import Vue from 'vue'
import Router from 'vue-router'
import Common from './common'
import Systemlayout from './system'
Vue.use(Router)

console.log('Systemlayout', Systemlayout)
export default new Router({
  routes: [
    ...Systemlayout,
    ...Common
  ]
})
