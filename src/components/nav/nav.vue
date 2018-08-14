<template>
  <div class="solicit-subscription-nav">
    <nav>
      <router-link to="/">
        <img v-if="navName === '首页'" src="../../assets/classifyed-icon.png">
        <img v-else src="../../assets/classify-icon.png">
        <span :class="{activity: navName === '首页'}">首页</span>
      </router-link>
      <router-link to="/shoppingCar">
        <img v-if="navName === '购物车'" src="../../assets/shoppingcared-icon.png">
        <img v-else src="../../assets/shoppingcar-icon.png">
        <span :class="{activity: navName === '购物车'}">购物车</span>
      </router-link>
      <router-link to="/myOrder">
        <img v-if="navName === '我的订单'" src="../../assets/ordered-icon.png">
        <img v-else src="../../assets/order-icon.png">
        <span :class="{activity: navName === '我的订单'}">我的订单</span>
      </router-link>
      <router-link to="/aboutUs">
        <img v-if="navName === '了解我们'" src="../../assets/adouted-us-icon.png">
        <img v-else src="../../assets/about-us-icon.png">
        <span :class="{activity: navName === '了解我们'}">了解我们</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-nav',
  components: {},
  data () {
    return {}
  },
  props: {
    navName: {
      type: String
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './nav.styl'
</style>
