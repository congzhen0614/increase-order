<template>
  <div class="book-published">
    <p class="booktitle">{{ detail.name }}</p>
    <ul>
      <li>ISBN<span>{{ detail.issn }}</span></li>
      <li>作者<span>{{ detail.author }}</span></li>
      <li>出版社<span>{{ detail.press }}</span></li>
      <li>出版时间<span>{{ detail.pubdate }}</span></li>
      <li>版次<span>{{ detail.banci }}</span></li>
      <li>印次<span>{{ detail.yinci }}</span></li>
      <li>页数<span>{{ detail.pages }}</span></li>
      <li>字数<span>{{ detail.words }}</span></li>
      <li>开本<span>{{ detail.kaiben }}</span></li>
      <li>纸张<span>{{ detail.zhizhang }}</span></li>
      <li>包装<span>{{ detail.hardcover }}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'book-published',
  data () {
    return {
      detail: JSON.parse(this.$route.query.item)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './published.styl'
</style>
