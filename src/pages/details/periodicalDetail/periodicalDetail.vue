<template>
  <div class="periodical-detail">
    <v-swiper :listImg="listImg" :style="{height: bannerHeight}"></v-swiper>
    <div class="periodical-head">
      <p class="periodical-title">{{ info.name }}</p>
      <p class="periodical-suitable">
        <span>半年12期</span>
        <span>2~6年级适读</span>
      </p>
      <p class="transport-costs">运费: <span>免运费</span></p>
      <div class="shoppingCar-quantity">
        <img v-if="info.quantity > 0" src="../../../assets/reduce_icon.png" @click.stop="clickReduce()"/>
        <span v-if="info.quantity > 0">{{ info.quantity }}</span>
        <img src="../../../assets/add_icon.png" @click.stop="clickAdd()"/>
      </div>
      <p class="detail-price">
        <span class="price-red">
          ￥<span class="big">{{ info.price | getInteger }}</span>{{ info.price | getFixed1 }}
        </span>
        <span class="price-black">￥300.00</span>
      </p>
    </div>
    <div class="periodical-inform">
      <div class="periodical-inform-text">
        <img src="../../../assets/gift-icon.png">
        <span>赠送:益智DIY万变串珠+弹射飞机+笑脸橡益智DIY万变串珠+弹射飞机+笑脸橡益智DIY万变串珠+弹射飞机</span>
      </div>
      <img class="periodical-inform-images" src="http://pic.58pic.com/58pic/13/71/06/63J58PIC2FC_1024.jpg"/>
    </div>
    <div class="periodical-content">
      <p>文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内</p>
      <img src="http://pic.58pic.com/58pic/13/71/22/35T58PICrEk_1024.jpg"/>
    </div>
    <footer>
      <v-footer :quantity="quantity" :total="total" @shopChange="shopChange"></v-footer>
    </footer>
  </div>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
import footer from '@/components/footer/footer.vue'
import shoppingCar from '@/store/shoppingCar.js'
export default {
  name: '',
  components: {
    'v-swiper': swiper,
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
      quantity: 0,
      total: 0,
      shopList: [],
      shoppingCarFlag: false,
      info: this.$route.query
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    showShoppingCar (val) {
      console.log(val)
    },
    clickAdd () {
      this.info.quantity = parseInt(this.info.quantity) + 1
      let exist = false
      if (shoppingCar.periodicalList.length > 0) {
        shoppingCar.periodicalList.forEach(item => {
          if (this.info.id === item.id) {
            item.quantity = this.info.quantity
            exist = true
          }
        })
        if (!exist) {
          shoppingCar.periodicalList.push(this.info)
        }
      } else {
        shoppingCar.periodicalList.push(this.info)
      }
      console.log(shoppingCar.periodicalList)
    },
    clickReduce () {
      this.info.quantity -= 1
      shoppingCar.periodicalList.forEach((item, index) => {
        if (this.info.id === item.id) {
          if (this.info.quantity === 0) {
            shoppingCar.periodicalList.splice(index, 1)
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
    @import './periodicalDetail.styl'
</style>
