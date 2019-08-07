import request from '@/utils/request'

// 订单列表
export function orderList(page) {
  return request({
    url: '/Order/carduse',
    method: 'post',
    data: {page}
  })
}

// 获取订单数据res.list 列表数据  res.selectinfo 筛选条件
export function orderData(type, cardtype, storeids) {
  return request({
    url: '/Order/order',
    method: 'post',
    data: {type, cardtype, storeids}
  })
}
