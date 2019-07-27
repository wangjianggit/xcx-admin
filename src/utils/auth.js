const token = 'token'
const isLogin = 'isLogin'

export function getToken() {
  return localStorage.getItem(token);
}

export function setToken(str) {
  return localStorage.setItem(token, str);
}

export function removeToken() {
  return localStorage.removeItem(token);
}

export function getLogin() {
  return localStorage.getItem(isLogin);
}

export function setLogin(str) {
  return localStorage.setItem(isLogin, str);
}

export function removeLogin() {
  return localStorage.removeItem(isLogin);
}
