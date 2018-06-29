<template>
  <div class="video-chapters">
    <div class="video-chapters-head">
      <div class="chapters-head-left">
        <img class="logo-icon" src="../../../../assets/book.jpg"/>
        <img class="media-icon" v-if="media==='video'" src="../../../../assets/video-icon.png">
        <img class="media-icon" v-if="media==='audio'" src="../../../../assets/audio-icon.png"/>
      </div>
      <div class="chapters-head-right">
        <p class="chapters-title">音频专辑名称音频专辑名称音频专辑名称音频专辑名称音频专辑名称名称</p>
        <p class="chapters-descr">专辑简介专辑简介专辑简介专辑简介专辑简介专辑简介专辑简介专辑简介</p>
        <p class="chapters-price">￥<span class="big">120</span>.00</p>
        <div class="chapters-button">
          <span>购买</span>
          <span>加入购物车</span>
        </div>
      </div>
    </div>
    <div class="video-chapters-list">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <span class="serial-number">{{ index + 1 }}</span>
          <span class="chapters-name">音频名称音频名称音频名称音频名称音频名称音频名称音频名称音频名称</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6],
      media: 'video'
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
    @import './chapters.styl'
</style>
