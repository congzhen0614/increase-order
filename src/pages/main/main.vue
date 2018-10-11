<template>
  <div class="solicit-subscription-main">
    <div class="wrapper" ref="wrapper" :style="secollHeight">
      <div class="content" ref="content">
        <main :style="{minHeight: windowHeight, overflow: 'hidden'}">
          <header>
            <p class="title">{{ catalogue.title }}</p>
            <p class="creator">
              <span>{{ catalogue.linkman }}</span>
              <span>{{ catalogue.linkmobile }}</span>
            </p>
            <p class="explain">{{ catalogue.tip }}</p>
          </header>
          <nav>
            <span :class="{activity: navType === 1}" @click="navType = 1" v-if="hasMage === 1">刊物</span>
            <span :class="{activity: navType === 2}" @click="navType = 2" v-if="hasBook === 1">图书</span>
            <span :class="{activity: navType === 54}" @click="navType = 54" v-if="hasSpyp === 1">电子读物</span>
          </nav>
          <v-magazine v-if="navType === 1" :lists="lists" @ageChange="ageChange" @typeChange="typeChange"></v-magazine>
          <v-book v-if="navType === 2" :lists="lists" @ageChange="ageChange" @typeChange="typeChange"></v-book>
          <v-audio v-if="navType === 54" :lists="lists" @packetname="search"></v-audio>
        </main>
      </div>
    </div>
    <v-nav :navName="'首页'"></v-nav>
    <img class="to-top" v-if="toTop" @click.stop="clickToTop()" src="../../assets/toTop-icon.png">
    <a href="tel:4008808888"><img class="contact-service" src="../../assets/service_icon.png"></a>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue'
import magazine from './magazine/magazine.vue'
import book from './book/book.vue'
import audio from './audio/audio.vue'
import BScroll from 'better-scroll'
import store from '@/store/store.js'
export default {
  name: 'solicit-subscription-main',
  components: {
    'v-nav': nav,
    'v-magazine': magazine,
    'v-book': book,
    'v-audio': audio
  },
  data () {
    return {
      secollHeight: {
        height: window.innerHeight - 80 + 'px'
      },
      windowHeight: window.innerHeight - 80 + 'px',
      scroller: '',
      scrollHeight: '',
      navType: store.navType,
      ageId: '',
      typeId: '',
      packetname: '',
      catalogue: {},
      lists: [],
      reload: false,
      loadMore: false,
      hasMage: 0,
      hasBook: 0,
      hasSpyp: 0,
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    store.qrzdItemPackId = this.$route.query.id
    setTimeout(() => {
      this.loadItempackList()
    }, 300)
  },
  mounted () {
    this.setLogin()
    this.loginInfo()
  },
  computed: {
    params () {
      let param = {
        itemPackId: this.$route.query.id,
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize,
        cls: this.navType,
        ageIds: this.ageId,
        typeIds: this.typeId,
        packetname: this.packetname
      }
      return param
    },
    toTop () {
      return this.scrollHeight > window.innerHeight
    }
  },
  methods: {
    ageChange (val) {
      this.ageId = val
    },
    typeChange (val) {
      this.typeId = val
    },
    search (val) {
      this.packetname = val
      this.lists = []
      this.loadItempackList()
    },
    loadItempackList () {
      this.Toast.loading({
        title: '加载中...'
      })
      this.$axios.itempackList(this.params).then(res => {
        this.Toast.hide()
        if (res.data.code === '0') {
          store.id = res.data.data.id
          store.sendType = res.data.data.sendType
          store.postageSum = res.data.data.postageSum
          store.postage = res.data.data.postage
          store.postageSumBook = res.data.data.postageSumBook
          store.postageBook = res.data.data.postageBook
          store.schoolLevel = res.data.data.schoolLevel
          this.hasMage = res.data.data.hasMagazine
          this.hasBook = res.data.data.hasBook
          this.hasSpyp = res.data.data.hasPacket
          this.catalogue.title = res.data.data.title
          this.catalogue.linkman = res.data.data.linkman
          this.catalogue.linkmobile = res.data.data.linkmobile
          this.catalogue.tip = res.data.data.tip
          this.pages.total = res.data.data.page.total
          res.data.data.page.list.forEach(item => {
            this.setQuantity(item)
          })
          this.reload = true
          this.loadMore = true
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
        this.Toast.fail({
          title: err
        })
      }).catch(err => {
        this.Toast.fail({
          title: err
        })
      })
    },
    setQuantity (item) {
      let exist = false
      if (this.navType === 1 && store.shoppingcarMage.length > 0) {
        store.shoppingcarMage.forEach(items => {
          if (items.id === item.id) {
            exist = true
            item.select = items.select
            item.quantity = items.quantity
          }
        })
      } else if (this.navType === 2 && store.shoppingcarBook.length > 0) {
        store.shoppingcarBook.forEach(items => {
          if (items.id === item.id) {
            exist = true
            item.select = items.select
            item.quantity = items.quantity
          }
        })
      }
      if (!exist) {
        if (this.navType === 54) {
          item.select = false
          item.quantity = 1
        } else {
          item.select = false
          item.quantity = 0
        }
      }
      this.lists.push(item)
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
          this.reload = false
        }
        this.scrollHeight = -pos.y
      })
    },
    clickToTop () {
      this.scroller.scrollTo(0, 0, 500) // scrollTo(x, y, time)
    },
    loginInfo () {
      if (this.isWeixin) {
        let loginTime = new Date().getTime() - localStorage.getItem('loginTime')
        let oneDate = 24 * 60 * 60 * 1000
        if (loginTime > oneDate) {
          this.onWeixinLogin()
        }
      }
    },
    setLogin () {
      // 判断浏览器
      if (this.isWeixin) {
        // 判断微信登陆返回 status
        if (this.$route.query.hasOwnProperty('status')) {
          if (parseInt(this.$route.query.status) === 0) {
            localStorage.setItem('userId', this.$route.query.uid)
            localStorage.setItem('wxOpenId', this.$route.query.openid)
            localStorage.setItem('loginTime', new Date().getTime())
            localStorage.setItem('ak', this.$route.query.ak)
            // console.log(this.$route.query.id)
            this.$router.push({
              path: '/',
              query: {
                id: this.$route.query.id
              }
            })
          }
        }
      }
    },
    onWeixinLogin () {
      // 微信登陆返回到当前页面
      let href = window.location.href
      let _href = encodeURIComponent(`${href}`)
      let apiUrl = 'https://www.51weixiao.com/app-api/api/user/wxLogin'
      let redirectUrl = encodeURIComponent(`${apiUrl}?finalUrl=${_href}`)
      let appId = 'wx701b0e6e6faac47c'
      let _url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` + redirectUrl + `&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
      window.location.href = _url
    }
  },
  watch: {
    scrollHeight (val) { // 下拉到最下面加载更多
      if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
        if (parseInt(this.pages.total / this.pages.pageSize) < this.pages.pageNum) {
          this.Toast.warning({title: '没有更多了'})
          return
        }
        this.loadMore = false
        this.pages.pageNum += 1
        this.loadItempackList()
      }
    },
    navType () {
      this.pages.pageNum = 1
      this.lists = []
      this.ageId = ''
      this.typeId = ''
      this.packetname = ''
      store.navType = this.navType
      this.loadItempackList()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './main.styl'
</style>
