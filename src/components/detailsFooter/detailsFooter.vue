<template>
  <div class="detail-footer">
    <span class="buy-now" @click="clickBuy">立即购买</span>
    <span class="add-shoppingcar" @click="addShoppingCar">加入购物车</span>
    <div class="shoppingcar-icon">
      <div>
        <span v-if="quantity > 0">{{ quantity }}</span>
        <img src="../../assets/shoppingcar-icon.png"/>
      </div>
      <p>购物车</p>
    </div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'detail-footer',
  components: {},
  data () {
    return {
      store: store,
      quantity: 0
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
  created () {},
  mounted () {},
  computed: {},
  methods: {
    clickBuy () {
      if (this.detailType === 1) {
        this.$router.push({
          path: '/order',
          query: {
            selectMage: JSON.stringify([this.detail]),
            selectBook: JSON.stringify([]),
            selectSpyp: JSON.stringify([])
          }
        })
      } else {
        this.$router.push({
          path: '/order',
          query: {
            selectBook: JSON.stringify([this.detail]),
            selectMage: JSON.stringify([]),
            selectSpyp: JSON.stringify([])
          }
        })
      }
    },
    addShoppingCar () {
      if (this.detailType === 1) {
        if (store.shoppingcarMage.length === 0) {
          store.shoppingcarMage.push(this.detail)
        } else {
          store.shoppingcarMage.forEach((item, index) => {
            if (item.id === this.detail.id) {
              if (item.quantity === 0) {
                store.shoppingcarMage.splice(index, 1)
              } else {
                item.quantity = this.detail.quantity
              }
            }
          })
        }
      } else {
        if (store.shoppingcarBook.length === 0) {
          store.shoppingcarBook.push(this.detail)
        } else {
          store.shoppingcarBook.forEach((item, index) => {
            if (item.id === this.detail.id) {
              if (item.quantity === 0) {
                store.shoppingcarMage.splice(index, 1)
              } else {
                item.quantity = this.detail.quantity
              }
            }
          })
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
