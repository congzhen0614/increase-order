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
      this.isAlipay = false
      this.weixinPay()
    }
  },
  methods: {
    onSubmit () {
      if (this.isWeixin) {
        this.weixinPay()
      } else {
        this.aliPay()
      }
    },
    aliPay () {
      let href = window.location.href
      let protocol = window.location.protocol // 协议
      let host = window.location.host
      let returnUrl = `${protocol}//${host}/result?href=${href}&success=true`
      this.Toast.loading({
        title: '提交中...'
      })
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
        this.Toast.fail(err)
      })
    },
    weixinPay () {
      let _data = {
        cls: this.$route.query.cls,
        no: this.$route.query.no,
        ip: '127.0.0.1',
        openid: localStorage.getItem('wxOpenId')
      }
      this.$axios.getOfficialAccountPrepayInfo(_data).then(res => {
        if (this.isIos) {
          this.weixinConfig(res.data.data.map)
          return
        }
        this.upWeixinPay(res.data.data.map)
      }, err => {
        this.Toast.fail(err)
      })
    },
    // 微信 config 接口
    weixinConfig (data) {
      window.wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timeStamp,
        nonceStr: data.nonceStr,
        signature: data.sign,
        jsApiList: [
          'chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage'
        ]
      })
      window.wx.ready(() => {
        window.wx.onMenuShareTimeline({
          title: '这是title',
          desc: '这是desc',
          link: window.location.href,
          imgUrl: ''
        })
        window.wx.chooseWXPay({
          timestamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.sign,
          success: function (res) {
            console.log(res)
          }
        })
      })
    },
    // 调起微信支付
    upWeixinPay (data) {
      // alert('href: ' + window.location.href)
      if (typeof window.WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data))
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(data))
        }
      } else {
        this.onBridgeReady(data)
      }
      document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
    },
    // 调起微信 bridge
    onBridgeReady (data) {
      // alert('ready: ' + JSON.stringify(data))
      var _sendObj = {
        // 公众号名称
        'appId': data.appId,
        'timeStamp': data.timeStamp,
        // 随机串
        'nonceStr': data.nonceStr,
        'package': data.package,
        // 微信签名方式
        'signType': data.signType,
        // 微信签名
        'paySign': data.sign
      }
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', _sendObj,
        (res) => {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 设置 history
            // this.$store.commit('setHistory', this.$store.state.history + 1)
            this.$router.push({
              path: '/result',
              query: {
                total_amount: this.fee,
                success: true,
                href: this.$route.query.href
              }
            })
          } else {
            // 设置 history
            this.$router.push({
              path: '/result',
              query: {
                total_amount: this.fee,
                success: false,
                href: this.$route.query.href
              }
            })
          }
        }
      )
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './pay.styl'
</style>
