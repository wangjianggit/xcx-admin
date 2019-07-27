import request from '@/utils/request'

export function storeList() {
  return request({
    url: '/Store/list',
    method: 'post',
    data: {}
  })
}
