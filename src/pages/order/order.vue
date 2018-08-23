<template>
  <div class="order-list">
    <div class="order-address" v-if="selectBook.length > 0">
      <div class="order-address-bg"></div>
      <div class="order-address-content" @click="checkBookAddress">
        <div class="content-left">
          <p class="no-address" v-if="JSON.stringify(address) === '{}'">请填写您的商品收货地址</p>
          <span v-if="JSON.stringify(address) !== '{}'" class="address-name">{{ address.name}}</span>
          <span  v-if="JSON.stringify(address) !== '{}'" class="address-phone">{{ address.mobile }}</span>
          <p  v-if="JSON.stringify(address) !== '{}'" class="address-content">{{ address.provinceName }}{{ address.cityName }}{{ address.regionName }}{{ address.address }}</p>
        </div>
        <div class="content-right">
          <img src="../../assets/link-icon.png">
        </div>
      </div>
      <div class="order-address-bg"></div>
    </div>
    <div class="order-address" v-if="selectMage.length > 0">
      <div class="order-address-bg"></div>
      <div class="order-address-content" @click="checkMagaAddress">
        <div class="content-left">
          <p class="no-address" v-if="JSON.stringify(child) === '{}'">请填写您的杂志收货地址</p>
          <span class="address-name" v-if="JSON.stringify(child) !== '{}'">{{ child.name }}</span>
          <span class="address-phone" v-if="JSON.stringify(child) !== '{}'">{{ chils.mobile }}</span>
          <p class="address-content" v-if="JSON.stringify(child) !== '{}'">{{ address.provinceName }}{{ address.cityName }}{{ address.regionName }}{{ address.address }}</p>
        </div>
        <div class="content-right">
          <img src="../../assets/link-icon.png">
        </div>
      </div>
      <div class="order-address-bg"></div>
    </div>
    <div class="order-shop">
      <div class="shop-list" v-if="selectMage.length > 0">
        <p class="list-head">刊物</p>
        <ul>
          <li v-for="item in selectMage" :key="item.id">
            <div class="list-left">
              <img :src="item.logo">
            </div>
            <div class="list-right">
              <p class="title">{{ item.name }}</p>
              <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              <span class="quantity">{{ item.quantity }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="shop-list" v-if="selectBook.length > 0">
        <p class="list-head">图书</p>
        <ul>
          <li v-for="item in selectBook" :key="item.id">
            <div class="list-left">
              <img :src="item.logo">
            </div>
            <div class="list-right">
              <p class="title">{{ item.name }}</p>
              <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              <span class="quantity">{{ item.quantity }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="shop-list" v-if="selectSpyp.length > 0">
        <p class="list-head">电子读物</p>
        <ul>
          <li v-for="item in selectSpyp" :key="item.id">
            <div class="list-left">
              <img :src="item.logo">
            </div>
            <div class="list-right">
              <p class="title">{{ item.name }}</p>
              <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="order-message" @click="toRemarks">
      <img src="../../assets/link-icon.png">
      <input type="text" placeholder="请点击输入留言内容" v-model="messageContent" disabled/>
      <p>订单留言</p>
    </div>
    <div class="order-price">
      <div>商品金额<p>￥<span class="big">{{ total | getInteger }}</span>{{ total | getFixed1 }}</p></div>
      <div>图书运费<p>+<span class="big">0</span>.00</p></div>
      <div>刊物运费<p>+<span class="big">0</span>.00</p></div>
    </div>
    <div class="order-footer">
      <span class="order-submit">提交订单</span>
      <p><span>实付款: </span>￥<span class="big">{{ total | getInteger }}</span>{{ total | getFixed1 }}</p>
    </div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'order-list',
  components: {},
  data () {
    return {
      selectMage: JSON.parse(this.$route.query.selectMage),
      selectBook: JSON.parse(this.$route.query.selectBook),
      selectSpyp: JSON.parse(this.$route.query.selectSpyp),
      messageContent: store.remark,
      address: store.address,
      child: store.child
    }
  },
  computed: {
    total () {
      let total = 0
      if (this.selectMage.length > 0) {
        this.selectMage.forEach(item => {
          total += item.quantity * item.fee
        })
      }
      if (this.selectBook.length > 0) {
        this.selectBook.forEach(item => {
          total += item.quantity * item.fee
        })
      }
      if (this.selectSpyp.length > 0) {
        this.selectSpyp.forEach(item => {
          total += item.quantity * item.fee
        })
      }
      return total
    }
  },
  methods: {
    checkBookAddress () {
      this.$router.push({
        path: '/homeAddress'
      })
    },
    checkMagaAddress () {
      this.$router.push({
        path: '/schoolAddress'
      })
    },
    toRemarks () {
      this.$router.push({
        path: '/remarks'
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'order.styl'
</style>
