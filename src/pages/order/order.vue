<template>
  <div class="order-list">
    <div class="order-address" v-if="selectBook.length > 0 || sendType === 1">
      <div class="order-address-bg"></div>
      <div class="order-address-content" @click="checkBookAddress">
        <div class="content-left">
          <p class="no-address" v-if="address === ''">请填写您的商品收货地址</p>
          <span v-if="address !== ''" class="address-name">{{ address.name}}</span>
          <span  v-if="address !== ''" class="address-phone">{{ address.mobile }}</span>
          <p  v-if="address !== ''" class="address-content">{{ address.provinceName }}{{ address.cityName }}{{ address.regionName }}{{ address.address }}</p>
        </div>
        <div class="content-right">
          <img src="../../assets/link-icon.png">
        </div>
      </div>
      <div class="order-address-bg"></div>
    </div>
    <div class="order-address" v-if="selectMage.length > 0 && sendType === 0">
      <div class="order-address-bg"></div>
      <div class="order-address-content" @click="checkMagaAddress">
        <div class="content-left">
          <p class="no-address" v-if="child === ''">请填写您的杂志收货地址</p>
          <span class="address-name" v-if="child !== ''">{{ child.name }}</span>
          <span class="address-phone" v-if="child !== ''">{{ child.mobile }}</span>
          <p class="address-content" v-if="child !== ''">{{ child.provinceName }}{{ child.cityName }}{{ child.regionName }}{{ child.schoolName }}{{ child.gradeName }}{{ child.defaultClassName }}</p>
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
      <input type="text" placeholder="请点击输入留言内容" v-model="remark" disabled/>
      <p>订单留言</p>
    </div>
    <div class="order-price">
      <div>商品金额<p>￥<span class="big">{{ total | getInteger }}</span>{{ total | getFixed1 }}</p></div>
      <div v-if="selectBook.length > 0">图书运费<p>+<span class="big">{{ postageBook | getInteger }}</span>{{ postageBook | getFixed1 }}</p></div>
      <div v-if="selectMage.length > 0">刊物运费<p>+<span class="big">{{ postage | getInteger }}</span>{{ postage | getFixed1 }}</p></div>
    </div>
    <div class="order-footer">
      <span class="order-submit" @click="onSubmit">提交订单</span>
      <p><span>实付款: </span>￥<span class="big">{{ total + postage + postageBook | getInteger }}</span>{{ total + postage + postageBook | getFixed1 }}</p>
    </div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'order-list',
  data () {
    return {
      selectMage: JSON.parse(this.$route.query.selectMage),
      selectBook: JSON.parse(this.$route.query.selectBook),
      selectSpyp: JSON.parse(this.$route.query.selectSpyp),
      sendType: store.sendType,
      address: store.address,
      child: store.child,
      remark: store.remark,
      items: []
    }
  },
  computed: {
    postage () {
      let total = 0
      if (this.selectMage.length > 0) {
        this.selectMage.forEach(item => {
          total += item.quantity * item.fee
        })
        if (total >= store.postageSum) {
          return 0
        } else {
          return store.postage
        }
      } else {
        return 0
      }
    },
    postageBook () {
      let total = 0
      if (this.selectBook.length > 0) {
        this.selectBook.forEach(item => {
          total += item.quantity * item.fee
        })
        if (total >= store.postageSumBook) {
          return 0
        } else {
          return store.postageBook
        }
      } else {
        return 0
      }
    },
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
    },
    params () {
      let param = {
        uid: JSON.parse(localStorage.getItem('user')).id,
        childId: store.child.id ? store.child.id : '',
        addressId: store.address.id ? store.address.id : '',
        qrzdItemPackId: store.qrzdItemPackId,
        remark: store.remark,
        items: this.items
      }
      return param
    }
  },
  mounted () {
    this.setItems()
  },
  methods: {
    setItems () {
      if (this.selectMage.length > 0) {
        this.selectMage.forEach(item => {
          this.items.push({
            cls: 1,
            itemId: item.id,
            quantity: item.quantity
          })
        })
      }
      if (this.selectBook.length > 0) {
        this.selectBook.forEach(item => {
          this.items.push({
            cls: 2,
            itemId: item.id,
            quantity: item.quantity
          })
        })
      }
      if (this.selectSpyp.length > 0) {
        this.selectSpyp.forEach(item => {
          this.items.push({
            cls: 54,
            itemId: item.id,
            quantity: item.quantity
          })
        })
      }
    },
    checkBookAddress () {
      this.$router.push({
        path: '/homeAddress',
        query: this.$route.query
      })
    },
    checkMagaAddress () {
      this.$router.push({
        path: '/schoolAddress',
        query: this.$route.query
      })
    },
    toRemarks () {
      this.$router.push({
        path: '/remarks'
      })
    },
    onSubmit () {
      if (this.selectMage.length > 0 && this.sendType === 0 && this.params.child === '') {
        this.Toast.warning({
          title: '请选择孩子'
        })
        return false
      } else if (this.selectMage.length > 0 && this.sendType === 1 && this.params.addressId === '') {
        this.Toast.warning({
          title: '请选择地址'
        })
        return false
      }
      if (this.selectBook.length > 0 && this.params.addressId === '') {
        this.Toast.warning({
          title: '请选择地址'
        })
        return false
      }
      this.$axios.tradeConfirm(this.params).then(res => {
        if (res.data.code === '0') {
          this.$router.push({
            path: '/pay',
            query: {
              no: res.data.data.no,
              total: this.total + this.postage + this.postageBook,
              cls: 55
            }
          })
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'order.styl'
</style>
