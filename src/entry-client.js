import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './main'
import {createClientHttp} from './http'
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp(createClientHttp())

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady((currentRoute) => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.

  if (window._serverRenderError) {
    console.log('执行客户端渲染')
  }

  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    console.log('start')
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        console.log('end')
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if (location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
