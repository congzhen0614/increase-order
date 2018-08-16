/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
import axios from 'axios'
import qs from 'qs'

// 设置headers
// axios.interceptors.request.use(config => {
//   if (JSON.parse(localStorage.getItem('user'))) {
//     config.headers.Authorization = JSON.parse(localStorage.getItem('user')).authorization
//   }
//   return config
// }, err => {
//   return Promise.reject(err)
// })
//
// 设置重定向
// axios.interceptors.response.use(response => {
//   if (response.data.code === '-6') {
//     localStorage.clear()
//     window.location.reload()
//   } else if (response.data.code < '0') {
//     console.log(response)
//   }
//   return response
// }, err => {
//   return Promise.reject(err)
// })

export default {
  login (params) { // 登录
    let param = qs.stringify(params)
    return axios.get(`api/user/login?${param}`)
  },
  itempackList (params) { // 首页数据
    let param = qs.stringify(params)
    return axios.get(`/qrzd/itempack/list/open?${param}`)
  },
  itemtypeList () { // 类型列表
    return axios.get('/qrzd/sys/itemtype/list/open')
  },
  itemageList () { // 年龄列表
    return axios.get('/qrzd/sys/itemage/list/open')
  }
}
