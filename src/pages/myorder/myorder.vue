<template>
  <div class="solicit-subscription-myorder">
    <div v-if="notLogin || orderList.length === 0" class="no-content">
      <img src="../../assets/no-content-icon.png"/>
      <span v-if="notLogin" class="go-and-see-button" @click="goAndSee">去登录</span>
    </div>
    <ul v-if="orderList.length > 0">
      <li class="order-list" v-for="items in orderList" :key="items.id" @click="toDetail(items)">
        <div class="order-title">
          <span class="order-time">下单日期: {{ items.createdAt | timeFormat }}</span>
          <span class="delete-icon" v-if="items.tradeStatus > 4" @click.stop="onDelete(items)">
            <img src="../../assets/order/delete-icon.png"/>
          </span>
          <span class="order-status" v-if="items.tradeStatus !== 7 && items.tradeStatus !== 14">{{ items.tradeStatusName }}</span>
          <img v-if="items.tradeStatus === 14" src="../../assets/order/finish-icon.png"/>
          <img v-if="items.tradeStatus === 7" src="../../assets/order/refunded-icon.png"/>
        </div>
        <ul class="maga-list" v-if="items.tradeDetails.magazines.length > 0">
          <li class="details-list" v-for="item in items.tradeDetails.magazines" :key="item.id">
            <div class="details-left">
              <img :src="item.logo">
            </div>
            <div class="details-right">
              <p class="details-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              <p class="details-tital">{{ item.name }}</p>
              <p class="details-fee" v-if="item.feeUnit">{{ item.feeUnit }}</p>
              <span class="details-quantity">{{ item.quantity }}</span>
            </div>
          </li>
        </ul>
        <ul class="book-list" v-if="items.tradeDetails.books.length > 0">
          <li class="details-list" v-for="item in items.tradeDetails.books" :key="item.id">
            <div class="details-left">
              <img :src="item.logo">
            </div>
            <div class="details-right">
              <p class="details-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              <p class="details-tital">{{ item.name }}</p>
              <span class="details-quantity">{{ item.quantity }}</span>
            </div>
          </li>
        </ul>
        <ul class="spyp-list" v-if="items.tradeDetails.packets.length > 0">
          <li class="details-list" v-for="item in items.tradeDetails.packets" :key="item.id">
            <div class="details-left">
              <img :src="item.logo">
            </div>
            <div class="details-right">
              <p class="details-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              <p class="details-tital">{{ item.name }}</p>
              <!--<span class="details-quantity">{{ item.quantity }}</span>-->
            </div>
          </li>
        </ul>
        <div class="order-total" :class="{'order-total-border': items.tradeStatus === 1}">
          <p class="total-price">
            <span class="big">合计</span>
            ￥<span class="big">{{ items.receivables | getInteger }}</span>{{ items.totalFee | getFixed1 }}
            <span class="medium">(含运费 ¥{{ items.deliveryFee }})</span>
          </p>
          <span class="total-quantity">商品  {{ items.itemQuantity }}</span>
        </div>
        <div class="order-button" v-if="items.tradeStatus === 1">
          <span @click.stop="toPay(items)">去付款</span>
        </div>
      </li>
    </ul>
    <v-nav :navName="'我的订单'"></v-nav>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue'
export default {
  name: '',
  components: {
    'v-nav': nav
  },
  data () {
    return {
      notLogin: false,
      orderList: []
    }
  },
  created () {
    this.loadMyOrderList()
  },
  mounted () {
  },
  computed: {
    params () {
      let param = {
        pageNum: 1,
        pageSize: 200,
        tradeStatus: null
      }
      return param
    }
  },
  methods: {
    goAndSee () {
      this.$router.push({
        path: '/login'
      })
    },
    loadMyOrderList () {
      this.$axios.myOrderList(this.params).then(res => {
        if (res.data.code === '0') {
          this.orderList = res.data.data.list
        } else if (res.data.code === '-6') {
          this.notLogin = true
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    toDetail (item) {
      this.$router.push({
        path: '/orderDetail',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    onDelete (item) {
      this.$axios.tradeDel({id: item.id}).then(res => {
        if (res.data.code === '0') {
          this.Toast.success({
            title: '操作成功'
          })
          this.loadMyOrderList()
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    toPay (item) {
      this.$router.push({
        path: '/pay',
        query: {
          no: item.no,
          total: item.receivables,
          cls: 55
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './myorder.styl'
</style>
