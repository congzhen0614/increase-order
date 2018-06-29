/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
import Vue from 'vue'
import Router from 'vue-router'

import main from '@/pages/main/main.vue' // 首页
import aboutUs from '@/pages/aboutUs/aboutUs.vue' // 关于我们
import bookDetail from '@/pages/details/bookDetail/bookDetail.vue' // 图书详情
import periodicalDetail from '@/pages/details/periodicalDetail/periodicalDetail.vue' // 书刊详情
import productDetail from '@/pages/details/bookDetail/productDetail/product.vue' // 图书详细信息
import order from '@/pages/order/order.vue' // 订单
import homeAddress from '@/pages/address/homeAddress/homeAddress.vue' // 家庭地址列表
import schoolAddress from '@/pages/address/schoolAddress/schoolAddress.vue' // 学校地址列表
import addHomeAddress from '@/pages/address/homeAddress/addHomeAddress/addHomeAddress.vue' // 添加家庭地址
import addSchoolAddress from '@/pages/address/schoolAddress/addSchoolAddress/addSchoolAddress.vue' // 添加学校地址
import remarks from '@/pages/remarks/remarks.vue' // 备注页面
import paySuccess from '@/pages/pay/success/success.vue' // 支付成功页面
import payFailed from '@/pages/pay/failed/failed.vue' // 支付成功页面
import voiceDetail from '@/pages/details/vioceDetail/vioceDetail.vue' // 媒体详情页
import chapters from '@/pages/details/vioceDetail/chapters/chapters.vue' // 媒体章节页面

// 路由返回上一页
Router.prototype.goBack = function () {
  this.go(-1)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    }, {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    }, {
      path: '/bookDetail',
      name: 'bookDetail',
      component: bookDetail
    }, {
      path: '/periodicalDetail',
      name: 'periodicalDetail',
      component: periodicalDetail
    }, {
      path: '/productDetail',
      name: 'productDetail',
      component: productDetail
    }, {
      path: '/order',
      name: 'order',
      component: order
    }, {
      path: '/homeAddress',
      name: 'homeAddress',
      component: homeAddress
    }, {
      path: '/schoolAddress',
      name: 'schoolAddress',
      component: schoolAddress
    }, {
      path: '/addHomeAddress',
      name: 'addHomeAddress',
      component: addHomeAddress
    }, {
      path: '/addSchoolAddress',
      name: 'addSchoolAddress',
      component: addSchoolAddress
    }, {
      path: '/remarks',
      name: 'remarks',
      component: remarks
    }, {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess
    }, {
      path: '/payFailed',
      name: 'payFailed',
      component: payFailed
    }, {
      path: '/voiceDetail',
      name: 'voiceDetail',
      component: voiceDetail
    }, {
      path: '/chapters',
      name: 'chapters',
      component: chapters
    }
  ]
})
