<template>
  <div class="book-directory">
    <div class="book-chapter" v-html="detail.chapter">
      <!--<p>第一章</p>-->
      <!--<p>人生的目的是什么？</p>-->
      <!--<p>非常简单，是允许自己做自己。</p>-->
      <!--<p>爱自己，是一切快乐的根源 | 张德芬 /002</p>-->
      <!--<p>为什么你忘了爱自己 | 陈文茜 /008</p>-->
      <!--<p>你给灵魂吃什么 | 陈贺美 /016</p>-->
      <!--<p>男人活出自己的光芒 | Luffy /021</p>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'book-directory',
  data () {
    return {
      detail: JSON.parse(this.$route.query.item)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './directory.styl'
</style>
