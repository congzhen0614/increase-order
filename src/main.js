/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api'
import * as custom from './common/js/filters.js'

// axios请求api
Vue.prototype.$axios = api

// 过滤器
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    Bus: new Vue()
  }
})
