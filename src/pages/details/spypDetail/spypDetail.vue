<template>
  <div class="spyp-detail">
    <div class="wrapper" ref="wrapper" :style="secollHeight">
      <div class="content" ref="content">
        <div class="content-header">
          <div class="shoppingcar" @click="toShoppingcar">
            <span class="shopping-car-quantity" v-if="quantity > 0">{{ quantity }}</span>
            <img src="../../../assets/shop-icon.png">
          </div>
          <span class="more-list" @click="onMore">更多</span>
          <div class="header-content">
            <div class="header-left">
              <img :src="query.logo">
            </div>
            <div class="header-right">
              <p class="header-title">{{ query.name }}</p>
              <p class="header-brief">{{ query.introductions }}</p>
              <p class="header-price">￥<span class="big">{{ query.fee | getInteger }}</span>{{ query.fee | getFixed1 }}</p>
              <span class="album-number">
                <img src="./album-icon.png" />
                <span>{{ query.albumnum }}</span>
              </span>
              <div class="header-button">
                <span @click="onBuy(query)" class="buy-button">购买</span>
                <span @click="toShoppingCar(query)">加入购物车</span>
                <span v-if="query.giftLogo !== 'http://www.res.51weixiao.com/upload/mdef.png' && query.giftName !== ''" @click="toGift">赠品</span>
              </div>
            </div>
          </div>
        </div>
        <ul>
          <li class="spyp-list" v-for="item in spypList" :key="item.id" @click="toChapter(item)">
            <div class="spyp-list-left">
              <img class="logo-icon" :src="item.logo">
              <img class="audio-icon" v-if="item.clsName === '音频'" src="../../../assets/audio-icon.png">
              <img class="video-icon" v-if="item.clsName === '视频'" src="../../../assets/video-icon.png">
            </div>
            <div class="spyp-list-right">
              <p class="spyp-list-title">{{ item.name }}</p>
              <p class="spyp-list-brief">{{ item.introductions }}</p>
              <p class="spyp-list-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              <span class="album-number">
                <img src="./audio-icon.png" />
                <span>{{ item.num }}</span>
              </span>
              <span class="chapter" @click="toChapter(item)">章节</span>
              <!--<img v-if="!item.isPlay && (item.freeUrls.length > 0 || item.kadaFree)" @click="onPlay(item, index)" class="play-icons" src="../../../assets/play-icon.png"/>-->
              <!--<img v-if="item.isPlay" @click="onPaus(item, index)" class="play-icons" src="../../../assets/paus-icon.png"/>-->
              <audio hidden ref="audio" :src="item.freeUrls[0]"></audio>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-play v-if="isplay" :logo="playLogo" :url="playUrl" @playerClose="playerClose"></v-play>
    <img class="to-top" v-if="toTop" @click.stop="clickToTop()" src="../../../assets/toTop-icon.png">
    <!--<a href="tel:4008808888"><img class="contact-service" src="../../../assets/service_icon.png"></a>-->
  </div>
</template>

<script>
import shoppingcar from '@/store/shoppingcar.js'
import play from '@/components/play/play.vue'
import BScroll from 'better-scroll'
import store from '@/store/store.js'
export default {
  name: 'spyp-detail',
  components: {
    'v-play': play
  },
  data () {
    return {
      secollHeight: {
        height: window.innerHeight - 20 + 'px'
      },
      scroller: '',
      scrollHeight: '',
      query: JSON.parse(this.$route.query.item),
      quantity: store.quantity,
      spypList: [],
      loadMore: false,
      isplay: false,
      playLogo: '',
      playUrl: '',
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
          let spypList = []
          res.data.data.list.forEach(item => {
            item.isPlay = false
            spypList.push(item)
          })
          this.spypList = spypList
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
      item.provider = this.query.provider
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
    toShoppingcar () {
      this.$router.push({
        path: '/shoppingCar'
      })
    },
    onPlay (item) {
      if (this.query.provider === 1) {
        let param = {
          itemid: item.itemid,
          collectid: item.collectid,
          contentid: item.kadaFree.contentid
        }
        this.isplay = false
        this.playLogo = item.logo
        this.kadaResource(param)
      } else {
        console.log(item)
        this.playLogo = item.logo
        this.playUrl = item.freeUrls[0]
        this.isplay = true
      }
    },
    onPaus (item, index) {
      this.$refs.audio[index].pause()
      item.isPlay = false
    },
    kadaResource (param) {
      this.$axios.kadaResource(param).then(res => {
        if (res.data.result.status === '0') {
          this.playUrl = res.data.resourceUrl
          this.isplay = true
        } else {
          this.Toast.fail({title: '操作失败'})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    clickToTop () {
      this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
    },
    onBuy (item) {
      shoppingcar.list.selectMage = []
      shoppingcar.list.selectBook = []
      shoppingcar.list.selectSpyp = [item]
      this.$router.push({
        path: '/order',
        query: {
          selectMage: JSON.stringify([]),
          selectBook: JSON.stringify([]),
          selectSpyp: JSON.stringify([item])
        }
      })
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
          this.quantity += 1
          store.quantity += 1
          store.shoppingcarspyp.push(item)
        }
      } else {
        this.quantity += 1
        store.quantity += 1
        store.shoppingcarspyp.push(item)
      }
    },
    toGift () {
      this.$router.push({
        path: '/magaGift',
        query: {
          giftName: this.query.giftName,
          giftLogo: this.query.giftLogo
        }
      })
    },
    playerClose () {
      this.isplay = false
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
