import OSS from 'ali-oss'
import { getSts } from '@/api/sys'
import { REGION, BUCKET } from '@/constants'
export const getOSSClient = async () => {
  let res = await getSts()
  res = JSON.parse(res.data)
  console.log(res)
  return new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: REGION,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: res.credentials.accessKeyId,
    accessKeySecret: res.credentials.accessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: res.credentials.securityToken,
    // 填写Bucket名称。
    bucket: BUCKET,
    // 刷新 token，在 token 过期后自动调用
    refreshSTSToken: async () => {
      // 向搭建的STS服务获取临时访问凭证。
      let res = await getSts()
      res = JSON.parse(res.data)
      return {
        accessKeyId: res.credentials.accessKeyId,
        accessKeySecret: res.credentials.accessKeySecret,
        stsToken: res.credentials.securityToken
      }
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 5 * 1000
  })
}
