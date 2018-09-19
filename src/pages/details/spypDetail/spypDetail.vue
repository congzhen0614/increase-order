<template>
  <div class="spyp-detail">
    <div class="wrapper" ref="wrapper" :style="secollHeight">
      <div class="content" ref="content">
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
                <span @click="onBuy(query)" class="buy-button">购买</span>
                <span @click="toShoppingCar(query)">加入购物车</span>
                <!--<span>赠品</span>-->
              </div>
            </div>
          </div>
        </div>
        <ul>
          <li class="spyp-list" v-for="item in spypList" :key="item.id">
            <div class="spyp-list-left">
              <img class="logo-icon" src="../../../assets/avatar.jpg">
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
    <img class="to-top" v-if="toTop" @click.stop="clickToTop()" src="../../../assets/toTop-icon.png">
    <a href="tel:4008808888"><img class="contact-service" src="../../../assets/service_icon.png"></a>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import store from '@/store/store.js'
export default {
  name: 'spyp-detail',
  data () {
    return {
      secollHeight: {
        height: window.innerHeight - 20 + 'px'
      },
      scroller: '',
      scrollHeight: '',
      query: JSON.parse(this.$route.query.item),
      spypList: [],
      loadMore: false,
      pages: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    toTop () {
      return this.scrollHeight > window.innerHeight
    },
    params () {
      let param = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        packetId: this.query.id
      }
      return param
    }
  },
  mounted () {
    this.loadSpypaudioalbumList()
  },
  methods: {
    loadSpypaudioalbumList () {
      this.$axios.spypaudioalbumList(this.params).then(res => {
        if (res.data.code === '0') {
          this.spypList = res.data.data.list
          this.pages.total = res.data.data.total
          this.loadMore = true
          this.$nextTick(() => {
            setTimeout(() => {
              this.initializeScroll()
            }, 500)
          })
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
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
    },
    clickToTop () {
      this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
    },
    onBuy (item) {
      console.log(item)
    },
    toShoppingCar (item) {
      let exist = false
      if (store.shoppingcarspyp.length > 0) {
        store.shoppingcarspyp.forEach(obj => {
          if (item.id === obj.id) {
            exist = true
          }
        })
        if (!exist) {
          store.shoppingcarspyp.push(item)
        }
      } else {
        store.shoppingcarspyp.push(item)
      }
    }
  },
  watch: {
    scrollHeight (val) { // 下拉到最下面加载更多
      if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
        this.loadMore = false
        this.pages.pageNum += 1
        if (parseInt(this.pages.total / this.pages.pageSize) < this.pages.pageNum) return false
        this.loadSpypaudioalbumList()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './spypDetail.styl'
</style>
