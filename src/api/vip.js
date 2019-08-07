import request from '@/utils/request'

/**
 * 获取会员卡列表
 * param: page 默认为1 ，type所有会员可以不传，已消费该值为xf
 * */
export function memberList(page, phone) {
  return request({
    url: '/Member/list',
    method: 'post',
    data: {page, phone}
  })
}
