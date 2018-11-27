<template>
  <div class="success">
    <span class="close" @click="clickClose">关闭{{ countTime }}S</span>
    <p class="amount">￥<span class="big">{{ total | getInteger }}</span>{{ total | getFixed1 }}</p>
    <p class="paysuccess">支付成功</p>
    <img class="checkorder" @click="clickCheckOrder" src="../../../assets/pay/checkorder.png"/>
    <!--<p class="spyp">已购电子读物请到【校网APP】-【我的】-【我的电子读物】内查询收听</p>-->
    <!--<img class="download" @click="clickDownload" src="../../../assets/pay/download.png"/>-->
    <img class="logo" src="../../../assets/pay/logo.png"/>
    <img class="font" src="../../../assets/pay/font.png"/>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'success',
  data () {
    return {
      countTime: 10,
      total: 0,
      t: ''
    }
  },
  created () {
    store.shoppingcarMage = []
    store.shoppingcarBook = []
    store.shoppingcarspyp = []
    store.quantity = 0
  },
  mounted () {
    this.total = this.$route.query.total_amount
    this.t = setInterval(() => {
      if (this.countTime === 0) {
        clearInterval(this.t)
        this.clickClose()
      } else {
        this.countTime -= 1
      }
    }, 1000)
  },
  methods: {
    clickDownload () {
      if (this.isIos) {
        window.location.href = this.iosDownload
      } else {
        window.location.href = this.androidDownload
      }
    },
    clickCheckOrder () {
      clearInterval(this.t)
      this.$router.push({
        path: '/myOrder'
      })
    },
    clickClose () {
      clearInterval(this.t)
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
    @import './success.styl'
</style>
