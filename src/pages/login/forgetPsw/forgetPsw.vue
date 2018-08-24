<template>
  <div class="forget-password">
    <div class="mobile-number">
      <img class="phone-icon" src="../../../assets/phone-icon.png"/>
      <input type="text" placeholder="请输入注册手机号码" v-model="mobile">
      <img class="close-icon" src="../../../assets/close-icon.png"/>
    </div>
    <div class="security-code">
      <img class="security-icon" src="../../../assets/security-icon.png"/>
      <input type="text" placeholder="请输入验证码">
      <span class="get-code" :class="{'getcode-color': canGetCode}" @click="onGetCode">点击获取验证码</span>
    </div>
    <div class="onSubmit" :class="{'submit-background': canSubmit}">提交</div>
  </div>
</template>

<script>
export default {
  name: 'forget-password',
  components: {},
  data () {
    return {
      canGetCode: false,
      canSubmit: false,
      mobile: ''
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onGetCode () {
      this.$axios.userGetPass({mobile: this.mobile}).then(res => {
        if (res.data.code === '0') {
          console.log(res.data.data)
        } else {
          console.log(res.data.data.msg)
        }
      }, err => {
        console.log(err)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    mobile (val) {
      var mobile = /^[1][3,4,5,7,8][0-9]{9}$/
      if (mobile.test(val)) {
        this.canGetCode = true
      } else {
        this.canGetCode = false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './forgetPsw.styl'
</style>
