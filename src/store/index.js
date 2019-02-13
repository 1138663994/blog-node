import Vue from 'vue'
import Vuex from 'vuex'
import Page from './modules/page'
import createBlogHome from './modules/blogHome'
Vue.use(Vuex)

export function createStore (http) {
  return new Vuex.Store({
    state: {
      demo: 1
    },
    modules: {
      Page,
      BlogHome: createBlogHome(http)
    }
  })
}
