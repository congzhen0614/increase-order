<template>
  <div class="maga-detail-press">
    <p class="press-title">{{ name }}</p>
    <div class="press-content">
      <span>简称</span>
      <p>{{ shortName }}</p>
    </div>
    <div class="press-content">
      <span>刊号</span>
      <p>{{ issn }}</p>
    </div>
    <div class="press-content">
      <span>出版社</span>
      <p>{{ press }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maga-detail-press',
  data () {
    return {
      name: this.$route.query.name,
      issn: this.$route.query.issn,
      press: this.$route.query.press,
      shortName: this.$route.query.shortName
    }
  },
  mounted () {
    console.log(this.name)
    console.log(this.issn)
    console.log(this.press)
    console.log(this.shortName)
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './press.styl'
</style>
