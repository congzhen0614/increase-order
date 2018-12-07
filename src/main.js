/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api'
import store from './vuex/store'
import * as custom from './common/filters.js'

// axios请求api
let u = navigator.userAgent
Vue.prototype.$axios = api
Vue.prototype.Trim = custom.Trim
Vue.prototype.Toast = new window.AuiToast() // 提示组件
Vue.prototype.Dialog = new window.AuiDialog() // 对话框组件
Vue.prototype.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
Vue.prototype.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
Vue.prototype.isWeixin = !!u.match(/MicroMessenger/i)
Vue.prototype.isWeibo = !!u.match(/weibo/)

// 过滤器
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    Bus: new Vue()
  }
})
