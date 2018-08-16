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
    }
  ]
})
