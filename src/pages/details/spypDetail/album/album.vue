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
        <div class="try-play" v-show="item.preview === 1">
          <img v-if="!item.isPlay" @click="onPlay(item, index)" src="../../../../assets/play-icon.png">
          <img v-if="item.isPlay" @click="onPaus(item, index)" src="../../../../assets/paus-icon.png">
          <audio ref="audio" :src="item.url"></audio>
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
    console.log(this.query)
    this.loadSpypaudioList()
  },
  methods: {
    loadSpypaudioList () {
      this.$axios.spypaudioList({aid: this.query.id, pageNum: 1, pageSize: 10}).then(res => {
        if (res.data.code === '0') {
          this.listData = []
          res.data.data.list.forEach(item => {
            item.isPlay = false
            this.listData.push(item)
          })
        } else {
          this.Toast.fail({
            title: res.data.msg
          })
        }
      }, err => {
        this.Toast.fail(err)
      }).catch(err => {
        this.Toast.fail(err)
      })
    },
    onPlay (item, index) {
      this.$refs.audio.forEach((item, index) => {
        this.listData[index].isPlay = false
        item.pause()
      })
      this.$refs.audio[index].play()
      item.isPlay = true
    },
    onPaus (item, index) {
      this.$refs.audio[index].pause()
      item.isPlay = false
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './album.styl'
</style>
