<template>
  <div class="add-shopping-car">
    <footer>
      <div class="footer">
        <div class="buy-now" @click.stop="buyNow()">立即购买</div>
        <div class="add-shoppingcar" @click.stop="addShoppingCar()">加入购物车</div>
        <div class="footer-icon">
          <p @click.stop="clickCollect()"><img src="../../assets/collect-icon.png"/><span>收藏</span></p>
          <p @click.stop="toShoppingCar()"><img src="../../assets/shopping-icon.png"/><span>购物车</span></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    buyNow () {
      this.$router.push({
        path: '/order'
      })
    },
    addShoppingCar () {
      console.log('加入购物车')
    },
    clickCollect () {
      console.log('收藏')
    },
    toShoppingCar () {
      console.log('去购物车')
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './addShoppingCar.styl'
</style>
