<template>
  <div class="increase-order-main">
    <div class="wrapper" ref="wrapper" :style="secollHeight">
      <div class="content" ref="content">
        <img class="top-icon" src="../../assets/book-top-icon.png">
        <section :style="{'min-height': sectionHeight}">
          <p class="about-us" @click.stop="aboutUs()">
            <img src="../../assets/aboutUs-icon.png">
            关于我们
          </p>
          <p class="increase-order-title">书单名称书单名称书单名称</p>
          <div class="increase-order-menu">
            <span :class="{active: menu===0}" @click.stop="menu = 0">刊物</span>
            <span :class="{active: menu===1}" @click.stop="menu = 1">图书</span>
            <span :class="{active: menu===2}" @click.stop="menu = 2">电子读物</span>
          </div>
          <v-periodicalList v-if="menu===0" :listData="listData" @shoppingCar="shoppingCar"></v-periodicalList>
          <v-voiceList v-if="menu===2" :listData="listData" @shoppingCar="shoppingCar"></v-voiceList>
          <v-bookList v-if="menu===1" :listData="listData" @shoppingCar="shoppingCar"></v-bookList>
          <p class="no-more">没有更多了哦~</p>
        </section>
      </div>
    </div>
    <footer>
      <v-footer :quantity="quantity" :total="total" @shopChange="shopChange"></v-footer>
    </footer>
    <img class="to-top" v-if="toTop" @click.stop="clickToTop()" src="../../assets/toTop-icon.png">
    <a href="tel:4008808888"><img class="contact-service" src="../../assets/service_icon.png"></a>
  </div>
</template>

<script>
import footer from '@/components/footer/footer.vue'
import periodicalList from './periodicalList/periodicalList.vue'
import voiceList from './voiceList/voiceList.vue'
import bookList from './bookList/bookList.vue'
import reserve from '@/store/reserve.js'
import shoppingCar from '@/store/shoppingCar.js'
import BScroll from 'better-scroll'
export default {
  name: '',
  components: {
    'v-footer': footer,
    'v-periodicalList': periodicalList,
    'v-voiceList': voiceList,
    'v-bookList': bookList
  },
  data () {
    return {
      secollHeight: {
        height: window.innerHeight - 50 + 'px'
      },
      sectionHeight: window.innerHeight - 100 + 'px',
      menu: reserve.listType,
      quantity: 0,
      total: 0,
      listData: [],
      scroller: '',
      scrollHeight: '',
      loadMore: false,
      shoppingCarFlag: false
    }
  },
  created () {
  },
  mounted () {
    this.loadData()
    this.getShoppingCarList()
  },
  computed: {
    toTop () {
      return this.scrollHeight > window.innerHeight
    }
  },
  methods: {
    getShoppingCarList () {
      let total = 0
      let quantity = 0
      let list = shoppingCar.bookList.concat(shoppingCar.videoList).concat(shoppingCar.periodicalList)
      list.forEach(item => {
        quantity += parseInt(item.quantity)
        total += parseFloat(item.price) * parseInt(item.quantity)
      })
      this.total = total
      this.quantity = quantity
    },
    loadData () {
      this.$axios.shoppingList().then(res => {
        this.listData = res.data.data
        this.loadMore = true
        this.$nextTick(() => {
          this.initializeScroll()
        })
      }, err => {
        console.log(err)
      })
    },
    aboutUs () {
      this.$router.push({
        path: '/aboutUs'
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
        if (pos.y >= 100 && this.reload) {
          console.log('上拉刷新页面!')
          this.reload = false
        }
        this.scrollHeight = -pos.y
      })
    },
    shoppingCar () {
      this.total = 0
      this.quantity = 0
      let shoppingCarList = shoppingCar.bookList.concat(shoppingCar.videoList).concat(shoppingCar.periodicalList)
      shoppingCarList.forEach(item => {
        this.quantity += parseInt(item.quantity)
        this.total += parseInt(item.quantity) * parseFloat(item.price)
      })
    },
    clickToTop () {
      this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
    },
    shopChange () {
      this.getShoppingCarList()
      this.loadData()
    }
  },
  watch: {
    scrollHeight (val) { // 下拉到最下面加载更多
      if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
        this.loadMore = false
        // this.loadData()
      }
    },
    menu (val) {
      reserve.listType = val
      this.loadData()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './main.styl'
</style>
