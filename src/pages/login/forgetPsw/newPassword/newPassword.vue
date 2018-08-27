<template>
  <div class="new-password">
    <div class="import-password">
      <img class="password-icon" src="../../../../assets/password-icon.png"/>
      <input class="pws-input" :type="inputType ? 'password' : 'text'" placeholder="请输入您的新密码" v-model="password">
      <img class="close-icon" @click="password = ''" src="../../../../assets/close-icon.png"/>
      <img class="eye-icon" @click="inputType = !inputType" v-if="inputType" src="../../../../assets/show-pws-icon.png"/>
      <img class="eye-icon" @click="inputType = !inputType" v-if="!inputType" src="../../../../assets/icon-visible-active.png"/>
    </div>
    <div class="submit-button" @click="onsubmit">确认</div>
  </div>
</template>

<script>
export default {
  name: 'new-password',
  components: {},
  data () {
    return {
      inputType: true,
      password: ''
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onsubmit () {
      let _data = {
        _uid: this.$route.query.uid,
        password: this.password
      }
      this.$axios.userUpdatePass(_data).then(res => {
        if (res.data.code === '0') {
          console.log(res)
        } else {
          console.log(res.data.msg)
        }
      }, err => {
        console.log(err)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './newPassword.styl'
</style>
