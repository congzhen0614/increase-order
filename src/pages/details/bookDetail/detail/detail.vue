<template>
  <div class="book-details">
    <div class="no-detaails" v-if="!detail.html">
      <img src="../../../../assets/no-content-icon.png"/>
      <p>暂无内容</p>
    </div>
    <div class="content" v-html="detail.html" v-if="detail.html"></div>
  </div>
</template>

<script>
export default {
  name: 'book-details',
  data () {
    return {
      detail: JSON.parse(this.$route.query.item)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './detail.styl'
</style>
