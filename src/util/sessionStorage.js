const storage = window.sessionStorage

export function getItem (name) {
  let result = storage.getItem(name)
  return JSON.parse(result)
}

export function setItem (name, value) {
  storage.setItem(name, JSON.stringify(value))
}

export function removeItem (name) {
  storage.removeItem(name)
}
