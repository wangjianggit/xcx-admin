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
 * 权限-搜索手机号码添加管理员
 * param: phone
 * res: id,  phone
 * */
export function ruleSearchAdd(page) {
  return request({
    url: '/Auth/searchadd',
    method: 'post',
    data: {page}
  })
}
