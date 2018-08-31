// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import { Button,
  Select,
  Form,
  FormItem,
  Input,
  InputNumber,
  Table,
  TableColumn,
  Dialog
} from 'element-ui'
import http from './http'

Vue.use(Dialog)
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
