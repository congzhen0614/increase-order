<template>
  <div class="order-Logistics">
    <div class="order-Logistics-head">
      <p>
        <span>货运单号:</span>
        <span>{{ logisticCode }}</span>
      </p>
      <p>
        <span>承运来源:</span>
        <span>{{ logisticCompany }}</span>
      </p>
      <p>
        <span>物流客服:</span>
        <span>{{ logisticLinkPhone }}</span>
        <img src="../../../assets/phone-icon.png" />
      </p>
      <p>
        <span>商品类型:</span>
        <span>{{ type }}</span>
      </p>
    </div>
    <div class="order-Logistics-info">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="flow-icon">
            <img v-if="index === 0"   src="./now-icon.png" />
            <img v-else="" src="./history-icon.png" />
          </div>
          <div class="flow-info">
            <p>{{ item.accept_station }}</p>
            <p>{{ item.accept_time }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-Logistics',
  components: {},
  data () {
    return {
      list: [],
      logisticCode: '',
      logisticCompany: '',
      logisticLinkPhone: '',
      type: this.$route.query.type
    }
  },
  created () {
    this.loadTradeExpress()
  },
  mounted () {
  },
  computed: {},
  methods: {
    loadTradeExpress () {
      this.$axios.tradeExpress({
        logistic_code: this.$route.query.logistic_code, // 单号
        shipper_code: this.$route.query.shipper_code // 运营商
      }).then(res => {
        if (res.data.result.status === '0') {
          this.logisticCode = res.data.logisticCode
          this.logisticCompany = res.data.logisticCompany
          this.logisticLinkPhone = res.data.logisticLinkPhone
          this.list = res.data.expressList
        } else {
          this.Toast.fail({title: res.data.result.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'Logistics.styl'
</style>
