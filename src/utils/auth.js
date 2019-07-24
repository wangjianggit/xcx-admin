
const TokenKey = 'token'

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(TokenKey, str) {
  return localStorage.setItem(TokenKey, str);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}
