<template>
  <div class="solicit-subscription-shoppingcar">
    <main>
      <div class="shoppingcar-null" v-if="mageList.length === 0 && bookList.length === 0 && spypList.length === 0">
        <img src="../../assets/shoppingcar-null.png">
      </div>
      <div class="maga-book-spyp" v-if="mageList.length > 0">
        <header>
          <img v-if="!selectMage" @click="selectMage = true" src="../../assets/check-icon.png">
          <img v-if="selectMage" @click="selectMage = false" src="../../assets/checked-icon.png">
          <span>刊物</span>
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
      <span class="settle">去结算({{ total }})</span>
      <div class="accounts">
        <p>合计:￥<span class="big">{{ accounts |getInteger }}</span>{{ accounts | getFixed1 }}</p>
      </div>
      <div class="checked-all">
        <img v-if="!checkedAll" @click="checkedAll = true" src="../../assets/check-icon.png">
        <img v-if="checkedAll" @click="checkedAll = false" src="../../assets/checked-icon.png">
        <span>全选</span>
      </div>
    </div>
    <v-nav :navName="'购物车'"></v-nav>
  </div>
</template>

<script>
import store from '@/store/store.js'
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
      accounts: store.accounts,
      total: store.total
    }
  },
  mounted () {},
  methods: {
    changeSelect (item) {
      item.select = !item.select
      this.selectVerdict()
    },
    addQuantity (item) {
      item.quantity += 1
      this.selectVerdict()
    },
    reduceQuantity (item, type) {
      if (item.quantity === 1) {
        this.Dialog.alert({
          title: '温馨提示',
          msg: '您确定要删除吗'
        }, res => {
          if (res.buttonIndex === 2) {
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
        item.quantity -= 1
      }
      this.selectVerdict()
    },
    selectVerdict () {
      // let mageCheckedAll = true
      // let bookCheckedAll = true
      // let spypCheckedAll = true
      this.accounts = 0
      this.total = 0
      this.mageList.forEach(item => {
        if (item.select) {
          this.accounts += item.quantity * item.fee
          this.total += item.quantity
        }
        // else {
        //   mageCheckedAll = false
        // }
      })
      this.bookList.forEach(item => {
        if (item.select) {
          this.accounts += item.quantity * item.fee
          this.total += item.quantity
        }
        // else {
        //   bookCheckedAll = false
        // }
      })
      this.spypList.forEach(item => {
        if (item.select) {
          this.accounts += item.quantity * item.fee
          this.total += item.quantity
        }
        // else {
        //   spypCheckedAll = false
        // }
      })
      store.accounts = this.accounts
      store.total = this.total
      // this.selectMage = mageCheckedAll
      // this.selectBook = bookCheckedAll
      // this.selectSpyp = spypCheckedAll
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
