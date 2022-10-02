import { h, render } from 'vue'
import confirmCpn from './index.vue'

/**
 *展示confirm
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} cancelText 返回按钮文本
 * @param {*} confirmText 确定按钮文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }
    /**
     * 关闭事件
     */
    const close = () => {
      // 3.把渲染的vnode去掉
      render(null, document.body)
    }
    /**
     * confirm
     */
    const confirmHandler = () => {
      resolve()
    }
    /**
     * cancel
     */
    const cancelHandler = () => {
      reject(new Error('取消按钮被点击'))
    }
    // 1.生成vnode
    const vnode = h(confirmCpn, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })
    // 2.render渲染
    render(vnode, document.body)
  })
}
