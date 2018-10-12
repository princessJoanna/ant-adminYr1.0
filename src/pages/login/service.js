import { request, config } from 'utils'

const { api } = config
const { userLogin} = api

export function login (payload) {
  return request({
    url: userLogin,
    method: 'post',
    data:payload,
    fetchType:'formData'
  })
}
