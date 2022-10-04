import request from '../utils/request'
//user

/**
 * 获取所有任务列表
 */
export const getTaskList = (data) => {
  console.log(data)
  return request({
    url: '/user/allList'
  })
}
/**
 * 新建任务
 */
export const addTask = (data) => {
  return request({
    url: '/user/add',
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
export const deleteTask = (id) => {
  return request({
    url: '/list/delete' + id,
    method: 'DELETE'
  })
}
