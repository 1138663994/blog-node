// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {createRouter} from './router'
import {createStore} from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/reset.css'
import { sync } from 'vuex-router-sync'

import $ from 'jquery' // eslint-disable-line
import { Button,
  Select,
  Option,
  OptionGroup,
  Form,
  FormItem,
  Input,
  InputNumber,
  Table,
  TableColumn,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Switch,
  DatePicker,
  Loading,
  Message,
  Pagination
} from 'element-ui'
console.log('%c一定是特别的缘分才能看到这段话。', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:3em;')
Vue.use(mavonEditor)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Loading)
Vue.use(Pagination)

Vue.prototype.$message = Message
/* eslint-disable no-new */
export function createApp (http) {
  Vue.prototype.$http = http
  const store = createStore(http)
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
