import { request, config } from 'utils'

const { api } = config
const { userLogin,loginCode} = api

export function login (values) {
  return request({
    url: userLogin,
    method: 'post',
    data:values,
  })
}
