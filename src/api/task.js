import request from '../utils/request'
//user

/**
 * 获取所有任务列表
 */
export const getAllTaskList = () => {
  return request({
    url: '/user/allList'
  })
}
/**
 * 新建任务
 */
export const newTask = (data) => {
  return request({
    url: '/list/add',
    method: 'POST',
    data
  })
}
/**
 * 更新任务信息
 */
export const updateTask = (data) => {
  return request({
    url: '/list/update',
    method: 'PUT',
    data
  })
}

/**
 * 删除信息
 */
export const deleteTask = (data) => {
  return request({
    url: '/list/delete',
    data,
    method: 'DELETE'
  })
}
