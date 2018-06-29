<template>
  <div class="vioce-detail">
    <div class="wrapper" ref="wrapper" :style="secollHeight">
      <div class="content" ref="content">
        <div class="top-icon">
          <img src="../../../assets/book-top-icon.png"/>
        </div>
        <section :style="{'min-height': sectionHeight}">
          <div class="vioce-detail-head">
            <p class="about-us" @click.stop="aboutUs()">
              <img src="../../../assets/aboutUs-icon.png"/>
              关于我们
            </p>
            <span class="more-button" @click.stop="toMore()">更多</span>
            <div class="order-voice-head">
              <div class="voice-list-left">
                <img src="../../../assets/book.jpg"/>
              </div>
              <div class="voice-list-right">
                <p class="voice-list-title">包名称包名称包名称包名称包名称</p>
                <p class="voice-list-descr">包简介包简介包简介包简介包简介</p>
                <p class="voice-list-price">￥<span class="big">{{ info.price | getInteger }}</span>{{ info.price | getFixed1 }}</p>
                <div class="voice-list-button">
                  <span>购买</span>
                  <span @click.stop="clickAddShoppingCar(info)">加入购物车</span>
                </div>
              </div>
            </div>
          </div>
          <ul class="order-voice-list">
            <li v-for="(item, index) in listData" :key="index">
              <div class="voice-list-left">
                <img class="logo-icon" src="../../../assets/book.jpg"/>
                <img class="media-icon" v-if="media==='audio'" src="../../../assets/audio-icon.png">
                <img class="media-icon" v-if="media==='video'" src="../../../assets/video-icon.png">
              </div>
              <div class="voice-list-right">
                <p class="voice-list-title">包名称包名称包名称</p>
                <p class="voice-list-descr">包简介包简介包简介包简介包简介</p>
                <p class="voice-list-price">￥<span class="big">{{ item | getInteger }}</span>{{ item | getFixed1 }}</p>
                <div class="voice-list-button">
                  <span @click.stop="toChapters()">章节</span>
                </div>
              </div>
            </li>
          </ul>
          <p class="no-more">没有更多了哦~</p>
        </section>
      </div>
    </div>
    <img class="to-top" v-if="toTop" @click.stop="clickToTop()" src="../../../assets/toTop-icon.png">
    <a href="tel:4008808888"><img class="contact-service" src="../../../assets/service_icon.png"></a>
    <v-footer :quantity="quantity" :total="total" :shopList="shopList" :shoppingCarFlag="shoppingCarFlag" @showShoppingCar="showShoppingCar"></v-footer>
  </div>
</template>

<script>
import footer from '@/components/footer/footer.vue'
import shoppingCar from '@/store/shoppingCar.js'
import BScroll from 'better-scroll'
export default {
  name: '',
  components: {
    'v-footer': footer
  },
  data () {
    return {
      secollHeight: {
        height: window.innerHeight - 50 + 'px'
      },
      sectionHeight: window.innerHeight - 100 + 'px',
      media: 'audio',
      info: this.$route.query,
      listData: [11.11, 22.22, 33.33, 44.44, 55.55, 66.66],
      quantity: 0,
      total: 0,
      shopList: [],
      shoppingCarFlag: false,
      scroller: '',
      scrollHeight: ''
    }
  },
  created () {
  },
  mounted () {
    this.loadData()
  },
  computed: {
    toTop () {
      return this.scrollHeight > window.innerHeight
    }
  },
  methods: {
    loadData () {
      this.$nextTick(() => {
        this.initializeScroll()
      })
    },
    toMore () {
      this.$router.go(-1)
    },
    aboutUs () {
      this.$router.push({
        path: '/aboutUs'
      })
    },
    toChapters () {
      this.$router.push({
        path: '/chapters'
      })
    },
    showShoppingCar () {},
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
        if (pos.y >= 100 && this.reload) {
          console.log('上拉刷新页面!')
          this.reload = false
        }
        this.scrollHeight = -pos.y
      })
    },
    clickToTop () {
      this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
    },
    clickAddShoppingCar (param) {
      let exist = false
      if (shoppingCar.videoList.length > 0) {
        shoppingCar.videoList.forEach(item => {
          if (item.id === param.id) {
            exist = true
            alert('已经加入过购物车了哦~')
          }
        })
        if (!exist) {
          param.quantity = 1
          this.totalQuantity += 1
          shoppingCar.videoList.push(param)
        }
      } else {
        param.quantity = 1
        this.totalQuantity += 1
        shoppingCar.videoList.push(param)
      }
    }
  },
  watch: {
    scrollHeight (val) { // 下拉到最下面加载更多
      if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
        this.loadMore = false
        // this.loadData()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './vioceDetail.styl'
</style>
