<template>
  <div class="solicit-subscription-main">
    <div class="wrapper" ref="wrapper" :style="secollHeight">
      <div class="content" ref="content">
        <main :style="{minHeight: windowHeight, overflow: 'hidden'}">
          <header>
            <p class="title">书单名称</p>
            <p class="creator">
              <span>撸老师</span>
              <span>18768188565</span>
            </p>
            <p class="explain">说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明</p>
          </header>
          <nav>
            <span :class="{activity: navType === 0}" @click="navType = 0">刊物</span>
            <span :class="{activity: navType === 1}" @click="navType = 1">图书</span>
            <span :class="{activity: navType === 2}" @click="navType = 2">电子读物</span>
          </nav>
          <v-magazine v-if="navType === 0"></v-magazine>
          <v-book v-if="navType === 1"></v-book>
          <v-audio v-if="navType === 2"></v-audio>
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
      navType: 0
    }
  },
  created () {
  },
  mounted () {
    this.initializeScroll()
  },
  computed: {
    toTop () {
      return this.scrollHeight > window.innerHeight
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './main.styl'
</style>
