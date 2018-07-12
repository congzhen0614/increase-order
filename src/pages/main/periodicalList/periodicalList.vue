<template>
  <div class="increase-order-periodical">
    <div class="periodical-seek">
      <p @click="selectGrad"><span>年级区间</span></p>
      <p @click="selectType"><span>杂志类型</span></p>
    </div>
    <ul>
      <li v-for="(item, index) in listData" :key="index" @click.stop="toDetail(item)">
        <div class="list-img">
          <img src="../../../assets/book.jpg">
        </div>
        <div class="list-content">
          <p class="list-title">{{ item.name | cutStr(20) }}</p>
          <p class="list-describe"><img src="../../../assets/gift-icon.png"/>{{ item.describe }}</p>
          <p class="list-validity">{{ item.validity }}</p>
          <div class="list-totle">
            <div class="list-number">
              <img v-if="item.quantity > 0" src="../../../assets/reduce_icon.png" @click.stop="clickReduce(item, item.id)">
              <span v-if="item.quantity > 0">{{ item.quantity }}</span>
              <img src="../../../assets/add_icon.png" @click.stop="clickAdd(item, item.id)">
            </div>
            <p class="list-price">￥<span class="big">{{ item.price | getInteger }}</span>{{ item.price | getFixed1 }}元</p>
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
  computed: {
  },
  methods: {
    selectGrad () {
      this.$router.push({
        path: '/gradeSeek'
      })
    },
    selectType () {
      this.$router.push({
        path: '/perioditalSeek'
      })
    },
    clickAdd (param, id) {
      param.quantity += 1
      this.totalQuantity += 1
      let exist = false
      if (shoppingCar.periodicalList.length > 0) {
        shoppingCar.periodicalList.forEach(item => {
          if (item.id === id) {
            item.quantity = param.quantity
            exist = true
          }
        })
        if (!exist) {
          shoppingCar.periodicalList.push(param)
        }
      } else {
        shoppingCar.periodicalList.push(param)
      }
    },
    clickReduce (param, id) {
      param.quantity -= 1
      this.totalQuantity -= 1
      shoppingCar.periodicalList.forEach((item, index) => {
        if (item.id === id) {
          if (param.quantity === 0) {
            shoppingCar.periodicalList.splice(index, 1)
          } else {
            item.quantity = param.quantity
          }
        }
      })
    },
    toDetail (item) {
      this.$router.push({
        path: '/periodicalDetail',
        query: item
      })
    }
  },
  watch: {
    listData (val) {
      val.forEach(itemi => {
        shoppingCar.periodicalList.forEach(itemj => {
          if (itemi.id === itemj.id) {
            itemi.quantity = itemj.quantity
          }
        })
      })
    },
    totalQuantity () {
      this.$emit('shoppingCar')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './periodicalList.styl'
</style>
