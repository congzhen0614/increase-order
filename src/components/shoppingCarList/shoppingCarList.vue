<template>
  <div class="increase-shoppingCar-list">
    <div class="shoppingCar-shade" :style="{height: shadeHeight}" @click.stop="shoppingCar()" @touchmove.prevent></div>
    <section :style="{'max-height': shadeHeight}">
      <div class="shoppingCar-head">
        <p class="delete-button">
          <img src="../../assets/delete-icon.png"/>
          <span @click.stop="clickClear()">清空</span>
        </p>
        <p class="list-title">
          <span>购物车</span>
        </p>
      </div>
      <ul class="shoppingCar-list">
        <li v-if="shopList.length > 0" v-for="(item, index) in shopList" :key="index">
          <div class="list-img">
            <img src="../../assets/book.jpg"/>
          </div>
          <p class="list-title">杂志名称杂志...</p>
          <p class="list-price">￥<span class="big">{{ item.price | getInteger }}</span>{{ item.price | getFixed1 }}元</p>
          <div class="list-quantity">
            <img src="../../assets/reduce_icon.png" @click.stop="clickReduce(item)">
            <span>{{ item.quantity }}</span>
            <img src="../../assets/add_icon.png" @click.stop="clickAdd(item)">
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import shoppingCarList from '@/store/shoppingCar.js'
export default {
  name: '',
  components: {},
  data () {
    return {
      shadeHeight: window.innerHeight - 50 + 'px',
      shopList: []
    }
  },
  created () {
  },
  mounted () {
    this.getShoppingCar()
  },
  computed: {},
  methods: {
    getShoppingCar () {
      this.shopList = shoppingCarList.bookList.concat(shoppingCarList.videoList).concat(shoppingCarList.periodicalList)
    },
    shoppingCar () {
      this.$emit('showShoppingCar', false)
    },
    clickAdd (item) {
      item.quantity += 1
      this.$emit('shopChange')
    },
    clickReduce (param) {
      param.quantity -= 1
      if (param.quantity === 0) {
        this.shopList.forEach((item, index) => {
          if (param.id === item.id) {
            this.shopList.splice(index, 1)
          }
        })
      }
      this.$emit('shopChange')
    },
    clickClear () {
      shoppingCarList.bookList = []
      shoppingCarList.videoList = []
      shoppingCarList.periodicalList = []
      this.getShoppingCar()
      this.$emit('shopChange')
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './shoppingCarList.styl'
</style>
