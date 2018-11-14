<template>
  <div class="gift-list">
    <img class="gift-icon" src="../../../../assets/gift-icon.png"/>
    <span class="gift-title">礼品：{{ giftName }}</span>
    <img class="gift-logo" :src="giftLogo"/>
  </div>
</template>

<script>
export default {
  name: 'gift-list',
  components: {},
  data () {
    return {
      giftName: this.$route.query.giftName,
      giftLogo: this.$route.query.giftLogo
    }
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
    @import './gift.styl'
</style>
