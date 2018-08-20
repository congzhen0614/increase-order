<template>
  <div class="comment">
    <p class="comment-title">商品评价({{ bookComment.total }})</p>
    <ul class="comment-list">
      <li v-for="(item, index) in commentList" :key="index">
        <div class="comment-left">
          <img :src="item.avatar"/>
        </div>
        <div class="comment-right">
          <div class="comment-star">
            <img v-for="(star, index) in 5 - item.score" :key="index"  src="../../assets/start-icon.png">
            <img v-for="(star, index) in item.score" :key="index" src="../../assets/started-icon.png">
          </div>
          <p class="comment-username">{{ item.name }}</p>
          <p class="comment-content">{{ item.content }}</p>
          <div class="comment-images" v-for="img in item.imgs">
            <img :src="img"/>
          </div>
          <span class="comment-time">{{ item.createdAt }}</span>
        </div>
      </li>
    </ul>
    <div class="check-comment" v-if="bookComment.total > 10">查看全部评论</div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      commentList: []
    }
  },
  props: {
    bookComment: {
      type: Object
    }
  },
  watch: {
    bookComment (val) {
      this.commentList = val.list
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './comment.styl'
</style>
