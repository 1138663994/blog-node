// const storage = sessionStorage

// export function getItem (name) {
//   let result = storage.getItem(name)
//   return JSON.parse(result)
// }

// export function setItem (name, value) {
//   storage.setItem(name, JSON.stringify(value))
// }

// export function removeItem (name) {
//   storage.removeItem(name)
// }

import Cookies from 'js-cookie'

const tokenKey = 'user-token'

export function getToken () {
  return Cookies.get(tokenKey)
}

export function setToken (token) {
  return Cookies.set(tokenKey, token)
}

export function removeToken () {
  return Cookies.remove(tokenKey)
}
