import { request, config } from 'utils'

const { api } = config
const { newlist ,delnews} = api

export function query (params) {
  return request({
    url: newlist,
    method: 'post',
    data: params
  })
}

export function remove (params) {
  return request({
    url: delnews,
    method: 'post',
    data: params,
    needToken:true
  })
}
