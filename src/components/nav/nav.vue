<template>
  <div class="solicit-subscription-nav">
    <nav>
      <ul>
        <li @click="clickSwitch('/')">
          <img v-if="navName === '首页'" src="../../assets/classifyed-icon.png">
          <img v-else src="../../assets/classify-icon.png">
          <p :class="{activity: navName === '首页'}">首页</p>
        </li>
        <li @click="clickSwitch('/shoppingCar')">
          <span class="quantity" v-if="quantity > 0">{{ quantity }}</span>
          <img v-if="navName === '购物车'" src="../../assets/shoppingcared-icon.png">
          <img v-else src="../../assets/shoppingcar-icon.png">
          <p :class="{activity: navName === '购物车'}">购物车</p>
        </li>
        <li @click="clickSwitch('/myOrder')">
          <img v-if="navName === '我的订单'" src="../../assets/ordered-icon.png">
          <img v-else src="../../assets/order-icon.png">
          <p :class="{activity: navName === '我的订单'}">我的订单</p>
        </li>
        <li @click="clickSwitch('/aboutUs')">
          <img v-if="navName === '了解我们'" src="../../assets/adouted-us-icon.png">
          <img v-else src="../../assets/about-us-icon.png">
          <p :class="{activity: navName === '了解我们'}">了解我们</p>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'solicit-subscription-nav',
  data () {
    return {
      store: store,
      qrzdItemPackId: store.qrzdItemPackId,
      quantity: store.quantity
    }
  },
  props: {
    navName: {
      type: String
    }
  },
  methods: {
    clickSwitch (path) {
      if (path === '/') {
        this.$router.push({
          path: path,
          query: {
            id: this.qrzdItemPackId
          }
        })
      } else {
        this.$router.push({
          path: path
        })
      }
    }
  },
  watch: {
    'store.quantity' (val) {
      this.quantity = val
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './nav.styl'
</style>
