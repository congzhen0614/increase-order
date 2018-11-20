<template>
  <div class="solicit-subscription-myorder">
    <div v-if="notLogin || orderList.length === 0" class="no-content">
      <img src="../../assets/no-content-icon.png"/>
      <span v-if="notLogin" class="go-and-see-button" @click="goAndSee">去登录</span>
    </div>
    <div class="wrapper" ref="wrapper" :style="secollHeight">
      <div class="content" ref="content">
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
              <li class="details-list">
                <div class="details-left">
                  <img :src="items.tradeDetails.magazines[0].logo">
                </div>
                <div class="details-right">
                  <p class="details-price">￥<span class="big">{{ items.tradeDetails.magazines[0].fee | getInteger }}</span>{{ items.tradeDetails.magazines[0].fee | getFixed1 }}</p>
                  <p class="details-tital">{{ items.tradeDetails.magazines[0].name }}</p>
                  <p class="details-fee" v-if="items.tradeDetails.magazines[0].feeUnit">{{ items.tradeDetails.magazines[0].feeUnit }}</p>
                  <span class="details-quantity">{{ items.tradeDetails.magazines[0].quantity }}</span>
                </div>
              </li>
            </ul>
            <ul class="book-list" v-if="items.tradeDetails.books.length > 0">
              <li class="details-list">
                <div class="details-left">
                  <img :src="items.tradeDetails.books[0].logo">
                </div>
                <div class="details-right">
                  <p class="details-price">￥<span class="big">{{ items.tradeDetails.books[0].fee | getInteger }}</span>{{ items.tradeDetails.books[0].fee | getFixed1 }}</p>
                  <p class="details-tital">{{ items.tradeDetails.books[0].name }}</p>
                  <span class="details-quantity">{{ items.tradeDetails.books[0].quantity }}</span>
                </div>
              </li>
            </ul>
            <ul class="spyp-list" v-if="items.tradeDetails.packets.length > 0">
              <li class="details-list">
                <div class="details-left">
                  <img :src="items.tradeDetails.packets[0].logo">
                </div>
                <div class="details-right">
                  <p class="details-price">￥<span class="big">{{ items.tradeDetails.packets[0].fee | getInteger }}</span>{{ items.tradeDetails.packets[0].fee | getFixed1 }}</p>
                  <p class="details-tital">{{ items.tradeDetails.packets[0].name }}</p>
                  <!--<span class="details-quantity">{{ item.quantity }}</span>-->
                </div>
              </li>
            </ul>
            <div class="order-total" :class="{'order-total-border': items.tradeStatus === 1}">
              <p class="total-price">
                <span class="big">合计</span>
                ￥<span class="big">{{ items.receivables | getInteger }}</span>{{ items.receivables | getFixed1 }}
                <span class="medium">(含运费 ¥{{ items.deliveryFee }})</span>
              </p>
              <span class="total-quantity">商品  {{ items.itemQuantity }}</span>
            </div>
            <div class="order-button" v-if="items.tradeStatus === 1">
              <span @click.stop="toPay(items)">去付款</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-nav :navName="'我的订单'"></v-nav>
  </div>
</template>

<script>
import nav from '@/components/nav/nav.vue'
import BScroll from 'better-scroll'
export default {
  name: '',
  components: {
    'v-nav': nav
  },
  data () {
    return {
      secollHeight: {
        height: window.innerHeight - 80 + 'px'
      },
      scrollHeight: '',
      scroller: '',
      reload: true,
      loadMore: false,
      notLogin: false,
      orderList: [],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    this.loadMyOrderList()
  },
  computed: {
    params () {
      let param = {
        pageNum: this.pages.pageNum,
        pageSize: this.pages.pageSize
      }
      return param
    }
  },
  methods: {
    goAndSee () {
      this.$router.push({
        path: '/mobileLogin'
      })
    },
    loadMyOrderList () {
      this.$axios.myOrderList(this.params).then(res => {
        this.reload = true
        if (res.data.code === '0') {
          this.reload = true
          this.pages.total = res.data.data.total
          res.data.data.list.forEach(item => {
            this.orderList.push(item)
          })
          this.$nextTick(() => {
            setTimeout(() => {
              this.loadMore = true
              this.initializeScroll()
            }, 300)
          })
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
    initializeScroll () {
      if (this.scroller === '') {
        this.scroller = new BScroll(this.$refs.wrapper, {
          probeType: 3,
          click: true
        })
        this.listenScroll()
      } else {
        this.scroller.refresh()
      }
    },
    listenScroll () {
      this.scroller.on('scroll', pos => {
        if (pos.y >= 100 && this.reload) {
          this.reload = false
          this.loadMyOrderList()
        }
        this.scrollHeight = -pos.y
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
      this.Dialog.alert({
        title: '温馨提示',
        msg: '您确定要删除吗'
      }, res => {
        if (res.buttonIndex === 2) {
          this.$axios.tradeDel({id: item.id}).then(res => {
            if (res.data.code === '0') {
              this.Toast.success({
                title: '操作成功'
              })
              this.orderList = []
              this.pages.pageNum = 1
              this.loadMyOrderList()
            } else {
              this.Toast.fail({title: res.data.msg})
            }
          }, err => {
            this.Toast.fail({title: err})
          }).catch(err => {
            this.Toast.fail({title: err})
          })
        }
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
  watch: {
    scrollHeight (val) {
      if (val > this.$refs.content.offsetHeight - window.innerHeight && this.loadMore) {
        this.pages.pageNum += 1
        if (Math.ceil(this.pages.total / this.pages.pageSize) < this.pages.pageNum) {
          this.Toast.warning({title: '没有更多了'})
          return
        }
        this.loadMore = false
        this.loadMyOrderList()
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './myorder.styl'
</style>
