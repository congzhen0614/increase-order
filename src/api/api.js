/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
let obj = new Vue()
axios.defaults.baseURL = location.protocol + '//192.168.0.230:8081'

// 设置headers
axios.interceptors.request.use(config => {
  if (JSON.parse(localStorage.getItem('user'))) {
    config.headers.Authorization = JSON.parse(localStorage.getItem('user')).authorization
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 设置重定向
axios.interceptors.response.use(response => {
  if (response.data.code === '-6') {
    localStorage.clear()
    window.location.reload()
  } else if (response.data.code < '0') {
    obj.$message.error(response.data.msg)
  }
  return response
}, err => {
  return Promise.reject(err)
})

export default {
  itempackList (params) { // 登录
    let param = qs.stringify(params)
    return axios.get(`/qrzd/itempack/list/open?${param}`)
  }
}
