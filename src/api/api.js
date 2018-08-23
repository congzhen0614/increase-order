/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
import axios from 'axios'
import qs from 'qs'

// 设置headers
axios.interceptors.request.use(config => {
  if (JSON.parse(localStorage.getItem('user'))) {
    config.headers.Authorization = JSON.parse(localStorage.getItem('user')).auth
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 设置重定向
axios.interceptors.response.use(response => {
  if (response.data.code === '-6') {
    localStorage.clear()
    window.location.href = 'http://192.168.0.48:8090/#/login'
  } else if (response.data.code < '0') {
    console.log(response)
  }
  return response
}, err => {
  return Promise.reject(err)
})

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
  },
  magazineDetail (id) {
    return axios.get(`/qrzd/magazine/qrzditem/detail/${id}/open`)
  },
  bookDetail (id) {
    return axios.get(`/qrzd/book/detail/${id}/open`)
  },
  bookComment (params) { // 图书评论
    let param = qs.stringify(params)
    return axios.get(`/qrzd/book/comment/open?${param}`)
  },
  spypaudioalbumList (params) { // 视听包专辑
    let param = qs.stringify(params)
    return axios.get(`/qrzd/spyp/spypaudioalbum/list/album/open?${param}`)
  },
  spypaudioList (params) { // 视听专辑内容
    let param = qs.stringify(params)
    return axios.get(`/qrzd/spyp/spypaudio/list/open?${param}`)
  },
  addressList () { // 地址列表
    return axios.get('/qrzd/sys/address/list/open')
  },
  childList () { // 孩子列表
    return axios.get('/qrzd/sys/child/list/open')
  },
  addressUpdate (params) {
    return axios.post('/qrzd/sys/address/update/open', params)
  },
  provinceList () {
    return axios.get('/qrzd/sys/area/list/province')
  },
  citiesList (params) {
    return axios.post('/qrzd/sys/area/list/citybyid', params)
  },
  regionList (params) {
    return axios.post('/qrzd/sys/area/list/regionbyid', params)
  },
  accountListarea (params) {
    return axios.post('/qrzd/agent/account/listarea/open', params)
  }
}
