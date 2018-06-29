<template>
  <div class="order-list">
    <v-address v-if="bookList.length > 0" :address="homeAddress" :type="'home'"></v-address>
    <v-address v-if="periodicalList.length > 0" :address="schoolAddress" :type="'school'"></v-address>
    <div class="orders-list" v-if="periodicalList.length > 0">
      <p class="orders-list-title">刊物</p>
      <ul>
        <li class="orders" v-for="(item, index) in periodicalList" :key="index">
          <div class="orders-img">
            <img src="../../assets/book.jpg"/>
          </div>
          <p class="orders-title">商品名称商品名称商品名称商品商品名称商品名称商品名称商品</p>
          <p class="orders-quantity">{{ item.quantity }}</p>
          <p class="orders-price">￥<span class="big">{{ item.price | getInteger }}</span>{{ item.price | getFixed1 }}</p>
        </li>
      </ul>
    </div>
    <div class="orders-list" v-if="bookList.length > 0">
      <p class="orders-list-title">图书</p>
      <ul>
        <li class="orders" v-for="(item, index) in bookList" :key="index">
          <div class="orders-img">
            <img src="../../assets/book.jpg"/>
          </div>
          <p class="orders-title">商品名称商品名称商品名称商品商品名称商品名称商品名称商品</p>
          <p class="orders-quantity">{{ item.quantity }}</p>
          <p class="orders-price">￥<span class="big">{{ item.price | getInteger }}</span>{{ item.price | getFixed1 }}</p>
        </li>
      </ul>
    </div>
    <div class="orders-list" v-if="videoList.length > 0">
      <p class="orders-list-title">电子读物</p>
      <ul>
        <li class="orders" v-for="(item, index) in videoList" :key="index">
          <div class="orders-img">
            <img src="../../assets/book.jpg"/>
          </div>
          <p class="orders-title">商品名称商品名称商品名称商品商品名称商品名称商品名称商品</p>
          <p class="orders-quantity">{{ item.quantity }}</p>
          <p class="orders-price">￥<span class="big">{{ item.price | getInteger }}</span>{{ item.price | getFixed1 }}</p>
        </li>
      </ul>
    </div>
    <div class="order-leave" @click.stop="toRemarks()">
      <img src="../../assets/link-icon.png"/>
      <span class="order-leave-right">{{ remarks || '请点击输入留言内容' }}</span>
      <span>订单留言</span>
    </div>
    <div class="order-total">
      <div class="order-price">
        商品金额
        <p>￥<span class="big">100</span>.00</p>
      </div>
      <div class="order-delivery">
        运费
        <p>+<span class="big">10</span>.00</p>
      </div>
    </div>
    <footer>
      <span class="submit-order" @click.stop="submitOrder()">提交订单</span>
      <div class="order-totla">实付款<span>￥<span class="big">300</span>.00</span></div>
    </footer>
  </div>
</template>

<script>
import address from './orderAddress/orderAddress.vue'
import shoppingCar from '@/store/shoppingCar.js'
export default {
  name: 'order-list',
  components: {
    'v-address': address
  },
  data () {
    return {
      bookList: [],
      videoList: [],
      periodicalList: [],
      homeAddress: {
        id: 1,
        name: '张三',
        phone: 1552200220,
        address: '浙江省杭州市下城区文晖街道西湖文化广场D区浙江博物馆1楼101室'
      },
      schoolAddress: {
        id: 2,
        name: '李四',
        phone: 1552200220,
        address: '浙江省杭州市下城区文晖街道西湖文化广场D区浙江博物馆1楼101室'
      },
      remarks: ''
    }
  },
  created () {
    this.$root.Bus.$on('homeAddress', item => {
      this.homeAddress = item
    })
    this.$root.Bus.$on('schoolAddress', item => {
      this.schoolAddress = item
    })
    this.$root.Bus.$on('remarks', item => {
      this.remarks = item
    })
  },
  mounted () {
    this.getShoppingCar()
  },
  computed: {},
  methods: {
    getShoppingCar () {
      this.bookList = shoppingCar.bookList
      this.videoList = shoppingCar.videoList
      this.periodicalList = shoppingCar.periodicalList
    },
    toRemarks () {
      this.$router.push({
        path: '/remarks'
      })
    },
    submitOrder () {
      // this.$router.push({
      //   path: '/paySuccess'
      // })
      this.$router.push({
        path: '/payFailed'
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'order.styl'
</style>
