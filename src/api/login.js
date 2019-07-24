import request from '@/utils/request'

export function getmytoken(appid, appsecret) {
  return request({
    url: '/index/gettoken',
    method: 'post',
    data: {
      appid,
      appsecret
    }
  })
}

export function login(phone, password) {
  return request({
    url: '/index/login',
    method: 'post',
    data: {
      phone,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
