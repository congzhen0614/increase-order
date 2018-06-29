/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
import axios from 'axios'

// 接口列表
export default {
  shoppingList () {
    return axios.get('/static/data/shop.json')
  },
  addressList () {
    return axios.get('/static/data/address.json')
  }
}
