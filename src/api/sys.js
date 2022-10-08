import request from '../utils/request'
/**
 * 获取OSS上传凭证
 */
export const getSts = () => {
  return request({
    url: '/sts'
  })
}
