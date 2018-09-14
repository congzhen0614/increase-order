<template>
  <div class="gift-list">
    <p class="gift-title">{{ giftName }}</p>
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
