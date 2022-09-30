/**
 * 用户名的表单校验
 * @param {*} val 输入端内容
 * @returns true表示校验通过,String表示未通过 string为提示消息
 */
export const validateUsername = (val) => {
  if (!val) {
    return '用户名为必填的'
  }

  if (val.length < 3 || val.length > 12) {
    return '用户名应该在 3-12 位之间'
  }
  return true
}
/**
 * 密码的表单校验
 */
export const validatePassword = (val) => {
  if (!val) {
    return '密码为必填的'
  }

  if (val.length < 6 || val.length > 12) {
    return '密码应该在 6-12 位之间'
  }
  return true
}
/**
 * 确认密码的表单校验
 */
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
