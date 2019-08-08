import request from '@/utils/request'

/**
 * 权限-角色列表
 * param:
 * res: 角色id  name角色名称
 * */
export function ruleList() {
  return request({
    url: '/Auth/authority',
    method: 'post',
    data: {}
  })
}

/**
 * 权限-手机号码搜索用户列表
 * param: phone
 * res: id,  phone
 * */
export function ruleSearchAdd(phone) {
  return request({
    url: '/Auth/searchadd',
    method: 'post',
    data: {phone}
  })
}

/** 权限-添加权限组（角色）接口
 * param: name, authority-权限数据
 * res:
 * */
export function addAuthority(name, authority) {
  return request({
    url: '/Auth/addauthority',
    method: 'post',
    data: {name, authority}
  })
}

/** 权限-编辑权限组（角色组）
 * param: id 角色ID
 * res: select判断是否乙选择1选择0未选
 * */
export function editAuthority(id) {
  return request({
    url: '/Auth/editgroup',
    method: 'post',
    data: {id}
  })
}

/** 权限-用户列表
 * param:
 * res:
 * */
export function userList() {
  return request({
    url: 'Auth/manage',
    method: 'post',
    data: {}
  })
}
