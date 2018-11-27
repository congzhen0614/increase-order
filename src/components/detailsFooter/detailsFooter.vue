<template>
  <div class="detail-footer-all" :class="{'detail-fixed': isShowShadow}">
    <div class="quantity-shadow" v-if="isShowShadow">
      <div class="quantity-footer">
        <div class="detail-img">
          <div class="detail-header-img">
            <img class="detail-header" :src="detail.logo"/>
          </div>
          <img @click="isShowShadow = false" class="detail-close" src="../../assets/close.png">
        </div>
        <div class="detail-quantity">
          <img @click.stop="detail.quantity += 1" src="../../assets/add-icon.png">
          <p v-if="detail.quantity > 0">{{ detail.quantity }}</p>
          <img @click.stop="detail.quantity -= 1" src="../../assets/minus-icon.png" v-if="detail.quantity > 0">
          <span>请选择数量</span>
        </div>
      </div>
    </div>
    <div class="detail-footer">
      <span class="buy-now" v-if="!isShowShadow" @click="clickShowQuantity">立即购买</span>
      <span class="buy-now" v-if="isShowShadow" @click="clickBuy">去结算</span>
      <span class="add-shoppingcar" @click="addShoppingCar">加入购物车</span>
      <div class="shoppingcar-icon" @click="$router.push({path: '/', query: {id: localStorage.getItem('qrzdId')}})">
        <div>
          <img src="../../assets/classify-icon.png"/>
        </div>
        <p>首页</p>
      </div>
      <div class="shoppingcar-icon" @click="clickShoppingCar">
        <div>
          <span v-if="quantity > 0">{{ quantity }}</span>
          <img src="../../assets/shoppingcar-icon.png"/>
        </div>
        <p>购物车</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/store.js'
import shoppingcar from '@/store/shoppingcar.js'
export default {
  name: 'detail-footer',
  components: {},
  data () {
    return {
      store: store,
      isShowShadow: false,
      quantity: store.quantity
    }
  },
  props: {
    detail: {
      type: Object
    },
    detailType: {
      type: Number
    }
  },
  methods: {
    clickShowQuantity () {
      this.isShowShadow = true
      if (this.detail.quantity === 0) {
        this.detail.quantity = 1
      }
    },
    clickShoppingCar () {
      this.$router.push({
        path: '/shoppingCar'
      })
    },
    clickBuy () {
      if (this.detail.quantity <= 0) {
        this.Toast.warning({title: '请先选择商品数量才能下单'})
        return
      }
      if (this.detailType === 1) {
        shoppingcar.list.selectMage = [this.detail]
        shoppingcar.list.selectBook = []
        shoppingcar.list.selectSpyp = []
        if (this.detail.quantity === 0) this.detail.quantity = 1
        this.$router.push({
          path: '/order'
        })
      } else {
        shoppingcar.list.selectMage = []
        shoppingcar.list.selectBook = [this.detail]
        shoppingcar.list.selectSpyp = []
        this.$router.push({
          path: '/order'
        })
      }
    },
    addShoppingCar () {
      if (this.detailType === 1) {
        let exist = false
        if (store.shoppingcarMage.length === 0) {
          if (this.detail.quantity === 0) this.detail.quantity = 1
          store.shoppingcarMage.push(this.detail)
        } else {
          store.shoppingcarMage.forEach(item => {
            if (item.id === this.detail.id) {
              item.quantity += 1
              exist = true
            }
          })
          if (!exist) {
            this.detail.quantity += 1
            store.shoppingcarMage.push(this.detail)
          }
        }
      } else {
        let exist = false
        if (store.shoppingcarBook.length === 0) {
          if (this.detail.quantity === 0) this.detail.quantity = 1
          store.shoppingcarBook.push(this.detail)
        } else {
          store.shoppingcarBook.forEach((item, index) => {
            if (item.id === this.detail.id) {
              item.quantity += 1
              exist = true
            }
          })
          if (!exist) {
            this.detail.quantity += 1
            store.shoppingcarBook.push(this.detail)
          }
        }
      }
      store.quantity = 0
      store.shoppingcarMage.forEach(item => {
        store.quantity += item.quantity
      })
      store.shoppingcarBook.forEach(item => {
        store.quantity += item.quantity
      })
      store.shoppingcarspyp.forEach(item => {
        store.quantity += item.quantity
      })
    }
  },
  watch: {
    'store.quantity' (val) {
      this.quantity = val
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './detailsFooter.styl'
</style>
