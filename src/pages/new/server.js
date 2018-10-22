import { request, config } from 'utils'

const { api } = config
const { newlist } = api

export function query (params) {
  return request({
    url: newlist,
    method: 'post',
    data: params,
    fetchType:'JSON',
  })
}

export function remove (params) {
  return request({
    url: users + '/delete',
    method: 'post',
    data: params,
  })
}
