/**
 * 补齐数字位数
 * @param {*} num 需要被填补的数字
 * @param {*} fill 位数
 * @returns
 */
export const padNumber = (num, fill) => {
  let len = ('' + num).length
  if (fill > len) {
    // 新建一个空数组，长度为所缺位数+1，利用join(0)，得到一个000...的字符串
    num = Array(fill - len + 1 || 0).join(0) + num
  }
  return num
}
