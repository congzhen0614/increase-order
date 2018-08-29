<template>
  <div class="user-register">
    <div class="mobile item-list">
      <img class="phone-icon" src="../../../assets/phone-icon.png"/>
      <input type="number" placeholder="请输入注册手机号码" v-model="mobile">
      <img class="close-icon" src="../../../assets/close-icon.png" @click="mobile = ''"/>
    </div>
    <div class="code item-list">
      <img class="security-icon" src="../../../assets/security-icon.png"/>
      <input type="number" placeholder="请输入验证码" v-model="code">
      <span class="code-button" :class="{'getcode-color': mobileFlag}" v-if="!gettedCode" @click="getUserSendVerifyCode">点击获取验证码</span>
      <span class="code-button" v-if="gettedCode">{{ computeTime }}s后重新发送</span>
    </div>
    <div class="password item-list">
      <img class="password-icon" src="../../../assets/password-icon.png"/>
      <input :type="isPassword ? 'password' : 'text'" placeholder="请输入您的登录密码" v-model="password">
      <img class="close-icon" src="../../../assets/close-icon.png" @click="password = ''"/>
      <img class="eye-icon" v-if="isPassword" @click="isPassword = !isPassword" src="../../../assets/show-pws-icon.png"/>
      <img class="eye-icon" v-if="!isPassword" @click="isPassword = !isPassword" src="../../../assets/icon-visible-active.png"/>
    </div>
    <div class="check-protocol">
      <img v-if="!checked" @click="checked = !checked" class="check-icon" src="../../../assets/check-icon.png"/>
      <img v-if="checked" @click="checked = !checked" class="check-icon" src="../../../assets/checked-icon.png"/>
      <span>我已阅读并同意《微校网用户协议》</span>
    </div>
    <div class="submit-button" @click="onSubmit">提交</div>
  </div>
</template>

<script>
import { getMd5 } from '@/common/common.js'
export default {
  name: 'user-register',
  components: {},
  data () {
    return {
      isPassword: true,
      checked: false,
      gettedCode: false,
      computeTime: 60,
      code: '',
      mobile: '',
      password: ''
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    mobileFlag () {
      var mobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (mobile.test(this.mobile)) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getUserSendVerifyCode () {
      this.$axios.userSendVerifyCode({mobile: this.mobile, sign: getMd5(this.mobile)}).then(res => {
        if (res.data.status === '0') {
          this.gettedCode = true
          this.setSeconds()
        } else {
          this.Toast.fail({
            icon: 'none',
            title: res.data.data.tip
          })
        }
      }, err => {
        console.log(err)
      }).catch(err => {
        console.log(err)
      })
    },
    setSeconds () {
      if (this.computeTime === 0) {
        this.gettedCode = false
        this.computeTime = 60
        return
      }
      setTimeout(() => {
        this.computeTime -= 1
        this.setSeconds()
      }, 1000)
    },
    onSubmit () {
      if (this.checked) {
        this.$ajax.userValidateVerifyCode({
          mobile: this.mobile,
          code: this.code,
          sign: getMd5(this.mobile)
        }).then(res => {
          this.$ajax.userRegister({
            mobile: this.mobile,
            password: this.password
          }).then(res => {
            this.Toast.success({
              title: '注册成功！'
            })
            this.$router.goBack()
          }, err => {
            console.log(err)
          })
        }, err => {
          console.log(err)
        })
      } else {
        this.Dialog.alert({
          title: '您当前未确认已阅读并同意',
          msg: '《微校网用户协议》',
          buttons: ['知道了']
        })
      }
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './register.styl'
</style>
