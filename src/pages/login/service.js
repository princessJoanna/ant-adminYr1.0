import { request, config } from 'utils'
const { api } = config
const { userLogin,keyPair} = api
export function login (payload) {
  return request({
    url: userLogin,
    method: 'post',
    data:payload,
    fetchType:'formData'


  })
}
export function pair (payload) {
  return request({
    url: keyPair,
    method: 'post',
    data:payload,
   
  })
}
