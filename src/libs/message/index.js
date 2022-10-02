import { h, render } from 'vue'
import messageCpn from './index.vue'
/**
 *
 * @param {*} type success/error/warn
 * @param {*} content 显示内容
 * @param {*} duration 显示时间 (ms)
 */
export const message = (type, content, duration = 3000) => {
  /**
   * 动画结束时的回调
   */
  const onDestory = () => {
    //3.删除vnode
    render(null, document.body)
  }
  return new Promise((resolve, reject) => {
    //1.生成vnode
    const vnode = h(messageCpn, {
      type,
      content,
      duration,
      destory: onDestory
    })
    //2.render渲染
    render(vnode, document.body)
    //3.删除render
  })
}
