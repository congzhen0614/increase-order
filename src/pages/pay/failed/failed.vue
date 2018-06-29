<template>
  <div class="pay-failed">
    <div class="pay-head">
      <img src="../pay-failed-icon.png"/>
      <span class="pay-close">关闭 10s</span>
      <p class="pay-total">￥<span class="big">1000</span>.00</p>
      <p class="pay-failed-words">支付失败</p>
    </div>
    <img class="pay-again" src="../pay-again-icon.png"/>
    <img class="pay-weixiao" src="../weixiao-icon.png">
    <img class="pay-words" src="../words-icon.png"/>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './failed.styl'
</style>
