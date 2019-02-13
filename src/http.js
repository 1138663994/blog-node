import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'

export function createClientHttp () {
  console.log('createClientHttp')
  // 使用自定义配置 创建一个 axios 实例
  const instance = axios.create({
    baseURL: '/blogapi',
    timeout: 1000 * 20,
    headers: {
      // 'Content-Type': 'application/json;charset=UTF-8;'
      'X-Requested-With': 'XMLHttpRequest',
      'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT' // 避免 IE10 返回 304
    }
  })

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    let userToken = Cookies.getJSON('user-token')
    // console.log('userToken', JSON.parse(userToken))
    if (userToken) {
      config.headers.Authorization = 'Bearer ' + userToken.token
    }
    return config
  }, error => {
    // 对错误请求做些什么
    console.log('httpError: ', error)
    return Promise.reject(error)
  })

  // 添加响应拦截器
  instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response
  }, error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })
  return instance
}
export function createServerHttp (cookies) {
  let accessToken
  const baseURL = 'http://localhost:3000/blogapi'
  if (cookies['user-token']) {
    accessToken = JSON.parse(cookies['user-token']).access_token
  }

  // 使用自定义配置 创建一个 axios 实例
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 1000 * 20,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer${accessToken}`
    }
  })
  return instance
}
// // 创建axios实例
// const instance = axios.create({
//   baseURL: '/blogapi',
//   timeout: 1000 * 20 // 请求超时时间
//   // headers: {
//   //   'Content-Type': 'application/json;charset=UTF-8;',
//   //   'X-Requested-With': 'XMLHttpRequest',
//   //   'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT' // 避免 IE10 返回 304
//   // }
// })

// // 添加请求拦截器
// instance.interceptors.request.use(
//   config => {
//     // console.log('config', config)
//     let userToken = getToken()
//     if (userToken) {
//       config.headers.Authorization = 'Bearer ' + userToken.token
//     }
//     return config
//   },
//   error => {
//     // Do something with request error
//     console.log('httpError: ', error) // for debug
//     Promise.reject(error)
//   }
// )

// // 添加响应拦截器
// instance.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     console.log('errsss' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default instance
