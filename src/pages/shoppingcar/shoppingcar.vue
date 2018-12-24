<template>
  <div class="solicit-subscription-shoppingcar">
    <main>
      <div class="shoppingcar-null" v-if="mageList.length === 0 && bookList.length === 0 && spypList.length === 0">
        <img src="../../assets/shoppingcar-null.png">
        <span class="go-and-see-button" @click="goAndSee">去逛逛</span>
      </div>
      <div class="maga-book-spyp" v-if="mageList.length > 0">
        <header>
          <img v-if="!selectMage" @click="selectMage = true" src="../../assets/check-icon.png">
          <img v-if="selectMage" @click="selectMage = false" src="../../assets/checked-icon.png">
          <span>刊物</span>
          <span class="postage" v-if="sendType !== 0">满{{ postageSum }}元包邮,还差{{ shortPrice | getFixed2 }}元</span>
        </header>
        <ul>
          <li v-for="(item, index) in mageList" :key="item.id" :class="{lastChild: mageLength === index + 1}">
            <div class="select">
              <img v-if="!item.select" @click="changeSelect(item)" src="../../assets/check-icon.png">
              <img v-if="item.select" @click="changeSelect(item)" src="../../assets/checked-icon.png">
            </div>
            <div class="info">
              <div class="surface">
                <img :src="item.logo">
              </div>
              <div class="content">
                <p class="title">{{ item.name }}</p>
                <div class="quantity">
                  <img @click="reduceQuantity(item, 'maga')" src="../../assets/minus-icon.png">
                  <span>{{ item.quantity }}</span>
                  <img @click="addQuantity(item)" src="../../assets/add-icon.png">
                </div>
                <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="maga-book-spyp" v-if="bookList.length > 0">
        <header>
          <img v-if="!selectBook" @click="selectBook = true" src="../../assets/check-icon.png">
          <img v-if="selectBook" @click="selectBook = false" src="../../assets/checked-icon.png">
          <span>图书</span>
          <span class="postage">满{{ postageSumBook }}元包邮,还差{{ shortPriceBook | getFixed2 }}元</span>
        </header>
        <ul>
          <li v-for="(item, index) in bookList" :key="item.id" :class="{lastChild: mageLength === index + 1}">
            <div class="select">
              <img v-if="!item.select" @click="changeSelect(item)" src="../../assets/check-icon.png">
              <img v-if="item.select" @click="changeSelect(item)" src="../../assets/checked-icon.png">
            </div>
            <div class="info">
              <div class="surface">
                <img :src="item.logo">
              </div>
              <div class="content">
                <p class="title">{{ item.name }}</p>
                <div class="quantity">
                  <img @click="reduceQuantity(item, 'book')" src="../../assets/minus-icon.png">
                  <span>{{ item.quantity }}</span>
                  <img @click="addQuantity(item)" src="../../assets/add-icon.png">
                </div>
                <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="maga-book-spyp" v-if="spypList.length > 0">
        <header>
          <img v-if="!selectSpyp" @click="selectSpyp = true" src="../../assets/check-icon.png">
          <img v-if="selectSpyp" @click="selectSpyp = false" src="../../assets/checked-icon.png">
          <span>电子读物</span>
        </header>
        <ul>
          <li v-for="(item, index) in spypList" :key="item.id" :class="{lastChild: mageLength === index + 1}">
            <div class="select">
              <img v-if="!item.select" @click="changeSelect(item)" src="../../assets/check-icon.png">
              <img v-if="item.select" @click="changeSelect(item)" src="../../assets/checked-icon.png">
            </div>
            <div class="info">
              <div class="surface">
                <img :src="item.logo">
              </div>
              <div class="content">
                <p class="title">{{ item.name }}</p>
                <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <div class="shoppingcar" v-if="mageList.length > 0 || bookList.length > 0 || spypList.length > 0">
      <span class="settle" @click="toSettle">去结算({{ total }})</span>
      <div class="accounts">
        <p>合计:￥<span class="big">{{ accounts |getInteger }}</span>{{ accounts | getFixed1 }}</p>
        <p style="margin-top: -4px">原价:{{ originalFee | getInteger}}{{ originalFee | getFixed1}} 优惠: {{ discounts | getInteger }}{{ discounts | getFixed1 }}</p>
      </div>
      <!--<div class="checked-all">-->
        <!--<img v-if="!checkedAll" @click="checkedAll = true" src="../../assets/check-icon.png">-->
        <!--<img v-if="checkedAll" @click="checkedAll = false" src="../../assets/checked-icon.png">-->
        <!--<span>全选</span>-->
      <!--</div>-->
    </div>
    <v-nav :navName="'购物车'"></v-nav>
  </div>
</template>

