import axios from 'axios'
import { Message } from 'element-ui'
import {getItem} from './util/sessionStorage'
// 创建axios实例
const instance = axios.create({
  baseURL: '/blogapi',
  timeout: 1000 * 20 // 请求超时时间
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8;',
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT' // 避免 IE10 返回 304
  // }
})

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // console.log('config', config)
    let userToken = getItem('token')
    if (userToken) {
      config.headers.Authorization = 'Bearer ' + userToken.token
    }
    return config
  },
  error => {
    // Do something with request error
    console.log('httpError: ', error) // for debug
    Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('errsss' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default instance
