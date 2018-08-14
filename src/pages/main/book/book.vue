<template>
  <div class="solicit-subscription-book">
    <header class="book-seek">
      <p><span>年龄区间</span><img src="../../../assets/pull-down-icon.png"></p>
      <p><span>图书类别</span><img src="../../../assets/pull-down-icon.png"></p>
    </header>
    <ul class="list-right" v-if="lists.length > 0">
      <li v-for="(item, index) in lists" :key="index" v-if="index % 2 === 0">
        <div class="list-img">
          <img :src="item.logo">
        </div>
        <div class="list-content">
          <p class="list-title">{{ item.name | cutStr(15) }}</p>
          <p class="list-author">作者<span>{{ item.author }}</span></p>
          <p class="list-pack" v-if="item.hardcover === 1">包装<span>精装</span></p>
          <p class="list-price">
            ￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}元
            <span class="original-price" v-if="item.originalFee">￥{{ item.originalFee | getFixed2 }}</span>
          </p>
          <div class="list-number">
            <img v-if="item.quantity > 0" src="../../../assets/minus-icon.png">
            <span v-if="item.quantity > 0">{{ item.quantity }}</span>
            <img src="../../../assets/add-icon.png">
          </div>
        </div>
      </li>
    </ul>
    <ul class="list-left" v-if="lists.length > 0">
      <li v-for="(item, index) in lists" :key="index" v-if="index % 2 === 1">
        <div class="list-img">
          <img :src="item.logo">
        </div>
        <div class="list-content">
          <p class="list-title">{{ item.name | cutStr(15) }}</p>
          <p class="list-author">作者<span>{{ item.author }}</span></p>
          <p class="list-pack" v-if="item.hardcover === 1">包装<span>精装</span></p>
          <p class="list-price">
            ￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}元
            <span class="original-price" v-if="item.originalFee">￥{{ item.originalFee | getFixed2 }}</span>
          </p>
          <div class="list-number">
            <img v-if="item.quantity > 0" src="../../../assets/minus-icon.png">
            <span v-if="item.quantity > 0">{{ item.quantity }}</span>
            <img src="../../../assets/add-icon.png">
          </div>
        </div>
      </li>
    </ul>
    <p v-if="lists.length === 0">暂无内容</p>
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-book',
  components: {},
  data () {
    return {}
  },
  props: {
    lists: {
      type: Array
    }
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './book.styl'
</style>