<script>
import store from '@/store/store.js'
import shoppingcar from '@/store/shoppingcar.js'
import nav from '@/components/nav/nav.vue'
export default {
  name: 'solicit-subscription-shoppingcar',
  components: {
    'v-nav': nav
  },
  data () {
    return {
      mageList: store.shoppingcarMage,
      bookList: store.shoppingcarBook,
      spypList: store.shoppingcarspyp,
      mageLength: store.shoppingcarMage.length,
      bookLength: store.shoppingcarBook.length,
      spypLength: store.shoppingcarspyp.length,
      checkedAll: false,
      selectMage: false,
      selectBook: false,
      selectSpyp: false,
      sendType: store.sendType,
      accounts: store.accounts,
      originalFee: store.originalFee,
      total: store.total,
      postageSum: store.postageSum,
      postageSumBook: store.postageSumBook
    }
  },
  computed: {
    shortPrice () {
      let total = 0
      if (this.mageList.length > 0) {
        this.mageList.forEach(item => {
          if (item.select) {
            total += item.fee * item.quantity
          }
        })
      }
      if (this.postageSum > total) {
        return this.postageSum - total
      } else {
        return 0
      }
    },
    shortPriceBook () {
      let total = 0
      if (this.bookList.length > 0) {
        this.bookList.forEach(item => {
          if (item.select) {
            total += item.fee * item.quantity
          }
        })
      }
      if (this.postageSumBook > total) {
        return this.postageSumBook - total
      } else {
        return 0
      }
    },
    discounts () {
      return this.originalFee - this.accounts
    }
  },
  mounted () {
    this.selectVerdict()
  },
  methods: {
    goAndSee () {
      this.$router.push({
        path: '/',
        query: {
          id: localStorage.getItem('qrzdId')
        }
      })
    },
    changeSelect (item) {
      item.select = !item.select
      this.selectVerdict()
    },
    addQuantity (item) {
      store.quantity += 1
      item.quantity += 1
      this.selectVerdict()
    },
    reduceQuantity (item, type) {
      if (item.quantity <= 1) {
        this.Dialog.alert({
          title: '温馨提示',
          msg: '您确定要删除吗'
        }, res => {
          if (res.buttonIndex === 2) {
            store.quantity -= 1
            if (type === 'maga') {
              this.mageList.forEach((items, index) => {
                if (item.id === items.id) {
                  this.mageList.splice(index, 1)
                }
              })
            } else {
              this.bookList.forEach((items, index) => {
                if (item.id === items.id) {
                  this.bookList.splice(index, 1)
                }
              })
            }
          }
        })
      } else {
        store.quantity -= 1
        item.quantity -= 1
      }
      this.selectVerdict()
    },
    selectVerdict () {
      this.originalFee = 0
      this.accounts = 0
      this.total = 0
      if (this.mageList.length > 0) {
        this.mageList.forEach(item => {
          if (item.select) {
            this.accounts += item.quantity * item.fee
            this.originalFee += item.quantity * item.fee
            this.total += item.quantity
          }
        })
      }
      if (this.bookList.length > 0) {
        this.bookList.forEach(item => {
          if (item.select) {
            this.accounts += item.quantity * item.fee
            this.originalFee += item.quantity * item.originalFee
            this.total += item.quantity
          }
        })
      }
      if (this.spypList.length > 0) {
        this.spypList.forEach(item => {
          if (item.select) {
            this.accounts += item.fee
            this.originalFee += item.fee
            this.total += item.quantity
          }
        })
      }
      store.total = this.total
      store.accounts = this.accounts
      store.originalFee = this.originalFee
    },
    toSettle () {
      let selectMage = []
      let selectBook = []
      let selectSpyp = []
      if (store.shoppingcarMage.length > 0) {
        store.shoppingcarMage.forEach(item => {
          if (item.select) {
            selectMage.push(item)
          }
        })
      }
      if (store.shoppingcarBook.length > 0) {
        store.shoppingcarBook.forEach(item => {
          if (item.select) {
            selectBook.push(item)
          }
        })
      }
      if (store.shoppingcarspyp.length > 0) {
        store.shoppingcarspyp.forEach(item => {
          if (item.select) {
            selectSpyp.push(item)
          }
        })
      }
      if (selectMage.length === 0 && selectBook.length === 0 && selectSpyp.length === 0) {
        this.Toast.warning({
          title: '请选择至少一件商品'
        })
        return
      }
      shoppingcar.list.selectMage = selectMage
      shoppingcar.list.selectBook = selectBook
      shoppingcar.list.selectSpyp = selectSpyp
      this.$router.push({
        path: '/order'
      })
    }
  },
  watch: {
    checkedAll (val) {
      this.selectMage = val
      this.selectBook = val
      this.selectSpyp = val
      this.selectVerdict()
    },
    selectMage (val) {
      this.mageList.forEach(item => {
        item.select = val
      })
      this.selectVerdict()
    },
    selectBook (val) {
      this.bookList.forEach(item => {
        item.select = val
      })
      this.selectVerdict()
    },
    selectSpyp (val) {
      this.spypList.forEach(item => {
        item.select = val
      })
      this.selectVerdict()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './shoppingcar.styl'
</style>
