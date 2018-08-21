<template>
  <div class="spyp-album">
    <div class="spyp-album-header">
      <div class="header-left">
        <img class="logo-icon" :src="query.logo">
        <img class="play-icon" src="../../../../assets/audio-icon.png">
        <img class="play-icon" src="../../../../assets/video-icon.png">
      </div>
      <div class="header-right">
        <p class="spyp-list-title">{{ query.name }}</p>
        <p class="spyp-list-brief">{{ query.introductions }}</p>
        <p class="spyp-list-price">￥<span class="big">{{ query.fee | getInteger }}</span>{{ query.fee | getFixed1 }}</p>
      </div>
    </div>
    <ul>
      <li class="album-list" v-for="(item, index) in listData" :key="item.id">
        <span class="serial">{{ index + 1 }}</span>
        <div class="try-play" v-if="index < 2">
          <img src="../../../../assets/play-icon.png">
          <!--<img src="../../../../assets/paus-icon.png">-->
          <span>试听</span>
        </div>
        <div class="title">
          <p>{{ item.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'spyp-album',
  data () {
    return {
      query: JSON.parse(this.$route.query.item),
      listData: []
    }
  },
  mounted () {
    this.loadSpypaudioList()
  },
  methods: {
    loadSpypaudioList () {
      this.$axios.spypaudioList({aid: this.query.id}).then(res => {
        if (res.data.code === '0') {
          this.listData = res.data.data.list
        } else {
          this.Toast.fail(res.data.data.msg)
        }
      }, err => {
        this.Toast.fail(err)
      }).catch(err => {
        this.Toast.fail(err)
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './album.styl'
</style>
