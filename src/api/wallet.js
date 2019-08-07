import request from '@/utils/request'

/**
 * 钱包-获取首页数据
 * param:
 * res: balance 金额
 * */
export function balance() {
  return request({
    url: 'Balance/index',
    method: 'post',
    data: {}
  })
}

/**
 * 钱包-获取交易明细
 * param: page 默认为1
 * res: type 1 => 收入 0 => 支出
 * */
export function balanceDetail(page) {
  return request({
    url: '/Balance/trade',
    method: 'post',
    data: {page}
  })
}
