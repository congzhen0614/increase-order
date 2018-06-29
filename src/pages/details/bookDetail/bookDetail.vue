<template>
  <div class="book-detail">
    <v-swiper :listImg="listImg" :style="{height: bannerHeight}"></v-swiper>
    <section>
      <p class="detail-title">
        <span>{{ info.name }}</span>
        <img src="../../../assets/hardback-icon.png"/>
      </p>
      <p class="age-bracket">
        适读年龄（3至6岁儿童）
      </p>
      <p class="detail-price">
        <span class="price-red">
          ￥<span class="big">{{ info.price | getInteger }}</span>{{ info.price | getFixed1 }}
        </span>
        <span class="price-black">(8.5折)</span>
      </p>
      <div class="shoppingCar-quantity">
        <img v-if="info.quantity > 0" src="../../../assets/reduce_icon.png" @click.stop="clickReduce()"/>
        <span v-if="info.quantity > 0">{{ info.quantity }}</span>
        <img src="../../../assets/add_icon.png" @click.stop="clickAdd()"/>
      </div>
      <p class="original-price">原价: ¥300.50</p>
      <p class="detail-points">
        <img src="../../../assets/points-icon.png"/>
        <span>100积分=0.10元 (最多可用500积分)</span>
      </p>
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
    <div class="book-content">
      <p>
        内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容
        文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字
        内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容
        文字内容文字内容文字内容文字内容文字
      </p>
      <img src="http://pic.58pic.com/58pic/13/71/06/63J58PIC2FC_1024.jpg"/>
    </div>
    <v-comment></v-comment>
    <v-footer></v-footer>
  </div>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
import comment from '@/components/comment/comment.vue'
import footer from '@/components/addShoppingCar/addShoppingCar.vue'
import shoppingCar from '@/store/shoppingCar.js'
export default {
  name: '',
  components: {
    'v-swiper': swiper,
    'v-comment': comment,
    'v-footer': footer
  },
  data () {
    return {
      listImg: [{
        url: 'http://pic.58pic.com/58pic/13/71/06/63J58PIC2FC_1024.jpg'
      }, {
        url: 'http://pic.58pic.com/58pic/13/71/22/35T58PICrEk_1024.jpg'
      }, {
        url: 'http://pic32.photophoto.cn/20140817/0034034463193076_b.jpg'
      }],
      bannerHeight: window.innerWidth * 0.6 + 'px',
      info: this.$route.query
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    toProductDetail (type) {
      this.$router.push({
        path: '/productDetail',
        query: {
          type: type
        }
      })
    },
    clickAdd () {
      this.info.quantity = parseInt(this.info.quantity) + 1
      let exist = false
      if (shoppingCar.bookList.length > 0) {
        shoppingCar.bookList.forEach(item => {
          if (this.info.id === item.id) {
            item.quantity = this.info.quantity
            exist = true
          }
        })
        if (!exist) {
          shoppingCar.bookList.push(this.info)
        }
      } else {
        shoppingCar.bookList.push(this.info)
      }
      console.log(shoppingCar.bookList)
    },
    clickReduce () {
      this.info.quantity -= 1
      shoppingCar.bookList.forEach((item, index) => {
        if (this.info.id === item.id) {
          if (this.info.quantity === 0) {
            shoppingCar.bookList.splice(index, 1)
          } else {
            item.quantity = this.info.quantity
          }
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './bookDetail.styl'
</style>
