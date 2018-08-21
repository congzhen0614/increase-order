<template>
  <div class="maga-detail">
    <v-swiper :listImg="listImg" :style="{height: bannerHeight}"></v-swiper>
    <div class="periodical-head">
      <p class="periodical-title">{{ detail.name }}</p>
      <p class="periodical-suitable">
        <span>{{ detail.feeUnitType }} {{ detail.feeUnitNum }} {{ detail.feeUnitName }}</span>
        <span class="age" v-if="detail.ageNames !== ''">{{ detail.ageNames }}</span>
      </p>
      <p class="transport-costs">运费: <span>免运费</span></p>
      <div class="shoppingCar-quantity">
        <img src="../../../assets/minus-icon.png" v-if="query.quantity > 0" @click.stop="clickReduce(query)"/>
        <span v-if="query.quantity > 0">{{ query.quantity }}</span>
        <img src="../../../assets/add-icon.png" @click.stop="clickAdd(query)"/>
      </div>
      <p class="detail-price">
        <span class="price-red">
          ￥<span class="big">{{ detail.fee | getInteger }}</span>{{ detail.fee | getFixed1 }}
        </span>
        <!--<span class="price-black">￥300.00</span>-->
      </p>
    </div>
    <div class="periodical-gift" v-if="detail.giftName">
      <img src="../../../assets/link-icon.png"/>
      <p>{{ detail.giftName }}</p>
    </div>
    <div class="periodical-content" v-html="detail.content">
    </div>
    <v-details-footer></v-details-footer>
  </div>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
import detailsFooter from '@/components/detailsFooter/detailsFooter.vue'
import store from '@/store/store.js'
export default {
  name: 'maga-detail',
  components: {
    'v-swiper': swiper,
    'v-details-footer': detailsFooter
  },
  data () {
    return {
      query: JSON.parse(this.$route.query.item),
      detail: {},
      listImg: [],
      bannerHeight: window.innerWidth * 0.6 + 'px'
    }
  },
  created () {},
  mounted () {
    this.loadMagazineDetail()
  },
  methods: {
    loadMagazineDetail () {
      this.$axios.magazineDetail(this.query.id).then(res => {
        if (res.data.code === '0') {
          this.listImg = res.data.data.qrzdItemImgs
          this.detail = res.data.data
        } else {
          this.Toast.fail(res.data.data.msg)
        }
      }, err => {
        this.Toast.fail(err)
      }).catch(err => {
        this.Toast.fail(err)
      })
    },
    clickReduce (item) {
      item.quantity -= 1
      if (item.quantity === 0) {
        store.shoppingcarMage.forEach((items, index) => {
          if (item.id === items.id) {
            store.shoppingcarMage.splice(index, 1)
          }
        })
      } else {
        store.shoppingcarMage.forEach(items => {
          if (items.id === item.id) {
            items.quantity = item.quantity
          }
        })
      }
    },
    clickAdd (item) {
      item.quantity += 1
      let exist = false
      store.shoppingcarMage.forEach(items => {
        if (items.id === item.id) {
          items.quantity = item.quantity
          exist = true
        }
      })
      if (!exist) {
        store.shoppingcarMage.push(item)
      }
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './magaDetail.styl'
</style>
