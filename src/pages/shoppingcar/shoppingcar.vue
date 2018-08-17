<template>
  <div class="solicit-subscription-shoppingcar">
    <main>
      <div class="maga-book-spyp" v-if="mageList.length > 0">
        <header>
          <img v-if="!selectMage" src="../../assets/check-icon.png">
          <img v-if="selectMage" src="../../assets/checked-icon.png">
          <span>刊物</span>
        </header>
        <ul>
          <li v-for="(item, index) in mageList" :key="item.id" :class="{lastChild: mageLength === index + 1}">
            <div class="select">
              <img src="../../assets/check-icon.png">
            </div>
            <div class="info">
              <div class="surface">
                <img :src="item.logo">
              </div>
              <div class="content">
                <p class="title">{{ item.name }}</p>
                <div class="quantity">
                  <img src="../../assets/minus-icon.png">
                  <span>{{ item.quantity }}</span>
                  <img src="../../assets/add-icon.png">
                </div>
                <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="maga-book-spyp" v-if="bookList.length > 0">
        <header>
          <img v-if="!selectMage" src="../../assets/check-icon.png">
          <img v-if="selectMage" src="../../assets/checked-icon.png">
          <span>图书</span>
        </header>
        <ul>
          <li v-for="(item, index) in bookList" :key="item.id" :class="{lastChild: mageLength === index + 1}">
            <div class="select">
              <img src="../../assets/check-icon.png">
            </div>
            <div class="info">
              <div class="surface">
                <img :src="item.logo">
              </div>
              <div class="content">
                <p class="title">{{ item.name }}</p>
                <div class="quantity">
                  <img src="../../assets/minus-icon.png">
                  <span>{{ item.quantity }}</span>
                  <img src="../../assets/add-icon.png">
                </div>
                <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="maga-book-spyp" v-if="spypList.length > 0">
        <header>
          <img v-if="!selectMage" src="../../assets/check-icon.png">
          <img v-if="selectMage" src="../../assets/checked-icon.png">
          <span>电子读物</span>
        </header>
        <ul>
          <li v-for="(item, index) in spypList" :key="item.id" :class="{lastChild: mageLength === index + 1}">
            <div class="select">
              <img src="../../assets/check-icon.png">
            </div>
            <div class="info">
              <div class="surface">
                <img :src="item.logo">
              </div>
              <div class="content">
                <p class="title">{{ item.name }}</p>
                <!--<div class="quantity">-->
                  <!--<img src="../../assets/minus-icon.png">-->
                  <!--<span>{{ item.quantity }}</span>-->
                  <!--<img src="../../assets/add-icon.png">-->
                <!--</div>-->
                <p class="price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
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
      selectMage: false
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './shoppingcar.styl'
</style>
