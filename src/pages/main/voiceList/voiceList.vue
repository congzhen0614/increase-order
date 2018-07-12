<template>
  <div class="increase-order-voice">
    <div class="voice-seek">
      <p>
        <input type="text">
        <img src="../../../assets/seek-logo.png">
      </p>
    </div>
    <ul class="order-voice-menu">
      <li :class="{active: type===0}" @click.stop="type=0">全部</li>
      <li :class="{active: type===1}" @click.stop="type=1">音频</li>
      <li :class="{active: type===2}" @click.stop="type=2">视频</li>
    </ul>
    <ul>
      <li class="order-voice-list" v-for="(item, index) in listData" :key="index">
        <div class="voice-list-left">
          <img src="../../../assets/book.jpg"/>
        </div>
        <div class="voice-list-right">
          <p class="voice-list-title">{{ item.name }}</p>
          <p class="voice-list-descr">包简介包简介包简介包简介包简介</p>
          <p class="voice-list-price">￥<span class="big">{{ item.price | getInteger }}</span>{{ item.price | getFixed1 }}</p>
          <div class="voice-list-button">
            <span>购买</span>
            <span @click.stop="clickAddShoppingCar(item)">加入购物车</span>
            <span @click.stop="toVioceList(item)">列表</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import shoppingCar from '@/store/shoppingCar.js'
export default {
  name: '',
  components: {},
  data () {
    return {
      type: 0,
      totalQuantity: 0
    }
  },
  props: {
    listData: {
      type: Array
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    toVioceList (item) {
      this.$router.push({
        path: '/voiceDetail',
        query: item
      })
    },
    clickAddShoppingCar (param) {
      let exist = false
      if (shoppingCar.videoList.length > 0) {
        shoppingCar.videoList.forEach(item => {
          if (item.id === param.id) {
            exist = true
            alert('已经加入过购物车了哦~')
          }
        })
        if (!exist) {
          param.quantity = 1
          this.totalQuantity += 1
          shoppingCar.videoList.push(param)
        }
      } else {
        param.quantity = 1
        this.totalQuantity += 1
        shoppingCar.videoList.push(param)
      }
    }
  },
  watch: {
    totalQuantity () {
      this.$emit('shoppingCar')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './voiceList.styl'
</style>
