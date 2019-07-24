const token = 'token'

export function getToken() {
  return localStorage.getItem(token);
}

export function setToken(str) {
  return localStorage.setItem(token, str);
}

export function removeToken() {
  return localStorage.removeItem(token);
}
