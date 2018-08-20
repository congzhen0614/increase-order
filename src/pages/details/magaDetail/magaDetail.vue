<template>
  <div class="maga-detail">
    <v-swiper :listImg="listImg" :style="{height: bannerHeight}"></v-swiper>
    <div class="periodical-head">
      <p class="periodical-title">名称名称名称</p>
      <p class="periodical-suitable">
        <span>半年12期</span>
        <span>2~6年级适读</span>
      </p>
      <p class="transport-costs">运费: <span>免运费</span></p>
      <div class="shoppingCar-quantity">
        <img src="../../../assets/minus-icon.png" @click.stop="clickReduce()"/>
        <span>0</span>
        <img src="../../../assets/add-icon.png" @click.stop="clickAdd()"/>
      </div>
      <p class="detail-price">
        <span class="price-red">
          ￥<span class="big">500</span>.00
        </span>
        <span class="price-black">￥300.00</span>
      </p>
    </div>
    <div class="periodical-inform">
      <div class="periodical-inform-text">
        <img src="../../../assets/gift-icon.png">
        <span>赠送:益智DIY万变串珠+弹射飞机+笑脸橡益智DIY万变串珠+弹射飞机+笑脸橡益智DIY万变串珠+弹射飞机</span>
      </div>
      <img class="periodical-inform-images" src="http://pic.58pic.com/58pic/13/71/06/63J58PIC2FC_1024.jpg"/>
    </div>
    <div class="periodical-content">
      <p>文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内</p>
      <img src="http://pic.58pic.com/58pic/13/71/22/35T58PICrEk_1024.jpg"/>
    </div>
  </div>
</template>

<script>
import swiper from '@/components/swiper/swiper.vue'
export default {
  name: 'maga-detail',
  components: {
    'v-swiper': swiper
  },
  data () {
    return {
      listImg: [{
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534501969084&di=8e1bf71067afe1b9a6f97215fd2217b3&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201305%2F26%2F20130526140022_5fMJe.jpeg'
      }, {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534501983893&di=82b250df30bdb0867644e108ba9598f7&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D3564877025%2C796183547%26fm%3D214%26gp%3D0.jpg'
      }, {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534501969084&di=60367c942dfbc8cc320f03ff88b52e7d&imgtype=0&src=http%3A%2F%2Fp3.gexing.com%2FG1%2FM00%2FB9%2F56%2FrBACFFaM_VfRWJE0AAlNClgKv_o422.jpg'
      }],
      bannerHeight: window.innerWidth * 0.6 + 'px'
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './magaDetail.styl'
</style>
