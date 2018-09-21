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

// 截取字段
let cutString = (value, isCut) => {
  if (isCut) {
    return value.substring(0, 20) + '...'
  } else {
    return value
  }
}

// 时间格式
let timeFormat = value => {
  let date = new Date(value)
  let Y = date.getFullYear()
  let M, D, h, m, s
  if (parseInt(date.getMonth() + 1).toString().length === 1) {
    M = '0' + parseInt(date.getMonth() + 1)
  } else {
    M = parseInt(date.getMonth() + 1)
  }
  if (date.getDate().toString().length === 1) {
    D = '0' + date.getDate()
  } else {
    D = date.getDate()
  }
  if (date.getHours().toString().length === 1) {
    h = '0' + date.getHours()
  } else {
    h = date.getHours()
  }
  if (date.getMinutes().toString().length === 1) {
    m = '0' + date.getMinutes()
  } else {
    m = date.getMinutes()
  }
  if (date.getSeconds().toString().length === 1) {
    s = '0' + date.getSeconds()
  } else {
    s = date.getSeconds()
  }
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}

export {
  getInteger,
  timeFormat,
  getFixed1,
  getFixed2,
  cutString,
  cutStr
}
