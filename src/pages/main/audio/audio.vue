<template>
  <div class="solicit-subscription-audio">
    <div class="voice-seek">
      <p>
        <input type="text" v-model="packetname">
        <img src="../../../assets/seek-logo.png" @click="onSearch">
      </p>
    </div>
    <ul v-if="lists.length > 0">
      <li class="order-voice-list" v-for="(item, index) in lists" :key="index">
        <div class="voice-list-left">
          <img :src="item.logo"/>
        </div>
        <div class="voice-list-right">
          <p class="voice-list-title">{{ item.name }}</p>
          <p class="voice-list-descr">{{ item.introductions }}</p>
          <p class="voice-list-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
          <span class="kada" v-if="item.provider === 1">咔哒故事</span>
          <div class="voice-list-button">
            <span @click="toBuy(item)">购买</span>
            <span @click="toShoppingcar(item)">加入购物车</span>
            <span @click="toList(item)">列表</span>
          </div>
        </div>
      </li>
    </ul>
    <p class="noContent" v-if="lists.length === 0">暂无内容</p>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'solicit-subscription-audio',
  data () {
    return {
      packetname: ''
    }
  },
  props: {
    lists: {
      type: Array
    }
  },
  mounted () {
  },
  methods: {
    toBuy (item) {
      console.log('购买')
      this.$router.push({
        path: '/order',
        query: {
          selectMage: JSON.stringify([]),
          selectBook: JSON.stringify([]),
          selectSpyp: JSON.stringify([item])
        }
      })
    },
    toShoppingcar (item) {
      let exist = false
      if (store.shoppingcarspyp.length > 0) {
        store.shoppingcarspyp.forEach(obj => {
          if (item.id === obj.id) {
            exist = true
          }
        })
        if (!exist) {
          store.quantity += 1
          store.shoppingcarspyp.push(item)
        }
      } else {
        store.quantity += 1
        store.shoppingcarspyp.push(item)
      }
    },
    toList (item) {
      this.$router.push({
        path: '/spypDetail',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    onSearch () {
      this.$emit('packetname', this.packetname)
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './audio.styl'
</style>
