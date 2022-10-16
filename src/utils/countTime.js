import router from '@/router'
/**
 * 记录页面停留时长
 * @param {*} to
 * @param {*} from
 */
let startTime = Date.now()
const countTime = (to, from) => {
  // 获取当前时间
  const currentTime = Date.now()
  console.log(
    `用户 ${from.path} --> ${to.path}  停留 ${currentTime - startTime}ms`
  )
  startTime = Date.now() //初始化开始时间
}
router.beforeEach((to, from, next) => {
  countTime(to, from)
  next()
})
