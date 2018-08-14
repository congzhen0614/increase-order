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
            <span :class="{activity: navType === 1}" @click="navType = 1">刊物</span>
            <span :class="{activity: navType === 2}" @click="navType = 2">图书</span>
            <span :class="{activity: navType === 54}" @click="navType = 54">电子读物</span>
          </nav>
          <v-magazine v-if="navType === 1" :lists="lists"></v-magazine>
          <v-book v-if="navType === 2" :lists="lists"></v-book>
          <v-audio v-if="navType === 54" :lists="lists"></v-audio>
        </main>
      </div>
    </div>
    <v-nav :navName="'首页'"></v-nav>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue'
import magazine from './magazine/magazine.vue'
import book from './book/book.vue'
import audio from './audio/audio.vue'
import BScroll from 'better-scroll'
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
      navType: 1,
      catalogue: {},
      lists: []
    }
  },
  mounted () {
    this.loadItempackList()
  },
  computed: {
    params () {
      let param = {
        pageNum: 1,
        pageSize: 10,
        itemPackId: 22,
        cls: this.navType
      }
      return param
    },
    toTop () {
      return this.scrollHeight > window.innerHeight
    }
  },
  methods: {
    loadItempackList () {
      this.$axios.itempackList(this.params).then(res => {
        if (res.data.code === '0') {
          this.catalogue.title = res.data.data.title
          this.catalogue.linkman = res.data.data.linkman
          this.catalogue.linkmobile = res.data.data.linkmobile
          this.catalogue.tip = res.data.data.tip
          this.lists = res.data.data.page.list
          this.$nextTick(() => {
            this.initializeScroll()
          })
        } else {
          this.$message.error(res.data.data.msg)
        }
      }, err => {
        this.$message.error(err)
      }).catch(err => {
        this.$message.error(err)
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
    }
  },
  watch: {
    scrollHeight (val) { // 下拉到最下面加载更多
      if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
        this.loadMore = false
        // this.loadData()
      }
    },
    navType () {
      this.loadItempackList()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './main.styl'
</style>
