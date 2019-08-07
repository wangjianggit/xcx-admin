import request from '@/utils/request'

export function storeList() {
  return request({
    url: '/Store/list',
    method: 'post',
    data: {}
  })
}
// 会员卡列表
export function cardList(page, status) {
  return request({
    url: '/Card/list',
    method: 'post',
    data: {page, status}
  })
}
// 适用店铺
export function homeStores() {
  return request({
    url: '/Home/stores',
    method: 'post',
    data: {}
  })
}
// 添加会员卡-获取动态参数
export function addCard() {
  return request({
    url: '/Card/addcard',
    method: 'post',
    data: {}
  })
}
// 添加会员卡-保存入库
export function cardSave() {
  return request({
    url: '/Card/save',
    method: 'post',
    data: {}
  })
}
