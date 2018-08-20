<template>
  <div class="book-detail">
    <v-swiper :listImg="listImg" :style="{height: bannerHeight}"></v-swiper>
    <section>
      <p class="detail-title">
        <span>名称名称名称名称</span>
        <img src="../../../assets/hardback-icon.png"/>
      </p>
      <p class="age-bracket">
        适读年龄（3至6岁儿童）
      </p>
      <p class="detail-price">
        <span class="price-red">
          ￥<span class="big">500</span>.00
        </span>
        <span class="price-black">(8.5折)</span>
      </p>
      <div class="shoppingCar-quantity">
        <img src="../../../assets/minus-icon.png" @click.stop="clickReduce()"/>
        <span>0</span>
        <img src="../../../assets/add-icon.png" @click.stop="clickAdd()"/>
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
  </div>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
import comment from '@/components/comment/comment.vue'
export default {
  name: '',
  components: {
    'v-swiper': swiper,
    'v-comment': comment
  },
  data () {
    return {
      listImg: [],
      bannerHeight: window.innerWidth * 0.6 + 'px'
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './bookDetail.styl'
</style>
