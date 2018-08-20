<template>
  <div class="comment">
    <p class="comment-title">商品评价(100)</p>
    <ul class="comment-list">
      <li v-for="(item, index) in commentList" :key="index">
        <div class="comment-left">
          <img src="../../assets/avatar.jpg"/>
        </div>
        <div class="comment-right">
          <div class="comment-star">
            <img src="../../assets/start-icon.png">
            <img src="../../assets/started-icon.png">
          </div>
          <p class="comment-username">谁家陌上青年郎</p>
          <p class="comment-content">这书质量真不错！</p>
          <span class="comment-time">3天前</span>
        </div>
      </li>
    </ul>
    <div class="check-comment">查看全部评论</div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  components: {},
  data () {
    return {
      commentList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
    @import './comment.styl'
</style>
