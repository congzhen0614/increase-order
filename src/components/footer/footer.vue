<template>
  <div class="increase-order-footer">
    <div class="footer-settle" @click.stop="account()">
      去结算({{ total | getFixed2 }})
    </div>
    <div class="footer-total">
      <div class="shoppingcar-icon">
        <span>{{ quantity }}</span>
        <img src="../../assets/shoppingCar-icon.png" @click.stop="shoppingCar()">
      </div>
      <div class="shoppingCar-price">
        <p class="shoppingCar-discount">￥<span class="big">{{ total | getInteger }}</span>{{ total | getFixed1 }}</p>
        <p class="shoppingCar-original">￥{{ total | getFixed2 }}</p>
      </div>
    </div>
    <shopping-car-ist v-if="showShop" @showShoppingCar="showShoppingCar" @shopChange="shopChange"></shopping-car-ist>
  </div>
</template>

<script>
import shoppingCarList from '@/components/shoppingCarList/shoppingCarList'
export default {
  name: '',
  components: {
    'shopping-car-ist': shoppingCarList
  },
  data () {
    return {
      showShop: false
    }
  },
  props: {
    quantity: {
      type: Number
    },
    total: {
      type: Number
    }
  },
  created () {},
  mounted () {
  },
  computed: {},
  methods: {
    account () {
      this.$router.push({
        path: '/order'
      })
    },
    shoppingCar () {
      this.showShop = !this.showShop
    },
    showShoppingCar (val) {
      this.showShop = val
    },
    shopChange () {
      this.$emit('shopChange')
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'footer.styl'
</style>
