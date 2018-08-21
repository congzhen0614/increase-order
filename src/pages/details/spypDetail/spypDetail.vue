<template>
  <div class="spyp-detail">
    <div class="content">
      <div class="content-header">
        <span class="more-list" @click="onMore">更多</span>
        <div class="header-content">
          <div class="header-left">
            <img :src="query.logo">
          </div>
          <div class="header-right">
            <p class="header-title">{{ query.name }}</p>
            <p class="header-brief">{{ query.introductions }}</p>
            <p class="header-price">￥<span class="big">{{ query.fee | getInteger }}</span>{{ query.fee | getFixed1 }}</p>
            <p class="header-kada">咔哒故事</p>
            <div class="header-button">
              <span>购买</span>
              <span>加入购物车</span>
              <span>赠品</span>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <li class="spyp-list" v-for="item in spypList" :key="item.id">
          <div class="spyp-list-left">
            <img class="logo-icon" :src="item">
            <img class="audio-icon" v-if="item.clsName === '音频'" src="../../../assets/audio-icon.png">
            <img class="video-icon" v-if="item.clsName === '视频'" src="../../../assets/video-icon.png">
          </div>
          <div class="spyp-list-right">
            <p class="spyp-list-title">{{ item.name }}</p>
            <p class="spyp-list-brief">{{ item.introductions }}</p>
            <p class="spyp-list-price">￥<span class="big">{{ item.free | getInteger }}</span>{{ item.free | getFixed1 }}</p>
            <span class="chapter" @click="toChapter(item)">章节</span>
            <img @click="onPlay" class="play-icon" src="../../../assets/play-icon.png"/>
            <!--<img class="play-icon" src="../../../assets/paus-icon.png"/>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spyp-detail',
  components: {},
  data () {
    return {
      query: JSON.parse(this.$route.query.item),
      spypList: []
    }
  },
  created () {},
  mounted () {
    this.loadSpypaudioalbumList()
  },
  methods: {
    loadSpypaudioalbumList () {
      this.$axios.spypaudioalbumList({packetId: this.query.id}).then(res => {
        if (res.data.code === '0') {
          this.spypList = res.data.data.list
        } else {
          this.Toast.fail(res.data.data.msg)
        }
      }, err => {
        this.Toast.fail(err)
      }).catch(err => {
        this.Toast.fail(err)
      })
    },
    toChapter (item) {
      this.$router.push({
        path: '/album',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    onMore () {
      this.$router.goBack()
    },
    onPlay () {
      console.log('play')
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'spypDetail.styl'
</style>
