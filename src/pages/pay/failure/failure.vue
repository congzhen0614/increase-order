<template>
  <div class="failure">
    <span class="close">关闭{{ countTime }}S</span>
    <p class="amount">￥<span class="big">1000</span>.00</p>
    <p class="payfailure">支付失败</p>
    <img class="payagain" src="../../../assets/pay/payagain.png"/>
    <img class="logo" src="../../../assets/pay/logo.png"/>
    <img class="font" src="../../../assets/pay/font.png"/>
  </div>
</template>

<script>
export default {
  name: 'failure',
  data () {
    return {
      countTime: 10
    }
  },
  mounted () {
    let t = setInterval(() => {
      if (this.countTime === 0) {
        clearInterval(t)
      } else {
        this.countTime -= 1
      }
    }, 1000)
  },
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './failure.styl'
</style>
