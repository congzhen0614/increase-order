<template>
  <div class="book-detail">
    <v-swiper :listImg="listImg" :style="{height: bannerHeight}"></v-swiper>
    <section>
      <p class="detail-title">
        <span>{{ detail.name }}</span>
        <img v-if="detail.hardcover === '精装'" src="../../../assets/hardback-icon.png"/>
      </p>
      <p class="age-bracket">{{ detail.ageNames }}</p>
      <p class="detail-price">
        <span class="price-red">
          ￥<span class="big">{{ detail.lastFee | getInteger }}</span>{{ detail.lastFee | getFixed1 }}
        </span>
        <!--<span class="price-black">(8.5折)</span>-->
      </p>
      <div class="shoppingCar-quantity">
        <img src="../../../assets/minus-icon.png" v-if="query.quantity > 0" @click.stop="clickReduce(query)"/>
        <span v-if="query.quantity > 0">{{ query.quantity }}</span>
        <img src="../../../assets/add-icon.png" @click.stop="clickAdd(query)"/>
      </div>
      <p class="original-price">原价: {{ detail.originalFee | getInteger }}{{  detail.originalFee | getFixed1 }}</p>
      <!--<p class="detail-points">-->
        <!--<img src="../../../assets/points-icon.png"/>-->
        <!--<span>100积分=0.10元 (最多可用500积分)</span>-->
      <!--</p>-->
    </section>
    <div class="title-bottom">
      <p>运费:<span>免运费</span></p>
      <p>全网销量:<span>1000</span></p>
    </div>
    <div class="detile-interval"></div>
    <div class="store-info">
      <p><span class="shipments-icon"></span>由微校网发货&售后</p>
      <p><span class="transacty-icon"></span>交易保障</p>
      <p><span class="attestaty-icon"></span>企业认证</p>
    </div>
    <div class="commodity-info">
      <p @click="toProductDetail(1)">商品详情<span></span></p>
      <p @click="toProductDetail(2)">内容目录<span></span></p>
      <p @click="toProductDetail(3)">出版信息<span></span></p>
    </div>
    <div class="book-content" v-html="detail.html">
    </div>
    <v-comment :bookComment="comment"></v-comment>
    <v-details-footer :detail="query" :detailType="2"></v-details-footer>
  </div>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
import comment from '@/components/comment/comment.vue'
import detailsFooter from '@/components/detailsFooter/detailsFooter.vue'
export default {
  name: '',
  components: {
    'v-swiper': swiper,
    'v-comment': comment,
    'v-details-footer': detailsFooter
  },
  data () {
    return {
      bannerHeight: window.innerWidth * 0.6 + 'px',
      query: JSON.parse(this.$route.query.item),
      detail: {},
      listImg: [],
      comment: {}
    }
  },
  mounted () {
    this.loadBookDetail()
    this.loadComment()
  },
  methods: {
    loadBookDetail () {
      this.$axios.bookDetail(this.query.id).then(res => {
        if (res.data.code === '0') {
          this.listImg = res.data.data.detailImgs
          this.detail = res.data.data
        } else {
          this.Toast.fail(res.data.data.msg)
        }
      }, err => {
        this.Toast.fail(err)
      }).catch(err => {
        this.Toast.fail(err)
      })
    },
    loadComment () {
      let params = {
        pageNum: 1,
        pageSize: 10,
        bookId: this.query.id
      }
      this.$axios.bookComment(params).then(res => {
        if (res.data.code === '0') {
          this.comment = res.data.data
        } else {
          this.Toast.fail(res.data.data.msg)
        }
      }, err => {
        this.Toast.fail(err)
      }).catch(err => {
        this.Toast.fail(err)
      })
    },
    toProductDetail (type) {
      if (type === 1) {
        this.$router.push({
          path: '/detail',
          query: {
            item: JSON.stringify(this.detail)
          }
        })
      } else if (type === 2) {
        this.$router.push({
          path: '/directory',
          query: {
            item: JSON.stringify(this.detail)
          }
        })
      } else {
        this.$router.push({
          path: '/published',
          query: {
            item: JSON.stringify(this.detail)
          }
        })
      }
    },
    clickReduce (item) {
      item.quantity -= 1
    },
    clickAdd (item) {
      item.quantity += 1
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './bookDetail.styl'
</style>
