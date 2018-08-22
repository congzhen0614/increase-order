<template>
  <div class="order-remarks">
    <div class="textarea">
      <textarea placeholder="请在此输入您的留言内容" v-model="contnet"></textarea>
      <p class="words-number"><span :class="{exceed: contnet.length>50}">{{ contnet.length }}</span> / <span>50</span></p>
      <span class="remarks-submit" @click="remarkSubmit()">提交</span>
    </div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'order-remarks',
  data () {
    return {
      contnet: store.remark
    }
  },
  methods: {
    remarkSubmit () {
      if (this.contnet.length > 50) {
        this.Toast.fail({
          title: '最多能填写50个字'
        })
      } else {
        store.remark = this.contnet
        this.$router.goBack()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './remarks.styl'
</style>
