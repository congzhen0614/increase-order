<template>
  <div class="pay">
    <div class="check-type" v-if="!isWeixin">
      <img class="type-icon" src="../../assets/alipay-icon.png"/>
      <span class="type-content">支付宝支付</span>
      <img class="check-icon" v-if="!isAlipay" @click="isAlipay = !isAlipay" src="../../assets/check-icon.png"/>
      <img class="check-icon" v-if="isAlipay" @click="isAlipay = !isAlipay" src="../../assets/checked-icon.png"/>
    </div>
    <div class="check-type" v-if="isWeixin">
      <img class="type-icon" src="../../assets/weixin-pay-icon.png"/>
      <span class="type-content">微信支付</span>
      <img class="check-icon" v-if="isAlipay" @click="isAlipay = !isAlipay" src="../../assets/check-icon.png"/>
      <img class="check-icon" v-if="!isAlipay" @click="isAlipay = !isAlipay" src="../../assets/checked-icon.png"/>
    </div>
    <div class="pay-buyyon" @click="onSubmit">{{ isAlipay ? '支付宝支付' : '微信支付' }}{{ amount }}元</div>
    <div ref="form" v-html="formHtml"></div>
  </div>
</template>

<script>
export default {
  name: 'pay',
  data () {
    return {
      formHtml: '',
      amount: this.$route.query.total,
      isAlipay: true
    }
  },
  mounted () {
    if (this.isWeixin) {
      this.weixinPay()
    }
  },
  methods: {
    onSubmit () {
      if (this.isAlipay) {
        this.aliPay()
      } else {
        this.weixinPay()
      }
    },
    aliPay () {
      let href = window.location.href
      let protocol = window.location.protocol // 协议
      let host = window.location.host
      let returnUrl = `${protocol}//${host}/result?href=${href}&success=true`
      // this.Toast.loading({
      //   title: '提交中...'
      // })
      let _data = {
        cls: this.$route.query.cls,
        no: this.$route.query.no,
        returnUrl: returnUrl
      }
      this.$axios.getWapOrderInfoByAliPay(_data).then((res) => {
        this.$refs.form.innerHTML = res.data.data.form
        if (document.forms && document.forms.length) {
          document.forms[0].submit()
        }
      }, err => {
        console.log(err)
      })
    },
    weixinPay () {
      let _data = {
        cls: this.$route.query.cls,
        no: this.$route.query.no,
        ip: window.returnCitySN.cip ? window.returnCitySN.cip : '127.0.0.1',
        openid: localStorage.getItem('wxOpenId')
      }
      this.$axios.getOfficialAccountPrepayInfo(_data).then(res => {
        if (this.isIos) {
          this.weixinConfig(res.data.data)
          return
        }
        this.upWeixinPay(res.data.data)
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './pay.styl'
</style>
