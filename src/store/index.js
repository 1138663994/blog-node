import Vue from 'vue'
import Vuex from 'vuex'
import Page from './modules/page'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    demo: 1
  },
  modules: {
    Page
  }
})

export default store
