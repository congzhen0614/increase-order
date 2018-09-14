/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
// 获取整数部分
let getInteger = value => {
  return Math.floor(parseFloat(value))
}

// 获取小数部分
let getFixed1 = value => {
  let float = parseFloat(parseFloat(value) - Math.floor(parseFloat(value))).toFixed(2).substr(1)
  if (float.length === 2) {
    float += '0'
  }
  return float
}

// 获取两位小数
let getFixed2 = value => {
  if (value === 0) return value
  let num = parseFloat(value).toFixed(2)
  return num
}

// 截取长度30个字符
let cutStr = (value, len) => {
  if (value.length > len) {
    return value.substring(0, len) + '...'
  } else {
    return value
  }
}

let cutString = (value, isCut) => {
  if (isCut) {
    return value.substring(0, 20) + '...'
  } else {
    return value
  }
}

export {
  getInteger,
  getFixed1,
  getFixed2,
  cutString,
  cutStr
}
