<template>
  <div class="solicit-subscription-audio">
    <div class="voice-seek">
      <p>
        <input type="text">
        <img src="../../../assets/seek-logo.png">
      </p>
    </div>
    <ul>
      <li class="order-voice-list" v-for="(item, index) in listData" :key="index">
        <div class="voice-list-left">
          <img src="../../../assets/books/1.png"/>
        </div>
        <div class="voice-list-right">
          <p class="voice-list-title">{{ item.name }}</p>
          <p class="voice-list-descr">包简介包简介包简介包简介包简介</p>
          <p class="voice-list-price">￥<span class="big">{{ item.price | getInteger }}</span>{{ item.price | getFixed1 }}</p>
          <div class="voice-list-button">
            <span>购买</span>
            <span>加入购物车</span>
            <span>列表</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-audio',
  components: {},
  data () {
    return {
      listData: [{
        name: '标题标题标题标题标题标题',
        price: '120.00'
      }, {
        name: '标题标题标题标题标题标题',
        price: '120.00'
      }]
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
    @import './audio.styl'
</style>
