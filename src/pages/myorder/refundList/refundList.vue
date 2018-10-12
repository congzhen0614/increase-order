<template>
  <div class="refund-list">
    <ul>
      <li v-for="item in refundList" :key="item.id">
        <div class="refund-left">
          <img :src="item.logo"/>
        </div>
        <div class="refund-right">
          <p class="refund-title">{{ item.name }}</p>
          <p class="refund-price">￥<span class="big">{{ item.fee | getInteger }}</span>{{ item.fee | getFixed1 }}</p>
          <span class="refund-quantity">{{ item.quantity }}</span>
          <span class="refund-btn apply-refund" v-if="item.refundStatus === 0" @click="applyRefund(item)">申请退款</span>
          <span class="refund-btn refundding" v-if="item.refundStatus === 1">退款中...</span>
          <span class="refund-btn cancel-refund" v-if="item.refundStatus === 1" @click="cancelRefund(item)">取消退款</span>
          <span class="refund-btn refuse-refund" v-if="item.refundStatus === 2">拒绝退款</span>
          <p class="refund-content" v-if="item.refundStatus > 0 && item.refundStatus !== 2">
            <span>退款原因: </span>
            <span :class="{'no-refund': item.refundStatus !== 3}">{{ item.refundReason }}</span>
          </p>
          <p class="refund-content" v-if="item.refundStatus > 0 && item.refundStatus !== 2">
            <span>退款说明: </span>
            <span :class="{'no-refund': item.refundStatus !== 3}">{{ item.refundNote | cutString(isCut) }}
              <span v-if="item.refundNote.length > 20" class="if-show" @click="isCut = !isCut">{{ isCut ? '查看全部' : '收起' }}
                <img v-if="!isCut" src="../../../assets/order/up-icon.png">
                <img v-if="isCut" src="../../../assets/order/down-icon.png">
              </span>
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'refund-list',
  components: {},
  data () {
    return {
      refundList: [],
      isCut: true
    }
  },
  created () {
    this.loadRefundList()
  },
  mounted () {
  },
  computed: {},
  methods: {
    loadRefundList () {
      this.$axios.refundList(this.$route.query.tradeId, this.$route.query.cls).then(res => {
        if (res.data.code === '0') {
          this.refundList = res.data.data.refundItemViews
        } else {
          this.Toast.fail({title: res.data.msg})
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    },
    applyRefund (item) {
      this.$router.push({
        path: '/applyRefund',
        query: {
          id: item.id
        }
      })
    },
    cancelRefund (item) {
      this.$axios.refundCancel({id: item.id}).then(res => {
        if (res.data.code === '0') {
          this.Toast.success({
            title: '操作成功'
          })
          this.loadRefundList()
        } else {
          this.Toast.warning({
            title: res.data.msg
          })
        }
      }, err => {
        this.Toast.fail({title: err})
      }).catch(err => {
        this.Toast.fail({title: err})
      })
    }
  },
  watch: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './refundList.styl'
</style>
