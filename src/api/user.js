import request from '../utils/request'
//user

/**
 * 登录
 */
export const loginUser = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: data
  })
}
/**
 * 注册
 */
export const registerUser = (data) => {
  return request({
    url: '/user/add',
    method: 'POST',
    data: data
  })
}
/**
 * 获取用户信息
 */
export const getProfile = () => {
  return request({
    url: '/user/myinformation'
  })
}
/**
 * 更新用户信息
 */
export const putProfile = (data) => {
  return request({
    url: '/user/update',
    data,
    method: 'PUT'
  })
}
