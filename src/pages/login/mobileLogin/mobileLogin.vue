<template>
  <div class="solicit-subscription-register">
    <div class="register">
      <div class="phone">
        <img src="../../../assets/phone-icon.png">
        <input type="text" v-model="mobile" placeholder="请输入注册手机号码">
        <img @click="clearPhone" src="../../../assets/close-icon.png">
      </div>
      <div class="password">
        <img src="../../../assets/password-icon.png">
        <input :type="isPassword ? 'password' : 'text'" v-model="password" placeholder="请输入您的登录密码">
        <img @click="clearPassword" src="../../../assets/close-icon.png">
        <img @click="isPassword = !isPassword" v-if="isPassword" src="../../../assets/show-pws-icon.png">
        <img @click="isPassword = !isPassword" v-if="!isPassword" src="../../../assets/icon-visible-active.png"/>
      </div>
      <span class="register-button" @click="onLogin">登录</span>
      <span class="user-registration" @click="onRegister">用户注册</span>
      <span class="forget-password" @click="onForgetPsw">忘记密码</span>
    </div>
    <!--<div class="weixin-login" @click="onWeixinLogin">-->
      <!--<img src="../../../assets/weixin-icon.png">-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-mobileLogin',
  data () {
    return {
      mobile: '',
      password: '',
      isPassword: true
    }
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
          if (this.$route.query.backRoute) {
            this.$router.push({
              path: this.$route.query.backRoute,
              query: JSON.parse(this.$route.query.backQuery)
            })
          } else {
            // 没有则返回首页
            this.$router.push({
              path: '/',
              query: {
                id: localStorage.getItem('qrzdId')
              }
            })
          }
        }
      }
    }
  },
  methods: {
    clearPhone () {
      this.mobile = ''
    },
    clearPassword () {
      this.password = ''
    },
    onLogin () {
      this.$axios.login({mobile: this.mobile, password: this.password}).then(res => {
        if (res.data.status === '0') {
          localStorage.setItem('user', JSON.stringify(res.data.data))
          localStorage.setItem('userId', res.data.data.id)
          this.$router.push({
            path: '/',
            query: {
              id: localStorage.getItem('qrzdId')
            }
          })
        } else {
          this.Toast.fail({title: res.data.data.tip})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    onForgetPsw () {
      this.$router.push({
        path: '/forgetPsw'
      })
    },
    onRegister () {
      this.$router.push({
        path: '/register'
      })
    },
    onWeixinLogin () {
      // 微信登陆返回到当前页面
      let href = window.location.href
      let _href = encodeURIComponent(`${href}`)
      let apiUrl = 'https://www.51weixiao.com/app-api/api/user/wxLogin'
      let redirectUrl = encodeURIComponent(`${apiUrl}?finalUrl=${_href}`)
      let appId = 'wx701b0e6e6faac47c'
      let _url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` + redirectUrl + `&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
      window.location.href = _url
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'mobileLogin.styl'
</style>
