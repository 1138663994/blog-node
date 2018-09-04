// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/reset.css'
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
  Switch
} from 'element-ui'
import http from './http'

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

Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
