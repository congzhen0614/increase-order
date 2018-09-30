<template>
  <div class="book-details">
    <div class="no-detaails" v-if="!detail">
      <img src="../../../../assets/no-content-icon.png"/>
      <p>暂无内容</p>
    </div>
    <div class="content" v-html="detail.html" v-if="detail.html"></div>
  </div>
</template>

<script>
import detail from '@/store/detail.js'
export default {
  name: 'book-details',
  data () {
    return {
      detail: detail.detail
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './detail.styl'
</style>
