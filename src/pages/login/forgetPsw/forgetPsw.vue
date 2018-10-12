<template>
  <div class="forget-password-page">
    <div class="mobile-number">
      <img class="phone-icon" src="../../../assets/phone-icon.png"/>
      <input type="text" placeholder="请输入注册手机号码" v-model="mobile">
      <img class="close-icon" src="../../../assets/close-icon.png"/>
    </div>
    <div class="security-code">
      <img class="security-icon" src="../../../assets/security-icon.png"/>
      <input type="number" v-model="code" placeholder="请输入验证码">
      <span class="get-code" v-if="!gettedCode" :class="{'getcode-color': mobileFlag}" @click="onGetCode">点击获取验证码</span>
      <span class="get-code" v-if="gettedCode">{{ seconds }}s后重新获取</span>
    </div>
    <div class="onSubmit" :class="{'submit-background': submitFlag}" @click="onSubmit">提交</div>
  </div>
</template>

<script>
import { getMd5 } from '@/common/common.js'
export default {
  name: 'forget-password',
  components: {},
  data () {
    return {
      canSubmit: false,
      gettedCode: false,
      seconds: 60,
      mobile: '',
      code: '',
      uid: ''
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    submitFlag () {
      var mobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (mobile.test(this.mobile) && this.code.length === 4) {
        return true
      } else {
        return false
      }
    },
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
    onGetCode () {
      if (!this.mobileFlag) return
      this.$axios.userGetPass({mobile: this.mobile, sign: getMd5(this.mobile)}).then(res => {
        if (res.data.status === '0') {
          this.uid = res.data.id
          this.gettedCode = true
          this.setSeconds()
        } else {
          this.Toast.fail({title: res.data.data.tip})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    setSeconds () {
      if (this.seconds === 0) {
        this.gettedCode = false
        this.seconds = 60
        return
      }
      setTimeout(() => {
        this.seconds -= 1
        this.setSeconds()
      }, 1000)
    },
    onSubmit () {
      let data = {
        mobile: this.mobile,
        code: this.code,
        sign: getMd5(this.mobile)
      }
      this.$axios.userValidateVerifyCode(data).then(res => {
        if (res.data.code === '0') {
          this.$rputer.push({
            path: '/',
            query: {
              uid: this.uid
            }
          })
        } else {
          console.log(res.data)
          this.Toast.fail({title: res.data.data.tip})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './forgetPsw.styl'
</style>
