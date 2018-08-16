<template>
  <div class="solicit-subscription-audio">
    <div class="voice-seek">
      <p>
        <input type="text">
        <img src="../../../assets/seek-logo.png">
      </p>
    </div>
    <ul v-if="lists.length > 0">
      <li class="order-voice-list" v-for="(item, index) in lists" :key="index">
        <div class="voice-list-left">
          <img :src="item.logo"/>
        </div>
        <div class="voice-list-right">
          <p class="voice-list-title">{{ item.name }}</p>
          <p class="voice-list-descr">{{ item.introductions }}</p>
          <p class="voice-list-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
          <div class="voice-list-button">
            <span>购买</span>
            <span>加入购物车</span>
            <span>列表</span>
          </div>
        </div>
      </li>
    </ul>
    <p class="noContent" v-if="lists.length === 0">暂无内容</p>
  </div>
</template>

<script>
export default {
  name: 'solicit-subscription-audio',
  components: {},
  data () {
    return {}
  },
  props: {
    lists: {
      type: Array
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
