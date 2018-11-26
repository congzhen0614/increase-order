<template>
  <div class="spyp-album">
    <div class="wrapper" ref="wrapper" :style="{height: innerHeight}">
      <div class="content" ref="content">
        <div class="spyp-album-header">
          <div class="header-left">
            <img class="logo-icon" :src="query.logo">
            <img class="play-icon" v-if="query.clsName === '音频'" src="../../../../assets/audio-icon.png">
            <img class="play-icon" v-if="query.clsName === '视频'" src="../../../../assets/video-icon.png">
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
            <div class="try-play" v-show="item.preview === 1" @click="onPlay(item, index)">
              <img v-if="!item.isPlay" src="../../../../assets/play-icon.png">
              <img v-if="item.isPlay" src="../../../../assets/paus-icon.png">
              <audio ref="audio" :src="item.url"></audio>
              <span>试听</span>
            </div>
            <div class="title">
              <p>{{ item.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-play v-if="isplay" :logo="playLogo" :url="playUrl" @playerClose="playerClose"></v-play>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import play from '@/components/play/play.vue'
export default {
  name: 'spyp-album',
  components: {
    'v-play': play
  },
  data () {
    return {
      innerHeight: window.innerHeight + 'px',
      query: JSON.parse(this.$route.query.item),
      listData: [],
      loadMore: false,
      isplay: false,
      playLogo: '',
      playUrl: '',
      scroller: '',
      scrollHeight: '',
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.loadSpypaudioList()
  },
  methods: {
    loadSpypaudioList () {
      this.$axios.spypaudioList({aid: this.query.id, pageNum: this.pages.pageNum, pageSize: this.pages.pageSize}).then(res => {
        if (res.data.code === '0') {
          this.pages.total = res.data.data.total
          this.loadMore = true
          res.data.data.list.forEach(item => {
            item.isPlay = false
            this.listData.push(item)
          })
          this.$nextTick(() => {
            setTimeout(() => {
              this.initializeScroll()
            }, 500)
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
    initializeScroll () {
      if (this.scroller === '') {
        this.scroller = new BScroll(this.$refs.wrapper, {
          probeType: 3,
          click: true
        })
        this.listenScroll()
      } else {
        this.scroller.refresh()
      }
    },
    listenScroll () {
      this.scroller.on('scroll', pos => {
        this.scrollHeight = -pos.y
      })
    },
    onPlay (item) {
      if (this.query.provider === 1) {
        let param = {
          itemid: this.query.itemid,
          collectid: this.query.collectid,
          contentid: item.contentid
        }
        this.playLogo = this.query.logo
        this.isplay = false
        this.kadaResource(param)
      } else {
        this.playLogo = this.query.logo
        this.playUrl = item.url
        this.isplay = true
      }
    },
    kadaResource (param) {
      this.Toast.loading({
        title: '加载中...'
      })
      this.$axios.kadaResource(param).then(res => {
        this.Toast.hide()
        if (res.data.result.status === '0') {
          this.playUrl = res.data.resourceUrl
          this.isplay = true
        } else {
          this.Toast.fail({title: '获取资源失败'})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    onPaus (item, index) {
      this.$refs.audio[index].pause()
      item.isPlay = false
    },
    playerClose () {
      this.isplay = false
    }
  },
  watch: {
    scrollHeight (val) { // 下拉到最下面加载更多
      if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
        this.loadMore = false
        if (parseInt(this.pages.total / this.pages.pageSize) >= this.pages.pageNum) {
          this.pages.pageNum += 1
          this.loadSpypaudioList()
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './album.styl'
</style>
