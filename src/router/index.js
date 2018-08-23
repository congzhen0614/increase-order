/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/06/27
 */
import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login/login.vue' // 登录
import register from '@/pages/login/register/register.vue' // 手机号登录
import main from '@/pages/main/main.vue' // 首页
import shoppingCar from '@/pages/shoppingcar/shoppingcar.vue' // 购物车
import myOrder from '@/pages/myorder/myorder.vue' // 我的订单
import aboutUs from '@/pages/aboutus/aboutus.vue' // 关于我们
import ageList from '@/pages/main/seekList/ageList/ageList.vue' // 年龄列表
import typeList from '@/pages/main/seekList/typeList/typeList.vue' // 年龄列表
import magaDetail from '@/pages/details/magaDetail/magaDetail.vue' // 杂志详情页
import bookDetail from '@/pages/details/bookDetail/bookDetail.vue' // 图书详情页
import spypDetail from '@/pages/details/spypDetail/spypDetail.vue' // 视听详情页
import detail from '@/pages/details/bookDetail/detail/detail.vue' // 图书详情信息
import directory from '@/pages/details/bookDetail/directory/directory.vue' // 图书目录信息
import published from '@/pages/details/bookDetail/published/published.vue' // 图书出版信息
import album from '@/pages/details/spypDetail/album/album.vue' // 专辑列表
import order from '@/pages/order/order.vue' // 提交订单
import remarks from '@/pages/order/remarks/remarks.vue' // 订单留言
import homeAddress from '@/pages/address/homeAddress/homeAddress.vue' // 家庭地址
import schoolAddress from '@/pages/address/schoolAddress/schoolAddress.vue' // 学校地址
import addHomeAddress from '@/pages/address/homeAddress/addHomeAddress/addHomeAddress.vue' // 添加家庭地址
import addSchoolAddress from '@/pages/address/schoolAddress/addSchoolAddress/addSchoolAddress.vue' // 添加学校地址

// 路由返回上一页
Router.prototype.goBack = function () {
  this.go(-1)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: login
    }, {
      path: '/register',
      name: '手机号登录',
      component: register
    }, {
      path: '/',
      name: '首页',
      component: main
    }, {
      path: '/shoppingCar',
      name: '购物车',
      component: shoppingCar
    }, {
      path: '/myOrder',
      name: '我的订单',
      component: myOrder
    }, {
      path: '/aboutUs',
      name: '关于我们',
      component: aboutUs
    }, {
      path: '/ageList',
      name: '年龄列表',
      component: ageList
    }, {
      path: '/typeList',
      name: '类别列表',
      component: typeList
    }, {
      path: '/magaDetail',
      name: '杂志详情',
      component: magaDetail
    }, {
      path: '/bookDetail',
      name: '图书详情',
      component: bookDetail
    }, {
      path: '/spypDetail',
      name: '视听详情',
      component: spypDetail
    }, {
      path: '/detail',
      name: '图书详情信息',
      component: detail
    }, {
      path: '/directory',
      name: '图书目录信息',
      component: directory
    }, {
      path: '/published',
      name: '图书出版信息',
      component: published
    }, {
      path: '/album',
      name: '专辑列表',
      component: album
    }, {
      path: '/order',
      name: '提交订单',
      component: order
    }, {
      path: '/remarks',
      name: '订单留言',
      component: remarks
    }, {
      path: '/homeAddress',
      name: '家庭地址',
      component: homeAddress
    }, {
      path: '/schoolAddress',
      name: '学校地址',
      component: schoolAddress
    }, {
      path: '/addHomeAddress',
      name: 'addHomeAddress',
      component: addHomeAddress
    }, {
      path: '/addSchoolAddress',
      name: 'addSchoolAddress',
      component: addSchoolAddress
    }
  ]
})
