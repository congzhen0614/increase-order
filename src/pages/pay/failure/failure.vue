<template>
  <div class="failure">
    <span @click="clickClose" class="close">关闭{{ countTime }}S</span>
    <p class="amount">￥<span class="big">1000</span>.00</p>
    <p class="payfailure">支付失败</p>
    <img @click="clickPayAgain" class="payagain" src="../../../assets/pay/payagain.png"/>
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
  methods: {
    clickPayAgain () {
      this.$router.push({
        path: '/pay',
        query: {
          no: this.$route.query.no,
          total: this.$route.query.total,
          cls: this.$route.query.cls
        }
      })
    },
    clickClose () {
      this.$router.push({
        path: '/',
        query: {
          id: this.$route.query.id
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './failure.styl'
</style>
