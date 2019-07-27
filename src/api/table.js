import request from '@/utils/request'

export function storeList(params) {
  return request({
    url: '/table/list',
    method: 'post',
    params
  })
}
