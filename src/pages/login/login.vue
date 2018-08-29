<template>
  <div class="solicit-subscription-login">
    <div class="back">
      <div class="back-top">
        <div class="back-top-right">
          <div>
            <img src="../../assets/books/3.png">
          </div>
          <div>
            <img src="../../assets/books/10.png">
          </div>
        </div>
        <div class="back-top-left">
          <img src="../../assets/books/1.png">
        </div>
      </div>
      <div class="back-middle">
        <div class="back-middle-right">
          <div class="back-middle-right-top">
            <img src="../../assets/books/9.jpg">
          </div>
          <div class="back-middle-right-bottom">
            <div>
              <img src="../../assets/books/11.jpg">
            </div>
            <div>
              <img src="../../assets/books/12.png">
            </div>
          </div>
        </div>
        <div class="back-middle-left">
          <img src="../../assets/books/6.jpg">
        </div>
      </div>
      <div class="back-bottom">
        <img src="../../assets/books/18.jpg">
      </div>
    </div>
    <div class="login-button">
      <span class="phone-login" @click="onPhoneLogin">手机号码登录</span>
      <span class="weixin-login" @click="onWeixinLogin">微信授权登录</span>
      <img src="../../assets/logo.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-login',
  components: {},
  data () {
    return {}
  },
  created () {
    // 判断浏览器
    if (this.isWeixin) {
      // 判断微信登陆返回 status
      if (this.$route.query.hasOwnProperty('status')) {
        if (parseInt(this.$route.query.status) === 0) {
          localStorage.setItem('userId', this.$route.query.uid)
          localStorage.setItem('wxOpenId', this.$route.query.openid)
          // 如果有上一页
        }
      }
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    onPhoneLogin () {
      this.$router.push({
        path: '/mobileLogin'
      })
    },
    onWeixinLogin () {
      // 微信登陆返回到当前页面
      let href = window.location.href
      let _href = encodeURIComponent(`${href}`)
      let apiUrl = 'https://www.51weixiao.com/app-api/api/user/wxLogin'
      let redirectUrl = encodeURIComponent(`${apiUrl}?finalUrl=${_href}?`)
      let appId = 'wx701b0e6e6faac47c'
      console.log(redirectUrl)
      let _url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` + redirectUrl + `&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
      window.location.href = _url
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'login.styl'
</style>
