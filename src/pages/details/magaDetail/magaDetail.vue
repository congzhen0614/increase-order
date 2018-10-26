<template>
  <div class="maga-detail">
    <v-swiper :listImg="listImg" :style="{height: bannerHeight}"></v-swiper>
    <div class="periodical-head">
      <p class="periodical-title">{{ detail.name }}</p>
      <p class="periodical-prese">{{ detail.nameShort }}</p>
      <p class="periodical-suitable">
        <span>{{ detail.feeUnitType }} {{ detail.feeUnitNum }} {{ detail.feeUnitName }}</span>
        <span class="age" v-if="detail.ageNames !== ''">{{ detail.ageNames }}</span>
      </p>
      <p class="transport-costs">运费: <span>免运费</span></p>
      <!--<div class="shoppingCar-quantity">-->
        <!--<img src="../../../assets/minus-icon.png" v-if="query.quantity > 0" @click="clickReduce(query)"/>-->
        <!--<span v-if="query.quantity > 0">{{ query.quantity }}</span>-->
        <!--<img src="../../../assets/add-icon.png" @click="clickAdd(query)"/>-->
      <!--</div>-->
      <p class="detail-price">
        <span class="price-red">
          ￥<span class="big">{{ detail.fee | getInteger }}</span>{{ detail.fee | getFixed1 }}
        </span>
      </p>
    </div>
    <div class="periodical-publ" :class="{hasGift: detail.giftName}" @click="publInfo">
      <img src="../../../assets/link-icon.png"/>
      <p>出版信息</p>
    </div>
    <div class="periodical-gift" v-if="detail.giftName" @click="toLift">
      <img src="../../../assets/link-icon.png"/>
      <p>{{ detail.giftName }}</p>
    </div>
    <div class="maga-light" v-if="detail.memo">
      <div class="star-five"></div>
      <p class="light-title">杂志亮点</p>
      <p class="light-content">{{ detail.memo }}</p>
    </div>
    <div class="periodical-content" v-html="detail.content">
    </div>
    <v-details-footer :detail="query" :detailType="1"></v-details-footer>
  </div>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
import detailsFooter from '@/components/detailsFooter/detailsFooter.vue'
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
  created () {
    this.loadMagazineDetail()
  },
  mounted () {
  },
  methods: {
    loadMagazineDetail () {
      this.$axios.magazineDetail(this.query.id).then(res => {
        if (res.data.code === '0') {
          this.listImg = res.data.data.qrzdItemImgs
          this.detail = res.data.data
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    clickReduce (item) {
      item.quantity -= 1
    },
    clickAdd (item) {
      item.quantity += 1
    },
    toLift () {
      this.$router.push({
        path: '/magaGift',
        query: {
          giftName: this.detail.giftName,
          giftLogo: this.detail.giftLogo
        }
      })
    },
    publInfo () {
      this.$router.push({
        path: '/magaPress',
        query: {
          name: this.detail.name,
          issn: this.detail.issn,
          press: this.detail.press,
          shortName: this.detail.nameShort
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './magaDetail.styl'
</style>
